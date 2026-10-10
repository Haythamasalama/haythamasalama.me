import tailwindcss from '@tailwindcss/vite';
import { codeThemeDark, codeThemeLight } from './shared/code-theme';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://haythamasalama.me',
    name: 'Haytham A. Salama'
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'theme'
  },

  content: {
    build: {
      markdown: {
        highlight: {
          // Brand themes from shared/code-theme.ts, also used for gists on /snippets.
          theme: { default: codeThemeDark, light: codeThemeLight },
          langs: ['bash', 'css', 'dotenv', 'html', 'javascript', 'json', 'markdown', 'php', 'python', 'sql', 'typescript', 'vue', 'yaml']
        }
      }
    },
    experimental: { sqliteConnector: 'native' }
  },

  runtimeConfig: {
    // Gists (/snippets) and contributions (/open-source) come from this GitHub
    // account. Set NUXT_GITHUB_TOKEN (a token with no scopes is enough) to lift
    // GitHub's anonymous limit of 60 requests an hour.
    github: {
      token: '',
      username: 'Haythamasalama',
      apiBase: 'https://api.github.com',
      /** Organisations of my own, left out of "contributions to other projects". */
      ownOrgs: ['aug-projects']
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
    // Home and Open source show live GitHub activity, refreshed every six hours.
    '/': { isr: 6 * 60 * 60, prerender: false },
    '/open-source': { isr: 6 * 60 * 60, prerender: false },
    '/api/open-source': { isr: 6 * 60 * 60 },
    '/work': { prerender: true },
    '/articles/**': { prerender: true },
    // Gists are fetched at request time and cached for an hour, so new ones
    // show up without a redeploy.
    '/snippets': { isr: 3600, prerender: false },
    '/api/snippets': { isr: 3600 },
    '/tools': { prerender: true },
    '/uses': { prerender: true },
    '/about': { prerender: true },
    '/brand': { prerender: true },

    // Old URLs from the previous version of the site
    '/projects': { redirect: { to: '/work', statusCode: 301 } },
    '/projects/**': { redirect: { to: '/work', statusCode: 301 } },
    '/videos': { redirect: { to: '/articles', statusCode: 301 } },
    '/videos/**': { redirect: { to: '/articles', statusCode: 301 } },
    '/articles/laravel': { redirect: { to: '/articles', statusCode: 301 } },
    '/articles/front-end': { redirect: { to: '/articles', statusCode: 301 } },
    '/articles/software-engineering': { redirect: { to: '/articles', statusCode: 301 } }
  },

  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      // Follow links from the prerendered pages so every article is generated too.
      crawlLinks: true,
      routes: ['/articles', '/sitemap.xml']
    }
  },

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
  },

  icon: {
    mode: 'svg',
    customCollections: [
      { prefix: 'brand', dir: './app/assets/icons' }
    ],
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    clientBundle: { scan: true, sizeLimitKb: 256 }
  }
});
