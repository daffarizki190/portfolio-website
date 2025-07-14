/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#0F172A',
        'navy-light': '#1E293B',
        'slate-text': '#94A3B8',
        'blue-accent': '#38BDF8',
        pastel: {
          blue: '#A3D8F4',
          peach: '#FF9A8B',
          white: '#FFFFFF',
          'blue-light': '#E8F4FD',
          'peach-light': '#FFE5E1',
          'blue-dark': '#7BC3E8',
          'peach-dark': '#FF7A6B'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        strong: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #A3D8F4, #FF9A8B)',
        'pastel-gradient': 'linear-gradient(135deg, #A3D8F4 0%, #E8F4FD 50%, #FF9A8B 100%)'
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'meteor': 'meteor 2s linear infinite',
        'drift': 'drift 12s linear infinite',
        'pulse-custom': 'pulse-custom 4s ease-in-out infinite',
        'bounce-custom': 'bounce-custom 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' }
        },
        meteor: {
          '0%': { transform: 'translateY(-100%) translateX(-100%) rotate(45deg)', opacity: '1' },
          '100%': { transform: 'translateY(100%) translateX(100%) rotate(45deg)', opacity: '0' }
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-100px) translateX(100px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) translateX(0) rotate(360deg)' }
        },
        'pulse-custom': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.3' }
        },
        'bounce-custom': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(0.8)' }
        }
      }
    },
  },
  plugins: [],
}
