/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'card-bg': '#18181b',
        'border': '#54545471'
      },

      gridTemplateColumns: {
        'dashboard': 'repeat(4, 22rem)',
      },

      animation: {
        'open-sidebar': 'sidebar 0.3s ease-in-out'
      },
      keyframes: {
        'sidebar': {
          '0%': {
            transform: 'translateX(150%)'
          }, 
          '100%': {
            transform: 'translateX(0%)'
          }
        }
      }
    },
  },
  plugins: [],
}

