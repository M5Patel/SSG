/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0d1117",
          surface: "#161b22",
          elevated: "#1c2333",
          border: "#30363d",
          gold: "#f0b429",
          "gold-dim": "#d4942a",
          accent: "#58a6ff",
        },
        text: {
          primary: "#f0f6fc",
          secondary: "#8b949e",
          muted: "#484f58",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        display: ["'Orbitron'", "sans-serif"],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
        "glow-gold": "0 0 20px rgba(240,180,41,0.15)",
        "modal": "0 16px 70px rgba(0,0,0,0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "border-pulse": "borderPulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        borderPulse: {
          "0%, 100%": { borderColor: "rgba(240,180,41,0.15)" },
          "50%": { borderColor: "rgba(240,180,41,0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};