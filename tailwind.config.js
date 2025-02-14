export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E5E0D8",
        secondary: "#B3B792",
        accent: "#E5D2B8",
        background: "#F5F8FA",
        border: "#E1E8ED",
        fundoBanner: "#566150",
        input: "#D9D9D9",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        rockSalt: ["Rock Salt", "cursive"],
        playfair: ["Playfair Display", "serif"],
        podkova: ['Podkova', 'serif'],
      },
      keyframes: {
        "tracking-in-contract-bck": {
          "0%": {
            "letter-spacing": "1em",
            transform: "translateZ(400px)",
            opacity: "0",
          },
          "40%": {
            opacity: "0.6",
          },
          "100%": {
            transform: "translateZ(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "tracking-in-contract-bck": "tracking-in-contract-bck 1.2s ease-in-out both",
      },
    },
  },
  plugins: [],
};
