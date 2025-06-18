/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
      colors: {
        offWhite: '#f8f8f8',
        indigoCustom: "#4A148C",
        africanViolet: "#AA78A6",
        papayaWhip: "#FFEFD3",
        celestialBlue: "#058ED9",
        blackCustom: "#080708",
      },
    },
  },
  plugins: [],
}

