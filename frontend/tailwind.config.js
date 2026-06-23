/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark:     '#080010',
          darker:   '#050009',
          panel:    'rgba(124, 58, 237, 0.05)',
          border:   'rgba(124, 58, 237, 0.25)',
          violet:   '#7c3aed',
          cyan:     '#06b6d4',
          pink:     '#ec4899',
          blue:     '#3b82f6',
          green:    '#10b981',
          red:      '#ef4444',
          yellow:   '#f59e0b',
          white:    '#f8fafc',
        }
      },
      fontFamily: {
        orbitron:   ['Oxanium', 'sans-serif'],
        jetbrains:  ['Share Tech Mono', 'monospace'],
        sans:       ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      backgroundImage: {
        'grid-violet': 'linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      }
    },
  },
  plugins: [],
}
