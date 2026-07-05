/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#05060a',
          void: '#02030a',
          panel: '#0a0d18',
          neon: '#00f0ff',
          electric: '#7b2fff',
          pink: '#ff2bd6',
          magenta: '#ff006e',
          cyan: '#00fff0',
          blue: '#1e8bff',
          gold: '#ffd166',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['"Rajdhani"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,240,255,0.45), 0 0 40px rgba(0,240,255,0.25)',
        'neon-pink': '0 0 20px rgba(255,43,214,0.45), 0 0 40px rgba(255,43,214,0.25)',
        'neon-purple': '0 0 20px rgba(123,47,255,0.45), 0 0 40px rgba(123,47,255,0.25)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)",
        'neon-radial': 'radial-gradient(circle at 50% 0%, rgba(123,47,255,0.25), transparent 60%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'spin-rev': 'spin-rev 24s linear infinite',
        'pulse-neon': 'pulse-neon 2.4s ease-in-out infinite',
        'scan': 'scan 3.2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.6s steps(2) infinite',
        'flicker': 'flicker 4s linear infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        'spin-rev': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-neon': {
          '0%,100%': { opacity: '0.6', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.4)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
          '100%': { transform: 'translate(0)' },
        },
        flicker: {
          '0%,100%': { opacity: '1' },
          '47%': { opacity: '1' },
          '48%': { opacity: '0.4' },
          '49%': { opacity: '1' },
          '52%': { opacity: '0.7' },
          '53%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
