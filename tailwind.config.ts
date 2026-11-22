import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#173F35", 600: "#1D4A3E", 500: "#245647", 400: "#2F6957" },
        cream: { DEFAULT: "#F7F4EC", 50: "#FBFAF5", 200: "#EFEBDD" },
        gold: { DEFAULT: "#C99A45", 600: "#A97F33", 100: "#F1E4CB" },
        ink: "#282D2A",
        muted: "#73776F",
        line: "#E5E3DA",
        sand: "#FAF8F2",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.9rem, 6.2vw, 5.6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.3rem, 4.2vw, 3.9rem)", { lineHeight: "1.02", letterSpacing: "-0.018em" }],
        "display-md": ["clamp(1.8rem, 2.8vw, 2.6rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.4rem, 2vw, 1.85rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      maxWidth: { shell: "84rem", prose: "38rem" },
      boxShadow: {
        float: "0 24px 60px -24px rgba(23,63,53,0.35)",
        card: "0 18px 40px -30px rgba(23,63,53,0.6)",
        soft: "0 1px 2px rgba(40,45,42,0.04), 0 8px 24px -18px rgba(40,45,42,0.35)",
      },
      transitionTimingFunction: { editorial: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": { from: { opacity: "0", transform: "scale(1.04)" }, to: { opacity: "1", transform: "none" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,0.61,0.36,1) both",
        "fade-in": "fade-in 1.2s ease both",
        "scale-in": "scale-in 1.6s cubic-bezier(0.22,0.61,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
