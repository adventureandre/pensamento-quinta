/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#E5E0D8',
        secondary: '#B3B792',
        accent: '#E5D2B8',
        background: '#F5F8FA',
        border: '#E1E8ED',
        fundoBanner: "#566150"
      },
      fontFamily:{
        inter:['Inter','sans-serif'],
        rockSalt: ['Rock Salt', 'cursive']
      }
    },
  },
  plugins: [],
}