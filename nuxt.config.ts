import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/eslint'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'one-dark-pro',
          preload: [
            'html', 'css', 'bash', 'javascript', 'typescript',
            'json', 'scss', 'php', 'python', 'sql', 'vue', 'java'
          ]
        }
      }
    }
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
      }
    },
    // Gists come from the rate-limited GitHub API, so cache the rendered page for an hour.
    '/snippets': { swr: 3600 },
    '/sitemap.xml': { prerender: true }
  },

  compatibilityDate: '2026-10-01',

  vite: {
    plugins: [tailwindcss()]
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        commaDangle: 'never',
        braceStyle: 'stroustrup',
        arrowParens: false
      }
    }
  }
});
