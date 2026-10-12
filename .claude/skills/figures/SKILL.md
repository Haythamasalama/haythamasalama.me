---
name: figures
description: How to draw, update and export the hand-drawn, Excalidraw-style figures on haythamasalama.me. Covers the script helpers in scripts/figures, the colour palette that follows the light and dark themes, layout conventions, previewing in both themes, embedding with ::sketch-figure, and exporting WebP images for LinkedIn, Medium and X. Use whenever a page or article needs a diagram, or an existing figure must change.
---

# Figures

Figures look like Excalidraw sketches, in the spirit of eqraatech's visual guides: one idea per figure, little text, icons and small people, and an Iris highlight on the path that matters.

## How it works

- **Source:** `scripts/figures/<project>/<name>.mjs` builds a scene with the helpers in `scripts/figures/lib.mjs` and writes `app/assets/figures/<project>/<name>.excalidraw`, a normal Excalidraw file.
- **Rendering:** `modules/sketch-figures` turns each `.excalidraw` file into SVG at build time with rough.js, drawn the way Excalidraw draws. Colours become theme tokens, so a figure follows dark and light. Nothing renders in the browser.
- **Embedding:** in Markdown:

  ```md
  ::sketch-figure{name="<project>/<name>" alt="Every box and arrow in words."}
  One sentence on what to notice.
  ::
  ```

- **Editing by hand:** a `.excalidraw` file also opens in excalidraw.com. If you edit a figure there, its script is out of date: update the script, or delete it and treat the `.excalidraw` file as the source.

## Palette

Use only these colours; the renderer maps them to theme tokens.

| Use | Stroke / text | Fill |
|---|---|---|
| Main ink | `#1e1e1e` | — |
| Secondary text | `#495057` (soft), `#868e96` (muted) | — |
| Faint lines | `#ced4da` | — |
| The highlighted path or element | Iris `#7f7cf2` | Iris tint `#e9ebfe` |
| Optional, outside or alternative paths | Azure `#4f9bff` | Azure tint `#e2eeff` |
| Text on an Iris pill | `#ffffff` | — |

Keep Iris to the one path or element that matters, plus pills. Product logos (`simple-icons:*`) are drawn in one colour, like every logo on the site.

## Helpers (`scripts/figures/lib.mjs`)

```js
import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/<project>/<name>.excalidraw', import.meta.url);
const s = createScene('<project>-<name>');   // the prefix keeps ids, and so the hand-drawn strokes, stable
const { C } = s;                              // the palette above

s.frame({ w: 1120, h: 480 });                 // the canvas; the SVG is cropped to it
s.text({ x: 32, y: 24, text: 'Title that matches the section heading', size: 30 });
s.squiggle({ x: 34, y: 70, w: 420 });         // the Iris wave under the title, about 15px per character
s.rect({ x, y, w, h, label, size: 18, stroke, fill, dashed, dotted });
s.ellipse({ … }); s.diamond({ … });
s.iconBox({ x, y, w, h, icon: 'bell', label: 'Notifications', layout: 'row' | 'stack', iconSize: 24 });
s.icon({ x, y, size: 28, name: 'database' | 'simple-icons:postgresql', color });
s.person({ x, y, size: 46 });                 // a hand-drawn person
s.pill({ x, y, w, label: 'Requester' });      // Iris pill with white text
s.arrow({ points: [[x1, y1], [x2, y2]], color, dashed, dotted, curved, start: 'arrow' });
s.line({ … });
s.write(OUT);
```

Icons are Lucide names, or `simple-icons:<name>` for product logos. A missing name throws, so check `node_modules/@iconify-json/lucide/icons.json` first.

## Layout conventions

- **Canvas:** 1120 wide, height to fit. The title sits at (32, 24) in size 30 with a squiggle under it.
- **Text sizes:** labels 16 to 18, notes 15 to 16, never below 14. The card shrinks the figure to about 0.75× on desktop.
- **Text widths:** the helpers estimate width at half the font size per character, which runs short. Leave padding, and check the preview for labels touching box edges.
- **Flow:** reads left to right and top to bottom. Use solid Iris arrows for the main path, muted dotted arrows for exits, and dashed boxes for groups and outside things.
- **One idea per figure.** Put an icon in each box, and a person and pill where people act.
- **No exact internal numbers** in figures about employers (see `content`).
- **No AI image generation for diagrams;** it gets the details wrong.

## Workflow

```bash
npm run figures -- <name>          # rebuild matching figures from their scripts
npm run figures:export -- <name>   # write .cache/figures/preview-<name>.html and export-<name>.html
npm run figures:serve              # serve them on http://localhost:4321 (or the "figures" launch config)
```

1. Open `http://localhost:4321/preview-<name>.html` (or `preview.html` for all figures). Check the figure in both themes for overlaps, cut-off labels and crossing arrows, and iterate.
2. Run `npm run build`, then look at it on the real page, at desktop and 375px. On a phone it scrolls sideways inside its card.
3. Export images for social posts:
   - Open `http://localhost:4321/export-<name>.html` at a 1400px-wide viewport and wait for `document.fonts.ready`.
   - Screenshot the element `#<project>--<name>` at device scale as **WebP**.
   - Save it to `claudedocs/projects/<slug>/<name>.webp`. Playwright blocks `file://`, so always go through the server.
