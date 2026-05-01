import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic system tokens (HSL via CSS vars) ────────────────
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          surface: "hsl(var(--primary-on-surface))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // ── Solaris brand scale (Sun-Orange #f47603) ────────────────
        solaris: {
          50:  "#fff4ec",
          100: "#ffe6d4",
          200: "#ffcfad",
          300: "#ffb47f",
          400: "#fd9245",
          500: "#f47603",
          600: "#c4600d",
          700: "#a05010",
          800: "#743c11",
          900: "#42240f",
        },

        // ── Navy scale (#02152a) — Headings & dark surfaces ─────────
        navy: {
          50:  "#e8eaec",
          100: "#cdcfd5",
          200: "#9fa4ae",
          300: "#6d7482",
          400: "#313c4f",
          500: "#02152a",
          600: "#041224",
          700: "#05101f",
          800: "#040c19",
          900: "#020711",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 12px)",
      },
      boxShadow: {
        "brand-sm": "0 1px 2px 0 rgba(2, 21, 42, 0.05)",
        "brand-md": "0 4px 12px -2px rgba(2, 21, 42, 0.10)",
        "brand-lg": "0 12px 32px -8px rgba(2, 21, 42, 0.16)",
        "brand-orange": "0 8px 24px -6px rgba(244, 118, 3, 0.32)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(244, 118, 3, 0.5)" },
          "50%": { boxShadow: "0 0 0 12px rgba(244, 118, 3, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
