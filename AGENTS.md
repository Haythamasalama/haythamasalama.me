# AGENTS.md

Personal portfolio of Haytham A. Salama, built with Nuxt 4, Nuxt Content 3 and Tailwind CSS 4, deployed on Vercel.

## Commands

- `npm run dev`: dev server on `http://localhost:3000`
- `npm run lint` / `npm run lint:fix`: ESLint 10 flat config (`@nuxt/eslint`)
- `npm run typecheck`: `vue-tsc` through `nuxt typecheck`
- `npm run build` / `npm run preview`: production build and preview

Node.js `22.22+` or `24.15+` (see `.nvmrc`). Before finishing a change, run `npm run lint && npm run typecheck && npm run build`; CI runs the same three steps.

## Layout

- `app/`: Nuxt 4 source directory (`pages/`, `components/`, `assets/css/main.css`, `app.config.ts`, `types.ts`)
- `app/components/content/`: components usable from Markdown (MDC) and prose overrides
- `content/`: articles, projects, contributions, technologies, tools and uses; schemas in `content.config.ts`
- `server/routes/sitemap.xml.ts`: sitemap, prerendered at build time
- `tailwind.config.js`: only the Typography (`prose`) customization, loaded from `main.css` with `@config`

## Code conventions

- Vue SFCs use `<script lang="ts" setup>` with the script body indented one level. Semicolons, single quotes, no trailing commas and stroustrup braces are enforced by ESLint.
- Components are auto-imported from kebab-case files (`card.vue` is `<Card>`, `icon/github.vue` is `<IconGithub>`).
- Read content through `queryCollection` and add new front matter fields to the collection schema instead of reading `meta`.
- Give every `useAsyncData` call a unique key. Nuxt 4 shares state between calls with the same key; use getter keys when the query depends on the route.
- Build URLs containing `//` in `<script>` rather than inside template bindings: `vue-tsc` mis-parses them and reports the `v-for` variable as missing.
- `Card` renders as a link when `to` is set, so never put another link inside it.
- Format dates on a fixed locale and time zone so server and client render the same text.

## Design rules

The site has a single dark design. Do not change colors, spacing or typography unless the owner asks.

- Theme tokens are in the `@theme` block of `app/assets/css/main.css`: `primary` `#5194FF`, `secondary` `#7981E6` and a custom gray scale (`gray-600` page background, `gray-500` cards and borders, `gray-400` muted text, `gray-100` body text).
- The Tailwind v4 setup deliberately keeps the v3 defaults the design was built on: default border color `gray-500`, default ring `3px rgb(59 130 246 / 0.5)`, pointer cursor on buttons and sRGB gradients (`bg-linear-to-r/srgb`). Keep that compatibility layer.
- Shared custom utilities: `bg-primary-gradient`, `text-primary-gradient`, `transition-primary`, `title-heading-primary`.
- Articles use `prose prose-primary`; code blocks are highlighted with Shiki's `one-dark-pro`.
- Font: self-hosted Inter variable font (`app/assets/fonts/Inter.woff2`).
- Verify UI changes visually at desktop and mobile widths before and after the change.

## Agent skills

Skills for this stack are pinned in `skills-lock.json` and are not committed: `nuxt`, `nuxt-content`, `nitro`, `vue`, `vue-best-practices`, `vue-debug-guides` (from `onmax/nuxt-skills`) and `web-design-guidelines` (from `vercel-labs/agent-skills`).

- Restore all of them into `.agents/skills/`: `npx skills experimental_install`
- Or install them for a specific agent:
  `npx skills add onmax/nuxt-skills -a <agent> -s nuxt -s nuxt-content -s nitro -s vue -s vue-best-practices -s vue-debug-guides`
  and `npx skills add vercel-labs/agent-skills -a <agent> -s web-design-guidelines`

`web-design-guidelines` fetches its rules from `vercel-labs/web-interface-guidelines` on GitHub each time it runs.

## Dependency notes

- TypeScript stays on 6.x: `typescript-eslint` and `vue-tsc` do not support the TypeScript 7 native compiler yet, so Dependabot ignores TypeScript major updates.
- `npm audit` reports build and dev-time advisories that have no upstream fix yet: `braces` (via `@nuxt/content`), `node-forge` (Nuxt dev server), `simple-git` (`@nuxt/devtools`, whose import breaks on simple-git 4) and `postcss-selector-parser` (pinned by `@tailwindcss/typography`). None of them ship in the deployed server bundle.
