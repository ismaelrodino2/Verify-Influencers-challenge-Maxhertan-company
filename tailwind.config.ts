import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#64B6AC",
        },
        navy: {
          DEFAULT: "#0F1729",
          light: "#1E293B",
        },
        success: {
          DEFAULT: "#22C55E",
        },
        warning: {
          DEFAULT: "#EAB308",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
