/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        clay: {
          bg: '#faf7f4',
          card: '#ffffff',
          accent: '#f08665',
          sky: '#f3a086',
          mint: '#10b981',
          coral: '#f08665',
          amber: '#f59e0b',
        },
        industrial: {
          50: '#fdf0ec',
          100: '#fbe1d9',
          200: '#f7c4b4',
          300: '#f3a086',
          400: '#ee7b57',
          500: '#eb653b',
          600: '#f08665', // Exact user swatch
          700: '#e06c48',
          800: '#b94e2d',
          900: '#8b3a20',
          950: '#532111',
        },
      },
      boxShadow: {
        'clay-card': '8px 8px 18px #ece4dc, -8px -8px 18px #ffffff',
        'clay-card-hover': '12px 12px 24px #e0d7cd, -12px -12px 24px #ffffff',
        'clay-btn': '6px 6px 12px #ece4dc, -6px -6px 12px #ffffff',
        'clay-btn-primary': '6px 6px 16px rgba(240, 134, 101, 0.4), -6px -6px 14px #ffffff',
        'clay-btn-active': 'inset 4px 4px 8px #d9cec3, inset -4px -4px 8px #ffffff',
        'clay-input': 'inset 3px 3px 6px #ece4dc, inset -3px -3px 6px #ffffff',
        'clay-pill': '4px 4px 8px #ece4dc, -4px -4px 8px #ffffff',
      },
      borderRadius: {
        'clay': '1.5rem',
        'clay-lg': '2rem',
      },
      fontFamily: {
        sans: ['Outfit', 'Anek Devanagari', 'Plus Jakarta Sans', 'Hind', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Anek Devanagari', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Anek Devanagari', 'Hind', 'sans-serif'],
        hindi: ['Anek Devanagari', 'Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
