/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
        primary: '#022152',
        secondary: '#fcfcfc',
        tertiary: '#FFC107',
        delete: '#ed0707',
        add: '#41cca7'
        
    },
    fontFamily: {
      major: ["Montserrat", "sans-serif"],
      minor: ["Oxygen", "sans-serif"],
    }
  },
  plugins: [],
};

