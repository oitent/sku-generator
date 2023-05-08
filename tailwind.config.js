const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{jpg,png,svg,webp}",
  ],
  plugins: [
    require("flowbite/plugin"),
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
        info: colors.teal,
        secondary: colors.amber,
        mermaid: { "50": "#B50000", "100": "#8A0000", "200": "#d10000", "300": "#d10000", "400": "#d10000", "500": "#F10101" }
      },
      dropShadow: {
        "special": [
          "0 2.8px 2.2px rgba(0, 0, 0, 0.034)",
          "0 6.7px 5.3px rgba(0, 0, 0, 0.048)",
          "0 12.5px 10px rgba(0, 0, 0, 0.06)",
          "0 22.3px 17.9px rgba(0, 0, 0, 0.072)",
          "0 41.8px 33.4px rgba(0, 0, 0, 0.086)",
          "0 100px 80px rgba(0, 0, 0, 0.12)"
        ]
      },
      fontSize: {
        xxxs: "0.4rem",
        xxs: "0.6rem",
        xs: "0.8rem",
        s: "0.9rem",
        x: "1rem",
        xxl: "2rem",
        xxxl: "3rem",
        xxxxl: "5rem"
      },
      lineHeight: {
        shortest: ".6rem",
        shorter: ".8rem",
        normal: "1rem",
        xxxs: "1rem",
        short: "1.2rem",
        tall: "1.4rem",
        taller: "1.5rem",
        tallest: "2rem",
        xxs: "2.8rem",
        xs: "3.9rem",
        x: "4.5rem",
        xl: "6rem",
        xxl: "8rem",
        xxxl: "10rem",
        nil: "0rem",
        none: "1",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.03em",
        normal: "0",
        wide: ".03em",
        wider: ".05em",
        widest: ".09em",
        wild: ".25em",
      },
    },
    fontFamily: {
      "body": [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ],
      "sans": [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ]
    }

  }
}
