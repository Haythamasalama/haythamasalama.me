import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/crm-and-hr/before-after.excalidraw', import.meta.url);
const s = createScene('crm-before');
const { C } = s;

s.frame({ w: 1120, h: 500 });

s.text({ x: 32, y: 24, text: 'Before and after the CRM', size: 30 });
s.squiggle({ x: 34, y: 70, w: 350 });

s.line({ points: [[548, 108], [548, 476]], color: C.line, dashed: true });

// Before: every answer lived somewhere else
s.text({ x: 40, y: 108, text: 'Before', size: 22, color: C.muted });

s.person({ x: 50, y: 252, size: 48 });

const places = [
  ['phone-incoming', 'phone system: a number'],
  ['contact', 'old CRM: contacts'],
  ['store', 'Clever: stores, balances'],
  ['fingerprint-pattern', 'devices: raw punches']
];

places.forEach(([icon, label], i) => {
  const y = 150 + i * 72;

  s.iconBox({ x: 196, y, w: 316, h: 54, icon, label, size: 16, iconSize: 22, stroke: C.muted, labelColor: C.soft, iconColor: C.soft, dashed: true });
  s.line({ points: [[106, 278], [192, y + 27]], color: C.muted, curved: true });
});

s.text({ x: 44, y: 436, text: 'each answer meant another system,\nand punches were not yet shifts', size: 17, color: C.muted });

// After: one system, fed by the systems around it
s.text({ x: 588, y: 108, text: 'Now', size: 22, color: C.iris });

s.rect({ x: 590, y: 146, w: 296, h: 270, stroke: C.iris, fill: C.irisTint });
s.text({ x: 606, y: 154, text: 'one system', size: 17 });
s.text({ x: 606, y: 184, text: 'CRM', size: 15, color: C.iris });
s.text({ x: 750, y: 184, text: 'HR', size: 15, color: C.iris });

['Contacts', 'Calls', 'Tickets', 'Visits', 'Stores', 'Messages'].forEach((label, i) => {
  s.rect({ x: 606, y: 210 + i * 33, w: 124, h: 27, label, size: 15, stroke: C.soft, labelColor: C.ink, fill: C.white });
});

['Employees', 'Shifts', 'Leave', 'Attendance'].forEach((label, i) => {
  s.rect({ x: 750, y: 210 + i * 33, w: 120, h: 27, label, size: 15, stroke: C.soft, labelColor: C.ink, fill: C.white });
});

const around = [
  ['Phone system', 168],
  ['Clever', 228],
  ['SMS and\nmessaging apps', 288],
  ['Access-control\ndevices', 358]
];

around.forEach(([label, y]) => {
  const lines = label.split('\n').length;
  const h = lines > 1 ? 54 : 40;

  s.rect({ x: 922, y, w: 164, h, label, size: 15, stroke: C.muted, labelColor: C.soft, dashed: true });
  s.arrow({ points: [[890, y + h / 2], [918, y + h / 2]], color: C.iris, start: 'arrow' });
});

s.text({ x: 590, y: 436, text: 'one record per customer and per employee,\nfed by the systems around it', size: 17, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
