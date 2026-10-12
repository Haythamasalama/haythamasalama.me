import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/workshop-management/architecture.excalidraw', import.meta.url);
const s = createScene('workshop-arch');
const { C } = s;

s.frame({ w: 1120, h: 552 });

s.text({ x: 32, y: 24, text: 'The workshop system at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 420 });

// At the bay: technicians on registered devices
s.person({ x: 36, y: 106, size: 40 });
s.pill({ x: 84, y: 112, w: 128, label: 'Technicians' });
s.iconBox({ x: 32, y: 170, w: 210, h: 100, icon: 'tablet-smartphone', label: 'Bay app\nsign-in by code', size: 17, iconSize: 26, layout: 'stack' });
s.text({ x: 137, y: 282, text: 'start, fill in and\ncomplete a check', size: 15, color: C.muted, align: 'center' });
s.arrow({ points: [[246, 220], [296, 220]], color: C.iris, start: 'arrow' });

// One back end for both apps
s.rect({ x: 300, y: 104, w: 480, h: 324 });
s.text({ x: 318, y: 114, text: 'the back end · one API for both apps', size: 16, color: C.soft });

s.iconBox({ x: 320, y: 142, w: 440, h: 44, icon: 'shield-check', label: 'answers registered devices only', size: 17 });

s.rect({ x: 320, y: 202, w: 440, h: 124, stroke: C.muted, dashed: true });
s.text({ x: 336, y: 210, text: 'the workshop’s records', size: 16, color: C.muted });

const rows = [
  ['Accounts & drivers', 'Cars', 'Checks'],
  ['Services', 'Branches & bays', 'Users & roles']
];

rows.forEach((row, r) => {
  let x = 336;

  row.forEach((label) => {
    const w = Math.round(label.length * 8.8 + 24);
    const key = label === 'Checks';

    s.rect({ x, y: 240 + r * 42, w, h: 32, label, size: 15, stroke: key ? C.iris : C.soft, fill: key ? C.irisTint : 'transparent', labelColor: key ? C.ink : C.soft });
    x += w + 10;
  });
});

s.iconBox({ x: 320, y: 344, w: 212, h: 64, icon: 'sliders-horizontal', label: 'checklist built\nfrom services', size: 16 });
s.iconBox({ x: 548, y: 344, w: 212, h: 64, icon: 'circle-alert', label: 'every refusal\nhas a code', size: 16 });

// The dashboard: supervisors and managers
s.person({ x: 834, y: 106, size: 40 });
s.pill({ x: 882, y: 112, w: 128, label: 'Supervisors' });
s.iconBox({ x: 830, y: 170, w: 258, h: 100, icon: 'layout-dashboard', label: 'Dashboard\nsign-in with password', size: 17, iconSize: 26, layout: 'stack' });
s.arrow({ points: [[784, 220], [826, 220]], color: C.muted, start: 'arrow' });
s.text({ x: 842, y: 284, text: 'customers, cars, services\nand users; dashboards by\nbranch and technician;\nthe churn report', size: 15, color: C.muted });

// Behind it
s.arrow({ points: [[420, 430], [420, 470]], color: C.muted });
s.iconBox({ x: 300, y: 474, w: 240, h: 50, icon: 'database', label: 'Database', size: 17 });
s.text({ x: 558, y: 490, text: 'every visit with its answers, by car and customer', size: 15, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
