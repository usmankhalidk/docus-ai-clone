import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
