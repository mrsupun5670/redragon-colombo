/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redragon: {
          50: '#FEE7EB',
          100: '#FCCFD7',
          200: '#FA9FAF',
          300: '#F77088',
          400: '#F54060',
          500: '#e50b23',
          600: '#B7091C',
          700: '#890715',
          800: '#5C040E',
          900: '#2E0207',
          950: '#170103',
        },
        dark: {
          900: '#0F0F0F',
          800: '#1A1A1A',
          700: '#2D2D2D',
          600: '#404040',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'red': '0 4px 14px 0 rgba(220, 38, 38, 0.39)',
        'red-lg': '0 10px 40px 0 rgba(220, 38, 38, 0.5)',
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
      }
    },
  },
  plugins: [],
}
