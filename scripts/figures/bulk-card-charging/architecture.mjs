import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/bulk-card-charging/architecture.excalidraw', import.meta.url);
const s = createScene('charging-arch');
const { C } = s;

s.frame({ w: 1120, h: 532 });

s.text({ x: 32, y: 24, text: 'Bulk charging at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 340 });

// The people who run a batch
s.person({ x: 32, y: 102, size: 40 });
s.pill({ x: 80, y: 108, w: 112, label: 'Operator' });
s.person({ x: 32, y: 150, size: 40 });
s.pill({ x: 80, y: 156, w: 112, label: 'Approver' });

s.iconBox({ x: 32, y: 210, w: 210, h: 56, icon: 'layout-dashboard', label: 'Dashboard', size: 18 });
s.arrow({ points: [[246, 238], [296, 238]], color: C.ink, start: 'arrow' });

// Live progress back to the page
s.iconBox({ x: 32, y: 330, w: 210, h: 56, icon: 'radio', label: 'Live updates', size: 18 });
s.arrow({ points: [[137, 326], [137, 270]], color: C.muted });
s.arrow({ points: [[296, 370], [246, 358]], color: C.muted });
s.text({ x: 137, y: 396, text: 'every change reaches\nthe batch page', size: 15, color: C.muted, align: 'center' });

// The web app
s.rect({ x: 300, y: 104, w: 480, h: 312 });
s.text({ x: 318, y: 114, text: 'the web app · registered devices only', size: 16, color: C.soft });

s.iconBox({ x: 320, y: 142, w: 440, h: 44, icon: 'key-round', label: 'password re-entry on key steps', size: 17 });

s.rect({ x: 320, y: 200, w: 440, h: 112, stroke: C.muted, dashed: true });
s.text({ x: 336, y: 208, text: 'batches and their cards', size: 16, color: C.muted });

const rows = [
  ['Merchants', 'Batches', 'Cards in a batch'],
  ['Error log', 'Excel export', 'Users & roles']
];

rows.forEach((row, r) => {
  let x = 336;

  row.forEach((label) => {
    const w = Math.round(label.length * 8.8 + 24);

    s.rect({ x, y: 234 + r * 40, w, h: 30, label, size: 15, stroke: C.soft, labelColor: C.soft });
    x += w + 10;
  });
});

s.iconBox({ x: 320, y: 328, w: 440, h: 68, icon: 'layers', label: 'Queue · one job per card,\nlocked while it is sent', size: 17, iconSize: 26, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

// The card platform
s.arrow({ points: [[764, 362], [836, 270]], color: C.iris });
s.rect({ x: 840, y: 176, w: 250, h: 112, stroke: C.muted, dashed: true });
s.icon({ x: 856, y: 190, size: 22, name: 'server', color: C.ink });
s.text({ x: 886, y: 191, text: 'Clever card platform', size: 16 });
s.text({ x: 856, y: 226, text: 'one top-up per call,\nanswered with an invoice\nor an error', size: 15, color: C.muted });

s.text({ x: 965, y: 304, text: 'a merchant account signs\nin once; its password\nis never stored', size: 15, color: C.muted, align: 'center' });

// Behind it
s.arrow({ points: [[420, 418], [420, 454]], color: C.muted });
s.iconBox({ x: 300, y: 458, w: 240, h: 50, icon: 'database', label: 'Database', size: 17 });
s.text({ x: 558, y: 474, text: 'batches, cards, replies and errors', size: 15, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
