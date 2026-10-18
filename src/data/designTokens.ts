/**
 * Mirrors the tokens declared in `src/index.css` (@theme).
 * Keep the two in sync when changing the palette or type.
 */
export const designTokens = {
  colors: {
    ink: "#0f1b2d",
    inkRaised: "#17263b",
    onInk: "#eef2f7",
    mutedInk: "#b9c4d3",
    line: "rgba(255, 255, 255, 0.15)",
    lineStrong: "rgba(255, 255, 255, 0.4)",
    paper: "#f4f6f8",
    surface: "#ffffff",
    accent: "#1d4ed8",
    accentInk: "#9db8ff",
  },
  glass: {
    fill: "rgba(12, 22, 38, 0.58)",
    border: "rgba(255, 255, 255, 0.15)",
    blur: "24px",
    backdropTint: "rgba(15, 27, 45, 0.5)",
  },
  typography: {
    display: "Newsreader",
    text: "Hanken Grotesk",
  },
  motion: {
    entranceDuration: 0.7,
    easing: [0.22, 1, 0.36, 1] as const,
  },
} as const;
