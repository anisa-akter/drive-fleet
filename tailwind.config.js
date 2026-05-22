/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        drivefleet: {
          "primary": "#121212",
          "primary-content": "#f7f3ee",
          "secondary": "#b48b4f",
          "accent": "#2f6f5e",
          "neutral": "#141313",
          "base-100": "#f7f3ee",
          "base-200": "#efe7dc",
          "base-300": "#e5dbce",
          "base-content": "#151313",
          "info": "#2a5d73",
          "success": "#2f6f5e",
          "warning": "#c08a3d",
          "error": "#9a2c2c",
        },
      },
      "luxury",
    ],
    darkTheme: "luxury",
  },
};
