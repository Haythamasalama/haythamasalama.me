export default defineAppConfig({
  url: 'https://haythamasalama.me',
  title: 'Haytham A. Salama | Software Engineer',
  description: 'Full-Stack Engineer - Laravel, Vue.js, Nuxt.js, Tailwind CSS',
  keywords: 'Haytham Salama, Software Engineer, Full-Stack Developer, Full-Stack Engineer, Software Engineering',
  author: {
    name: 'Haytham A. Salama'
  },
  socials: {
    twitter: 'https://twitter.com/haythamasalama',
    github: 'https://github.com/haythamasalama',
    linkedin: 'https://www.linkedin.com/in/haythamasalama',
    medium: 'https://www.medium.com/@haythamasalama'
  },
  menus: {
    header: [
      {
        name: 'home',
        path: '/'
      },
      {
        name: 'about',
        path: '/about'
      },
      {
        name: 'projects',
        path: '/projects'
      },
      {
        name: 'articles',
        path: '/articles'
      },
      {
        name: 'Tools',
        path: '/tools'
      },
      {
        name: 'uses',
        path: '/uses'
      }
    ],
    footer: [
      {
        name: 'home',
        path: '/'
      },
      {
        name: 'about',
        path: '/about'
      },
      {
        name: 'projects',
        path: '/projects'
      },
      {
        name: 'articles',
        path: '/articles'
      },
      {
        name: 'videos',
        path: '/videos'
      },
      {
        name: 'snippets',
        path: '/snippets'
      },
      {
        name: 'Tools',
        path: '/tools'
      },
      {
        name: 'uses',
        path: '/uses'
      }
    ]
  }
});
