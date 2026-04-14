/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // Override the default Tailwind border radii to enforce strictly sharp corners
    // 'full' is kept exclusively for perfect circles (like avatars or icons)
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '9999px', 
    },
    extend: {
      colors: {
        surface: {
          DEFAULT: "#020202", // Deep space pure dark
          card: "#050505",    // Slight elevation for glassmorphism
          hover: "rgba(255, 255, 255, 0.03)", // Ultra-subtle highlight
          border: "rgba(255, 255, 255, 0.06)", // Crisp, faint lines
          glow: "rgba(255, 255, 255, 0.12)",
        },
        cyber: {
          cyan: "#00e5ff",    // High-tech scanning UI accent
          purple: "#7c3aed",  // Deep neon contrast
          alert: "#ff003c",   // Cyberpunk red for critical UI/errors
          matrix: "#00ff41",  // Success/Terminal green
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        // Poppins is naturally a very round/soft font, consider using Inter for all body text 
        // to maintain the sharp aesthetic.
        poppins: ["Poppins", "sans-serif"], 
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glass-edge': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        "scan": "scan 2s linear infinite",
        "float": "float 6s cubic-bezier(0.16, 1, 0.3, 1) infinite", // Smoother ease curve
        "border-pulse": "borderPulse 4s ease-in-out infinite",
        "glow-fade": "glowFade 3s infinite alternate",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(600px)" }, 
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        borderPulse: {
          "0%, 100%": { borderColor: "rgba(0, 229, 255, 0.1)" },
          "50%": { borderColor: "rgba(0, 229, 255, 0.5)" },
        },
        glowFade: {
          "0%": { opacity: "0.4", filter: "brightness(1)" },
          "100%": { opacity: "1", filter: "brightness(1.5)" },
        }
      },
    },
  },
  plugins: [],
};