import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/easyshoot/before-after.excalidraw', import.meta.url);
const s = createScene('easyshoot-before');
const { C } = s;

s.frame({ w: 1120, h: 420 });

s.text({ x: 32, y: 24, text: 'From four apps to one shortcut', size: 30 });
s.squiggle({ x: 34, y: 70, w: 420 });

s.line({ points: [[548, 108], [548, 392]], color: C.line, dashed: true });

// Before: one screenshot passes through several apps
s.text({ x: 40, y: 108, text: 'Before', size: 22, color: C.muted });

const before = [
  ['camera', 'capture'],
  ['crop', 'crop in\nanother app'],
  ['pencil', 'annotate in\na third'],
  ['frame', 'frame in a\ndesign tool']
];

before.forEach(([icon, label], i) => {
  const x = 40 + i * 122;

  s.iconBox({ x, y: 156, w: 106, h: 96, icon, label, size: 15, iconSize: 22, layout: 'stack', stroke: C.muted, labelColor: C.soft, iconColor: C.soft, dashed: true });
  if (i < before.length - 1) s.arrow({ points: [[x + 108, 204], [x + 120, 204]], color: C.muted });
});

s.text({ x: 44, y: 290, text: 'long pages need several shots\nArabic text breaks or runs left-to-right\nsome tools upload the image', size: 17, color: C.muted });

// With EasyShoot: capture, mark up and frame in one window
s.text({ x: 588, y: 108, text: 'With EasyShoot', size: 22, color: C.iris });

const after = [
  ['keyboard', 'one\nshortcut'],
  ['layers', 'mark up and\nframe'],
  ['copy', 'copy, save\nor drag']
];

after.forEach(([icon, label], i) => {
  const x = 588 + i * 168;

  s.iconBox({ x, y: 156, w: 146, h: 96, icon, label, size: 16, iconSize: 24, layout: 'stack', stroke: i === 1 ? C.iris : C.ink, labelColor: C.ink, iconColor: i === 1 ? C.iris : C.ink });
  if (i < after.length - 1) s.arrow({ points: [[x + 148, 204], [x + 166, 204]], color: C.iris });
});

s.iconBox({ x: 588, y: 282, w: 482, h: 46, icon: 'scroll-text', label: 'scrolling capture stitches long pages into one image', size: 17, stroke: C.soft, labelColor: C.soft });
s.icon({ x: 590, y: 350, size: 22, name: 'hard-drive', color: C.iris });
s.text({ x: 622, y: 350, text: 'everything stays on the Mac: no account, no cloud', size: 17, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
