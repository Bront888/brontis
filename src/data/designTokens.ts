export const designTokens = {
  colors: {
    background: "#07090d",
    surface: "#0b0f16",
    elevated: "#101621",
    primary: "#f7f9fc",
    secondary: "#a9b2c1",
    muted: "#697386",
    blue: "#0b63f6",
    cyan: "#22c7f2",
  },
  typography: {
    family: "Manrope",
    displayWeight: 700,
    bodyWeight: 400,
  },
  motion: {
    standardDuration: 0.5,
    entranceDuration: 0.7,
    easing: [0.22, 1, 0.36, 1] as const,
  },
} as const;
