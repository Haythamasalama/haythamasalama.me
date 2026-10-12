import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/winch/ddd.excalidraw', import.meta.url);
const s = createScene('winch-ddd');
const { C } = s;

s.frame({ w: 1120, h: 520 });

s.text({ x: 32, y: 24, text: 'Moving to Domain-Driven Design', size: 30 });
s.squiggle({ x: 34, y: 70, w: 440 });

// Inside one domain
s.text({ x: 40, y: 104, text: 'inside every domain', size: 17, color: C.muted });

const layers = [
  ['layout-panel-top', 'Presentation · a panel per app', C.ink],
  ['door-open', 'Contract · the only public door', C.iris],
  ['cog', 'Service · delegates, never queries', C.ink],
  ['zap', 'Actions · one job each', C.ink],
  ['table-2', 'Models · entities and scopes', C.ink]
];

layers.forEach(([icon, label, color], i) => {
  const y = 134 + i * 66;

  s.iconBox({ x: 40, y, w: 350, h: 48, icon, label, size: 16, stroke: color, fill: color === C.iris ? C.irisTint : 'transparent', labelColor: C.ink, iconColor: color });

  if (i < layers.length - 1) {
    s.arrow({ points: [[215, y + 50], [215, y + 64]], color: C.muted });
  }
});

s.icon({ x: 40, y: 470, size: 22, name: 'package', color: C.soft });
s.text({ x: 70, y: 470, text: 'typed DTOs carry data across every layer', size: 16, color: C.soft });

// Other domains use the contract, never the internals
s.iconBox({ x: 428, y: 196, w: 140, h: 62, icon: 'blocks', label: 'another\ndomain', size: 16 });
s.arrow({ points: [[424, 214], [394, 214]], color: C.iris });
s.text({ x: 436, y: 168, text: 'calls the contract', size: 15, color: C.iris });
s.arrow({ points: [[488, 262], [488, 388], [394, 412]], color: C.muted, dashed: true, curved: true });
s.icon({ x: 498, y: 318, size: 20, name: 'ban', color: C.muted });
s.text({ x: 524, y: 318, text: 'never its\nmodels', size: 15, color: C.muted });

// The migration, in numbers
s.line({ points: [[608, 108], [608, 480]], color: C.line, dashed: true });

const chart = ({ x, title, bars, max, color, fill }) => {
  const base = 420;

  s.text({ x, y: 112, text: title, size: 17, color: C.muted });
  s.line({ points: [[x, base], [x + bars.length * 54 + 6, base]], color: C.muted });

  bars.forEach(([label, value], i) => {
    const bx = x + 12 + i * 54;
    const h = Math.max(4, Math.round(value / max * 230));

    s.rect({ x: bx, y: base - h, w: 30, h, stroke: color, fill, fillStyle: 'hachure', rounded: false });
    s.text({ x: bx + 15, y: base + 8, text: label, size: 12, color: C.muted, align: 'center' });
  });
};

chart({
  x: 630,
  title: 'files left in app/',
  max: 656,
  color: C.muted,
  fill: C.muted,
  bars: [['Feb 23', 586], ['Mar 25', 656], ['Sep 25', 347], ['Mar 26', 152], ['Oct 26', 22]]
});

chart({
  x: 936,
  title: 'domains in src/',
  max: 50,
  color: C.iris,
  fill: C.iris,
  bars: [['Feb 23', 5], ['Mar 25', 32], ['Oct 26', 50]]
});

s.text({ x: 630, y: 462, text: 'the team moved the legacy code domain by domain,\nwhile the product kept shipping', size: 16, color: C.soft });

s.write(OUT);
console.log('wrote', OUT.pathname);
