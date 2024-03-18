
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#C2161E',
        'secondary' : '#FFEBE8',  
        'whitecolor' : '#FFFFFF'   
      },
    },
  },
  plugins: [],
}

