import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/sanad/architecture.excalidraw', import.meta.url);
const s = createScene('sanad-arch');
const { C } = s;

s.frame({ w: 1120, h: 604 });

s.text({ x: 32, y: 24, text: 'Sanad at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 260 });

// Who uses it, and through what
s.person({ x: 40, y: 100, size: 44 });
s.pill({ x: 96, y: 106, w: 120, label: 'Investors' });
s.iconBox({ x: 32, y: 160, w: 212, h: 50, icon: 'smartphone', label: 'Investor app', size: 17 });
s.iconBox({ x: 32, y: 222, w: 212, h: 50, icon: 'globe', label: 'Website', size: 17 });

s.person({ x: 40, y: 312, size: 44 });
s.pill({ x: 96, y: 318, w: 160, label: 'Operations team' });
s.iconBox({ x: 32, y: 372, w: 212, h: 50, icon: 'layout-dashboard', label: 'Admin dashboard', size: 16 });

// One back end
s.rect({ x: 268, y: 100, w: 552, h: 400 });
s.text({ x: 288, y: 110, text: 'the API · one back end', size: 16, color: C.soft });

// A presentation layer for each client
const presentations = [
  ['Investor API', 160],
  ['Website API', 222],
  ['Admin API', 372]
];

presentations.forEach(([label, y]) => {
  s.arrow({ points: [[248, y + 25], [284, y + 25]], color: C.muted });
  s.rect({ x: 288, y, w: 150, h: 50, label, size: 16 });
  s.arrow({ points: [[440, y + 25], [458, y + 25]], color: C.muted });
});

s.text({ x: 296, y: 290, text: 'investors and\nadmins sign in\nseparately', size: 15, color: C.muted });

// The domains
s.rect({ x: 462, y: 140, w: 338, h: 318, stroke: C.muted, dashed: true });
s.text({ x: 478, y: 150, text: 'more than ten domains,\neach behind a contract', size: 15, color: C.muted });

const chips = [
  ['Security', 'Users', 'Banks'],
  ['Opportunities', 'Roles'],
  ['Settings', 'Content', 'Locations']
];

chips.forEach((row, r) => {
  let x = 478;

  row.forEach((label) => {
    const w = label.length * 9 + 24;

    s.rect({ x, y: 200 + r * 40, w, h: 32, label, size: 15, stroke: C.soft, labelColor: C.soft });
    x += w + 10;
  });
});

s.iconBox({ x: 478, y: 328, w: 306, h: 52, icon: 'scroll-text', label: 'Finance · wallet ledger', size: 15, iconSize: 22, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
s.iconBox({ x: 478, y: 392, w: 306, h: 52, icon: 'calendar-clock', label: 'Investments & returns', size: 15, iconSize: 22, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

// The services Sanad connects to
const services = [
  ['id-card', 'Absher', 'identity verification', 110, 70],
  ['credit-card', 'Payment gateways', 'online payments', 196, 70],
  ['message-square', 'SMS', 'codes and confirmations;\nin testing, a team chat', 282, 88]
];

services.forEach(([icon, title, note, y, h]) => {
  s.arrow({ points: [[824, y + h / 2], [846, y + h / 2]], color: C.muted });
  s.rect({ x: 850, y, w: 244, h, stroke: C.muted, dashed: true });
  s.icon({ x: 866, y: y + 12, size: 20, name: icon, color: C.ink });
  s.text({ x: 894, y: y + 10, text: title, size: 17 });
  s.text({ x: 866, y: y + 38, text: note, size: 15, color: C.muted });
});

s.icon({ x: 852, y: 420, size: 22, name: 'list-checks', color: C.soft });
s.text({ x: 884, y: 418, text: 'the money paths\nare covered by tests', size: 15, color: C.soft });

// What runs behind it
s.arrow({ points: [[392, 502], [392, 526]], color: C.muted });
s.arrow({ points: [[680, 502], [680, 526]], color: C.muted });
s.iconBox({ x: 268, y: 530, w: 250, h: 48, icon: 'database', label: 'Database', size: 17 });
s.iconBox({ x: 538, y: 530, w: 282, h: 48, icon: 'workflow', label: 'Queue for messages', size: 17 });

s.write(OUT);
console.log('wrote', OUT.pathname);
