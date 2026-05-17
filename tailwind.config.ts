import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        graphite: "#263241",
        steel: "#5b6877",
        line: "#d9e1ea",
        frost: "#f5f7fa",
        signal: "#0e6eb8",
        copper: "#b7791f"
      },
      boxShadow: {
        industrial: "0 22px 70px rgba(23, 32, 51, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
