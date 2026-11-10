import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D71920",
          yellow: "#F7C928",
          navy: "#142B59",
          saf: "#D9480F",
          saf2: "#FF7A1A",
          gold: "#C98A0B",
          tint: "#FFF3E6",
          dark: "#1d0e06",
          muted: "#6b513f",
          border: "#f0dcc8",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mr: ["var(--font-noto-devanagari)", "system-ui", "sans-serif"],
      },
      keyframes: {
        sway: {
          "0%": { transform: "skewY(-2deg)" },
          "100%": { transform: "skewY(2deg)" },
        },
      },
      animation: {
        sway: "sway 3.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;

