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
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: false,
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
        './content/**/*.{md,yml,json,yaml,toml,csv}'
      ]
    }
  }
});
