import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3f0',
          100: '#e8e3dc',
          200: '#d4c7b8',
          300: '#bea68f',
          400: '#a88a6e',
          500: '#927253',
          600: '#7a5d44',
          700: '#624a38',
          800: '#523f31',
          900: '#47362b',
        },
        accent: {
          50: '#faf5f0',
          100: '#f4e8d9',
          200: '#e9d0b3',
          300: '#dbb188',
          400: '#ce925f',
          500: '#c27a43',
          600: '#b46437',
          700: '#964f2f',
          800: '#79412b',
          900: '#633625',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
