---
name: open-source
description: How the Open source page and the open-source sections on Home and About work on haythamasalama.me. Live pull requests, issues and contributor rank come from GitHub; maintainer roles, discussions and created projects come from content/contributions. Use when adding a contribution, a maintainer role, a discussion or a project the owner started, or when changing how open-source activity is shown.
---

# Open source

## Where the data comes from

- **Live from GitHub:** `server/api/open-source.get.ts` searches GitHub for the owner's merged pull requests and issues in other people's repositories, and works out his contributor rank. Results are cached for 6 hours.
  - The owner's own repositories and the organisations in `runtimeConfig.github.ownOrgs` (in `nuxt.config.ts`) are left out.
  - The shared client is `server/utils/github.ts`.
- **Kept by hand:** `content/contributions/*.yml` holds only what GitHub cannot tell: maintainer roles, discussions, projects he started, and pull requests GitHub doesn't count as merged.
- **Merged in `app/composables/useOpenSource.ts`:** this composable feeds Home (the teaser), About and `/open-source`. If GitHub fails, the page still renders, but as a 503, so Vercel keeps the last good copy.

Never copy pull requests or issues into `content/`. GitHub is the source of truth for them.

## A contribution file

```yaml
repo: nuxt/ui                 # owner/name on GitHub; the rank and numbers are looked up from it
name: Nuxt UI                 # display name, if not the repo name
url: https://github.com/nuxt/ui
avatar: /avatars/nuxt.png     # in public/avatars, in colour in light mode, greyscale in dark until hovered (or icon: simple-icons:…, or a logo file in public/logos)
kind: maintainer              # maintainer | contributor | discussion | created
featured: true                # listed under "Contributed to" at the top of /open-source
description: The UI library for Nuxt   # one line, for created and contributor entries
badge: Nuxt UI team
role: Maintainer · 2 months
note: I review pull requests, fix components and shape their APIs.
pullRequests: [1234]          # PRs to show even if GitHub doesn't count them as merged
stats:                        # numbers GitHub can't tell
  - label: As maintainer
    value: 2 months
links:
  - label: Nuxt UI team page
    to: https://ui.nuxt.com/team
order: 1
```

## Common tasks

- **A new maintainer role:**
  - Add a file with `kind: maintainer` and `featured: true`.
  - Write a `note` in first person about what he does.
  - Put the avatar in `public/avatars/` as a square PNG.
- **A project he started:** use `kind: created`. If it lives in an organisation of his own, add the organisation to `ownOrgs`, so its activity isn't counted as a contribution to someone else.
- **A discussion or RFC:** use `kind: discussion`, with links to the thread.
- **A pull request that doesn't show up:** add its number to `pullRequests` on the repository's entry.

## Rules

- Keep the copy factual: roles, dates and links that can be checked.
- No inflated wording: "contributor", not "core contributor", unless the project says so.
- Avatars follow the logo rule: colour in light mode, greyscale in dark mode until hovered (see `brand`).
- **To work offline or with a mock,** set `NUXT_GITHUB_API_BASE`. **To avoid the anonymous limit** of 60 requests an hour, set `NUXT_GITHUB_TOKEN` (no scopes needed).

## Before you finish

- `npm run lint && npm run build` pass.
- Check `/open-source`, the Home teaser and the About section at desktop and 375px, in both themes. Compare the live numbers with GitHub.
