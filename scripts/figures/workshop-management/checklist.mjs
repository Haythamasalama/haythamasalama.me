import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/workshop-management/checklist.excalidraw', import.meta.url);
const s = createScene('workshop-checklist');
const { C } = s;

s.frame({ w: 1120, h: 476 });

s.text({ x: 32, y: 24, text: 'A checklist defined by its services', size: 30 });
s.squiggle({ x: 34, y: 70, w: 470 });

// 1 · A service says what is recorded for it
s.person({ x: 36, y: 104, size: 40 });
s.pill({ x: 84, y: 110, w: 116, label: 'Supervisor' });

s.rect({ x: 32, y: 164, w: 300, h: 236, stroke: C.iris });
s.icon({ x: 50, y: 178, size: 22, name: 'wrench', color: C.iris });
s.text({ x: 82, y: 178, text: 'a service: engine oil', size: 18 });

const fields = [
  ['condition', 'good, fair, bad or a %'],
  ['action', 'change, clean or top up'],
  ['note', 'free text']
];

fields.forEach(([label, values], i) => {
  const y = 216 + i * 58;

  s.rect({ x: 48, y, w: 268, h: 50, stroke: C.soft });
  s.text({ x: 62, y: y + 4, text: label, size: 16 });
  s.text({ x: 62, y: y + 25, text: values, size: 15, color: C.muted });
});

s.arrow({ points: [[336, 282], [376, 282]], color: C.iris });

// 2 · Services grouped in the order the workshop works
s.rect({ x: 380, y: 164, w: 250, h: 236 });
s.icon({ x: 396, y: 178, size: 22, name: 'list-ordered', color: C.ink });
s.text({ x: 428, y: 178, text: 'the template', size: 18 });

['Oils', 'Filters', 'Radiator', 'Battery', 'Care services'].forEach((label, i) => {
  s.rect({ x: 396, y: 214 + i * 36, w: 218, h: 30, label, size: 15, stroke: C.soft, labelColor: C.soft });
});

s.text({ x: 505, y: 410, text: 'reorder or switch off\nservices at any time', size: 15, color: C.muted, align: 'center' });

s.arrow({ points: [[634, 230], [686, 230]], color: C.iris });

// 3 · The bay app builds the form; reports read the answers
s.person({ x: 694, y: 104, size: 40 });
s.pill({ x: 742, y: 110, w: 124, label: 'Technician' });

s.iconBox({ x: 690, y: 182, w: 180, h: 96, icon: 'tablet-smartphone', label: 'the bay app\nbuilds the form', size: 16, iconSize: 24, layout: 'stack' });
s.arrow({ points: [[874, 230], [904, 230]], color: C.iris });
s.iconBox({ x: 908, y: 182, w: 180, h: 96, icon: 'database', label: 'answers kept\nas entered', size: 16, iconSize: 24, layout: 'stack' });
s.arrow({ points: [[998, 282], [998, 314]], color: C.iris });
s.iconBox({ x: 908, y: 318, w: 180, h: 96, icon: 'chart-column', label: 'reports count\nevery action', size: 16, iconSize: 24, layout: 'stack', stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

s.text({ x: 690, y: 322, text: 'a new service is set\nup in the dashboard,\nnot in a release', size: 16, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
