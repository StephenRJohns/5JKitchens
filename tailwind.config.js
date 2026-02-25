/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FEFCF7",
          100: "#FAF5E8",
          200: "#F5EDD4",
          300: "#EDE0BA",
          400: "#E0CFA0",
          500: "#D4BC86",
        },
        bark: {
          50: "#F7F0E8",
          100: "#EAD9C4",
          200: "#D4B896",
          300: "#B8916A",
          400: "#9C6E44",
          500: "#7A5230",
          600: "#5C3B1E",
          700: "#3E2510",
          800: "#2C1A0A",
          900: "#1A0E04",
        },
        sage: {
          100: "#E8EDE0",
          200: "#C8D4B4",
          300: "#A8BB88",
          400: "#88A25C",
          500: "#6B8940",
          600: "#4E6630",
        },
        rust: {
          100: "#F5E0D4",
          200: "#E8B8A0",
          300: "#D4906C",
          400: "#C0683A",
          500: "#A04020",
          600: "#7A2E10",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Lato", "Inter", "system-ui", "sans-serif"],
        script: ["Dancing Script", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "parchment": "linear-gradient(135deg, #FAF5E8 0%, #F0E8D0 50%, #FAF5E8 100%)",
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
