import santoPreset from "@santo-ds/tokens/tailwind";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [santoPreset],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
    "../ui/src/**/*.{ts,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};
