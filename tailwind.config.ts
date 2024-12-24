import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // This allows dark mode to be controlled via classes only
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)'], // This sets Noto Sans as the default sans-serif font
        noto: ['var(--font-noto-sans)'], // This creates a specific class for Noto Sans
      },
      colors: {
        button_color: "rgb(233, 93, 83)",
        button_color_onHover: "rgb(233, 93, 83,0.9)",
        theme_color: "rgb(26, 132, 124)",
        theme_color_onHover: "rgb(26, 132, 124,0.9)",
      },
    },
  },
  plugins: [],
} satisfies Config;