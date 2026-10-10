# AGENTS.md

Personal website of Haytham A. Salama, built with Nuxt 4, Nuxt Content 3 and Tailwind CSS 4, deployed on Vercel.

## Commands

- `npm run dev`: dev server on `http://localhost:3000`
- `npm run lint` / `npm run lint:fix`: ESLint 10 flat config (`@nuxt/eslint`)
- `npm run typecheck`: `vue-tsc` through `nuxt typecheck`
- `npm run build` / `npm run preview`: production build and preview

Node.js `22.22+` or `24.15+` (see `.nvmrc`). Before finishing a change, run `npm run lint && npm run typecheck && npm run build`; CI runs the same three steps.

## Layout

- `app/`: Nuxt 4 source directory
  - `pages/`: one file per route; `articles/[...slug].vue` renders every article
  - `components/`: layout (`AppHeader`, `AppFooter`, `SignatureMark`) and small UI pieces (`LogoTile`, `TechChip`, `FilterChips`, `GoLink`, …)
  - `components/content/`: components used from Markdown (`ProsePre` code blocks, `::alert-info`)
  - `components/brand/`: pieces of the brand guidelines page
  - `assets/css/main.css`: theme tokens, utilities and animations
  - `assets/icons/`: local icon collection, used as `brand:<name>`
  - `utils/`: signature stroke data, the logo registry (`logos.ts`) and date helpers
  - `composables/usePageSeo.ts`: title and description, mirrored to Open Graph and Twitter
  - `composables/useOpenSource.ts`: live GitHub activity merged with `content/contributions`, for Home and `/open-source`
  - `app.config.ts`: site name, URL, navigation and social links
- `server/api/`: `snippets.get.ts` (public gists, cached 1 hour) and `open-source.get.ts` (merged pull requests, issues and contributor rank, cached 6 hours); `server/utils/github.ts` is the shared GitHub client
- `shared/tool-categories.ts`: the Tools page's areas (filter chips) and categories (section headings)
- `shared/code-theme.ts`: the brand Shiki themes for articles and gists
- `shared/types/`: types used by the app, the server and content schemas
- `content/`: everything the site displays; schemas in `content.config.ts`
- `public/brand-kit/`: the downloadable brand files linked from `/brand`
- `public/logos/`, `public/avatars/`: company logos (one-colour masks) and GitHub avatars

## Code conventions

- Vue SFCs use `<script setup lang="ts">` with the script body indented one level. Semicolons, single quotes, no trailing commas, stroustrup braces and a space before function parentheses are enforced by ESLint.
- Components are auto-imported by file name (`LogoTile.vue` is `<LogoTile>`, `brand/BrandSwatch.vue` is `<BrandSwatch>`).
- Read content through `queryCollection` and add new front matter fields to the collection schema in `content.config.ts`.
- Most content is data: add a YAML file to `content/projects`, `tools`, `uses`, `technologies`, `experience` or `contributions` rather than editing a page. The About page's headline, bio, pinned items, awards and vision live in `content/profile.yml`.
- A tool's `category` must be a name from `shared/tool-categories.ts`; add a category there (one line) rather than reusing a vague one.
- Snippets are the owner's public GitHub gists and contributions come from GitHub search; never copy them into `content/`. `content/contributions` only holds what GitHub cannot provide: maintainer roles, discussions and projects he started.
- Give every `useAsyncData` call a unique key. Nuxt 4 shares state between calls with the same key.
- Set page metadata with `usePageSeo({ title, description })`.
- Format dates with the helpers in `app/utils/date.ts` (fixed locale and UTC) so server and client render the same text.
- Pages are prerendered and links are crawled at build time; a new page only needs to be linked from somewhere. The exceptions read GitHub at request time with ISR: `/`, `/about` and `/open-source` (6 hours) and `/snippets` (1 hour). Such pages must still render when GitHub fails, but with a 503: Vercel then keeps serving the last good copy and retries, so an outage is never cached.
- The GitHub routes run without a token, but `NUXT_GITHUB_TOKEN` (no scopes) avoids the anonymous limit of 60 requests an hour. `NUXT_GITHUB_API_BASE` points them at a mock for offline work.

## Design rules

Dark by default with an optional light theme (`@nuxtjs/color-mode`, stored as `theme`). Do not change colours, spacing or typography unless the owner asks. The full brand system is documented on the `/brand` page.

- Use the semantic colour tokens from `main.css`, never raw hex in pages: `bg`, `surface` (tiles, hover), `raised` (cards, code), `line` (borders), `edge` (tile borders), `chip`, `fg`, `soft`, `muted`, `faint`, `mark` (icons), `accent` / `accent-2`. They switch with the theme.
- Iris (`iris-500` `#7F7CF2`) and Azure (`azure-500` `#4F9BFF`) are for small details only: hover, focus, badges, the live dot, one gradient word per page. Never more than about 5% of a screen.
- The signature is the logo. It is white on dark and black on light, takes the gradient only on hover/focus, and is drawn stroke by stroke by `SignatureMark`. Do not redraw or recolour it.
- Company logos are one-colour masks (`BrandLogo` / `LogoTile` with `logo:`) so they follow the theme; register new ones in `app/utils/logos.ts`. GitHub avatars and other logo photos get the `avatar-mono` utility (greyscale), so nothing on the site shows a logo in its own colours.
- Icons come from `@nuxt/icon` with the local `lucide` and `simple-icons` collections; LinkedIn is `brand:linkedin`.
- Code is highlighted with the brand themes in `shared/code-theme.ts` (Iris keywords, Azure strings and values, grey punctuation). Adjust those palettes instead of switching to a stock Shiki theme.
- Type: Geist for text, Geist Mono for labels, dates and code, Instrument Serif italic for one human phrase per page (all self-hosted via Fontsource).
- The page column is 880px (1040px on `/brand` via `definePageMeta({ wide: true })`); paragraphs are capped at 70ch by a base rule in `main.css`, and articles read in a 720px column. Tap targets are at least 44px.
- Respect `prefers-reduced-motion` for any new animation.
- Verify UI changes visually at desktop and phone widths, in both themes, before and after the change.

## Agent skills

Skills for this stack are pinned in `skills-lock.json` and are not committed: `nuxt`, `nuxt-content`, `nitro`, `vue`, `vue-best-practices`, `vue-debug-guides` (from `onmax/nuxt-skills`) and `web-design-guidelines` (from `vercel-labs/agent-skills`).

- Restore all of them into `.agents/skills/`: `npx skills experimental_install`
- Or install them for a specific agent:
  `npx skills add onmax/nuxt-skills -a <agent> -s nuxt -s nuxt-content -s nitro -s vue -s vue-best-practices -s vue-debug-guides`
  and `npx skills add vercel-labs/agent-skills -a <agent> -s web-design-guidelines`

`web-design-guidelines` fetches its rules from `vercel-labs/web-interface-guidelines` on GitHub each time it runs.

## Dependency notes

- Nuxt Content uses Node's built-in SQLite (`experimental.sqliteConnector: 'native'`), so there is no native `better-sqlite3` build. On Vercel it restores the database to `/tmp` for the ISR pages.
- `@nuxtjs/mdc`, `shiki` and `minimark` are direct dependencies because `server/api/snippets.get.ts` imports them; keep their ranges in step with what `@nuxt/content` uses.
- TypeScript stays on 6.x: `typescript-eslint` and `vue-tsc` do not support the TypeScript 7 native compiler yet, so Dependabot ignores TypeScript major updates.
- `overrides` in `package.json` exist only to clear security advisories:
  - `@nuxt/devtools` is forced to `4.0.0-beta.4` (npm's `latest` tag) because DevTools 3.x depends on a vulnerable `simple-git`. Nuxt 4.6 still asks for `^3.4.2`; drop the override once Nuxt depends on DevTools 4.
  - `@tailwindcss/typography` gets `postcss-selector-parser` `^7.1.6` instead of its pinned 6.0.10; the generated CSS is byte-identical. Drop it once the plugin updates the dependency.
- `npm audit` may still list `braces` (via `@nuxt/content` → `micromatch`) and `node-forge` (Nuxt dev server via `listhen`). Neither has a patched release, both are build/dev-time only, and neither ships in the deployed server bundle. Do not run `npm audit fix --force`: it "fixes" them by downgrading Nuxt and Nuxt Content.
