import keepPreset from "keep-react/preset";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#edc64e",
          500: "#eab308",
          800: "rgb(201 154 7)",
          DEFAULT: "#eab308",
        },
      },
      keyframes: {
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0%)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
  presets: [keepPreset],
};
