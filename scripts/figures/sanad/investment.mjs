import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/sanad/investment.excalidraw', import.meta.url);
const s = createScene('sanad-invest');
const { C } = s;

s.frame({ w: 1120, h: 484 });

s.text({ x: 32, y: 24, text: 'Investing in one step', size: 30 });
s.squiggle({ x: 34, y: 70, w: 330 });

// The investor asks, and confirms with a code
s.person({ x: 40, y: 104, size: 44 });
s.pill({ x: 96, y: 110, w: 110, label: 'Investor' });
s.iconBox({ x: 32, y: 172, w: 226, h: 56, icon: 'mouse-pointer-click', label: 'picks the units', size: 17 });
s.arrow({ points: [[145, 232], [145, 262]], color: C.iris });
s.iconBox({ x: 32, y: 266, w: 226, h: 64, icon: 'smartphone', label: 'enters the code\nsent by SMS', size: 17 });
s.arrow({ points: [[262, 298], [292, 298]], color: C.iris });

// One transaction: every check, then every change, or nothing at all
s.rect({ x: 296, y: 118, w: 576, h: 278, stroke: C.iris, dashed: true });
s.text({ x: 314, y: 128, text: 'one transaction · all or nothing', size: 16, color: C.iris });

s.text({ x: 316, y: 162, text: 'checks', size: 15, color: C.muted });

const checks = [
  'the code is right',
  'the investor is verified',
  'the opportunity is open',
  'enough units are left',
  'within the investor’s limits',
  'the wallet covers it all'
];

checks.forEach((label, i) => {
  const y = 190 + i * 32;

  s.icon({ x: 316, y: y + 1, size: 18, name: 'check', color: C.iris });
  s.text({ x: 342, y, text: label, size: 16, color: C.soft });
});

s.arrow({ points: [[612, 256], [640, 256]], color: C.iris });
s.text({ x: 648, y: 162, text: 'changes', size: 15, color: C.muted });

const changes = [
  ['package', 'reserve\nthe units'],
  ['file-check', 'record the\ninvestment'],
  ['wallet', 'debit the\nwallet + fees']
];

changes.forEach(([icon, label], i) => {
  s.iconBox({ x: 648, y: 186 + i * 68, w: 208, h: 58, icon, label, size: 16, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
});

// The result
s.arrow({ points: [[876, 256], [904, 256]], color: C.iris });
s.iconBox({ x: 908, y: 210, w: 180, h: 92, icon: 'message-square-text', label: 'confirmation\nby SMS', size: 17, iconSize: 24, layout: 'stack' });
s.text({ x: 998, y: 316, text: 'units and money\nalways change\ntogether', size: 15, color: C.soft, align: 'center' });

// The way out, before anything changes
s.arrow({ points: [[456, 398], [456, 424]], color: C.muted, dotted: true });
s.text({ x: 316, y: 430, text: 'if any check fails, nothing changes,\nand the investor is told why', size: 16, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
