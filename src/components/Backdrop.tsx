import { useEffect, useRef } from "react";

/**
 * Night-skyline backdrop. The still image (public/backdrop-lagos.webp) is always
 * in place as a CSS background, so the page looks right before the canvas starts
 * or if it never does. The canvas then adds, on top of that same image:
 *   - water that ripples (horizontal strips of the reflection, each offset by a wave)
 *   - a slow sideways drift of the whole scene
 *   - a few windows that pulse and tower beacons that blink
 * It stays still when the visitor prefers reduced motion, and pauses in hidden tabs.
 */

type Scene = {
  horizon: number;
  /** x, y, width, height (image pixels) and colour index */
  windows: [number, number, number, number, number][];
  beacons: [number, number][];
};

const IMAGE_URL = "/backdrop-lagos.webp";
const SCENE_URL = "/backdrop-scene.json";
const WINDOW_COLORS = ["255,212,150", "255,232,190", "225,238,255", "150,195,255"];
const STRIP = 6; // image pixels per water strip

export function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let img: HTMLImageElement | null = null;
    let scene: Scene | null = null;
    let phases: number[] = [];
    let raf = 0;
    let lastFrame = 0;
    let cancelled = false;
    let vw = 0;
    let vh = 0;
    let dpr = 1;

    const draw = (t: number) => {
      if (!img || !scene) return;
      const motion = !reduceMotion.matches;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const s = Math.max(vw / iw, vh / ih) * 1.07 * dpr; // device pixels per image pixel
      const drawW = iw * s;
      const drawH = ih * s;
      const dx = (canvas.width - drawW) / 2 + (motion ? Math.sin(t / 38000) * vw * 0.02 * dpr : 0);
      const dy = (canvas.height - drawH) / 2;
      const hz = scene.horizon;

      // Sky and skyline
      ctx.drawImage(img, 0, 0, iw, hz, dx, dy, drawW, hz * s);

      // Water: every strip slides sideways on a wave, more the further from the horizon
      for (let y = hz; y < ih; y += STRIP) {
        const h = Math.min(STRIP, ih - y);
        const depth = (y - hz) / (ih - hz);
        const shift = motion
          ? (Math.sin(y * 0.045 + t / 900) + Math.sin(y * 0.021 - t / 1500) * 0.8) * (0.8 + depth * 5) * dpr
          : 0;
        ctx.drawImage(img, 0, y, iw, h, dx + shift, dy + y * s, drawW, h * s + 1);
      }

      if (!motion) return;

      // Pulsing windows and blinking beacons, added on top of the image
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < scene.windows.length; i++) {
        const [x, y, w, h, c] = scene.windows[i];
        const pulse = 0.5 + 0.5 * Math.sin(t / (700 + (i % 7) * 260) + phases[i]);
        const alpha = pulse * pulse * 0.85;
        if (alpha < 0.08) continue;
        ctx.fillStyle = `rgba(${WINDOW_COLORS[c]},${alpha.toFixed(2)})`;
        ctx.fillRect(dx + x * s, dy + y * s, w * s, h * s);
      }
      for (let i = 0; i < scene.beacons.length; i++) {
        if (Math.sin(t / 650 + i * 1.7) < 0.15) continue;
        const [x, y] = scene.beacons[i];
        ctx.fillStyle = "rgba(255,70,60,0.22)";
        ctx.beginPath();
        ctx.arc(dx + x * s, dy + y * s, 10 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,110,95,0.95)";
        ctx.beginPath();
        ctx.arc(dx + x * s, dy + y * s, 4 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const measure = (force: boolean) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Phone browsers resize the viewport while scrolling (address bar); ignore small height changes.
      if (!force && Math.abs(w - vw) < 1 && Math.abs(h - vh) < 140) return;
      vw = w;
      vh = h;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      draw(performance.now());
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const gap = vw < 700 ? 50 : 33; // about 20 fps on phones, 30 fps elsewhere
      if (t - lastFrame < gap) return;
      lastFrame = t;
      draw(t);
    };

    const play = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduceMotion.matches || document.hidden) {
        draw(performance.now());
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => measure(false);

    const image = new Image();
    image.decoding = "async";
    image.src = IMAGE_URL;
    Promise.all([image.decode(), fetch(SCENE_URL).then((r) => r.json() as Promise<Scene>)])
      .then(([, data]) => {
        if (cancelled) return;
        img = image;
        scene = data;
        phases = data.windows.map(() => Math.random() * Math.PI * 2);
        measure(true);
        canvas.style.opacity = "1";
        play();
      })
      .catch(() => {
        /* The still CSS background stays in place. */
      });

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", play);
    reduceMotion.addEventListener("change", play);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", play);
      reduceMotion.removeEventListener("change", play);
    };
  }, []);

  return (
    <div aria-hidden="true" className="backdrop">
      <canvas ref={canvasRef} />
    </div>
  );
}
