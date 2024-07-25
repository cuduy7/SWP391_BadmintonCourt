/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue-cus": "#28A745",
        "linear-blue-cus-1": "#2962BC",
        "linear-blue-cus-2": "#5889d6",
        "secondary-blue-cus": "#70C1B3",
        "search-cus": "#f5f4f2",
        "white-cus": "#e5e3dd",
        "gray-cus": "#D6D6D6",
        "gray-cus-2": "#333F51",
        "orange-cus": "#F84C35",
        "form-cus": "#FFD89C",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "auto-auto": "auto auto",
      },
      gridTemplateRows: {
        cus: "64px",
      },
      fontSize: {
        xxs: "0.5rem",
      },
      lineHeight: {
        xxs: "0.75rem",
      },
      fontFamily: {
        inter: ["Inter-Medium", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
