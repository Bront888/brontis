import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Color,
  ColorManagement,
  DoubleSide,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InstancedMesh,
  LinearSRGBColorSpace,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

/**
 * The page backdrop: a night city standing in dark water, built from real 3D
 * geometry. Scrolling moves the camera across and toward the skyline, so near
 * towers slide past far ones. Windows are drawn in the shader and a share of
 * them pulse; the reflection is the same city mirrored below the waterline and
 * rippled; red beacons blink on the tallest towers.
 */

const SKY = 0x0a1628;
const FOG_DENSITY = 0.0062;

/** Small deterministic random generator, so the skyline is the same on every visit. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const buildingVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uMirror;
  varying vec3 vWorld;
  varying vec3 vFace;
  varying float vSeed;
  varying float vDepth;

  void main() {
    vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
    if (uMirror > 0.5) {
      // Reflection: sway sideways on a wave that grows with distance below the waterline
      world.x += sin(world.y * 0.85 + uTime * 1.3 + world.z * 0.04) * (0.1 + -world.y * 0.03);
    }
    vWorld = world.xyz;
    vFace = normal;
    vSeed = aSeed;
    vec4 view = viewMatrix * world;
    vDepth = -view.z;
    gl_Position = projectionMatrix * view;
  }
`;

const buildingFragment = /* glsl */ `
  uniform float uTime;
  uniform float uMirror;
  uniform vec3 uSky;
  uniform float uFog;
  varying vec3 vWorld;
  varying vec3 vFace;
  varying float vSeed;
  varying float vDepth;

  // Hash without sine: stable across GPUs as long as its input is exactly the same per pixel
  float hash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * 0.1031);
    q += dot(q, q.yzx + 33.33);
    return fract((q.x + q.y) * q.z);
  }

  void main() {
    // Faces turned sideways catch a little more of the sky than faces turned to the viewer
    vec3 color = vec3(0.028, 0.052, 0.094) * (0.75 + 0.55 * abs(vFace.x));

    if (abs(vFace.y) < 0.5) {
      float along = abs(vFace.x) > 0.5 ? vWorld.z : vWorld.x;
      vec2 grid = vec2(along / 1.3, abs(vWorld.y) / 1.75);
      vec2 cell = floor(grid);
      vec2 f = fract(grid);
      vec2 soft = fwidth(grid) * 1.2;

      float pane =
        smoothstep(0.2, 0.2 + soft.x, f.x) * smoothstep(0.8, 0.8 - soft.x, f.x) *
        smoothstep(0.24, 0.24 + soft.y, f.y) * smoothstep(0.74, 0.74 - soft.y, f.y);
      // Far away, windows are smaller than a pixel: fade them toward their average brightness
      float detail = clamp(1.0 - max(soft.x, soft.y) * 1.6, 0.0, 1.0);
      pane = mix(0.3, pane, detail);

      // Snap the per-tower seed to a whole number: a varying carries tiny per-pixel error,
      // and the hash would turn that error into speckle
      float seed = floor(vSeed * 1024.0 + 0.5);
      vec2 id = cell + vec2(seed * 17.0, seed * 29.0);
      float on = step(hash(id), 0.22);
      float kind = hash(id + 91.0);
      vec3 glow = kind < 0.58 ? vec3(1.0, 0.82, 0.58) : (kind < 0.8 ? vec3(0.9, 0.94, 1.0) : vec3(0.58, 0.76, 1.0));
      float pulse = 0.62 + 0.38 * sin(uTime * (0.5 + kind * 1.7) + kind * 40.0);
      float flicker = mix(1.0, pulse, step(0.45, kind));
      color += glow * on * pane * (0.55 + 0.45 * hash(id + 7.0)) * flicker * 1.15;
    }

    if (uMirror > 0.5) {
      color *= vec3(0.36, 0.42, 0.5);
    }

    float fog = 1.0 - exp(-uFog * uFog * vDepth * vDepth);
    gl_FragColor = vec4(mix(color, uSky, fog), 1.0);
  }
`;

const beaconVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vOn;

  void main() {
    vec4 view = modelViewMatrix * vec4(position, 1.0);
    vOn = step(0.15, sin(uTime * 1.6 + aSeed * 6.28));
    gl_PointSize = max(4.0 * uPixelRatio, uPixelRatio * 900.0 / -view.z);
    gl_Position = projectionMatrix * view;
  }
`;

const beaconFragment = /* glsl */ `
  varying float vOn;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = smoothstep(0.35, 0.1, d);
    float halo = smoothstep(1.0, 0.0, d) * 0.35;
    gl_FragColor = vec4(vec3(1.0, 0.3, 0.25) * (core + halo) * vOn, 1.0);
  }
`;

type Tower = { x: number; z: number; w: number; d: number; h: number };

function layoutCity(): Tower[] {
  const rand = seeded(11);
  const towers: Tower[] = [];
  // Rows receding from the waterfront; the further back, the taller, so the skyline layers
  for (let row = 0; row < 9; row++) {
    const z = -34 - row * 24;
    let x = -230 + rand() * 12;
    while (x < 230) {
      const w = 5 + rand() * 9;
      const d = 5 + rand() * 9;
      let h = 7 + rand() * 22 + row * 3.2;
      if (rand() < 0.1) h *= 1.7; // the occasional landmark
      if (rand() > 0.14) towers.push({ x: x + w / 2, z: z + (rand() - 0.5) * 9, w, d, h });
      x += w + 1.5 + rand() * 7;
    }
  }
  // A few towers close to the camera on either side, for strong parallax
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const w = 6 + rand() * 7;
      towers.push({
        x: side * (46 + i * 15 + rand() * 6),
        z: 4 - i * 5 + rand() * 6,
        w,
        d: 6 + rand() * 6,
        h: 14 + rand() * 26,
      });
    }
  }
  return towers;
}

export function mountCity(container: HTMLElement): () => void {
  // Every colour in this scene is authored as the value to show on screen, so skip conversions
  ColorManagement.enabled = false;
  // Phones skip anti-aliasing: the scene sits behind blurred glass, so the saving is nearly free
  const renderer = new WebGLRenderer({ antialias: window.innerWidth >= 700, alpha: false });
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setClearColor(SKY);
  const canvas = renderer.domElement;
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(46, 1, 0.5, 700);

  const towers = layoutCity();
  const box = new BoxGeometry(1, 1, 1).translate(0, 0.5, 0); // base sits on the waterline
  box.setAttribute(
    "aSeed",
    new InstancedBufferAttribute(Float32Array.from(towers, (_, i) => (i * 0.6180339) % 1), 1),
  );

  const uniforms = {
    uTime: { value: 0 },
    uSky: { value: new Color(SKY) },
    uFog: { value: FOG_DENSITY },
  };
  const material = new ShaderMaterial({
    uniforms: { ...uniforms, uMirror: { value: 0 } },
    vertexShader: buildingVertex,
    fragmentShader: buildingFragment,
  });
  const mirrorMaterial = new ShaderMaterial({
    uniforms: { ...uniforms, uMirror: { value: 1 } },
    vertexShader: buildingVertex,
    fragmentShader: buildingFragment,
    side: DoubleSide, // the mirrored copy is inside-out
  });

  const city = new InstancedMesh(box, material, towers.length);
  const matrix = new Matrix4();
  towers.forEach((t, i) => {
    matrix.makeScale(t.w, t.h, t.d).setPosition(t.x, 0, t.z);
    city.setMatrixAt(i, matrix);
  });
  city.frustumCulled = false;
  const reflection = new InstancedMesh(box, mirrorMaterial, towers.length);
  reflection.instanceMatrix = city.instanceMatrix;
  reflection.scale.y = -1;
  reflection.frustumCulled = false;
  scene.add(reflection, city);

  // The water surface: a dark sheet over the mirrored city
  const waterGeometry = new PlaneGeometry(1400, 900).rotateX(-Math.PI / 2);
  const waterMaterial = new MeshBasicMaterial({ color: 0x040a14, transparent: true, opacity: 0.42, depthWrite: false });
  const water = new Mesh(waterGeometry, waterMaterial);
  water.position.z = -200;
  scene.add(water);

  // Red beacons on the tallest towers
  const tallest = [...towers].sort((a, b) => b.h - a.h).slice(0, 16);
  const beaconGeometry = new BufferGeometry();
  beaconGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(tallest.flatMap((t) => [t.x, t.h + 1.2, t.z]), 3),
  );
  beaconGeometry.setAttribute(
    "aSeed",
    new Float32BufferAttribute(tallest.map((_, i) => (i * 0.37) % 1), 1),
  );
  const beaconMaterial = new ShaderMaterial({
    uniforms: { uTime: uniforms.uTime, uPixelRatio: { value: 1 } },
    vertexShader: beaconVertex,
    fragmentShader: beaconFragment,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const beacons = new Points(beaconGeometry, beaconMaterial);
  beacons.frustumCulled = false;
  scene.add(beacons);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let vw = 0;
  let vh = 0;
  let raf = 0;
  let lastFrame = 0;
  let progress = 0; // smoothed scroll position, 0 at the top of the page and 1 at the bottom
  let pointerX = 0;
  let pointerY = 0;
  let quality = 1; // resolution multiplier, lowered if this device cannot keep up
  let still = false; // last resort: stop animating and redraw only when the page scrolls
  let previousTick = 0;
  let sampleTotal = 0;
  let sampleCount = 0;
  let scrollTimer = 0;
  const target = new Vector3();

  const scrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };

  const render = (t: number) => {
    const motion = !reduceMotion.matches;
    const seconds = motion ? t / 1000 : 0;
    progress += ((motion ? scrollProgress() : 0) - progress) * (motion ? 0.07 : 1);
    uniforms.uTime.value = seconds;

    // Scroll carries the camera across the waterfront, a little higher and closer in
    const drift = Math.sin(seconds * 0.07) * 2.5;
    camera.position.set(-36 + progress * 72 + drift + pointerX * 2.5, 9 + progress * 7 - pointerY * 1.2, 64 - progress * 30);
    target.set(camera.position.x * 0.3, 15 + progress * 3, -90);
    camera.lookAt(target);
    renderer.render(scene, camera);
  };

  const measure = (force: boolean) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Phone browsers resize the viewport while scrolling (address bar); ignore small height changes.
    if (!force && Math.abs(w - vw) < 1 && Math.abs(h - vh) < 140) return;
    vw = w;
    vh = h;
    const ratio = (vw < 700 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)) * quality;
    renderer.setPixelRatio(ratio);
    renderer.setSize(vw, vh, false);
    beaconMaterial.uniforms.uPixelRatio.value = ratio * (vh / 900);
    camera.aspect = vw / vh;
    // Narrow screens see a slice of the city, so widen the lens to keep the skyline in view
    camera.fov = camera.aspect < 1 ? 62 : 46;
    camera.updateProjectionMatrix();
    render(performance.now());
  };

  const tick = (t: number) => {
    raf = requestAnimationFrame(tick);

    // Watch how often the browser manages to call us. If it averages under about 14 frames
    // a second, first halve the resolution, and if that is not enough, hold a still frame.
    if (previousTick) {
      sampleTotal += t - previousTick;
      sampleCount++;
    }
    previousTick = t;
    if (sampleCount >= 45) {
      const average = sampleTotal / sampleCount;
      sampleTotal = 0;
      sampleCount = 0;
      if (average > 70) {
        if (quality > 0.5) {
          quality = 0.5;
          measure(true);
        } else {
          still = true;
          play();
          return;
        }
      }
    }

    const gap = vw < 700 ? 42 : 33; // about 24 fps on phones, 30 fps elsewhere
    if (t - lastFrame < gap) return;
    lastFrame = t;
    render(t);
  };

  const play = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    previousTick = 0; // a paused tab must not count as slow frames
    sampleTotal = 0;
    sampleCount = 0;
    if (reduceMotion.matches || document.hidden || still) {
      render(performance.now());
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  // In still mode the camera still follows the page, redrawn a few times a second at most
  const onScroll = () => {
    if (!still || scrollTimer || reduceMotion.matches) return;
    scrollTimer = window.setTimeout(() => {
      scrollTimer = 0;
      progress = scrollProgress();
      render(performance.now());
    }, 180);
  };

  const onResize = () => measure(false);
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    pointerY = (event.clientY / window.innerHeight) * 2 - 1;
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", play);
  reduceMotion.addEventListener("change", play);

  progress = reduceMotion.matches ? 0 : scrollProgress();
  measure(true);
  canvas.style.opacity = "1";
  play();

  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(scrollTimer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", play);
    reduceMotion.removeEventListener("change", play);
    box.dispose();
    waterGeometry.dispose();
    beaconGeometry.dispose();
    material.dispose();
    mirrorMaterial.dispose();
    waterMaterial.dispose();
    beaconMaterial.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
