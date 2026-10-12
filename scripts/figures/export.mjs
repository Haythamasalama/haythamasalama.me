// Writes two pages to .cache/figures/ for checking and sharing figures:
//   preview.html  every figure in the site's dark and light themes
//   export.html   every figure on a white card with the site address, for
//                 LinkedIn, Medium and X; screenshot each `.shot` to get a PNG
// Usage: npm run figures:export            (all figures)
//        npm run figures:export -- winch   (only figures whose path contains "winch",
//                                           written as preview-winch.html and export-winch.html)
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderSketch } from '../../modules/sketch-figures/render.ts';

const repo = join(import.meta.dirname, '../..');
const figures = join(repo, 'app/assets/figures');
const out = join(repo, '.cache/figures');
const only = process.argv[2];
const font = readFileSync(join(repo, 'app/assets/fonts/excalifont/Excalifont-Regular-latin.woff2')).toString('base64');

const files = readdirSync(figures)
  .filter(entry => statSync(join(figures, entry)).isDirectory())
  .flatMap(project => readdirSync(join(figures, project))
    .filter(file => file.endsWith('.excalidraw'))
    .map(file => join(project, file)))
  .filter(path => !only || path.includes(only));

const rendered = files.map(file => ({
  id: file.replace('.excalidraw', '').replace('/', '--'),
  file,
  svg: renderSketch(JSON.parse(readFileSync(join(figures, file), 'utf8')))
}));

// The same tokens as main.css: the site's dark and light themes, then a fixed light card for sharing.
const head = `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face { font-family: 'Excalifont'; src: url(data:font/woff2;base64,${font}) format('woff2'); }
  body { margin: 0; font-family: system-ui, sans-serif; }
  .sketch { --font-sketch: 'Excalifont', sans-serif; --font-sans: system-ui, sans-serif; --font-mono: ui-monospace, monospace; }
  .sketch > svg { display: block; width: 100%; height: auto; }
  .dark { --bg: #0b0b0c; --surface: #131316; --raised: #0f0f11; --line: #1f1f23; --chip: #2a2a30; --fg: #ededef; --soft: #c4c4cc; --muted: #a1a1aa; --accent: #4f9bff; --accent-2: #7f7cf2; }
  .light { --bg: #ffffff; --surface: #f4f4f5; --raised: #fafafa; --line: #e4e4e7; --chip: #d4d4d8; --fg: #0b0b0c; --soft: #3f3f46; --muted: #52525b; --accent: #2873d1; --accent-2: #6762d3; }
  .dark .sketch, .light .sketch {
    --sk-ink: var(--fg); --sk-soft: var(--soft); --sk-muted: var(--muted); --sk-line: var(--chip);
    --sk-paper: var(--bg); --sk-raised: var(--surface); --sk-chip: var(--chip);
    --sk-iris: var(--accent-2); --sk-azure: var(--accent);
    --sk-iris-tint: color-mix(in oklab, #7f7cf2 16%, transparent);
    --sk-azure-tint: color-mix(in oklab, #4f9bff 14%, transparent);
    --sk-on-accent: #fff;
  }
  .shot {
    --sk-ink: #1e1e1e; --sk-soft: #495057; --sk-muted: #868e96; --sk-line: #ced4da;
    --sk-paper: #ffffff; --sk-raised: #f8f9fa; --sk-chip: #e9ecef;
    --sk-iris: #6762d3; --sk-azure: #2873d1;
    --sk-iris-tint: #e9ebfe; --sk-azure-tint: #e2eeff; --sk-on-accent: #ffffff;
    width: 1200px; box-sizing: border-box; padding: 48px 56px 28px; background: #ffffff;
  }
  .site { margin: 18px 0 0; text-align: right; font: 15px 'Excalifont', sans-serif; color: #868e96; }
</style>`;

const preview = rendered.map(({ file, svg }) => ['dark', 'light'].map(theme => `
<section class="${theme}" style="background: var(--bg); color: var(--muted); padding: 24px 32px">
  <p style="margin: 0 0 10px; font: 12px ui-monospace, monospace">${file} · ${theme} · ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB</p>
  <div class="sketch" style="max-width: 880px; border: 1px solid var(--line); border-radius: 12px; background: var(--raised); padding: 24px">${svg}</div>
</section>`).join('')).join('');

const shots = rendered.map(({ id, svg }) => `<div class="shot sketch" id="${id}">${svg}<p class="site">haythamasalama.me</p></div>`).join('\n');

// A filtered run gets its own files, so several can run side by side.
const suffix = only ? `-${only.replace(/[^a-z0-9-]+/gi, '-')}` : '';

mkdirSync(out, { recursive: true });
writeFileSync(join(out, `preview${suffix}.html`), `${head}\n${preview}\n`);
writeFileSync(join(out, `export${suffix}.html`), `${head}\n<div style="padding: 40px; background: #e5e5e5; display: flex; flex-direction: column; gap: 40px; align-items: flex-start">\n${shots}\n</div>\n`);

console.log(`${rendered.length} figure(s) → ${join(out, `preview${suffix}.html`)} and export${suffix}.html`);
console.log(`ids for screenshots: ${rendered.map(({ id }) => `#${id}`).join(' ')}`);
