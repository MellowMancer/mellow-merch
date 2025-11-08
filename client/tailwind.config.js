/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          background: '#0b1120',
          surface: '#111c2f',
          border: '#1f2937',
        },
        background: '#0b1120',
        surface: '#111c2f',
        border: '#1f2937',
        primary: {
          DEFAULT: '#38bdf8',
          strong: '#0ea5e9',
        },
        text: {
          DEFAULT: '#e2e8f0',
          muted: '#94a3b8',
        },
        danger: '#f87171',
      },
    },
  },
  plugins: [],
};

