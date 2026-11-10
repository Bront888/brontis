let cached: boolean | undefined;

/** True when this browser can create a WebGL context. Checked once, before any 3D code is downloaded. */
export function hasWebGL(): boolean {
  if (cached === undefined) {
    try {
      const canvas = document.createElement("canvas");
      cached = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      cached = false;
    }
  }
  return cached;
}
