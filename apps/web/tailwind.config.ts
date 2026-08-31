import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#005EB8",
          dark: "#003E8C",
          bright: "#41B6E6",
          soft: "#E8F0FA",
        },
        mist: "#F2F7FC",
        ink: "#1C2B3A",
        muted: "#5B6B7B",
        sage: "#7A9E7E",
        teal: "#3C9D9B",
        rose: "#E8B4B8",
      },
      borderRadius: {
        neu: "1.25rem",
      },
      boxShadow: {
        neu: "10px 10px 24px rgba(0, 60, 120, 0.12), -10px -10px 24px rgba(255, 255, 255, 1)",
        "neu-sm":
          "5px 5px 12px rgba(0, 60, 120, 0.10), -5px -5px 12px rgba(255, 255, 255, 1)",
        "neu-inset":
          "inset 6px 6px 14px rgba(0, 60, 120, 0.10), inset -6px -6px 14px rgba(255, 255, 255, 0.9)",
        lift:
          "0 20px 40px -18px rgba(0, 60, 120, 0.30)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto)", "system-ui", "sans-serif"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(0.82)", opacity: "0.7" },
          "50%": { transform: "scale(1.12)", opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        breathe: "breathe 9s ease-in-out infinite",
        "fade-up": "fadeUp .6s ease-out both",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;