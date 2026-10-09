// Typography (`prose`) customizations. Loaded from `app/assets/css/main.css` via `@config`,
// everything else (colors, fonts, shadows) lives in the CSS `@theme` block.

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            'h1 a, h2 a, h3 a, h4 a': {
              borderBottom: 'none !important',
              color: 'inherit',
              fontWeight: 'inherit'
            },
            'a': {
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
              boxShadow: '0 0 0 2px rgb(59 130 246 / 0.5)'
            },
            'pre': {
              borderRadius: '0.5rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            },
            'code': {
              borderRadius: '0.5rem',
              padding: '0.25rem 0.375rem',
              border: '2px solid var(--tw-prose-pre-border)'
            },
            'code::before': {
              content: ''
            },
            'code::after': {
              content: ''
            },
            'table': {
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
  }
};
