const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        green: colors.green,
        red: colors.red,
        orange: colors.orange,
      },
    },
  },
  plugins: [],
};
