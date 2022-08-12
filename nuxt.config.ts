import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Haytham Salama | Software Engineer",
      charset: "UTF-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Full-Stack Developer and Software Engineering." },
        { name: "keywords", content: "Haytham Salama ,Haytham Akram Salama, Haythamasalama" },
        { property: "og:title", content: "Haytham Akram Salama | Software Engineer" },
        { property: "og:site_name", content: "Haytham Akram Salama" },
        { property: "og:url", content: "https://haythamasalama.me" },
        { property: "og:description", content: "Full-Stack Developer and Software Engineering." },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/assets/images/opengraph-logo.jpg" },
      ],
      link: [{ rel: "icon", href: "/assets/images/icon.jpg" }],
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },
});
