/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F9FA',
        panel: '#FFFFFF',
        ink: {
          900: '#171717',
          700: '#374151',
          500: '#6B7280',
          400: '#9CA3AF',
        },
        border: {
          light: '#F3F4F6',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
        },
        navy: {
          900: '#0F172A',
          800: '#1E3A8A',
          700: '#1D4ED8',
          600: '#2563EB',
          50: '#EFF6FF',
        },
        subtle: {
          green: '#16A34A',
          greenBg: '#F0FDF4',
          amber: '#D97706',
          amberBg: '#FFFBEB',
          red: '#DC2626',
          redBg: '#FEF2F2',
        }
      },
      borderRadius: {
        DEFAULT: '0.375rem', // 6px
        md: '0.375rem',      // 6px
        lg: '0.5rem',        // 8px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
