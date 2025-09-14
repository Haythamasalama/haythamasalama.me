export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],

  runtimeConfig: {
      githubToken: ''
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'one-dark-pro',
          preload: [
            'html', 'css', 'bash', 'javascript', 'typescript',
            'json', 'scss', 'php', 'python', 'sql', 'vue', 'java', 'json'
          ]
        }
      }
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.js'
  }
});
