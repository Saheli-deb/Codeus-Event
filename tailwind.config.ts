import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      colors: {
        gold: '#d4af37',
        deep: '#0f0d13',
        forest: '#0e1a14',
        cream: '#f7efe3',
        accent: '#9d7c24',
      },
      fontFamily: {
        hpTitle: ['var(--font-hp-title)', 'Cinzel', 'serif'],
        hpText: ['var(--font-hp-text)', 'EB Garamond', 'serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(212,175,55,0.35)',
      },
      keyframes: {
        pan: {
          '0%': { transform: 'scale(1.1) translate(0,0)' },
          '100%': { transform: 'scale(1.15) translate(-2%,-2%)' }
        },
        drift: {
          '0%': { transform: 'translateY(110vh) translateX(var(--x))', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) translateX(calc(var(--x) + 20px))', opacity: '0' }
        },
        spin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' }
        },
        flutter: {
          '0%': { transform: 'translate(var(--x),80vh) rotate(0deg)' },
          '50%': { transform: 'translate(calc(var(--x) + 30px),10vh) rotate(10deg)' },
          '100%': { transform: 'translate(calc(var(--x) - 10px),-10vh) rotate(-10deg)' }
        }
      },
      animation: {
        pan: 'pan 30s linear infinite alternate',
        drift: 'drift var(--dur) linear infinite',
        spin: 'spin 20s linear infinite',
        flutter: 'flutter 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
