import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/runarks/before-after.excalidraw', import.meta.url);
const s = createScene('before');
const { C } = s;

s.frame({ w: 1120, h: 432 });

s.text({ x: 32, y: 24, text: 'From a shared password to a request', size: 30 });
s.squiggle({ x: 34, y: 70, w: 450 });

s.line({ points: [[548, 108], [548, 404]], color: C.line, dashed: true });

// Before: a message, a password, and nothing recorded
s.text({ x: 40, y: 108, text: 'Before', size: 22, color: C.muted });

s.person({ x: 44, y: 156, size: 46 });
s.iconBox({ x: 112, y: 152, w: 260, h: 58, icon: 'message-circle', label: '"can you run this\non production?"', size: 17, stroke: C.muted, labelColor: C.soft, dashed: true });

s.person({ x: 44, y: 262, size: 46 });
s.icon({ x: 112, y: 276, size: 24, name: 'key-round', color: C.soft });
s.text({ x: 144, y: 276, text: 'has the password', size: 17, color: C.soft });
s.arrow({ points: [[308, 288], [406, 288]], color: C.muted });
s.icon({ x: 414, y: 258, size: 56, name: 'database', color: C.soft });
s.text({ x: 442, y: 320, text: 'production', size: 16, color: C.muted, align: 'center' });

s.text({ x: 44, y: 362, text: 'nobody reviewed it · nothing was recorded\nthe password keeps spreading', size: 17, color: C.muted });

// With Runarks: a request that someone else approves
s.text({ x: 588, y: 108, text: 'With Runarks', size: 22, color: C.iris });

const steps = [
  ['user', 'request\n+ reason'],
  ['user-check', 'a colleague\napproves'],
  ['play', 'run once,\nmasked']
];

steps.forEach(([icon, label], i) => {
  const x = 588 + i * 138;

  s.iconBox({ x, y: 156, w: 118, h: 96, icon, label, size: 16, iconSize: 24, layout: 'stack', stroke: i === 1 ? C.iris : C.ink, labelColor: C.ink, iconColor: i === 1 ? C.iris : C.ink });
  s.arrow({ points: [[x + 120, 204], [x + 136, 204]], color: C.iris });
});

s.icon({ x: 1010, y: 176, size: 56, name: 'database', color: C.ink });
s.text({ x: 1038, y: 238, text: 'production', size: 16, color: C.muted, align: 'center' });

s.iconBox({ x: 588, y: 290, w: 500, h: 46, icon: 'scroll-text', label: 'every step lands in an append-only log', size: 17, stroke: C.soft, labelColor: C.soft });
s.icon({ x: 590, y: 362, size: 22, name: 'eye-off', color: C.iris });
s.text({ x: 622, y: 362, text: 'nobody is ever shown a database password', size: 17, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
