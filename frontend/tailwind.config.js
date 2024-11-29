/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkColor: "#0B2C24",
        primaryColor: "#247A4D",
        secColor: "#8CD29D",
        lightColor: "#BCFFC2",
        compLightColor: "#E4E0C8",
      },
    },
    fontFamily: {
      Gilroy: ['"Gilroy"', "sans-serif"],
    },
  },
  plugins: [],
};

