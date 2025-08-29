/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    cssEngine: "postcss", // 👈 this disables LightningCSS
  },
}
