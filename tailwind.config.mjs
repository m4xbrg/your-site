/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,md,mdx,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ff', 100: '#e6effe', 200: '#c5d8fd',
          300: '#9fbdfc', 400: '#6f97fa', 500: '#3f71f8',
          600: '#2856d7', 700: '#2146ac', 800: '#1d3b8b', 900: '#1b356f'
        }
      }
    }
  }
}
