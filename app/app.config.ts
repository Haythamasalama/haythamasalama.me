export default defineAppConfig({
  site: {
    name: 'Haytham A. Salama',
    title: 'Haytham A. Salama — creative developer',
    role: 'Full-stack engineer · Laravel, Vue & Nuxt',
    description: 'Haytham A. Salama is a creative developer and full-stack engineer building domain-driven logistics and fintech platforms with Laravel, Vue and Nuxt.',
    since: 2022
  },

  nav: [
    { label: 'Work', to: '/work' },
    { label: 'Open source', to: '/open-source' },
    { label: 'Writing', to: '/articles' },
    { label: 'Snippets', to: '/snippets' },
    { label: 'Tools', to: '/tools' },
    { label: 'Uses', to: '/uses' },
    { label: 'About', to: '/about' }
  ],

  socials: [
    { label: 'GitHub', to: 'https://github.com/haythamasalama', icon: 'simple-icons:github', size: 18 },
    { label: 'X', to: 'https://x.com/haythamasalama', icon: 'simple-icons:x', size: 16 },
    { label: 'LinkedIn', to: 'https://www.linkedin.com/in/haythamasalama', icon: 'brand:linkedin', size: 17 },
    { label: 'Medium', to: 'https://medium.com/@haythamasalama', icon: 'simple-icons:medium', size: 18 }
  ]
});
