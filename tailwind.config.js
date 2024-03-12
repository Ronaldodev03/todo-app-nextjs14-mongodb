/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "ligth-bg-desk": "url('./assets/bg-desktop-light.jpg')",
        "ligth-bg-mobile": "url('./assets/bg-mobile-light.jpg')",
        "dark-bg-desk": "url('./assets/bg-desktop-dark.jpg')",
        "dark-bg-mobile": "url('./assets/bg-mobile-dark.jpg')",
      },
    },
  },
  plugins: [],
};
