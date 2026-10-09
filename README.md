# haythamasalama.me
<p align="center">
  </br>
  ✨ Personal Website
  </br></br>
  <samp>
    <a href="https://haythamasalama.me/about" target="_blank">me</a> .
    <a href="https://haythamasalama.me/projects" target="_blank">projects</a> .
    <a href="https://haythamasalama.me/articles" target="_blank">articles</a> .
    <a href="https://haythamasalama.me/tools" target="_blank">tools</a> .
    <a href="https://haythamasalama.me/uses" target="_blank">uses</a> .
    <a href="https://twitter.com/haythamasalama" target="_blank">twitter</a> .
  </samp>
</p>


## 🚀 Technologies Used
* Framework: [Nuxt 4](https://nuxt.com)
* Content: [Nuxt Content 3](https://content.nuxt.com) (Markdown and YAML in `content/`)
* Styling: [Tailwind CSS 4](https://tailwindcss.com) with the Typography plugin
* Linting: ESLint 10 via [`@nuxt/eslint`](https://eslint.nuxt.com), type checking with `vue-tsc`
* Deployment: Vercel

## 🎨 UX & UI

![home](https://github.com/Haythamasalama/haythamasalama.me/assets/37311945/86a076d6-c00e-4f85-a256-9a8389f52eff)

- 🎨 [UX-UI Figma](https://www.figma.com/file/BMuebRuw47Hoj64ZPPAMPH/my-website?node-id=2%3A2)


## 🔼 Installation

Requires Node.js `22.22+` or `24.15+` (see `.nvmrc`).

```bash
$ git clone https://github.com/haythamasalama/haythamasalama.me.git
$ cd haythamasalama.me
$ npm i
$ npm run dev
```

## 🧰 Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server on `http://localhost:3000` |
| `npm run build`     | Build for production                         |
| `npm run preview`   | Preview the production build                 |
| `npm run lint`      | Lint the project (`npm run lint:fix` to fix) |
| `npm run typecheck` | Type check the project with `vue-tsc`        |

CI runs lint, typecheck and build on every pull request.

## 📁 Project Structure

```
app/
  assets/css/main.css   # Tailwind CSS 4 entry: theme tokens and custom utilities
  components/           # UI components (content/ holds MDC and prose components)
  pages/                # File-based routes
  app.config.ts         # Site title, description, social links and menus
content/                # Articles, projects, contributions, technologies, tools, uses
content.config.ts       # Typed content collections
server/routes/          # sitemap.xml
tailwind.config.js      # Typography (prose) customization only
```

## ✍️ Adding Content

- **Article**: `content/articles/<category>/<slug>.md` with `title`, `description`, `date` (`YYYY-MM-DD`), `readTime` and `author` front matter.
- **Project**: `content/projects/<n>.md` with `title`, `description`, `startAt` and `endAt`.
- **Open source contribution**: `content/contributions/<nn>.md` with `name`, `username`, `types` and either `links` or `url`.
- **Technology / tool**: a YAML file in `content/technologies/` or `content/tools/`; the allowed categories live in `app/types.ts`.

The fields are validated by the schemas in `content.config.ts`.
