---
name: site
description: How haythamasalama.me is built and where everything lives. Covers every page with its data sources, the content collections, shared components, commands, and how to verify a change. Use before changing any page, component, content file or style on this site, then load the skill for the area you are changing.
---

# haythamasalama.me

The personal site of Haytham A. Salama. It runs on Nuxt 4, Nuxt Content 3 and Tailwind CSS 4, is deployed on Vercel, and is dark by default with a light theme.

**Read `AGENTS.md` first.** It holds the code conventions, the design rules and the dependency notes. This skill maps the site, and the skills below hold the rules for each area:

| Task | Skill |
|---|---|
| Add or change a project card or project page | `projects` |
| Draw or change a diagram | `figures` |
| Write a blog post, or its Medium, X or LinkedIn version | `articles` |
| Change the Open source page or a contribution | `open-source` |
| Add or change a tool or a tool category | `tools` |
| Colours, type, logos, the signature, the brand page | `brand` |
| Any visible text: voice, honesty, what is safe to publish | `content` |

## Pages

| Route | File | Data | Sections (`SectionTitle` ids) |
|---|---|---|---|
| `/` | `app/pages/index.vue` | `site` in `app/app.config.ts`, `projects` (cards with a `highlight`), `projectPages`, `technologies` (`home: true`), latest 3 `articles`, `uses` (items with `desk`), `useOpenSource()` | `work`, `open-source`, `skills`, `blog`, `desk` |
| `/about` | `app/pages/about.vue` | `profile.yml`, `experience/*.yml`, `education/*.yml`, `technologies`, `useOpenSource()` | `about`, `experience`, `open-source`, `skills`, `education`, `vision`, `hello` |
| `/projects` | `app/pages/projects/index.vue` | `projects/*.yml`, plus `projectPages` to know which have a page | `projects` |
| `/projects/<slug>` | `app/pages/projects/[slug].vue` | `projects/<slug>.md` for the story, `projects/<slug>.yml` for title, period and links | headings in the Markdown |
| `/apps` | `app/pages/apps/index.vue` | `apps/*.yml`, plus `appPages` to know which have a page | `all-apps` |
| `/apps/<slug>` | `app/pages/apps/[slug].vue` | `apps/<slug>.md` for the story, `apps/<slug>.yml` for name, platforms and links | headings in the Markdown |
| `/learn` | `app/pages/learn/index.vue` | `vuePath`, `patterns` (counts), latest 3 `articles` | `paths`, `writing` |
| `/learn/vue` | `app/pages/learn/vue.vue` | `learn/vue-path.yml`; ticked topics stay in the visitor's `localStorage` | `before-you-start`, `the-path`, one id per stage |
| `/learn/design-patterns`, `/learn/design-patterns/<slug>` | `app/pages/learn/design-patterns/index.vue`, `[slug].vue` | `learn/design-patterns/*.md`, groups in `shared/pattern-groups.ts` | `creational`, `structural`, `behavioral`; headings in the Markdown |
| `/open-source` | `app/pages/open-source.vue` | `useOpenSource()`: GitHub through `server/api/open-source.get.ts`, merged with `contributions/*.yml` | `spotlight`, `projects`, `elsewhere`, `start` |
| `/articles`, `/articles/<folder>/<slug>` | `app/pages/articles/index.vue`, `[...slug].vue` | `articles/**/*.md` | headings in the Markdown |
| `/snippets` | `app/pages/snippets.vue` | public gists through `server/api/snippets.get.ts` | one per gist |
| `/tools` | `app/pages/tools.vue` | `tools/*.yml`, groups and categories in `shared/tool-categories.ts` | one per category |
| `/uses` | `app/pages/uses.vue` | `uses/*.yml` (one file per section) | one per file |
| `/brand` | `app/pages/brand.vue` | data written in the page itself; downloads in `public/brand-kit/` | `principles`, `signature`, `favicon`, `colour`, `typography`, `icons`, `in-the-world`, `voice`, `kit` |

Navigation, the contact link and the social links live in `app/app.config.ts`. The menu is About, Work (Projects, Apps), Open Source, Learn (Blog, Vue.js path, Design patterns) and Resources (Snippets, Tools, Uses). Project, app and design pattern pages share `ReadingLayout` (the text with its sections beside it). Collections and their schemas live in `content.config.ts`: add a field there before using it in a file.

## Building blocks

- **Page layout:** `PageHeader` (title and intro), `SectionTitle` (a section with a shareable `#id`), `AnchorLink`, `GoLink` (a muted "→" link), `ProseBody` (Markdown in the reading style).
- **Marks:** `LogoTile` and `BrandLogo` show a `mark`: `logo` (a one-colour mask registered in `app/utils/logos.ts`), `icon` (Iconify name), `image` (a photo in `public/`, shown greyscale) or `text` (a monogram).
- **Markdown components** (`app/components/content/`):
  - `::sketch-figure{name="<project>/<file>" alt="…"}`: an Excalidraw figure (see the `figures` skill).
  - `::project-shot{src="…" alt="…" width height}`: a screenshot in both themes, or add `single` for one image.
  - `::feature-grid` with `items` (icon, title, text) in a YAML block: a two-column list of features.
  - `::alert-info`: a note. Code blocks use the brand Shiki themes.
- **Icons:** `lucide:*` and `simple-icons:*` from the local collections, `brand:linkedin` for LinkedIn.

## LLMs, agents and search

- Every page has a Markdown twin at its path plus `.md` (`/index.md` for Home), built from the same collections by `server/utils/markdown.ts` and served by `server/middleware/markdown.ts`. `/llms.txt` lists them (https://llmstxt.org) and `/llms-full.txt` joins the ones that don't read GitHub. `/open-source.md` and `/snippets.md` are live, like their pages.
- Every prerendered page gets its own share image from `app/components/OgImage/Page.takumi.vue` (Ink, the white signature, the Iris to Azure hairline, Geist), drawn at build time; `usePageSeo({ eyebrow })` sets the label above the title. The four pages rendered on request get theirs from `server/routes/og/[...image].ts` (`/og/home.png`, `/og/about.png`, …), also at build time, with their text in `shared/live-pages.ts`. Preview the images in `.output/public/_og/s/` after a build.
- `usePageSeo` writes each page's schema.org JSON-LD (page type, breadcrumbs, `entity`) and the `<link rel="alternate" type="text/markdown">`; `app.vue` adds the site-wide `WebSite` and `Person`.
- `robots.txt` (from `@nuxtjs/robots`) allows everything and states `Content-Signal: search=yes, ai-input=yes`.
- Adding a page: give it a `pageMarkdown()` case and, if prerendered, a `.md` entry in `markdownRoutes` in `nuxt.config.ts`. Adding a Markdown component: teach `plainMarkdown()` to turn it into plain Markdown.

## Rendering

Most pages are prerendered, and links are crawled at build time, so a new page only needs a link from somewhere. A link to a page that does not exist fails the build. `/`, `/about` and `/open-source` (6 hours) and `/snippets` (1 hour) render at request time with ISR. They must still render when GitHub fails, with a 503.

## Commands

```bash
npm run dev               # http://localhost:3000
npm run lint              # ESLint (fix with npm run lint:fix)
npm run typecheck         # vue-tsc
npm run build             # production build and prerender
node .output/server/index.mjs   # serve the build on :3000
npm run figures           # rebuild figures from scripts/figures
```

## Verifying a change

1. Run `npm run lint && npm run typecheck && npm run build`, as CI does.
2. Look at every changed page at desktop width and at 375px, in both themes. Switch themes with the site's own toggle; swapping classes by hand leaves Tailwind's colour state half-switched. There must be no sideways page scroll.
3. If the browser shows an old version after a rebuild, reload with a query string (`?v=2`); the page payload is cached.

Known traps:
- **Tailwind 4 only emits `@theme` variables that some utility uses.** A CSS variable read from JavaScript or generated SVG (like `--font-sketch`) must be defined outside `@theme`.
- **Type check in a git worktree.** A worktree nested inside the main checkout can resolve types from the parent's `node_modules` and report false template errors. Check a clean copy before chasing them.
