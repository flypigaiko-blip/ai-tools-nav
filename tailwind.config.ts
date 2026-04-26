import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          black: '#1d1d1f',
          gray: {
            50: 'rgba(0,0,0,0.02)',
            100: 'rgba(0,0,0,0.05)',
            200: 'rgba(0,0,0,0.08)',
            300: 'rgba(0,0,0,0.12)',
            400: 'rgba(0,0,0,0.25)',
            500: 'rgba(0,0,0,0.45)',
            600: 'rgba(0,0,0,0.65)',
          },
          blue: '#0071e3',
          blueHover: '#0077ED',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display',
          'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'
        ],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.07', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline': ['40px', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '600' }],
        'title': ['28px', { lineHeight: '1.14', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subtitle': ['21px', { lineHeight: '1.19', letterSpacing: '0.01em', fontWeight: '400' }],
        'body': ['17px', { lineHeight: '1.47', letterSpacing: '-0.01em', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.43', letterSpacing: '-0.005em', fontWeight: '400' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
