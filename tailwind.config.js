/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8edff',
          200: '#c9d5ff',
          300: '#a9bcff',
          400: '#89a4ff',
          500: '#698cff',
          600: '#4f6fe0',
          700: '#3b55af',
          800: '#2b3c7f',
          900: '#1c254f'
        }
      }
    },
  },
  plugins: [],
}
