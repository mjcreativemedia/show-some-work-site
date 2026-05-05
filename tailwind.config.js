/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#111827",
        paper: "#f7f3ea",
        clay: "#b75f3a",
        moss: "#4d6b53",
        tide: "#2b6870",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(17, 24, 39, 0.12)",
      },
    },
  },
  plugins: [],
};
