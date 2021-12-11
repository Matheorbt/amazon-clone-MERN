module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    fontFamily: {
      body: ["PT Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "main-orange": "#D87310",
        "secondary-orange": "#F3A847",
        "main-blue": "#232F3F",
        "secondary-blue": "#131921",
        "tercary-blue": "#485769",
        black: "#000000",
        white: "#FFFFFF",
        warning: "#DE3F44",
        success: "#1BA345",
      },
      width: {
        "fit-content": "fit-content",
      },
      height: {
        "fit-content": "fit-content",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
