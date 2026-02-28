/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          gold: '#f59e0b',
          red: '#ef4444',
          dark: '#0c1421',
          navy: '#0f1a2e',
          card: 'rgba(255,255,255,0.03)',
        },
      },
      backgroundImage: {
        'gold-red': 'linear-gradient(135deg, #f59e0b, #ef4444)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
