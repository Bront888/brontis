import { useEffect, useRef } from "react";
import { hasWebGL } from "../lib/webgl";

/**
 * Page backdrop. A still skyline image is always in place as the CSS background
 * (see `.backdrop` in index.css). Where WebGL is available, a 3D city scene
 * loads on top of it and the camera travels through it as the page scrolls.
 * The 3D code is loaded separately so it never delays the first paint.
 */
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !hasWebGL()) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    import("../three/cityScene")
      .then(({ mountCity }) => {
        if (!cancelled) dispose = mountCity(container);
      })
      .catch(() => {
        /* The still CSS background stays in place. */
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="backdrop" />;
}
