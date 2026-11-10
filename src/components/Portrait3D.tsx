import { useEffect, useRef, useState } from "react";
import { hasWebGL } from "../lib/webgl";

const IMAGE = "/projects/brontis-portrait.webp";
const DEPTH = "/projects/brontis-portrait-depth.webp";

/**
 * Hero portrait. The plain photo is always rendered, so it works with no
 * JavaScript, no WebGL, or reduced motion. Where 3D is available, a canvas
 * takes over and the portrait turns as the page scrolls.
 */
export function Portrait3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasWebGL() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    import("../three/portraitScene")
      .then(({ mountPortrait }) => mountPortrait(canvas, IMAGE, DEPTH, () => !cancelled && setReady(true)))
      .then((cleanup) => {
        if (cancelled) cleanup();
        else dispose = cleanup;
      })
      .catch(() => {
        /* The plain photo stays in place. */
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="relative aspect-[408/500] w-full overflow-hidden">
      <img
        src={IMAGE}
        alt="Portrait of Brontis in a dark suit and glasses"
        width={408}
        height={612}
        className={`h-full w-full object-cover object-top transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
