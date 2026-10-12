// Renders layered product mockups: whole screenshots as cards on a transparent background,
// saved as public/projects/<slug>/<spec name>.webp (1760px wide) for
// ::project-shot{src="/projects/<slug>/<name>.webp" single bare …}. Being transparent, one image suits both themes.
//
// Usage: node scripts/mockups/render.mjs [filter]   (every spec in scripts/mockups/<slug>/*.json, or those matching the filter)
// Needs Playwright and sharp, which are not project dependencies:
//   npm i --no-save playwright sharp
// It uses the installed Google Chrome, so no browser download is needed.
//
// A spec: { "width": 880, "height": 400, "cards": [ { "src", "crop"?, "x", "y", "w", "h"?, "z"?, "tilt"?, "rotate"? } ] }
// - src: a screenshot; "~/" is the home folder, other paths are relative to the spec.
// - crop: [left, top, width, height] in source pixels. Crop to the screen's own proportions so the whole screen shows.
// - x, y, w: the card on a stage `width` × `height` CSS pixels. h defaults to the screenshot's proportions.
// - z orders the cards; tilt turns a card in 3D around its upright axis (degrees, positive faces right); rotate turns it flat.
// Leave about 40px around the cards for their shadows.
import { mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';

const load = async (name) => {
  try {
    return await import(name);
  }
  catch {
    console.error(`Missing "${name}". Install it without saving: npm i --no-save playwright sharp`);
    process.exit(1);
  }
};

const { chromium } = await load('playwright');
const sharp = (await load('sharp')).default;

const repo = join(import.meta.dirname, '../..');
const root = join(repo, 'scripts/mockups');
const only = process.argv[2];

const specs = readdirSync(root)
  .filter(slug => statSync(join(root, slug)).isDirectory())
  .flatMap(slug => readdirSync(join(root, slug))
    .filter(file => file.endsWith('.json'))
    .map(file => join(root, slug, file)))
  .filter(file => !only || file.includes(only));

/** A card's image as a data URL and its proportions, cropped when the spec asks for it. */
const image = async (card, specFile) => {
  const src = card.src.startsWith('~/') ? join(homedir(), card.src.slice(2)) : resolve(dirname(specFile), card.src);
  let pipeline = sharp(src);

  if (card.crop) {
    const [left, top, width, height] = card.crop;

    pipeline = pipeline.extract({ left, top, width, height });
  }

  const { data, info } = await pipeline.png().toBuffer({ resolveWithObject: true });

  return { url: `data:image/png;base64,${data.toString('base64')}`, ratio: info.height / info.width };
};

const page = (spec, cards) => `<!doctype html><meta charset="utf-8"><style>
  html, body { margin: 0; background: transparent; }
  #stage { position: relative; width: ${spec.width}px; height: ${spec.height}px; perspective: 1800px; }
  .card { position: absolute; border-radius: 10px; overflow: hidden; background: #fff;
    box-shadow: 0 30px 60px -24px rgba(15, 15, 40, .45), 0 12px 24px -12px rgba(15, 15, 40, .25), 0 0 0 1px rgba(15, 15, 40, .08); }
  .card img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
</style><div id="stage">${cards.map(({ card, src }) => {
  const h = card.h ?? Math.round(card.w * src.ratio);
  const origin = (card.tilt ?? 0) > 0 ? '100% 50%' : '0% 50%';
  const transform = `rotateY(${card.tilt ?? 0}deg) rotate(${card.rotate ?? 0}deg)`;

  return `<div class="card" style="left: ${card.x}px; top: ${card.y}px; width: ${card.w}px; height: ${h}px; z-index: ${card.z ?? 1}; transform: ${transform}; transform-origin: ${origin}"><img src="${src.url}"></div>`;
}).join('')}</div>`;

const browser = await chromium.launch({ channel: 'chrome' });

for (const file of specs) {
  const spec = JSON.parse(readFileSync(file, 'utf8'));
  const slug = basename(dirname(file));
  const name = basename(file, '.json');
  const out = join(repo, 'public/projects', slug);
  const cards = await Promise.all(spec.cards.map(async card => ({ card, src: await image(card, file) })));
  const tab = await browser.newPage({ viewport: { width: spec.width, height: spec.height }, deviceScaleFactor: 2 });

  await tab.setContent(page(spec, cards));
  const png = await tab.locator('#stage').screenshot({ omitBackground: true });

  mkdirSync(out, { recursive: true });
  const info = await sharp(png).resize({ width: 1760 }).webp({ quality: 86, alphaQuality: 90 }).toFile(join(out, `${name}.webp`));

  console.log(`${slug}/${name}.webp`, `${info.width}×${info.height}`, `${Math.round(info.size / 1024)} KB`);
  await tab.close();
}

await browser.close();
