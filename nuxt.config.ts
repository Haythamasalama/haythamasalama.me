import tailwindcss from '@tailwindcss/vite';

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
          theme: { default: 'github-dark-default', light: 'github-light-default' },
          langs: ['bash', 'css', 'dotenv', 'html', 'javascript', 'json', 'php', 'python', 'sql', 'typescript', 'vue', 'yaml']
        }
      }
    },
    experimental: { sqliteConnector: 'native' }
  },

  routeRules: {
    '/': { prerender: true },
    '/work': { prerender: true },
    '/open-source': { prerender: true },
    '/articles/**': { prerender: true },
    '/snippets': { prerender: true },
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
      routes: ['/', '/sitemap.xml']
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
        braceStyle: '1tbs'
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
