export const themeTokens = {
  colors: {
    primary: {
      light: "#4f46e5", // indigo-500
      dark: "#818cf8", // indigo-400
      foreground: "#6058e7",
    },
    secondary: {
      base: "#94a3b8", // slate-400
      soft: {
        light: "#f3f4f6", // gray-100
        dark: "#1e293b", // slate-800
      },
      foreground: {
        light: "#1f2937", // gray-800
        dark: "#f1f5f9", // slate-200
      },
    },
    success: {
      light: "#047857",
      dark: "#34d399",
      content: { light: "#065f46", dark: "#a7f3d0" },
    },
    info: {
      light: "#0ea5e9",
      dark: "#38bdf8",
      content: { light: "#0369a1", dark: "#bae6fd" },
    },
    warn: {
      light: "#b45309",
      dark: "#fbbf24",
      content: { light: "#92400e", dark: "#fde68a" },
    },
    danger: {
      light: "#be123c",
      dark: "#fb7185",
      content: { light: "#9f1239", dark: "#fecdd3" },
    },
    background: {
      primary: {
        light: "#ffffff",
        dark: "#0f172a",
      },
      secondary: {
        light: "#f8fafc",
        dark: "#1e293b",
      },
      tertiary: {
        light: "#f1f5f9",
        dark: "#334155",
      },
    },
    foreground: {
      primary: {
        light: "#0f172a",
        dark: "#f1f5f9",
      },
      secondary: {
        light: "#475569",
        dark: "#94a3b8",
      },
      muted: {
        light: "#94a3b8",
        dark: "#64748b",
      },
    },
    border: {
      base: {
        light: "#e2e8f0",
        dark: "#334155",
      },
      hover: {
        light: "#cbd5e1",
        dark: "#475569",
      },
    },
    contrast: {
      light: "#171717",
      dark: "#ffffff",
    },
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
