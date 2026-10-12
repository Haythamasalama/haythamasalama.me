import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/before-after.excalidraw', import.meta.url);
const s = createScene('wash-before');
const { C } = s;

s.frame({ w: 1120, h: 500 });

s.text({ x: 32, y: 24, text: 'From a server on every Pi to one server', size: 30 });
s.squiggle({ x: 34, y: 70, w: 540 });

s.line({ points: [[548, 108], [548, 476]], color: C.line, dashed: true });

// Before: every Raspberry Pi ran the whole system on its own
s.text({ x: 40, y: 108, text: 'Before', size: 22, color: C.muted });

[44, 290].forEach((x) => {
  s.rect({ x, y: 150, w: 214, h: 186, stroke: C.muted, dashed: true });
  s.icon({ x: x + 18, y: 164, size: 24, name: 'simple-icons:raspberrypi', color: C.soft });
  s.text({ x: x + 50, y: 166, text: 'Raspberry Pi', size: 17, color: C.soft });

  ['web server', 'database', 'logic + GPIO'].forEach((label, i) => {
    s.rect({ x: x + 18, y: 206 + i * 40, w: 178, h: 32, label, size: 15, stroke: C.soft, labelColor: C.soft });
  });

  s.arrow({ points: [[x + 107, 340], [x + 107, 364]], color: C.muted });
  s.icon({ x: x + 93, y: 368, size: 28, name: 'droplets', color: C.soft });
  s.text({ x: x + 107, y: 400, text: 'pump', size: 15, color: C.muted, align: 'center' });
});

s.text({ x: 44, y: 436, text: 'every Pi kept its own copy of the data,\nthe settings and the code', size: 17, color: C.muted });

// Now: one server decides, and each Pi only switches its pins
s.text({ x: 588, y: 108, text: 'Now', size: 22, color: C.iris });

s.iconBox({ x: 590, y: 150, w: 494, h: 56, icon: 'server', label: 'one server: data, rules, dashboard', size: 18, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

[590, 762, 934].forEach((x) => {
  s.arrow({ points: [[x + 75, 210], [x + 75, 246]], color: C.iris });
  s.iconBox({ x, y: 250, w: 150, h: 80, icon: 'simple-icons:raspberrypi', label: 'Pi at a bay', size: 16, iconSize: 24, layout: 'stack' });
  s.arrow({ points: [[x + 75, 334], [x + 75, 360]], color: C.ink });
  s.icon({ x: x + 61, y: 364, size: 28, name: 'droplets', color: C.ink });
  s.text({ x: x + 75, y: 396, text: 'pump', size: 15, color: C.muted, align: 'center' });
});

s.text({ x: 590, y: 436, text: 'one copy of the data and one place to update;\neach Pi only switches its pump and lights', size: 17, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
