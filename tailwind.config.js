/** @type {import( 'tailwindcss').Config}*/

import { transform } from "typescript";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        sage: {
          50: "#FAFAF8", // Primary background
          100: "#F5F5F2", // Secondary background
          200: "#FCFCFB", // Raised surface
          300: "#F0F0ED", // Sunken surface
        },

        // Text Colors
        carbon: {
          900: "#2D3436", // Primary text
          700: "#636E72", // Secondary text
          600: "#808B8F",
          500: "#B2BEC3", // Tertiary text
          300: "#DFE6E9", // Disabled text
        },

        // Sage Green Accent
        "sage-green": {
          50: "#F1F7F4",
          100: "#E3EFE9",
          200: "#C7DFD3",
          300: "#A8C5B4", // Main accent ⭐
          400: "#8FB09D",
          500: "#769B86",
          600: "#5D8770",
        },

        // Border Colors
        "sage-border": {
          subtle: "#E8EDEB",
          medium: "#DDE4E2",
          focus: "#A8C5B4",
        },
      },

      // Typography
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        // Display font
        display: ["Inter", "system-ui", "sans-serif"],
      },

      // Font Size
      fontSize: {
        "display-xl": [
          "8rem",
          { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "display-lg": [
          "6rem",
          { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "display-md": [
          "4.5rem",
          { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-sm": [
          "3.5rem",
          { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        hero: [
          "5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
      },

      // Spacing
      spacing: {
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
        34: "8.5rem", // 136px
      },

      // Border radius
      borderRadius: {
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
      },

      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
      },

      // Animations
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 197, 180, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(168, 197, 180, 0.5)" },
        },
      },
    },
  },

  plugins: [],
};
