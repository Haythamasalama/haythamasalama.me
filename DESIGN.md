# Haytham A. Salama — Style Reference

> Signed by hand. Built with care. Ink first, colour as a signal.

**Theme:** dark (default), with an optional light theme

Every value here is taken from the source: `app/assets/css/main.css`, `shared/code-theme.ts`, the components in `app/components/` and the `/brand` page (`app/pages/brand.vue`). Sizes are the ones the site actually uses, not a rounded scale. Where the site uses a one-off size (for example `13.5px`), it is kept. The HTML examples are Tailwind v4 classes as they appear in the components; rebuild them in any stack with the tokens below.

A quiet, personal, editorial system for a software engineer's site. Near-black Ink (`#0B0B0C`) and soft white text carry about 95% of every screen; layout is a single narrow column (880px) with generous vertical rhythm, hairline borders instead of shadows, and small uppercase monospace eyebrows above each section. Geist does the reading, Geist Mono labels everything that is data (dates, periods, repositories, counts), and one phrase per page is set in Instrument Serif italic with the Iris → Azure gradient. Colour is rare on purpose: Iris (`#7F7CF2`, "the creative") and Azure (`#4F9BFF`, "the engineer") appear only on badges, focus rings, the pulsing live dot, thin hairlines and that one gradient word — never more than ~5% of a screen. Hover and selected states stay neutral (they brighten to `fg`, never to colour). The logo is a handwritten signature that draws itself stroke by stroke. Logos and icons are always one colour. Elevation is flat: depth comes from `surface` / `raised` fills and 1px `line` borders, not shadows.

---

## Tokens — Colors

Semantic tokens switch with the theme (`.dark` is the default on `:root`; `.light` overrides). Use the semantic tokens in UI, never raw hex.

### Semantic (dark — default)

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0B0B0C` | `--bg` / `--color-bg` | Page background |
| Surface | `#131316` | `--surface` / `--color-surface` | Tiles, logo tiles, row hover, active chip fill |
| Raised | `#0F0F11` | `--raised` / `--color-raised` | Cards, code blocks, figures, callouts, hero panel |
| Line | `#1F1F23` | `--line` / `--color-line` | Borders, dividers, rules, timeline rail |
| Edge | `#232328` | `--edge` / `--color-edge` | Logo tile and avatar borders |
| Chip | `#2A2A30` | `--chip` / `--color-chip` | Chip / pill borders, hover border of cards, bullets |
| Text | `#EDEDEF` | `--fg` / `--color-fg` | Headings, primary text, hover target, current page (16.7 : 1 on Ink) |
| Soft | `#C4C4CC` | `--soft` / `--color-soft` | Body paragraphs, lead text, article body |
| Muted | `#A1A1AA` | `--muted` / `--color-muted` | Secondary text, descriptions, nav links at rest (7.7 : 1) |
| Faint | `#85858F` | `--faint` / `--color-faint` | Eyebrows, dates, meta, captions (5.4 : 1) |
| Mark | `#D4D4D8` | `--mark` / `--color-mark` | Icons and one-colour logos |
| Underline | `#3F3F46` | `--underline` | Link underline colour at rest |
| Accent | `#4F9BFF` | `--accent` / `--color-accent` | Azure 500 — details only |
| Accent 2 | `#7F7CF2` | `--accent-2` / `--color-accent-2` | Iris 500 — focus ring, quote border, info icon |
| Gradient | `linear-gradient(90deg, #7F7CF2, #4F9BFF)` | `--gradient` | Gradient word, badge border, progress bar |
| Signature gradient | `linear-gradient(90deg, #7F7CF2, #6C8CF9, #4F9BFF)` | `--gradient-signature` | Hairlines, artwork, share images |
| Selection | `rgb(127 124 242 / 0.35)` | `::selection` | Text selection |

### Semantic (light)

| Name | Value | Token | Role |
|---|---|---|---|
| Paper | `#FFFFFF` | `--bg` | Page background |
| Surface | `#F4F4F5` | `--surface` | Tiles, hover |
| Raised | `#FAFAFA` | `--raised` | Cards, code, figures |
| Line | `#E4E4E7` | `--line` | Borders |
| Edge | `#E4E4E7` | `--edge` | Tile borders |
| Chip | `#D4D4D8` | `--chip` | Chip borders |
| Text | `#0B0B0C` | `--fg` | Primary text |
| Soft | `#3F3F46` | `--soft` | Body |
| Muted | `#52525B` | `--muted` | Secondary |
| Faint | `#6B6B74` | `--faint` | Meta, eyebrows |
| Mark | `#27272A` | `--mark` | Icons, logos |
| Underline | `#D4D4D8` | `--underline` | Link underline |
| Accent | `#2873D1` | `--accent` | Azure 600 |
| Accent 2 | `#6762D3` | `--accent-2` | Iris 600 |
| Gradient | `linear-gradient(90deg, #6762D3, #2873D1)` | `--gradient` | Same uses as dark |
| Signature gradient | `linear-gradient(90deg, #6762D3, #4F6AD2, #2873D1)` | `--gradient-signature` | Artwork |

### Brand scales

| Step | Iris | Azure |
|---|---|---|
| 50 | `#F5F6FE` | `#F2F7FE` |
| 100 | `#E9EBFE` | `#E2EEFF` |
| 200 | `#D4D7FE` | `#C5DDFE` |
| 300 | `#BABEFE` | `#9EC7FE` |
| 400 | `#9D9FFE` | `#70ADFF` |
| **500** | **`#7F7CF2`** | **`#4F9BFF`** |
| 600 | `#6762D3` | `#2873D1` |
| 700 | `#534DAF` | `#195CAE` |
| 800 | `#3F3B87` | `#134686` |
| 900 | `#2C2A62` | `#0D3261` |
| 950 | `#1D1B45` | `#052144` |

Tokens: `--color-iris-{step}`, `--color-azure-{step}`. Use **300–500 for details on dark**, **600–700 for details on white** and for buttons with white text. Fixed: `--color-ink: #0B0B0C`, `--color-paper: #FFFFFF`.

Extra gradients from the brand kit (artwork only): `--gradient-glow: linear-gradient(90deg, #9D9FFE, #70ADFF)`, `--gradient-text: linear-gradient(90deg, #BABEFE, #9EC7FE)`, `--gradient-deep: linear-gradient(90deg, #6762D3, #2873D1)`.

### The 95 / 5 rule

70% Ink · 25% white, greys and the signature · never more than **5%** Iris + Azure on any screen.

---

## Tokens — Typography

### Geist — text, headings and everything you read · `--font-sans`
- **Stack:** `'Geist Variable', ui-sans-serif, system-ui, sans-serif` (self-hosted via `@fontsource-variable/geist`)
- **Substitute:** Inter
- **Weights:** 400, 500, 600 (never 700+)
- **Sizes:** 13, 13.5, 14, 14.5, 15, 17, 28–30, 44px
- **Line height:** 1.6–1.7 for running text, 1.08–1.25 for headings
- **Letter spacing:** negative on headings (`-0.01em` → `-0.03em`), normal for text
- **Role:** all UI and reading text; headings in 600 with tight tracking

### Geist Mono — labels, dates, repositories, counts and code · `--font-mono`
- **Stack:** `'Geist Mono Variable', ui-monospace, monospace`
- **Substitute:** JetBrains Mono
- **Weights:** 400, 500
- **Sizes:** 9.5, 10, 10.5, 11, 11.5, 12, 13, 14px; 18–28px for stat values
- **Letter spacing:** `0.08em` uppercase for eyebrows, `0.1em` for badges, `0.04em` for samples
- **Role:** anything that is data: section eyebrows, periods (`JUL 2023`), repository names (`laravel/framework #46405`), counts on chips, file names in code blocks, stats

### Instrument Serif Italic — one human phrase per page · `--font-serif`
- **Stack:** `'Instrument Serif', Georgia, serif` (latin 400 italic only)
- **Weights:** 400 italic
- **Sizes:** 20–22px inline in 15–17px text; 40px as a specimen
- **Role:** exactly one phrase per page (e.g. "software engineer"), usually with `text-gradient`. Never a heading, never a paragraph.

### Excalifont — figure labels only · `--font-sketch`
- Hand-drawn face from Excalidraw, used only inside diagrams (`.sketch`). Never in UI.

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token / class |
|---|---|---|---|---|---|---|
| display (brand hero) | Geist | 600 | 44px | 1.08 | -0.03em | `text-[44px] leading-[1.08] tracking-[-0.03em]` |
| h1 page title | Geist | 600 | 28px (30px ≥ md) | 1.25 | -0.02em | `text-[28px] md:text-[30px] leading-tight` |
| h3 card title | Geist | 600 | 17px | 1.4 | -0.01em | `text-[17px] font-semibold` |
| lead | Geist | 400 | 17px | 1.7 | 0 | `text-[17px] leading-[1.7] text-soft` |
| body | Geist | 400 | 15px | 1.65–1.7 | 0 | `text-[15px] leading-[1.7] text-muted` |
| list title | Geist | 500 | 15–16px | 1.5 | 0 | `text-[15px] font-medium` |
| small | Geist | 400 | 14px / 13.5px | 1.55–1.6 | 0 | `text-sm text-muted` |
| nav / caption | Geist | 400 | 13–14px | 1.5 | 0 | `text-sm`, `text-[13px]` |
| eyebrow | Geist Mono | 500 | 12px | 1.5 | 0.08em, uppercase | `.eyebrow` |
| meta / date | Geist Mono | 400 | 12px | 1.5 | 0 | `font-mono text-xs text-faint` |
| badge | Geist Mono | 500 | 9.5–10.5px | 16px | 0.1em, uppercase | `font-mono text-[10.5px] tracking-[0.1em]` |
| stat value | Geist Mono | 500 | 18–28px | 1.2 | 0 | `font-mono text-lg font-medium` |
| code | Geist Mono | 400 | 13px | 1.7 | 0, tab-size 2 | `font-mono text-[13px] leading-[1.7]` |
| accent phrase | Instrument Serif | 400 italic | 22px | inherit | 0 | `font-serif italic text-[22px] text-gradient` |

Rendering: `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility`. Paragraphs inside `main` are capped at **70ch**.

---

## Tokens — Spacing & Shapes

**Base unit:** 4px (Tailwind) · **Density:** airy — generous vertical space, compact rows

### Spacing Scale

| Name | Value | Use |
|---|---|---|
| 0.5 | 2px | Badge vertical padding, ViewToggle inset |
| 1 | 4px | Tight gaps |
| 1.5 | 6px | Chip gaps, arrow offset |
| 2 | 8px | Chip/list gaps |
| 2.5 | 10px | Card inner gaps, row padding (y) |
| 3 | 12px | Row padding, grid gaps, hover bleed (`-mx-3 p-3`) |
| 3.5 | 14px | Pill padding (x), row gap |
| 4 | 16px | Card padding (mobile), grid gaps, figure gaps |
| 4.5 | 18px | Code padding (x), small card padding |
| 5 | 20px | Card padding (md), bio card padding |
| 5.5 | 22px | Principle card padding, typography rows |
| 6 | 24px | Page side gutter (`px-6`), section intro gap |
| 7 | 28px | Header top (md), footer top |
| 8 | 32px | Hero text spacing |
| 10 | 40px | Footer bottom, figure margins |
| 16 | 64px | Section top padding (`pt-16`) |
| 18 | 72px | Section top padding on Home/Brand (`pt-[72px]`) |
| 20 | 80px | Hero top (md) |
| 22 | 88px | PageHeader top (md) |
| 24 | 96px | Space before the footer (`mt-24`) |

### Border Radius

| Element | Value |
|---|---|
| Focus ring | 4px |
| Badges (PRO, LIVE, NEW), code-lang chips | 5–6px (`rounded-md`) |
| Icon buttons, copy button, small tiles | 6–8px (`rounded-md` / `rounded-lg`) |
| Hover rows (lists) | 8–10px |
| Logo tiles | size ÷ 4 (36 → 9px, 44 → 11px, 52 → 13px) |
| Code blocks, figures, screenshots, callouts, stat strip, download rows | 12px (`rounded-xl`) |
| Swatch / info cards, bio cards | 14px |
| Content cards, principle cards | 16px (`rounded-2xl`) |
| Hero panel (brand) | 22px |
| App icon | 28px at 120px, 14px at 60px |
| Chips, pills, nav CTA, filter chips, toggles, avatars | 9999px (`rounded-full`) |

### Shadows

| Name | Value | Token |
|---|---|---|
| none | — | Cards, tiles, code, figures have **no shadow** |
| avatar hairline | `0 0 0 1px var(--edge)` | `.avatar-mono` |
| photo hover ring | `0 0 0 2px var(--bg), 0 0 0 3.5px var(--chip)` | `.photo:hover` |
| live pulse | `0 0 0 0 → 0 0 0 9px rgb(127 124 242 / 0)` | `--animate-live` |

### Layout
- **Page max-width:** 880px (default) · 1040px for `/brand`, project, app and design-pattern pages · 720px article column
- **Page gutter:** 24px (`px-6`), centred (`mx-auto`)
- **Section gap:** 64–72px top padding per section
- **Card padding:** 16px mobile / 20px desktop; 22px for principle cards
- **Element gap:** 8–16px in lists and grids
- **Paragraph measure:** 70ch
- **Grids:** `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` with N = 150–320px, so they collapse to one column on phones without breakpoints
- **Tap targets:** at least 44px (`min-h-11`, `size-11`)

---

## Components

### Header
**Role:** Top bar with the signature logo and primary navigation
Flex row, `justify-between`, `pt-4` (`md:pt-7`), no background, no border. Left: the animated `SignatureMark` (72px wide mobile, 80px desktop), redrawn on every page change. Right (≥ md): text links at 14px, `muted` at rest, `fg` on hover and for the current page (`aria-current="page"`), 20px gap, each 44px tall. After the links, a **More** button with a chevron opens a panel of smaller pages: `rounded-xl border border-line bg-raised p-1.5`, 44px links, hover `bg-surface`. Ends with a **Contact** pill: `rounded-full border border-chip px-3.5 min-h-9 text-fg`, hover `bg-surface`. Mobile: a 44px icon button with two 1.5px lines that rotate into a cross; the menu is a full-screen `bg-bg` overlay whose links slide in one after another (28ms stagger, `menu-in` 0.32s), with the smaller pages under a More eyebrow.

### Footer
**Role:** Copyright, secondary links, socials and theme toggle
`mt-24 border-t border-line pt-7 pb-10`, flex `justify-between`. Left: `© 2022–YYYY Haytham A. Salama` and links (Snippets, Tools, Uses, Brand) at 13px `faint`, hover `fg`. Right: 44px icon buttons in `mark`, hover `bg-surface text-fg` with `rounded-lg`, a 1px × 20px `line` divider, then the sun/moon theme toggle.

### Section Title (Eyebrow)
**Role:** Label above every section, doubles as a shareable anchor link
Geist Mono 12px, weight 500, `0.08em` tracking, UPPERCASE, `faint`. Optionally numbered (`01 · The signature`). The text links to `#id`; clicking scrolls smoothly unless reduced motion is on. 12–24px gap below.

### Page Header
**Role:** Title and intro on inner pages
`pt-16 md:pt-[88px]`; h1 28/30px 600 `-0.02em`; then 17px `soft` paragraphs at `leading-[1.7]` with 10px between them.

### Hero (Home)
**Role:** Who, what, now
60px round portrait (`photo`: tilts -3° and scales 1.04 on hover with a ring) next to the name (28px 600) and the role in Geist Mono 13px `faint`. Then two 17px `soft` paragraphs; the first contains the one gradient serif phrase. Then a GoLink, a "Now" status pill and a row of social icons. Each block enters with `animate-rise` at staggered delays (0.05s → 0.55s).

### Status Pill ("Now")
**Role:** Current position, with the live dot
`w-fit rounded-full border border-line py-2 pl-3 pr-3.5 text-sm text-muted` (becomes `rounded-2xl` when it wraps on phones). Leads with an 8px live dot: `rounded-full bg-linear-135 from-iris-500 to-azure-500 animate-live`. "Now" in `fg`; company names are `link-underline` with a one-colour logo inline before them.

### Live Dot
**Role:** The only animated colour on the page
6–8px circle, 135° Iris → Azure gradient, pulsing ring `live` 2.2s ease-out infinite (Iris at 60% → 0 over 9px). Static under reduced motion.

### Gradient Badge
**Role:** PRO / LIVE / NEW / version labels
Transparent fill with a 1px gradient border (`.border-gradient`: `linear-gradient(var(--bg), var(--bg)) padding-box, var(--gradient) border-box`), `rounded-md px-[7px] py-0.5`, Geist Mono 9.5–10.5px, `0.1em`, uppercase, text set in `.text-gradient`. Variant with the live dot: `h-6 rounded-full px-2.5 gap-1.5`.

### Gradient Word
**Role:** One human phrase per page
`font-serif italic text-[22px] text-gradient pr-0.5` inside a 17px paragraph (20px in 15px text). Background-clip text with `--gradient`. Never on hover, never twice on a page.

### Link (inline)
**Role:** Text links in prose
Three utilities, all neutral:
- `.link` — `fg`; on hover a 1px underline in `--underline` at 4px offset.
- `.link-underline` — always underlined in `--underline` (1px, 4px offset); hover turns the underline `fg`.
- `.link-muted` — `muted`, hover `fg`.
Colour transitions 0.2s with `--ease-out-soft`.

### GoLink (Text link with arrow)
**Role:** "All work →", "More about me →" section exits
`link-muted inline-flex min-h-11 items-center text-sm` with a trailing `→` (or `↗` for external) 6px away that nudges 3px right on hover (0.25s).

### List Row (hover row)
**Role:** Selected work and articles, contributions on Home
Whole row is the link: `-mx-3 flex gap-3 rounded-[10px] p-3 transition-colors hover:bg-surface` (bleeds into the gutter so the hover fill aligns text with the column). Left: a LogoTile (36px) or 16px icon in `mark`. Middle: title 15px 500 (`fg`) + description 14px `muted`. Right, baseline-aligned: date/period in Geist Mono 12px `faint`. No borders between rows.

### Logo Tile
**Role:** Company logo, tool icon or avatar in a square
Square at 36 / 44 / 52px, radius = size ÷ 4, `border border-edge bg-surface text-mark`, glyph 18–22px. Logos are one-colour masks that follow the theme; photos (GitHub avatars) are greyscale via `.avatar-mono`. A text fallback uses Geist Mono 13px 500 `soft`.

### Tech Chip
**Role:** Skill / stack tag
`inline-flex rounded-full border border-line text-[13px] leading-[18px] text-soft`, padding `py-1 pl-2 pr-2.5` (md: `py-[5px] pl-[9px] pr-[11px]`), optional 14px icon in `mark`. Strong variant: `border-chip text-fg`. Not used on project cards.

### Filter Chips
**Role:** Category filters (Tools, Work, Blog)
`min-h-9 rounded-full px-3.5 text-[13px]`. Rest: `border border-chip text-muted`, hover `text-fg`. Selected (`aria-pressed`): `border-fg bg-surface text-fg` — neutral, never coloured. A Geist Mono 11.5px count at 65% opacity follows the label; optional gradient badge.

### View Toggle (segmented)
**Role:** Grid / list switch
`rounded-full border border-chip p-0.5` holding 32px round icon buttons; active `bg-surface text-fg`, rest `text-muted`, hover `fg`.

### Content Card
**Role:** Any clickable card in a grid: Work, guides, tools, design patterns, the More projects and More apps grids
`ContentCard`: `flex h-full flex-col gap-3 rounded-2xl border border-line p-4 md:p-5`, transparent fill; hover `border-chip bg-surface`. A 40px LogoTile beside the title 15px 500 (`fg`) and an optional meta in Geist Mono 12px `faint`, an arrow at the end of the title line (`→`, or `↗` for a link that leaves the site), then an optional description 14px `muted`. On Work it has no description, three columns from `md`.

### Principle Card
**Role:** Numbered statement
`rounded-2xl border border-line p-[22px] flex flex-col gap-2.5`; number in Geist Mono 12px (Iris 400 → Azure 400 across the set), title 17px 600 `-0.01em`, text 14px `muted` 1.6.

### Stat Strip
**Role:** Key numbers
A grid whose 1px gaps show the `line` colour: `grid gap-px overflow-hidden rounded-xl border border-line bg-line`; each cell `bg-bg px-4 py-3.5`, value Geist Mono 20–28px 500 above a 13px `faint` label. Inline variant on Home: values Geist Mono 18px, labels 12px, no boxes.

### Timeline Item
**Role:** Experience and education
44px LogoTile left; a 1px `line` rail joins each tile to the next. Title 16px 500 (link-underline) + domain `↗` in Geist Mono 12px; period Geist Mono 12px `faint` on the right; subtitle 14px `soft`; highlights as 14px `soft` with 5px `muted` round bullets.

### Code Block
**Role:** Highlighted code in articles and gists
`rounded-xl border border-line bg-raised overflow-hidden`. Header row 44px tall: file name (Geist Mono 12px `soft`) + language (`faint`) on the left, Copy button on the right. Code area: `border-t border-line/60 px-[18px] py-4 font-mono text-[13px] leading-[1.7]`, scrolls horizontally. Brand Shiki themes (see below).

### Copy Button
**Role:** Copy code or bios
`min-h-8 rounded-md px-2 text-xs text-muted`, hover `bg-surface text-fg`, 14px `copy` icon. After copying: `check` icon in `accent-2` and the word "Copied" in `text-gradient`, announced with `aria-live`.

### Info Callout
**Role:** `::alert-info` in Markdown
`rounded-xl border border-line bg-raised px-4 py-3.5 text-[15px] text-soft flex gap-3`, a 16px `info` icon in `accent-2`, optional "Read more ↗" `link-underline`.

### Figure (sketch)
**Role:** Hand-drawn Excalidraw diagram
Card `rounded-xl border border-line bg-raised px-3 py-4 md:px-6 md:py-6`, caption 14px `muted` 12px below. Drawn with rough.js in Excalifont; colours map to theme tokens so it follows light/dark. Below 600px it scrolls sideways instead of shrinking labels.

### Screenshot
**Role:** Product shot
Same card as figures with `overflow-hidden`; ships `-dark.webp` and `-light.webp` and swaps with the theme. Caption 14px `muted`. Demo data only.

### Download Row
**Role:** Brand-kit files
`link flex items-center gap-3.5 rounded-xl border border-line py-2.5 pl-2.5 pr-3.5`, hover `border-chip bg-surface`. 44px preview tile (`rounded-[10px] border-[#232328]`), name 14.5px 500, meta Geist Mono 11.5px `faint`, "Download" 13px `muted` with an arrow-down icon.

### Progress Bar
**Role:** Lesson / path progress
4px tall, `rounded-xs bg-line`, fill `var(--gradient)`. A thin bar, never a block.

### Signature Mark
**Role:** The logo
SVG 156 × 79 viewBox, `stroke-width 3.2`, round caps and joins, stroke `var(--fg)` (white on dark, black on light). Each path animates `stroke-dashoffset` to 0 with `cubic-bezier(0.55, 0, 0.35, 1)`, stroke by stroke. One colour on the site, hover included.

### Share Image (OG)
**Role:** 1200 × 630 social card per page
Ink background, 2px signature-gradient hairline across the top, white signature top right at ~30% width and 90% opacity, a Geist Mono label, title in Geist 600 (`-0.02em`), description in `#A1A1AA`, domain in Geist Mono `#85858F`. Fixed hex (a share image has no theme).

---

## Do's and Don'ts

### Do
- Build every layout in black, white and greys first; if it works without colour, it's right.
- Use the semantic tokens (`bg`, `surface`, `raised`, `line`, `edge`, `chip`, `fg`, `soft`, `muted`, `faint`, `mark`, `accent`, `accent-2`) so both themes work with no extra code.
- Put Iris and Azure only on focus rings, badges, the live dot, thin hairlines, a progress bar and one gradient word — at most ~5% of a screen.
- Hover to a brighter neutral: links and icons go to `fg`, rows and buttons gain a `surface` fill, cards swap `line` for `chip` borders.
- Label data in Geist Mono (dates, periods, counts, repos, file names) and section headings with the uppercase mono eyebrow.
- Separate with 1px `line` borders and `raised` fills instead of shadows.
- Give every interactive element a 44px tap target and a visible `focus-visible` ring (2px `accent-2`, 2px offset, 4px radius).
- Respect `prefers-reduced-motion`: turn off the signature drawing, rise, pulse, menu stagger, the apps loop and hover transforms.
- Show logos and icons in one colour (`mark`); show photos of logos in greyscale.

### Don't
- Don't colour hover or selected states — no gradient on hover, no coloured current-page link, no coloured active chip.
- Don't stretch, recolour, add glows or shadows to, or place the signature on a busy background; keep ¼ of its width clear around it; don't go below 56px (use the heavier "small" file under 120px).
- Don't use raw hex in pages; don't use a stock Shiki theme.
- Don't use more than one serif italic phrase or one gradient word per page; never set a heading in the serif.
- Don't use brand colours for logos or icons, by default or on hover.
- Don't add drop shadows, glassmorphism, big gradient blocks, or colour backgrounds to sections.
- Don't use weights above 600, or font sizes outside the scale for running text.
- Don't widen the column for reading text: keep paragraphs at 70ch and articles at 720px.

---

## Surfaces

| Level | Name | Dark | Light | Purpose |
|---|---|---|---|---|
| 0 | Ink / Paper (`bg`) | `#0B0B0C` | `#FFFFFF` | Page |
| 1 | Raised (`raised`) | `#0F0F11` | `#FAFAFA` | Cards, code, figures, callouts — a barely-lifted panel |
| 2 | Surface (`surface`) | `#131316` | `#F4F4F5` | Tiles, hover fills, active chips |
| — | Line / Edge / Chip | `#1F1F23` / `#232328` / `#2A2A30` | `#E4E4E7` / `#E4E4E7` / `#D4D4D8` | Borders, from quietest to strongest |

## Elevation

- **No shadows on cards or panels.** Depth = fill step (`bg` → `raised` → `surface`) + a 1px border.
- **Hover elevation:** border `line` → `chip`, fill → `surface`, 200ms `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Rings instead of shadows:** avatars get `0 0 0 1px var(--edge)`; the portrait on hover gets `0 0 0 2px var(--bg), 0 0 0 3.5px var(--chip)`.
- **Hero panel:** `raised` card with `rounded-[22px]` and a 1px Iris → Azure hairline across the top edge that fades out at both ends (`inset-x-10`).

## Motion

| Name | Value | Use |
|---|---|---|
| Default transition | 200ms `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out-soft`) | Every `transition-*` utility, link colour |
| rise | 0.7s `cubic-bezier(0.2, 0.7, 0.2, 1)`, from `opacity 0, translateY(8px)` | Page sections, staggered by 0.1s |
| live | 2.2s ease-out infinite, Iris ring 0 → 9px | Live dot |
| draw | per-stroke duration and delay, `cubic-bezier(0.55, 0, 0.35, 1)` | Signature |
| menu-in | 0.32s, `translateY(-6px)` → 0, 28ms stagger | Mobile menu |
| marquee | 50s linear infinite, `translateX(-50%)`, pauses on hover and focus | My apps on the home page |
| arrow nudge | 0.25s, `translateX(3px)` | GoLink |
| photo | 0.3s, `rotate(-3deg) scale(1.04)` | Portrait hover |

All of them stop under `prefers-reduced-motion: reduce`. Anchor links scroll smoothly only when motion is allowed.

## Code Highlighting

| Scope | Dark | Light |
|---|---|---|
| Background | `#0F0F11` | `#FAFAFA` |
| Text | `#C4C4CC` | `#3F3F46` |
| Punctuation / operators | `#85858F` | `#71717A` |
| Comment (italic) | `#6B6B74` | `#8B8B94` |
| Keyword, tag | `#9D9FFE` Iris 400 | `#6762D3` Iris 600 |
| String, attribute | `#9EC7FE` Azure 300 | `#2873D1` Azure 600 |
| Number, constant | `#70ADFF` Azure 400 | `#195CAE` Azure 700 |
| Type, class | `#D4D7FE` Iris 200 | `#3F3B87` Iris 800 |
| Property | `#C5DDFE` Azure 200 | `#534DAF` Iris 700 |
| Function, heading | `#EDEDEF` | `#0B0B0C` |

## Imagery

Almost none. The portrait (round, 60px) is the only photo in the UI. Diagrams are hand-drawn Excalidraw-style SVGs in Excalifont, using only black/greys, Iris `#7F7CF2`, Azure `#4F9BFF` and their tints (`#E9EBFE`, `#E2EEFF`), mapped to theme tokens so they follow light and dark. Product screenshots come in dark and light pairs on a `raised` card. Logos are one-colour masks on `surface` tiles; GitHub avatars are greyscale. Icons are Lucide (UI) and Simple Icons (brands) at 14–18px in `mark`. No stock photography, no illustrations, no emoji in UI.

## Layout

A single centred column, 880px wide with 24px gutters (1040px for brand, project and app pages; 720px for articles). The header is a bare row: signature left, quiet links right. Each section starts 64–72px below the previous one with a mono eyebrow, then a list or grid. Lists are full-width hover rows with the date pushed to the right; grids use `auto-fit` with a minimum card width so they reflow to one column on phones without media queries. The footer sits 96px below the content behind a single hairline. Most of the screen is empty Ink; content is dense and left-aligned, with right-aligned mono meta.

## Voice & Identity

- **Full name:** Haytham A. Salama (spelled Haytham, never Haitham) · **Short:** Haytham · **Handle:** `@haythamasalama`
- **Title:** Senior Software Engineer · SaaS, AI, FinTech & Logistics
- **Voice:** plain words over jargon. Show the work before the title. Warm, never loud.
- **Separators:** a middle dot with spaces (` · `) between labels; arrows `→` for internal and `↗` for external links.

---

## Agent Prompt Guide

**Quick Color Reference**
- page background: `#0B0B0C` (Ink) · light `#FFFFFF` (Paper)
- card / code background: `#0F0F11` (Raised) · light `#FAFAFA`
- tile / hover fill: `#131316` (Surface) · light `#F4F4F5`
- border: `#1F1F23` (Line) · stronger `#2A2A30` (Chip)
- heading / primary text: `#EDEDEF` (Text)
- body text: `#C4C4CC` (Soft)
- secondary text: `#A1A1AA` (Muted)
- meta / eyebrow: `#85858F` (Faint)
- icons: `#D4D4D8` (Mark)
- focus ring / detail: `#7F7CF2` (Iris 500) — on light `#6762D3`
- detail: `#4F9BFF` (Azure 500) — on light `#2873D1`
- the one gradient: `linear-gradient(90deg, #7F7CF2, #4F9BFF)`

**Example Component Prompts**
1. *"Build a project list section on `#0B0B0C`: an eyebrow 'SELECTED WORK' in Geist Mono 12px, weight 500, uppercase, 0.08em tracking, `#85858F`. Below it, rows with no borders: a 36px square logo tile (radius 9px, 1px `#232328` border, `#131316` fill, one-colour icon in `#D4D4D8`), title in Geist 15px weight 500 `#EDEDEF`, description 14px `#A1A1AA`, and the period right-aligned in Geist Mono 12px `#85858F`. On hover the whole row gets a `#131316` fill with 10px radius. End with a 14px 'All work →' link in `#A1A1AA` whose arrow moves 3px right on hover."*
2. *"Create a filter chip row: pill buttons 36px tall, 14px horizontal padding, Geist 13px. At rest: 1px `#2A2A30` border, text `#A1A1AA`, hover text `#EDEDEF`. Selected: 1px `#EDEDEF` border, `#131316` fill, `#EDEDEF` text — no colour. Each label is followed by its count in Geist Mono 11.5px at 65% opacity. Focus: 2px `#7F7CF2` outline, 2px offset."*
3. *"Make a code block: `#0F0F11` card, 1px `#1F1F23` border, 12px radius. A 44px header row with the file name in Geist Mono 12px `#C4C4CC`, the language in `#85858F`, and a 'Copy' ghost button on the right (12px `#A1A1AA`, hover `#131316` fill). Code in Geist Mono 13px, line height 1.7, padding 16px 18px: keywords `#9D9FFE`, strings `#9EC7FE`, numbers `#70ADFF`, types `#D4D7FE`, punctuation `#85858F`, comments italic `#6B6B74`."*
4. *"Write a hero: a 60px round portrait beside the name in Geist 28px weight 600, -0.02em, and the role under it in Geist Mono 13px `#85858F`. Then a 17px paragraph in `#C4C4CC`, line height 1.7, where only the words 'software engineer' are Instrument Serif italic 22px with an Iris → Azure gradient text fill. Then a pill with a 1px `#1F1F23` border holding an 8px gradient live dot that pulses, 'Now' in `#EDEDEF` and the rest in `#A1A1AA`. Fade each block up 8px in sequence; disable under reduced motion."*

**Spacing & Type Rules for All Prompts**
- Column 880px, 24px side padding, sections 64–72px apart, footer 96px below content.
- Card padding 16px (20px desktop), radius 12px for code/figures, 16px for cards, full for chips.
- Gaps 8–16px; tap targets ≥ 44px.
- Geist 400/500/600 only; headings 600 with negative tracking; body 15–17px at 1.65–1.7.
- Geist Mono for every date, count, label and code; eyebrows 12px uppercase 0.08em.
- One serif italic gradient phrase per page, max.
- No shadows; borders 1px; hover is neutral.
- Every colour from a token that has a light-theme twin.

## Similar Brands

- **Vercel / Geist** — same typeface family and near-black neutrals, but warmer and more personal here, with a handwritten logo.
- **Linear** — dark-first, hairline borders, restrained purple-blue accents; this system uses even less colour and no glows.
- **Minimal developer portfolios** — single narrow column, list rows with right-aligned mono dates, quiet hover fills.
- **Excalidraw** — the hand-drawn figure style and Excalifont labels inside diagrams.

---

## Quick Start

### CSS Custom Properties

```css
:root,
.dark {
  /* Colors — semantic (dark default) */
  --bg: #0B0B0C;
  --surface: #131316;
  --raised: #0F0F11;
  --line: #1F1F23;
  --edge: #232328;
  --chip: #2A2A30;
  --fg: #EDEDEF;
  --soft: #C4C4CC;
  --muted: #A1A1AA;
  --faint: #85858F;
  --mark: #D4D4D8;
  --underline: #3F3F46;
  --accent: #4F9BFF;   /* Azure 500 */
  --accent-2: #7F7CF2; /* Iris 500 */
  --gradient: linear-gradient(90deg, #7F7CF2, #4F9BFF);
  --gradient-signature: linear-gradient(90deg, #7F7CF2, #6C8CF9, #4F9BFF);
  color-scheme: dark;
}

.light {
  --bg: #FFFFFF;
  --surface: #F4F4F5;
  --raised: #FAFAFA;
  --line: #E4E4E7;
  --edge: #E4E4E7;
  --chip: #D4D4D8;
  --fg: #0B0B0C;
  --soft: #3F3F46;
  --muted: #52525B;
  --faint: #6B6B74;
  --mark: #27272A;
  --underline: #D4D4D8;
  --accent: #2873D1;   /* Azure 600 */
  --accent-2: #6762D3; /* Iris 600 */
  --gradient: linear-gradient(90deg, #6762D3, #2873D1);
  --gradient-signature: linear-gradient(90deg, #6762D3, #4F6AD2, #2873D1);
  color-scheme: light;
}

:root {
  /* Brand scales */
  --iris-50: #F5F6FE; --iris-100: #E9EBFE; --iris-200: #D4D7FE; --iris-300: #BABEFE;
  --iris-400: #9D9FFE; --iris-500: #7F7CF2; --iris-600: #6762D3; --iris-700: #534DAF;
  --iris-800: #3F3B87; --iris-900: #2C2A62; --iris-950: #1D1B45;
  --azure-50: #F2F7FE; --azure-100: #E2EEFF; --azure-200: #C5DDFE; --azure-300: #9EC7FE;
  --azure-400: #70ADFF; --azure-500: #4F9BFF; --azure-600: #2873D1; --azure-700: #195CAE;
  --azure-800: #134686; --azure-900: #0D3261; --azure-950: #052144;

  /* Typography — Font Families */
  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
  --font-serif: 'Instrument Serif', Georgia, serif; /* italic, one phrase per page */

  /* Typography — Scale */
  --text-display: 44px;  --leading-display: 1.08; --tracking-display: -0.03em;
  --text-h1: 28px;       --leading-h1: 1.25;      --tracking-h1: -0.02em;
  --text-h3: 17px;       --tracking-h3: -0.01em;
  --text-lead: 17px;     --leading-lead: 1.7;
  --text-body: 15px;     --leading-body: 1.7;
  --text-small: 14px;    --leading-small: 1.55;
  --text-caption: 13px;
  --text-eyebrow: 12px;  --tracking-eyebrow: 0.08em;
  --text-badge: 10.5px;  --tracking-badge: 0.1em;
  --text-code: 13px;     --leading-code: 1.7;
  --text-accent: 22px;

  /* Typography — Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;

  /* Spacing */
  --spacing: 4px;
  --space-gutter: 24px;
  --space-section: 72px;
  --space-card: 16px;
  --space-card-md: 20px;
  --space-footer: 96px;

  /* Layout */
  --width-page: 880px;
  --width-wide: 1040px;
  --width-article: 720px;
  --measure: 70ch;
  --tap-target: 44px;

  /* Border Radius */
  --radius-focus: 4px;
  --radius-badge: 6px;
  --radius-button: 8px;
  --radius-row: 10px;
  --radius-block: 12px;
  --radius-card-sm: 14px;
  --radius-card: 16px;
  --radius-hero: 22px;
  --radius-pill: 9999px;

  /* Shadows — none; rings only */
  --ring-avatar: 0 0 0 1px var(--edge);
  --ring-photo-hover: 0 0 0 2px var(--bg), 0 0 0 3.5px var(--chip);

  /* Motion */
  --ease-out-soft: cubic-bezier(0.23, 1, 0.32, 1);
  --duration: 200ms;
}

html { background: var(--bg); color: var(--fg); font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
::selection { background: rgb(127 124 242 / 0.35); }
main p { max-width: var(--measure); }
:where(a, button, summary):focus-visible { outline: 2px solid var(--accent-2); outline-offset: 2px; border-radius: 4px; }

.eyebrow { font: 500 12px/1.5 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); }
.text-gradient { color: transparent; background-image: var(--gradient); background-clip: text; -webkit-background-clip: text; }
.border-gradient { border: 1px solid transparent; background: linear-gradient(var(--bg), var(--bg)) padding-box, var(--gradient) border-box; }
.link-muted { color: var(--muted); transition: color var(--duration) var(--ease-out-soft); }
.link-muted:hover { color: var(--fg); }
.link-underline { color: var(--fg); text-decoration: underline 1px var(--underline); text-underline-offset: 4px; }
.link-underline:hover { text-decoration-color: var(--fg); }
.avatar-mono { filter: grayscale(1); box-shadow: var(--ring-avatar); }

@keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes live {
  0% { box-shadow: 0 0 0 0 rgb(127 124 242 / 0.6); }
  70% { box-shadow: 0 0 0 9px rgb(127 124 242 / 0); }
  100% { box-shadow: 0 0 0 0 rgb(127 124 242 / 0); }
}
.animate-rise { animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.animate-live { animation: live 2.2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .animate-rise, .animate-live { animation: none; } }
```

### Tailwind v4

```css
@import 'tailwindcss';
@custom-variant dark (&:where(.dark, .dark *));
@custom-variant light (&:where(.light, .light *));

@theme {
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono Variable', ui-monospace, monospace;
  --font-serif: 'Instrument Serif', Georgia, serif;
  --color-ink: #0b0b0c;
  --color-paper: #ffffff;
  --color-iris-400: #9d9ffe; --color-iris-500: #7f7cf2; --color-iris-600: #6762d3; /* …full scale above */
  --color-azure-400: #70adff; --color-azure-500: #4f9bff; --color-azure-600: #2873d1; /* …full scale above */
  --default-transition-duration: 200ms;
  --default-transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-raised: var(--raised);
  --color-line: var(--line);
  --color-edge: var(--edge);
  --color-chip: var(--chip);
  --color-fg: var(--fg);
  --color-soft: var(--soft);
  --color-muted: var(--muted);
  --color-faint: var(--faint);
  --color-mark: var(--mark);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
}
```

### Assets

- Fonts: `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`, `@fontsource/instrument-serif/latin-400-italic.css` (self-hosted, no Google Fonts requests).
- Icons: Lucide (UI) and Simple Icons (brands).
- Brand kit: https://haythamasalama.me/brand#kit — signature (white, black, small sizes, gradient), favicon, app icon, portrait and `haytham-brand-tokens.css`.
- Source of truth: https://haythamasalama.me/brand and `app/assets/css/main.css` in https://github.com/haythamasalama/haythamasalama.me.
