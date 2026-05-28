import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        ink: '#1A1714',
        blush: '#E8C4B0',
        rust: '#C4572A',
        'dusty-rose': '#D4917A',
        gold: '#B8A070',
        'shop-bg': '#FAFAF8',
        'shop-text': '#2C2C2A',
        'shop-muted': '#6B6B68',
        'shop-border': '#E8E4DE',
        'shop-accent': '#C4572A',
        'sale-red': '#D63A2F',
        'sale-bg': '#FFF4F4',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
