/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chenla: ["Chenla", "sans-serif"],
        cormorant: ["Cormorant Upright", "serif"],
        crimson: ["Crimson Pro", "serif"],
        dmsans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

