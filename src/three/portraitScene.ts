import {
  Group,
  LinearFilter,
  LinearSRGBColorSpace,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from "three";

/**
 * The portrait as a relief: a finely divided plane whose vertices are pushed
 * toward the viewer by a depth map (nose and face forward, ears and shoulders
 * back). Rotating that mesh gives real parallax, so the photo turns like a bust
 * instead of a flat card. The turn is tied to where the portrait sits in the
 * viewport, so it rotates as the page scrolls.
 */

const IMAGE_ASPECT = 612 / 408; // height / width of the source photo
const MAX_TURN = 0.75; // radians either side (about 43 degrees)
const DEPTH = 0.2; // how far the nearest point stands out, in plane widths
const PIVOT = 0.09; // rotate around the middle of the head, not the back of the plane

const vertexShader = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uDepthScale;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vec2 e = vec2(1.0 / 136.0, 1.0 / 204.0);
    float dx = texture2D(uDepth, uv + vec2(e.x, 0.0)).r - texture2D(uDepth, uv - vec2(e.x, 0.0)).r;
    float dy = texture2D(uDepth, uv + vec2(0.0, e.y)).r - texture2D(uDepth, uv - vec2(0.0, e.y)).r;
    vNormal = normalMatrix * normalize(vec3(-dx * 6.0, -dy * 6.0, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, d * uDepthScale, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec4 c = texture2D(uMap, vUv);
    if (c.a < 0.02) discard;
    // Light fixed in front of the viewer: as the bust turns, the far cheek falls off slightly
    float lit = max(dot(normalize(vNormal), normalize(vec3(0.25, 0.2, 1.0))), 0.0);
    gl_FragColor = vec4(c.rgb * (0.7 + 0.36 * lit), c.a);
  }
`;

function loadTexture(loader: TextureLoader, url: string): Promise<Texture> {
  return new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject));
}

export async function mountPortrait(
  canvas: HTMLCanvasElement,
  imageUrl: string,
  depthUrl: string,
  onReady: () => void,
): Promise<() => void> {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.outputColorSpace = LinearSRGBColorSpace; // textures are passed through untouched
  renderer.setClearColor(0x000000, 0);

  const loader = new TextureLoader();
  const [map, depth] = await Promise.all([loadTexture(loader, imageUrl), loadTexture(loader, depthUrl)]);
  map.minFilter = LinearFilter;
  map.generateMipmaps = false;
  depth.minFilter = LinearFilter;
  depth.generateMipmaps = false;

  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, 0.1, 20);
  const geometry = new PlaneGeometry(1, IMAGE_ASPECT, 136, 204);
  const material = new ShaderMaterial({
    uniforms: { uMap: { value: map }, uDepth: { value: depth }, uDepthScale: { value: DEPTH } },
    vertexShader,
    fragmentShader,
    transparent: true,
  });
  const mesh = new Mesh(geometry, material);
  mesh.position.z = -PIVOT;
  const bust = new Group();
  bust.add(mesh);
  scene.add(bust);

  let width = 0;
  let height = 0;
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h || (w === width && h === height)) return;
    width = w;
    height = h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Fit the photo's width to the frame and pin its top edge to the top of the frame
    const visibleHeight = 1 / camera.aspect;
    camera.position.z = visibleHeight / (2 * Math.tan((camera.fov * Math.PI) / 360));
    bust.position.y = visibleHeight / 2 - IMAGE_ASPECT / 2;
    camera.updateProjectionMatrix();
  };

  let pointerX = 0;
  let pointerY = 0;
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    pointerY = (event.clientY / window.innerHeight) * 2 - 1;
  };

  /** -1 as the portrait enters at the bottom of the screen, +1 as it leaves at the top. */
  const scrollTurn = () => {
    const rect = canvas.getBoundingClientRect();
    const t = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    return Math.min(1, Math.max(0, t)) * 2 - 1;
  };

  let raf = 0;
  let visible = true;
  let angle = scrollTurn() * MAX_TURN;
  let tilt = 0;

  const frame = (t: number) => {
    raf = requestAnimationFrame(frame);
    resize();
    const target = scrollTurn() * MAX_TURN + pointerX * 0.1 + Math.sin(t / 1700) * 0.035;
    angle += (target - angle) * 0.1;
    tilt += (pointerY * 0.06 - tilt) * 0.1;
    bust.rotation.set(tilt, angle, 0);
    renderer.render(scene, camera);
  };

  const play = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      play();
    },
    { rootMargin: "120px" },
  );
  observer.observe(canvas);
  document.addEventListener("visibilitychange", play);
  window.addEventListener("pointermove", onPointer, { passive: true });

  resize();
  bust.rotation.y = angle;
  renderer.render(scene, camera);
  onReady();
  play();

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    document.removeEventListener("visibilitychange", play);
    window.removeEventListener("pointermove", onPointer);
    geometry.dispose();
    material.dispose();
    map.dispose();
    depth.dispose();
    renderer.dispose();
  };
}
