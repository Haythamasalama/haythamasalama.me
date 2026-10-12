import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/winch/architecture.excalidraw', import.meta.url);
const s = createScene('winch-arch');
const { C } = s;

s.frame({ w: 1120, h: 604 });

s.text({ x: 32, y: 24, text: 'WINCH at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 240 });

// The apps people use
const apps = [
  ['briefcase', 'Business app\n& dashboard'],
  ['truck', 'Carrier app\n& dashboard'],
  ['smartphone', 'Driver app'],
  ['shield-user', 'Control panel']
];

apps.forEach(([icon, label], i) => {
  const y = 128 + i * 70;

  s.iconBox({ x: 32, y, w: 190, h: 56, icon, label, size: 16 });
  s.arrow({ points: [[226, y + 28], [276, 162]], color: C.muted });
});

// One back end
s.rect({ x: 260, y: 104, w: 500, h: 372 });
s.text({ x: 278, y: 114, text: 'the back end · one modular monolith', size: 16, color: C.soft });

s.iconBox({ x: 280, y: 140, w: 460, h: 44, icon: 'route', label: 'an API for each app', size: 17 });

s.rect({ x: 280, y: 202, w: 460, h: 128, stroke: C.muted, dashed: true });
s.text({ x: 296, y: 210, text: 'more than 50 domains, each behind a contract', size: 16, color: C.muted });

const rows = [
  ['Orders', 'Quotations', 'Waybills', 'Accounting'],
  ['Carriers', 'Fleet', 'Rentals', 'Locations']
];

rows.forEach((row, r) => {
  let x = 296;

  row.forEach((label) => {
    const w = label.length * 8.6 + 20;

    s.rect({ x, y: 240 + r * 42, w, h: 32, label, size: 15, stroke: C.soft, labelColor: C.soft });
    x += w + 10;
  });
});

const parts = [
  ['shield-check', 'Security'],
  ['bell', 'Notifications'],
  ['file-spreadsheet', 'Exports'],
  ['plug', 'Integration\nengine']
];

parts.forEach(([icon, label], i) => {
  s.iconBox({ x: 280 + i * 118, y: 350, w: 106, h: 106, icon, label, size: 15, iconSize: 24, layout: 'stack', stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
});

// The platforms WINCH connects to
const platforms = [
  ['landmark', 'Government services', 'waybills, authorisations,\ne-invoices and ID checks'],
  ['credit-card', 'Payments', 'payment gateways and banking'],
  ['sparkles', 'AI models', 'language and vision models'],
  ['message-square', 'Messaging', 'WhatsApp, SMS, email\nand push notifications']
];

platforms.forEach(([icon, title, items], i) => {
  const y = 116 + i * 88;
  const lines = items.split('\n').length;

  s.rect({ x: 820, y, w: 270, h: 76, stroke: C.muted, dashed: true });
  s.icon({ x: 836, y: y + 12, size: 20, name: icon, color: C.ink });
  s.text({ x: 864, y: y + 10, text: title, size: 17 });
  s.text({ x: 836, y: y + (lines > 1 ? 34 : 42), text: items, size: 15, color: C.muted });
});

s.arrow({ points: [[756, 402], [816, 300]], color: C.iris });
s.text({ x: 955, y: 466, text: 'one pipeline for every vendor:\nguard, auth, rate limit, ledger', size: 15, color: C.iris, align: 'center' });

// What runs behind it
s.arrow({ points: [[380, 478], [380, 524]], color: C.muted });
s.arrow({ points: [[510, 478], [510, 524]], color: C.muted });

s.iconBox({ x: 260, y: 528, w: 200, h: 50, icon: 'database', label: 'Database', size: 17 });
s.iconBox({ x: 474, y: 528, w: 250, h: 50, icon: 'workflow', label: 'Queues & scheduler', size: 17 });
s.iconBox({ x: 820, y: 528, w: 270, h: 50, icon: 'map-pin', label: 'Live tracking server', size: 17 });

s.write(OUT);
console.log('wrote', OUT.pathname);
