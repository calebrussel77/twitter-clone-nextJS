const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ["./pages/**/*.js", "./components/**/*.jsx"],
  theme: {
    screens: {
      sm: "640px",
      md: "520px",
      mdl: "760px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1380px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",

        black: "#000",
        white: "#fff",

        primary: {
          700: "#15202B",
        },
        secondary: {
          200: "#1F253B",
          700: "#865DCA",
        },
      },
      fontFamily: {
        sans: ["poppins", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        21: "5.25rem",
        84: "21rem",
        91: "22.75rem",
      },
      maxHeight: (theme, { breakpoints }) => ({
        none: "none",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        full: "100%",
        ...breakpoints(theme("screens")),
      }),
    },
    typography: (theme) => ({
      default: {
        css: {
          image: {
            width: "100%",
          },
          color: theme("colors.gray.800"),
          a: {
            color: theme("colors.secondary.700"),
            "&:hover": {
              color: theme("colors.secondary.200"),
            },
          },
        },
      },
    }),
  },
  variants: {
    display: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "focus-within",
      "odd",
    ],
    backgroundOpacity: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
    ],
    visibility: ["responsive", "hover", "focus", "group-hover"],
    borderWidth: ["responsive", "odd", "hover", "focus", "odd"],
    borderRadius: ["responsive", "hover", "focus"],
    fontFamily: ["responsive", "hover", "focus"],
    padding: ["responsive", "hover", "focus", "group-hover"],
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
    textColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "focus-within",
      "odd",
    ],
    translate: ["responsive", "hover", "focus", "active", "group-hover"],
  },
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/typography")],
};
