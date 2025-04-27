/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './content/**/*.{md,yml,json,yaml,toml,csv}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5194FF',
        secondary: '#7981E6',
        gray: {
          100: '#d9d9d9ee',
          200: '#E4E4E7',
          300: '#999999',
          400: '#888888',
          500: '#24292F',
          600: '#1B1F24',
          700: '#0F1114',
          800: '#0F1114',
          900: '#111111'
        }
      },
      boxShadow: {
        DEFAULT: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.gray.500')
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1 a, h2 a, h3 a, h4 a': {
              borderBottom: 'none !important',
              color: 'inherit',
              fontWeight: 'inherit'
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none'
            },
            'a:hover': {
              borderColor: theme('colors.primary')
            },
            'a:has(> code)': {
              borderColor: 'transparent !important'
            },
            'a code': {
              color: 'var(--tw-prose-code)',
              borderRadius: '0.5rem',
              padding: '0.25rem 0.375rem',
              border: '2px solid var(--tw-prose-pre-border)'
            },
            'a:hover code': {
              color: 'var(--tw-prose-links)',
              boxShadow: 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)'
            },
            pre: {
              borderRadius: '0.5rem',
              shadow: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            },
            code: {
              borderRadius: '0.5rem',
              padding: '0.25rem 0.375rem',
              border: '2px solid var(--tw-prose-pre-border)'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            table: {
              wordBreak: 'break-word'
            }
          }
        },
        primary: {
          css: {
            '--tw-prose-body': theme('colors.gray.100'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-hr': theme('colors.gray.500'),
            '--tw-prose-quotes': theme('colors.gray.700'),
            '--tw-prose-quote-borders': theme('colors.gray.500'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.gray.100'),
            '--tw-prose-pre-code': theme('colors.gray.700'),
            '--tw-prose-pre-bg': theme('colors.gray.700'),
            '--tw-prose-pre-border': theme('colors.gray.500'),
            '--tw-prose-th-borders': theme('colors.gray.500'),
            '--tw-prose-td-borders': theme('colors.gray.500')
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
