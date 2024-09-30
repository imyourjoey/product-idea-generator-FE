/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mulah-red": "#ff0000",
        "primary-black": "#1f1f1f",
        "secondary-black": "#454545",
        "secondary-grey": "#89939e",
        // below are the colors for the icons
        "icon-grey": "#717171",
        "icon-black": "#1f1f1f",
        "icon-red-active": "#ff002e",
        // below are the colors for the membership cards
        "member-gold": "#D3AE0F",
      },
    },
  },

  plugins: [],
};
