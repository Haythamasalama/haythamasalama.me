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
    // Apps and projects share the Work page and keep their own addresses.
    { label: 'Apps', to: '/work#apps', includes: ['/apps'] },
    { label: 'Work', to: '/work', includes: ['/projects'] },
    { label: 'Skills', to: 'https://skills.haythamasalama.me' },
    { label: 'Open Source', to: '/open-source' },
    // Articles, plus the Vue.js path and the design patterns under /learn.
    { label: 'Blog', to: '/articles', includes: ['/learn'] }
  ],

  /** My own apps, on the home page. */
  apps: [
    { name: 'Runarks', kind: 'Governed access to production databases', logo: 'runarks', to: 'https://runarks.com/' },
    { name: 'EasyShoot', kind: 'Screenshot app for macOS · coming soon', logo: 'easyshoot', to: 'https://easyshoot.haythamasalama.me/' },
    { name: 'WhatsApp Business Monitor', kind: 'Dashboard for WhatsApp Business', logo: 'whatsapp-manager', to: 'https://github.com/haythamasalama/whatsapp-business-monitor' }
  ],

  /** Smaller pages, linked from the footer. */
  footer: [
    { label: 'Skills', to: 'https://skills.haythamasalama.me' },
    { label: 'Snippets', to: '/snippets' },
    { label: 'Tools', to: '/tools' },
    { label: 'Uses', to: '/uses' },
    { label: 'Brand', to: '/brand' }
  ],

  /** Smaller pages, behind the arrow at the end of the navigation. */
  more: [
    { label: 'Tools', to: '/tools' },
    { label: 'Snippets', to: '/snippets' },
    { label: 'Uses', to: '/uses' }
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
