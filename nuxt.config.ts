export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],

  runtimeConfig: {
      githubToken: ''
  },

  content: {
    highlight: {
      theme: 'one-dark-pro',

      preload: [
        'html',
        'css',
        'bash',
        'javascript',
        'typescript',
        'json',
        'scss',
        'php',
        'python',
        'sql',
        'vue',
        'java'
      ]
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.js'
  }
});
