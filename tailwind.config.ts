import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "380px",
      md: "762px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1500px",
    },
    extend: {
      fontFamily: {
        sans: [
          "roboto"
        ]
      }
    },
  },
  plugins: [],
  };
export default config;
