/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "white-20":"#fff",
        "gray-50":"#E5E5E5",
        "gray-100":"#212121",
        "blue-20" :"#4C70EF",
      },
      fontWeight:{
        "bold-20":"400",
        "bold-50":"600",
        "bold-100":"700",
      },
      fontSize:{
        "font-20":"18px",
        "font-40":"24px",
        "font-60":"36px",
        "font-100":"64px"
      },
      letterSpacing:{
        "ls-1":"0.1em",
      },
      fontFamily:{
        "Poppins":["Poppins","Times New Roman",]
      },
    },
  },
  plugins: [],
}