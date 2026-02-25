/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mapped from src/style/vars.css
        'app-bg':             '#0f1b33',
        'surface':            '#283450',
        'surface-strong':     '#2f3c5f',
        'border-strong':      '#1f2b44',
        'border-soft':        '#1b2742',
        'text-strong':        '#f3f6fb',
        'placeholder':        'rgba(243, 246, 251, 0.72)',
        'accent':             '#3da0d9',
        'select-arrow':       '#cfe6ff',
        'focus-ring':         'rgba(61, 160, 217, 0.25)',
        // Input gradient stops
        'input-top':          '#2f3c5f',
        'input-bottom':       '#283450',
        'input-focus-top':    '#36446b',
        'input-focus-bottom': '#2d395a',
      },
      borderRadius: {
        'pill':  '999px',
        'block': '16px',
      },
      height: {
        'input': '52px',
      },
      boxShadow: {
        'input': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px rgba(16,25,48,0.25)',
        'focus': '0 0 0 4px rgba(61,160,217,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      padding: {
        'input-x': '1rem',
        'input-y': '0.9rem',
      },
    },
  },
  plugins: [],
};
