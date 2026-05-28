/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "3px",
        lg: "3px",
        md: "3px",
        sm: "2px",
      },
      colors: {
        bg: "#080b16",
        card: "#0f1422",
        emerald: {
          DEFAULT: "#0dbe82",
          50: "rgba(13, 190, 130, 0.05)",
          15: "rgba(13, 190, 130, 0.15)",
          20: "rgba(13, 190, 130, 0.2)",
          30: "rgba(13, 190, 130, 0.3)",
        },
        cyan: {
          DEFAULT: "#18b4d4",
          15: "rgba(24, 180, 212, 0.15)",
          20: "rgba(24, 180, 212, 0.2)",
          30: "rgba(24, 180, 212, 0.3)",
        },
        rust: {
          DEFAULT: "#e8703a",
          15: "rgba(232, 112, 58, 0.15)",
          20: "rgba(232, 112, 58, 0.2)",
          30: "rgba(232, 112, 58, 0.3)",
        },
        lime: "#70a848",
        amber: "#D4A853",
        txt: "#e4e4e7",
        muted: "#71717a",
        dim: "#3f3f46",
        background: "#080b16",
        foreground: "#e4e4e7",
        border: "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.18em",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
