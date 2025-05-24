/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    slideUpSlow: "slideUp 6s infinite",
    slideDownSlow: "slideDown 6s infinite",
  },
  keyframes: {
    slideUp: {
      "0%": { transform: "translateY(100%)", opacity: 0 },
      "50%": { transform: "translateY(0%)", opacity: 1 },
      "100%": { transform: "translateY(-100%)", opacity: 0 },
    },
    slideDown: {
      "0%": { transform: "translateY(-100%)", opacity: 0 },
      "50%": { transform: "translateY(0%)", opacity: 1 },
      "100%": { transform: "translateY(100%)", opacity: 0 },
    },
  },
},
  },
  plugins: [],
}
