import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/runarks/one-door.excalidraw', import.meta.url);
const s = createScene('door');
const { C } = s;

s.frame({ w: 1120, h: 492 });

s.text({ x: 32, y: 24, text: 'One door to production', size: 30 });
s.squiggle({ x: 34, y: 70, w: 290 });

// What may come in
s.person({ x: 40, y: 98, size: 44 });
s.pill({ x: 94, y: 104, w: 118, label: 'Requester' });
s.iconBox({ x: 32, y: 176, w: 184, h: 58, icon: 'badge-check', label: 'Approved\nrequest', size: 18 });
s.iconBox({ x: 32, y: 254, w: 184, h: 58, icon: 'eye', label: 'Bypass session\n(reads only)', size: 17, stroke: C.azure, labelColor: C.ink, dashed: true });
s.arrow({ points: [[220, 205], [262, 214]], color: C.iris });
s.arrow({ points: [[220, 283], [262, 228]], color: C.azure, dashed: true });

// The executor: every gate, in order
s.rect({ x: 246, y: 136, w: 600, h: 244, stroke: C.iris, dashed: true });
s.text({ x: 264, y: 146, text: 'the executor · the only code that opens a connection', size: 16, color: C.iris });

const gates = [
  ['Analyzer', 'scan-search', 'unknown\nmeans deny'],
  ['Grants', 'list-checks', 'every table\nand column'],
  ['Quota', 'gauge', 'counted from\nthe log'],
  ['Credential', 'key-round', 'decrypted\nlast']
];

gates.forEach(([label, icon, note], i) => {
  const x = 266 + i * 144;

  s.iconBox({ x, y: 176, w: 120, h: 88, icon, label, size: 18, iconSize: 24, layout: 'stack' });
  s.text({ x: x + 60, y: 272, text: note, size: 16, color: C.muted, align: 'center' });

  if (i < gates.length - 1) {
    s.arrow({ points: [[x + 122, 220], [x + 142, 220]], color: C.iris });
  }

  // Every gate writes to the log, pass or fail
  s.arrow({ points: [[x + 60, 382], [x + 60, 412]], color: C.muted, dotted: true });
});

// The database, reached over one short-lived connection
s.arrow({ points: [[820, 212], [952, 212]], color: C.iris });
s.text({ x: 1000, y: 150, text: 'production database', size: 18, align: 'center' });
s.icon({ x: 968, y: 178, size: 64, name: 'database', color: C.ink });

const engines = ['mysql', 'postgresql', 'microsoftsqlserver', 'mongodb', 'redis'];

engines.forEach((engine, i) => {
  s.icon({ x: 905 + i * 40, y: 258, size: 30, name: `simple-icons:${engine}`, color: C.soft });
});

s.text({ x: 1000, y: 298, text: 'one short-lived\nTLS connection', size: 16, color: C.muted, align: 'center' });

// Rows come back through masking
s.arrow({ points: [[900, 346], [826, 346]], color: C.ink });
s.iconBox({ x: 698, y: 322, w: 124, h: 48, icon: 'venetian-mask', label: 'Masking', size: 18, stroke: C.iris, fill: C.irisTint, labelColor: C.ink });
s.arrow({ points: [[694, 346], [232, 360]], color: C.ink });
s.text({ x: 466, y: 322, text: 'rows on the way back', size: 16, color: C.muted, align: 'center' });
s.icon({ x: 32, y: 350, size: 22, name: 'table-2', color: C.soft });
s.text({ x: 62, y: 346, text: 'masked rows,\nnever stored', size: 16, color: C.soft });

// The trail
s.iconBox({ x: 246, y: 414, w: 600, h: 48, icon: 'scroll-text', label: 'append-only activity log', size: 18, stroke: C.soft, labelColor: C.soft });
s.text({ x: 870, y: 418, text: 'a failed gate refuses\nthe run and says why', size: 16, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
