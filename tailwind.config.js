/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgDark: '#08090C',
        surfaceDark: '#0C0F15',
        cardDark: '#10141D',
        cyanNeon: '#00FFD1',
        mintNeon: '#00FFA3',
        blueNeon: '#0076F7',
        accentBorder: 'rgba(255, 255, 255, 0.08)',
        accentBorderStrong: 'rgba(255, 255, 255, 0.16)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
