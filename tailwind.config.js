/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          500: '#00ffff',
          400: '#00eeee',
        },
        green: {
          500: '#00ff00',
        },
        black: '#000000',
        gray: {
          900: '#0a0a0a',
          800: '#111111',
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
