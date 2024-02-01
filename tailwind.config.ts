import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: "#f3f4f6",
        dark: "#111827",
        primary: "#8b5cf6",
        "primary-dark": "#7c3aed",
        "primary-darker": "#6d28d9",
        "primary-light": "#c4b5fd",
        danger: "#ef4444",
        "danger-dark": "#dc2626",
        "danger-darker": "#b91c1c",
        "danger-light": "#fca5a5",
      },
    },
  },
  plugins: [],
};
export default config;
