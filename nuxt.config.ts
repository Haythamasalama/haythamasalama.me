import { readdirSync } from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import { codeThemeDark, codeThemeLight } from './shared/code-theme';
import { liveImagePath, liveImages } from './shared/live-pages';

/**
 * The Markdown version of every page that doesn't read GitHub (see
 * `server/middleware/markdown.ts`). The crawler skips `.md` links, so they are
 * listed here: the fixed pages, then one per project page and article.
 */
const markdownRoutes = [
  '/index.md', '/about.md', '/projects.md', '/articles.md', '/tools.md', '/uses.md', '/brand.md',
  ...readdirSync('content', { recursive: true, encoding: 'utf8' })
    .filter(file => /^(projects|articles)\/.+\.md$/.test(file.replaceAll('\\', '/')))
    .map(file => `/${file.replaceAll('\\', '/')}`)
];

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
    'nuxt-og-image'
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
    // Home, About and Open source show live GitHub activity, refreshed every six hours.
    '/': { isr: 6 * 60 * 60, prerender: false },
    '/about': { isr: 6 * 60 * 60, prerender: false },
    '/open-source': { isr: 6 * 60 * 60, prerender: false },
    '/api/open-source': { isr: 6 * 60 * 60 },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/articles/**': { prerender: true },
    // Gists are fetched at request time and cached for an hour, so new ones
    // show up without a redeploy.
    '/snippets': { isr: 3600, prerender: false },
    '/api/snippets': { isr: 3600 },
    '/tools': { prerender: true },
    '/uses': { prerender: true },
    '/brand': { prerender: true },
    // The live pages' Markdown versions follow the pages themselves.
    '/open-source.md': { isr: 6 * 60 * 60, prerender: false },
    '/snippets.md': { isr: 3600, prerender: false },
    '/llms.txt': { prerender: true },
    '/llms-full.txt': { prerender: true }
  },

  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      // Follow links from the prerendered pages so every article is generated too.
      crawlLinks: true,
      routes: ['/articles', '/sitemap.xml', '/llms.txt', '/llms-full.txt', ...markdownRoutes, ...liveImages.map(liveImagePath)]
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

  fonts: {
    // Only for the share images: the site loads its own fonts from Fontsource
    // in main.css, so nothing is fetched from a font service.
    providers: { google: false, googleicons: false, bunny: false, fontshare: false, fontsource: false, adobe: false },
    families: [
      { name: 'Geist Variable', provider: 'npm', weights: [400, 600], global: true },
      { name: 'Geist Mono Variable', provider: 'npm', weights: [400], global: true }
    ]
  },

  icon: {
    mode: 'svg',
    customCollections: [
      { prefix: 'brand', dir: './app/assets/icons' }
    ],
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    clientBundle: { scan: true, sizeLimitKb: 256 }
  },

  ogImage: {
    // Every share image is drawn at build time (app/components/OgImage), so
    // nothing renders on Vercel. Pages rendered on request get theirs from
    // server/routes/og/[...image].ts, also at build time.
    zeroRuntime: true,
    defaults: { width: 1200, height: 630 }
  },

  robots: {
    // Search engines and AI assistants may read and quote every page
    // (https://contentsignals.org); AI training is left unstated.
    groups: [{ userAgent: '*', allow: '/', contentSignal: { 'search': 'yes', 'ai-input': 'yes' } }]
  }
});
