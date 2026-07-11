/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe3fe',
          300: '#93d2fd',
          400: '#60b8fa',
          500: '#3b9bf4',
          600: '#2680e8',
          700: '#1e6bd6',
          800: '#1f57ad',
          900: '#1e4a89',
          950: '#0e2c5c',
        },
        navy: {
          800: '#1a3a6e',
          900: '#0f2a52',
          950: '#0a1f3d',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
    },
  },
  plugins: [],
}
