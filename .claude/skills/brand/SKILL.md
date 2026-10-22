---
name: brand
description: The visual identity of haythamasalama.me. Covers the signature logo, colour tokens and how much Iris and Azure a screen may hold, typography, logos and avatars, icons, layout widths, motion, the brand kit, and the name and title. Use when you design or review any UI, figure or image on the site, or edit the /brand page.
---

# Brand

The canonical guide is the `/brand` page (`app/pages/brand.vue`). The design rules in `AGENTS.md` summarise it. When either changes, update the other and this skill.

## Principles

1. **Ink first.** Black, white and generous space carry everything. If a layout works without colour, it's right.
2. **Signed by hand.** The signature is the logo: personal, a little imperfect on purpose, and never retyped, redrawn or replaced.
3. **Colour is a signal.** Iris and Azure live in small, precise places: a badge, a hairline, a focus ring. Rare colour is recognisable colour.

## Colour

- **Use the semantic tokens from `app/assets/css/main.css`, never raw hex in pages:** `bg`, `surface` (tiles, hover), `raised` (cards, code, figures), `line` (borders), `edge` (tile borders), `chip`, `fg`, `soft`, `muted`, `faint`, `mark` (icons), `accent` (Azure) and `accent-2` (Iris). They switch with the theme.
- **Iris and Azure are for details only, at most about 5% of a screen:**
  - **Iris** `#7F7CF2` is "the creative"; **Azure** `#4F9BFF` is "the engineer".
  - They go on focus rings, badges, the live dot, and one gradient word per page.
- **Hover and selected states are neutral.** Links and icons hover to `fg`. The current page and an active filter chip are neutral too.
- **The signature stays one colour on the site,** hover included (owner's choice, 2026-10-12). Its gradient version is for artwork such as covers.

## Signature

- White on dark and black on light, drawn stroke by stroke by `SignatureMark`.
- Never stretch it, recolour it, add glows or shadows, or place it on a busy background. Keep a quarter of its width clear on every side.

## Logos, avatars and icons

- **Logos and icons are one colour,** in both themes and on hover. Company logos are one-colour masks (`BrandLogo`, or `LogoTile` with `logo:`) registered in `app/utils/logos.ts`; avatars and logo photos use `avatar-mono` (greyscale). Logos inside figures are one colour too. Colour by default and colour on hover were tried and dropped (2026-10-12): many icons have no brand colour, and the mix looked uneven.
- **Icons come from `@nuxt/icon`** with the local `lucide` and `simple-icons` collections. LinkedIn is `brand:linkedin`.
- **Tech chips with framework icons are not used on project cards or pages.**

## Type

- **Geist** (400, 500, 600) for text and headings.
- **Geist Mono** for labels, dates, repositories and code.
- **Instrument Serif** italic for one human phrase per page.
- **Excalifont** is used only for labels inside figures (`--font-sketch`, defined on `.sketch`). All four are self-hosted.

## Layout and motion

- **Widths:**
  - The page column is 880px; `/brand` is 1040px (`definePageMeta({ wide: true })`).
  - Articles read in 720px.
  - Paragraphs are capped at 70ch.
- **Tap targets** are at least 44px.
- **Every animation respects `prefers-reduced-motion`.**
- **Figures sit on a `raised` card with a `line` border.** Below 600px they scroll sideways inside their card instead of shrinking their labels.

## Code

Code uses the brand Shiki themes in `shared/code-theme.ts`: Iris keywords, Azure strings and values, grey punctuation. Adjust those palettes; don't switch to a stock theme.

## Name and title

- **Full name:** Haytham A. Salama, spelled Haytham, never Haitham. **Short:** Haytham.
- **Title:** Senior Software Engineer · SaaS, AI, FinTech & Logistics.
- **Handle:** `@haythamasalama`.
- **Voice:** see the `content` skill.

## Share images

Each prerendered page gets a 1200×630 share image from `app/components/OgImage/Page.takumi.vue`, in the style of `public/og.png`: Ink background, the white signature top right, one Iris to Azure hairline along the top, a Geist Mono label, the title in Geist 600 and the description in Muted. Its colours are fixed hex because a share image has no theme.

## Brand kit

The downloadable files live in `public/brand-kit/` and are linked from the `kit` section of `/brand`. Regenerate them when the signature or colours change.
