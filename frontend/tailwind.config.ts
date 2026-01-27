import type { Config } from "tailwindcss";

const config: Config = {
  content: [
   
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    
   
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f3f4f6", 
        foreground: "#171717",
      },
    },
  },
  plugins: [],
};
export default config;