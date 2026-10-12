import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/winch/before-after.excalidraw', import.meta.url);
const s = createScene('winch-before');
const { C } = s;

s.frame({ w: 1120, h: 470 });

s.text({ x: 32, y: 24, text: 'Before and after the redesign', size: 30 });
s.squiggle({ x: 34, y: 70, w: 420 });

s.line({ points: [[548, 108], [548, 440]], color: C.line, dashed: true });

// Before: every feature talks to every vendor its own way
s.text({ x: 40, y: 108, text: 'Before', size: 22, color: C.muted });

const features = ['Orders', 'Invoices', 'Waybills', 'Drivers'];
const vendors = ['Tamm', 'ZATCA', 'SMS', 'WhatsApp'];

features.forEach((label, i) => s.rect({ x: 44, y: 154 + i * 62, w: 130, h: 44, label, size: 18 }));
vendors.forEach((label, i) => s.rect({ x: 384, y: 154 + i * 62, w: 130, h: 44, label, size: 18, stroke: C.muted, labelColor: C.soft, dashed: true }));

const wires = [[0, 0], [0, 2], [1, 1], [1, 3], [2, 0], [2, 2], [3, 3], [3, 0], [1, 2]];

wires.forEach(([from, to], i) => {
  const y1 = 176 + from * 62;
  const y2 = 176 + to * 62;

  s.line({ points: [[178, y1], [280, (y1 + y2) / 2 + (i % 2 ? 14 : -14)], [380, y2]], color: C.muted, curved: true });
});

s.text({ x: 44, y: 410, text: 'each feature calls each vendor its own way,\nand each notification is its own class', size: 17, color: C.muted });

// After: domains on shared components, one way out to every vendor
s.text({ x: 588, y: 108, text: 'Now', size: 22, color: C.iris });

s.iconBox({ x: 590, y: 152, w: 494, h: 46, icon: 'blocks', label: 'more than 50 domains, each behind a contract', size: 18 });

const parts = [
  ['shield-check', 'Security'],
  ['bell', 'Notifications'],
  ['file-spreadsheet', 'Exports'],
  ['plug', 'Integrations']
];

parts.forEach(([icon, label], i) => {
  const x = 590 + i * 127;

  s.arrow({ points: [[x + 56, 202], [x + 56, 226]], color: C.iris });
  s.iconBox({ x, y: 230, w: 113, h: 86, icon, label, size: 16, iconSize: 24, layout: 'stack', stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
});

s.arrow({ points: [[837, 320], [837, 346]], color: C.iris });
s.arrow({ points: [[964, 320], [964, 346]], color: C.iris });
s.iconBox({ x: 590, y: 350, w: 494, h: 46, icon: 'cable', label: 'government, payment, AI and messaging platforms', size: 17, stroke: C.muted, labelColor: C.soft, dashed: true });

s.text({ x: 590, y: 410, text: 'one way to secure, notify, export and integrate,\nshared by every product', size: 17, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
