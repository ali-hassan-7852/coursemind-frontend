/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F4EF",
        card: "#FBFBF8",
        ink: "#232B38",
        inksoft: "#5C6570",
        pine: "#2F6E52",
        pinedark: "#24553F",
        highlight: "#F6C744",
        highlightsoft: "#FBE7A8",
        danger: "#B33F3F",
        rule: "#DCD8CC",
      },
      fontFamily: {
        display: ["Bitter", "serif"],
        body: ["Karla", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
