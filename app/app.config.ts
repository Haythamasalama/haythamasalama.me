export default defineAppConfig({
  site: {
    name: 'Haytham A. Salama',
    url: 'https://haythamasalama.me',
    title: 'Haytham A. Salama · Software Engineer for SaaS, AI, FinTech & Logistics',
    role: 'Senior Software Engineer · SaaS, AI, FinTech & Logistics',
    description: 'Haytham A. Salama is a senior software engineer building SaaS, fintech and logistics platforms in Saudi Arabia: domain-driven, secure, and built alongside AI. Today at WINCH; next, a master\'s in artificial intelligence.',
    since: 2022
  },

  nav: [
    { label: 'About', to: '/about' },
    // Project and app pages keep their own addresses, under Work.
    { label: 'Work', to: '/work', includes: ['/projects', '/apps'] },
    { label: 'Open Source', to: '/open-source' },
    // Articles, plus the Vue.js path and the design patterns under /learn.
    { label: 'Blog', to: '/articles', includes: ['/learn'] }
  ],

  /** Smaller pages, linked from the footer. */
  footer: [
    { label: 'Snippets', to: '/snippets' },
    { label: 'Tools', to: '/tools' },
    { label: 'Uses', to: '/uses' },
    { label: 'Brand', to: '/brand' }
  ],

  /** The highlighted link at the end of the navigation. */
  contact: { label: 'Contact', to: 'mailto:haythamasalama@gmail.com' },

  socials: [
    { label: 'GitHub', to: 'https://github.com/haythamasalama', icon: 'simple-icons:github', size: 18 },
    { label: 'X', to: 'https://x.com/haythamasalama', icon: 'simple-icons:x', size: 16 },
    { label: 'LinkedIn', to: 'https://www.linkedin.com/in/haythamasalama', icon: 'brand:linkedin', size: 17 },
    { label: 'Medium', to: 'https://medium.com/@haythamasalama', icon: 'simple-icons:medium', size: 18 },
    { label: 'Email', to: 'mailto:haythamasalama@gmail.com', icon: 'lucide:mail', size: 17 }
  ]
});
