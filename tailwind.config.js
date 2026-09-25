/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#070A0F',
        panel: '#0D131F',
        ink: {
          900: '#F8FAFC',
          700: '#CBD5E1',
          500: '#94A3B8',
          400: '#64748B',
        },
        border: {
          light: '#1E293B',
          DEFAULT: '#1E293B',
          dark: '#334155',
        },
        navy: {
          900: '#0B0F17',
          800: '#2563EB',
          700: '#1D4ED8',
          600: '#3B82F6',
          50: '#1E293B',
        },
        subtle: {
          green: '#10B981',
          greenBg: '#064E3B',
          amber: '#F59E0B',
          amberBg: '#78350F',
          red: '#EF4444',
          redBg: '#7F1D1D',
        }
      },
      borderRadius: {
        DEFAULT: '0.375rem', // 6px
        md: '0.375rem',      // 6px
        lg: '0.5rem',        // 8px
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
