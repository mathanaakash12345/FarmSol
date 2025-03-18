/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins', 'sans-serif'],
      },
      colors:{
        prim:'#e8a310',
        sec:'#41a6bb',
        gry:'#BCC4C9',
        dgry:'#105d5c',
        sor:'#fae28c',
        powder:'#d7d3a9',
        rup:'#c4e99f',
      },
      backgroundImage: {
        'farm-bg': "url('/src/Images/bg1.jpg')",
        'dash-bg' : "url('/src/Images/dash_bg.jpg')"
      },
    },
  },
  plugins: [],
}