import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/runarks/architecture.excalidraw', import.meta.url);
const s = createScene('arch');
const { C } = s;

s.frame({ w: 1120, h: 616 });

s.text({ x: 32, y: 24, text: 'Runarks at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 260 });

// People
s.person({ x: 40, y: 128, size: 44 });
s.pill({ x: 94, y: 134, w: 118, label: 'Requester' });
s.person({ x: 40, y: 226, size: 44 });
s.pill({ x: 94, y: 232, w: 110, label: 'Approver' });
s.arrow({ points: [[218, 150], [256, 168]] });
s.arrow({ points: [[210, 248], [256, 236]] });

// The web app: one modular monolith
s.rect({ x: 260, y: 104, w: 460, h: 346 });
s.text({ x: 278, y: 114, text: 'the web app · one modular monolith', size: 16, color: C.soft });

s.iconBox({ x: 280, y: 146, w: 200, h: 50, icon: 'layout-dashboard', label: 'Dashboard', size: 18 });
s.iconBox({ x: 500, y: 146, w: 200, h: 50, icon: 'shield-user', label: 'Back office', size: 18 });

s.rect({ x: 280, y: 214, w: 420, h: 126, stroke: C.muted, dashed: true });
s.text({ x: 296, y: 222, text: 'domains, each behind a contract', size: 16, color: C.muted });

const rows = [
  ['Requests', 'Approvals', 'Access', 'Masking'],
  ['Connections', 'Activity', 'Notifications', 'Plans']
];

rows.forEach((row, r) => {
  let x = 296;

  row.forEach((label) => {
    const w = label.length * 7.6 + 22;

    s.rect({ x, y: 252 + r * 42, w, h: 32, label, size: 15, stroke: C.soft, labelColor: C.soft });
    x += w + 10;
  });
});

s.iconBox({ x: 280, y: 358, w: 420, h: 72, icon: 'door-open', iconSize: 26, label: 'Executor · the only code that\nopens a database connection', size: 18, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

// The analyzer runs on its own
s.iconBox({ x: 780, y: 140, w: 180, h: 96, icon: 'scan-search', label: 'Analyzer\nits own process', size: 17, iconSize: 24, layout: 'stack' });
s.text({ x: 870, y: 246, text: 'no credentials,\nno network', size: 15, color: C.muted, align: 'center' });
s.arrow({ points: [[776, 214], [706, 354]], color: C.iris, start: 'arrow' });

// Customers' databases
s.arrow({ points: [[704, 394], [948, 394]], color: C.iris });
s.text({ x: 826, y: 366, text: 'short-lived TLS', size: 15, color: C.muted, align: 'center' });
s.text({ x: 1016, y: 316, text: 'customer databases', size: 17, align: 'center' });
s.icon({ x: 988, y: 346, size: 56, name: 'database', color: C.ink });

['mysql', 'postgresql', 'microsoftsqlserver', 'mongodb', 'redis'].forEach((engine, i) => {
  s.icon({ x: 930 + i * 36, y: 416, size: 28, name: `simple-icons:${engine}`, color: C.soft });
});

// What sits behind the app
s.arrow({ points: [[370, 452], [370, 484]], color: C.muted });
s.arrow({ points: [[610, 452], [610, 484]], color: C.muted });
s.arrow({ points: [[722, 512], [744, 512]], color: C.muted });

s.iconBox({ x: 260, y: 488, w: 220, h: 50, icon: 'database', label: 'Runarks database', size: 17 });
s.text({ x: 370, y: 546, text: 'requests, policies,\nencrypted credentials, the log', size: 15, color: C.muted, align: 'center' });

s.iconBox({ x: 500, y: 488, w: 220, h: 50, icon: 'timer', label: 'Queue & scheduler', size: 17 });
s.text({ x: 610, y: 546, text: 'expires lapsed requests,\nchecks connections hourly', size: 15, color: C.muted, align: 'center' });

s.iconBox({ x: 748, y: 488, w: 200, h: 50, icon: 'bell', label: 'Notifications', size: 17 });
s.text({ x: 848, y: 546, text: 'in-app inbox,\nweb push and email', size: 15, color: C.muted, align: 'center' });

s.write(OUT);
console.log('wrote', OUT.pathname);
