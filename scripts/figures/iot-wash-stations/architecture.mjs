import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/architecture.excalidraw', import.meta.url);
const s = createScene('wash-arch');
const { C } = s;

s.frame({ w: 1120, h: 590 });

s.text({ x: 32, y: 24, text: 'The wash system at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 380 });

// The customer at the bay
s.person({ x: 40, y: 120, size: 44 });
s.pill({ x: 94, y: 126, w: 120, label: 'Customer' });
s.iconBox({ x: 32, y: 190, w: 220, h: 66, icon: 'scan-qr-code', label: 'Bay screen\n+ card scanner', size: 16, iconSize: 24 });
s.arrow({ points: [[256, 222], [306, 172]], color: C.iris });
s.text({ x: 32, y: 266, text: 'sends the card number', size: 15, color: C.muted });

// Staff
s.person({ x: 40, y: 398, size: 44 });
s.pill({ x: 94, y: 404, w: 84, label: 'Staff' });
s.arrow({ points: [[182, 420], [306, 423]], color: C.muted });

// One server for every station
s.rect({ x: 290, y: 104, w: 470, h: 360 });
s.text({ x: 308, y: 114, text: 'the server · one for all stations', size: 16, color: C.soft });

const steps = [
  ['monitor-check', 'Bay check: a registered bay?'],
  ['fuel', 'Card check: fuelled recently?'],
  ['timer', 'Session: time left today'],
  ['alarm-clock', 'Queued job: stop on time']
];

steps.forEach(([icon, label], i) => {
  const y = 146 + i * 60;

  s.iconBox({ x: 310, y, w: 430, h: 46, icon, label, size: 17, stroke: C.iris, labelColor: C.ink, iconColor: C.iris });

  if (i < steps.length - 1) {
    s.arrow({ points: [[525, y + 48], [525, y + 58]], color: C.iris });
  }
});

s.iconBox({ x: 310, y: 400, w: 430, h: 46, icon: 'layout-dashboard', label: 'Dashboard: washes and bays', size: 17 });

// The company's card system
s.rect({ x: 820, y: 116, w: 270, h: 84, stroke: C.muted, dashed: true });
s.icon({ x: 836, y: 128, size: 20, name: 'credit-card', color: C.ink });
s.text({ x: 864, y: 126, text: 'Faris card system', size: 17 });
s.text({ x: 836, y: 160, text: 'when the card last fuelled', size: 15, color: C.muted });
s.arrow({ points: [[744, 229], [816, 172]], color: C.azure, start: 'arrow' });
s.text({ x: 955, y: 210, text: 'asked only when the\nlocal record is too old', size: 14, color: C.muted, align: 'center' });

// The bay itself
s.rect({ x: 820, y: 274, w: 270, h: 190, stroke: C.ink });
s.text({ x: 836, y: 284, text: 'at the bay', size: 16, color: C.soft });
s.icon({ x: 836, y: 314, size: 26, name: 'simple-icons:raspberrypi', color: C.ink });
s.text({ x: 870, y: 316, text: 'Raspberry Pi', size: 17 });
s.text({ x: 836, y: 348, text: 'GPIO pins, set by the server', size: 14, color: C.muted });

s.rect({ x: 836, y: 380, w: 92, h: 34, label: 'relay', size: 15 });
s.arrow({ points: [[930, 397], [966, 397]], color: C.ink });
s.icon({ x: 972, y: 382, size: 28, name: 'droplets', color: C.ink });
s.text({ x: 1006, y: 386, text: 'pump', size: 15, color: C.soft });

[0, 1, 2].forEach((i) => {
  s.ellipse({ x: 838 + i * 26, y: 428, w: 16, h: 16, stroke: C.soft });
});
s.text({ x: 920, y: 426, text: 'status lights', size: 15, color: C.soft });

s.arrow({ points: [[744, 312], [816, 336]], color: C.iris });
s.arrow({ points: [[744, 423], [816, 432]], color: C.muted, dotted: true });

// Behind the server
s.arrow({ points: [[420, 466], [420, 498]], color: C.muted });
s.arrow({ points: [[640, 466], [640, 498]], color: C.muted });
s.iconBox({ x: 310, y: 502, w: 210, h: 50, icon: 'database', label: 'Database', size: 17 });
s.text({ x: 415, y: 558, text: 'cards, sessions, logs', size: 15, color: C.muted, align: 'center' });
s.iconBox({ x: 540, y: 502, w: 200, h: 50, icon: 'workflow', label: 'Queue', size: 17 });
s.text({ x: 640, y: 558, text: 'delayed stop jobs', size: 15, color: C.muted, align: 'center' });

s.write(OUT);
console.log('wrote', OUT.pathname);
