/**
 * The pages rendered on request (they read GitHub), with the text their share
 * images show. Their HTML is never prerendered, so `server/routes/og/[...image].ts`
 * draws their images at build time and the pages point at `/og/<name>.png`.
 */
export const livePages = {
  'about': {
    title: 'About',
    description: 'Haytham A. Salama, senior software engineer at WINCH. Experience, products, open source, skills and where his work with AI agents is going.'
  },
  'open-source': {
    title: 'Open source',
    description: 'Code Haytham A. Salama has shipped to open-source projects: on the Nuxt UI team, with pull requests to Laravel, Nuxt, Uptime Kuma and the Vue ecosystem, synced from GitHub.'
  },
  'snippets': {
    title: 'Snippets',
    description: 'Small pieces of config and code Haytham A. Salama reaches for again and again, straight from his GitHub Gists.'
  }
} as const;

/** Share images drawn at build time, one per live page plus the home page. */
export const liveImages = ['home', ...Object.keys(livePages)] as const;

export const liveImagePath = (name: typeof liveImages[number]) => `/og/${name}.png`;
