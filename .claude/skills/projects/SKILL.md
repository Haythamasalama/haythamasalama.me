---
name: projects
description: How to add, explain or update a project on haythamasalama.me. Covers the card on /projects and the home page, when a project earns its own page, the fixed page structure (overview, problem, solution, what I did, what it offers, system design, in the product), what to write and what never to write, figures and screenshots, and the LinkedIn Projects draft. Use for any change under content/projects or public/projects.
---

# Projects

Load `content` (the writing rules) and `figures` (diagrams) alongside this skill. `site` explains the page code.

## The most important rule: a project page is not an article

A project page shows **the goal, the owner's role, what he did, how it helped the team, and the results**. It does not teach how something is built. Keep each technical part to one short paragraph, about what it is and what it made possible. The mechanics (configuration steps, request flows, field types, pipelines step by step) belong in an article (see `articles`), which can link back to the page. If a paragraph reads like a tutorial, cut it down to its outcome.

## Show more, write less

Most visitors don't read long text (owner's feedback, 2026-10-12). Keep a page to roughly 700 to 1,000 words, and let pictures carry the detail:

- Lead every section with a picture: a figure, a product screenshot, or a real photo or drawing of the hardware.
- Show how big a system is with a feature map: a figure that lists every module and what it does. Back it up with screenshots, instead of paragraphs.
- Keep paragraphs to two or three sentences, and bullets to one line.

## Files

| File | Holds |
|---|---|
| `content/projects/<slug>.yml` | the card: title, period, one-line description, mark, links, order, optional home highlight |
| `content/projects/<slug>.md` | the project page at `/projects/<slug>`, if the project has one |
| `app/assets/figures/<slug>/*.excalidraw` | the page's figures, generated from `scripts/figures/<slug>/*.mjs` |
| `public/projects/<slug>/*.webp` | screenshots |
| `claudedocs/projects/<slug>/` | the LinkedIn draft and figure exports; local only, never committed |

The `.yml` and `.md` share a file name. The page exists once the `.md` exists; the list and the home page then link to it ("About the project →").

## The card

```yaml
title: 'WINCH · Saudi logistics platform'   # "Name · what it is"
year: 2023                                  # start year; the list is grouped by it, newest first
context: Senior Software Engineer · Feb 2023 – now   # role (or company) · period
description: 'More than 50 domains behind a Saudi logistics platform, and the integration engine I built to connect it to government services, payment gateways and AI models.'
mark:
  logo: winch          # a logo from app/utils/logos.ts, or icon: lucide:wrench, image: /…, text: 'T'
links:
- label: winch.sa
  to: https://winch.sa/
order: 1               # position within its year
highlight:             # optional: shows it under "Selected work" on the home page
  title: WINCH · Saudi logistics platform
  description: The back end behind every app, and the integration engine I built …
  period: 2023 – now
  order: 1
```

- The description is one sentence of about 80 to 160 characters, and says what was built plus the owner's part.
- There are no tech chips; the schema has no tags. Small client sites are combined into one card ("Websites").

## Does it get a page?

Give a project its own page when there is a system to explain: architecture, a non-trivial flow, integrations, hardware. Early or small work stays a card. When unsure, ask the owner.

## The page

The front matter is only `description`, 150 to 220 characters, for search and link previews. The title, period and links come from the card. Use these sections in this order; the owner chose this structure. `reference/page-template.md` has a skeleton to copy.

1. **`## Overview`.** What the product is, who uses it, and the owner's role and when he joined. Three or four sentences.
2. **`## The problem`.** The problems the owner faced and solved in his role, not the company's business in general. One intro line, then three to five bullets, each starting with a bold lead-in.
3. **`## The solution`.** A before/after figure first. Then one short paragraph per problem, each starting with a bold lead-in that matches its problem.
4. **`## What I did`.** Bullets with precise attribution (see `content`): built, designed, led, proposed, maintain, "the team wrote X; I built the Y it runs on". Include leadership and reviews.
5. **`## What it offers`.** A `::feature-grid` of six to eight product capabilities. Use the company's public site as the source when it has one.
6. **`## System design`.** An architecture figure and one paragraph, then `###` subsections in the same order as the problems. Each subsection gets a figure, or two or three short paragraphs with bold lead-ins. Say what each part does and what it made possible for the team or the product. The figure carries the detail; the text stays short.
7. **`## In the product`** holds `::project-shot` screenshots and real photos.
   - **Where it applies:** the owner's own products, and employer projects where he asked for screenshots. So far that is the Faris projects (vehicle inspection, wash stations). Leave it off WINCH and other employer pages unless he asks.
   - **Privacy:** blur anything that identifies a customer or employee (see Screenshots).
8. Optional extra `##` sections, for example "AI in the engineering workflow". Use a figure, one paragraph on the goal and what the owner set up, then "What it changed" bullets.

Aim for three to six figures on a full page. Each figure's title matches its section heading, and each has a full `alt` and a one-sentence caption.

## Do

- **Research before writing:**
  - Read the source repos.
  - Measure authorship per module with git.
  - Read docs and ADRs.
  - Read the company's public pages.
- **List the claims you plan to make, and confirm with the owner anything the code doesn't show.**
- **Lead with goal, role and result:** what was missing, what he built or led, and what it changed for the team, the product or the business. Name the engine or mechanism, but don't walk through it.
- **Keep the owner's voice:** first person, plain, specific.

## Don't

Everything under "Employers and clients" in the `content` skill applies, in particular:

- No internal counts or dated milestones. Growing counts are "more than N".
- No vendor or tool name lists, no AI tooling vendor names, no framework names.
- No colleague names on the site, no secrets or internals, no screenshots with private data.
- Don't describe the company's whole business as the owner's problem, or a teammate's work as his.

## Screenshots

- **Size and format:** WebP, 1760px wide.
- **Themed pair:** `public/projects/<slug>/<name>-dark.webp` and `<name>-light.webp`, used as `::project-shot{src="/projects/<slug>/<name>" …}`.
- **Single image:** `::project-shot{src="/projects/<slug>/<name>.webp" single …}`.
- **Data:**
  - Use demo data where you can.
  - **Faris screenshots** (vehicle inspection, wash stations): the owner said not to blur them, so use them as they are.
  - **Other employers' screenshots:** blur personal data before export (names, phone numbers, plates, emails, card and ID numbers), unless the owner says otherwise. Crop away whole areas that are mostly personal data, such as lists of customers.
  - Leave screenshots off employer pages he hasn't asked for.
- **Blurring:** with sharp, `extract` each region, `blur(18)` it and `composite` it back, then resize and save as WebP.
- **Checking:** look at every exported image before you publish it.
- **Resizing:** `sips` can't write WebP. Install `sharp` in a scratch folder (`npm install sharp`), then for example:

```js
await sharp('in.png').resize({ width: 1760 }).webp({ quality: 82 }).toFile('out.webp');
```

## LinkedIn draft

Write `claudedocs/projects/<slug>/linkedin.md` with these fields:
- **Project name**, **dates** and **Associated with**.
- **Project URL:** `https://haythamasalama.me/projects/<slug>`.
- **Media:** the figure exports as WebP, in the same folder (see `figures`).
- **Contributors:** colleagues can be named here.
- **Skills:** up to five.
- **Description:** under 2,000 characters, following the same rules as the page. Count it.

## Before you finish

- `npm run lint && npm run build` pass, and the page is prerendered (`/projects/<slug>` appears in the build log).
- You looked at the page at desktop and 375px, in both themes, with no overflow in any figure.
- Every number and name has been checked against the rules above.
- Tell the owner what you verified, what came from him, and what still needs his confirmation.
