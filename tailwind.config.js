/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkMode: {
          1: '#252C37', //background
          2: '#04293A', //divis bars
          3: '#064663', //select bars
          4: '#ECB365', //text
        },
      },
    },
  },
  plugins: [],
};
