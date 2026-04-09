/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0f172a",
          card: "rgba(255, 255, 255, 0.06)",
          hover: "rgba(255, 255, 255, 0.10)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        accent: {
          teal: "#2dd4bf",
          indigo: "#818cf8",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        space: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-pulse": "borderPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        borderPulse: {
          "0%, 100%": { borderColor: "rgba(45, 212, 191, 0.3)" },
          "50%": { borderColor: "rgba(45, 212, 191, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
