import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#0F2D24", 600: "#143A2F", 500: "#1C4F40", 400: "#286855" },
        cream: { DEFAULT: "#FFFFFF", 50: "#FAFAFA", 200: "#F4F4F2" },
        gold: { DEFAULT: "#D49B38", 600: "#B27E24", 100: "#F6E7C8" },
        ink: "#111111",
        muted: "#6B7280",
        line: "#EAEAE7",
        sand: "#F6F6F4",
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.8rem, 6vw, 5.2rem)", { lineHeight: "1.02", letterSpacing: "-0.038em" }],
        "display-lg": ["clamp(2.1rem, 3.8vw, 3.4rem)", { lineHeight: "1.06", letterSpacing: "-0.032em" }],
        "display-md": ["clamp(1.65rem, 2.6vw, 2.3rem)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.3rem, 1.9vw, 1.7rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      maxWidth: { shell: "82rem", prose: "38rem" },
      boxShadow: {
        float: "0 20px 50px -18px rgba(17,17,17,0.18), 0 4px 16px -6px rgba(17,17,17,0.08)",
        card: "0 14px 36px -22px rgba(17,17,17,0.22)",
        soft: "0 1px 2px rgba(17,17,17,0.04), 0 8px 24px -16px rgba(17,17,17,0.12)",
      },
      transitionTimingFunction: { editorial: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": { from: { opacity: "0", transform: "scale(1.03)" }, to: { opacity: "1", transform: "none" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up": "fade-up 0.65s cubic-bezier(0.22,0.61,0.36,1) both",
        "fade-in": "fade-in 0.8s ease both",
        "scale-in": "scale-in 1.2s cubic-bezier(0.22,0.61,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
