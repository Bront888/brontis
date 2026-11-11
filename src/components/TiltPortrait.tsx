import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const MAX_TILT = 5; // degrees, in either direction

/**
 * Hero portrait that tilts slightly toward the mouse. It is a plain image with a
 * small CSS transform, so there is no WebGL. It stays still on touch screens and
 * when the visitor prefers reduced motion.
 */
export function TiltPortrait() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateX = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      x.set(nx * MAX_TILT);
      y.set(-ny * MAX_TILT);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <div style={{ perspective: 900 }}>
      <motion.img
        src="/projects/brontis-portrait.webp"
        alt="Portrait of Brontis in a dark suit and glasses"
        width={408}
        height={612}
        decoding="async"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="aspect-[408/500] w-full object-cover object-top will-change-transform"
      />
    </div>
  );
}
