# haythamasalama.me

<p align="center">
  <img src="public/brand-kit/haytham-signature-white.svg" width="220" alt="Haytham A. Salama — signature">
</p>

<p align="center">
  Personal website of Haytham A. Salama — creative developer and full-stack engineer.
  <br><br>
  <samp>
    <a href="https://haythamasalama.me/work">work</a> ·
    <a href="https://haythamasalama.me/open-source">open source</a> ·
    <a href="https://haythamasalama.me/articles">writing</a> ·
    <a href="https://haythamasalama.me/snippets">snippets</a> ·
    <a href="https://haythamasalama.me/tools">tools</a> ·
    <a href="https://haythamasalama.me/uses">uses</a> ·
    <a href="https://haythamasalama.me/brand">brand</a>
  </samp>
</p>

![Home page of haythamasalama.me](.github/assets/home.webp)

## Stack

| | |
| --- | --- |
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3.5, Vite) |
| Content | [Nuxt Content 3](https://content.nuxt.com) — typed collections, Shiki highlighting, Node's built-in SQLite |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) with CSS-first theme tokens and `@tailwindcss/typography` |
| Icons | [Nuxt Icon](https://github.com/nuxt/icon) with local Lucide and Simple Icons collections |
| Fonts | Geist, Geist Mono and Instrument Serif, self-hosted from Fontsource |
| Theme | [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) — dark by default, light on request |
| SEO | `useSeoMeta`, [@nuxtjs/sitemap](https://nuxtseo.com/sitemap) and [@nuxtjs/robots](https://nuxtseo.com/robots) |
| Quality | [@nuxt/eslint](https://eslint.nuxt.com) (flat config, ESLint 10) and `vue-tsc` |
| Hosting | Vercel — every page is prerendered |

## Project structure

```
app/
  assets/css/main.css   Theme tokens (Ink, Iris, Azure), utilities and animations
  assets/icons/         Local icon collection (`brand:*`)
  components/           Layout pieces and small UI building blocks
  components/content/   Components used inside Markdown (code blocks, callouts)
  layouts/default.vue   Header, footer and the 640px reading column
  pages/                One file per route
  utils/                Signature strokes, logo registry, date helpers
content/                Everything you read on the site — Markdown and YAML
  articles/  snippets/  projects/  experience/  education/
  contributions/  technologies/  tools/  uses/
content.config.ts       Collection schemas
public/brand-kit/       The downloadable brand kit
```

## Adding content

Most edits never touch code. Add a file and the page picks it up; the fields are validated by the schemas in `content.config.ts`.

- **Article**: `content/articles/<category>/<slug>.md` with `title`, `description`, `date` (`YYYY-MM-DD`), `category`, `icon` and `readingTime`.
- **Snippet**: `content/snippets/<n>.<slug>.md` with a fenced code block such as ` ```php [config/cors.php] `.
- **Project**: `content/projects/<slug>.yml`; add `highlight` to show it under "Selected work" on the home page.
- **Job, school or contribution**: a YAML file in `content/experience/`, `content/education/` or `content/contributions/`.
- **Technology, tool or something you use**: a YAML file in `content/technologies/`, `content/tools/` or `content/uses/`.
- **Company logo**: a one-colour PNG or SVG in `public/logos/`, registered in `app/utils/logos.ts`.

## Develop

Requires Node.js `22.22+` or `24.15+` (see `.nvmrc`).

```bash
git clone https://github.com/haythamasalama/haythamasalama.me.git
cd haythamasalama.me
npm install
npm run dev         # http://localhost:3000
```

| Script | |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run generate` | Fully static build in `.output/public` |
| `npm run preview` | Preview the production build |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run typecheck` | Type-check with `vue-tsc` |

CI runs lint, typecheck and build on every pull request. Project conventions for contributors and coding agents are in [AGENTS.md](AGENTS.md).

## Brand

The signature, colours, type and downloadable files live on the [brand guidelines](https://haythamasalama.me/brand) page and in [`public/brand-kit`](public/brand-kit).

## License

[MIT](LICENSE)
