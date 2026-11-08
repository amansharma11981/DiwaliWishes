/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        diwali: {
          gold: '#FFD700',
          'gold-light': '#FFE55C',
          'gold-dark': '#CC9900',
          saffron: '#FF6B00',
          'saffron-light': '#FF8C33',
          orange: '#FF4500',
          purple: '#2D1B69',
          'purple-light': '#4A2D9E',
          'purple-dark': '#1A0D45',
          blue: '#0A0A2E',
          'blue-light': '#16163D',
          pink: '#FF69B4',
          crimson: '#DC143C',
          maroon: '#800000',
          teal: '#008B8B',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-diwali': 'linear-gradient(135deg, #0A0A2E 0%, #2D1B69 50%, #1A0D45 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700, #FF6B00)',
        'gradient-fire': 'linear-gradient(180deg, #FFD700, #FF6B00, #FF4500)',
        'mandala-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'rise': 'rise 4s ease-in-out infinite',
        'firework': 'firework 1s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'gradient-shift': 'gradientShift 5s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,215,0,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255,215,0,0.8), 0 0 60px rgba(255,107,0,0.4)' },
        },
        flicker: {
          '0%': { opacity: '0.9', transform: 'scaleY(1) skewX(-1deg)' },
          '25%': { opacity: '1', transform: 'scaleY(1.05) skewX(1deg)' },
          '50%': { opacity: '0.85', transform: 'scaleY(0.95) skewX(-2deg)' },
          '75%': { opacity: '1', transform: 'scaleY(1.03) skewX(1deg)' },
          '100%': { opacity: '0.95', transform: 'scaleY(1) skewX(0deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(0px)', opacity: '1' },
          '100%': { transform: 'translateY(-200px)', opacity: '0' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.5))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(255,215,0,1)) drop-shadow(0 0 40px rgba(255,107,0,0.8))' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,107,0,0.2)',
        'gold-lg': '0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,107,0,0.3)',
        'purple': '0 0 20px rgba(45,27,105,0.6)',
        'glow-sm': '0 0 10px rgba(255,215,0,0.3)',
        'glow': '0 0 20px rgba(255,215,0,0.5)',
        'glow-lg': '0 0 40px rgba(255,215,0,0.7)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
}
