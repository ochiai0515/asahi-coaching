import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Noto Sans JP",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
      },
      colors: {
        asahi: {
          50: "#fafaf8",
          100: "#f4f3ef",
          200: "#e8e6df",
          700: "#4a4a3e",
          800: "#2e2e24",
          900: "#1a1a12",
        },
        accent: "#8b6914",
      },
    },
  },
  plugins: [],
};

export default config;
