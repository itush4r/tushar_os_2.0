import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#111111",
        border: "#1f1f1f",
        foreground: "#e8e8e8",
        muted: "#888888",
        subtle: "#555555",
        accent: "#7f77dd",
        success: "#5dcaa5",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "720px",
      },
    },
  },
  plugins: [],
};

export default config;
