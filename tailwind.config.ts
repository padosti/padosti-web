import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marigold: "#E87722",
        teal: "#0B6E6E",
        cream: "#FFF8EE",
        charcoal: "#1F2937",
      },
    },
  },
  plugins: [],
};
export default config;