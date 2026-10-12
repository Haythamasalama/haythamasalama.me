import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/crm-and-hr/architecture.excalidraw', import.meta.url);
const s = createScene('crm-arch');
const { C } = s;

s.frame({ w: 1120, h: 610 });

s.text({ x: 32, y: 24, text: 'CRM & HR at a glance', size: 30 });
s.squiggle({ x: 34, y: 70, w: 290 });

// The people who use it
const people = [
  ['Agents', 96],
  ['Field team', 126],
  ['HR', 60],
  ['Managers', 112]
];

people.forEach(([label, w], i) => {
  const y = 126 + i * 84;

  s.person({ x: 32, y, size: 42 });
  s.pill({ x: 84, y: y + 6, w, label });
  s.arrow({ points: [[88 + w, y + 22], [254, y + 22]], color: C.muted });
});

// One web system, split by role
s.rect({ x: 260, y: 104, w: 480, h: 396 });
s.text({ x: 278, y: 114, text: 'one web system · roles decide who sees what', size: 15, color: C.soft });

s.rect({ x: 280, y: 144, w: 440, h: 126, stroke: C.muted, dashed: true });
s.text({ x: 296, y: 152, text: 'CRM', size: 16, color: C.muted });

[['Contacts', 'Calls', 'Tickets'], ['Visits', 'Stores', 'Messages']].forEach((row, r) => {
  row.forEach((label, i) => {
    s.rect({ x: 296 + i * 140, y: 182 + r * 42, w: 128, h: 32, label, size: 15, stroke: C.soft, labelColor: C.soft });
  });
});

s.rect({ x: 280, y: 286, w: 440, h: 126, stroke: C.muted, dashed: true });
s.text({ x: 296, y: 294, text: 'HR', size: 16, color: C.muted });

[['Employees', 'Contracts', 'Shifts'], ['Leave', 'Holidays', 'Attendance']].forEach((row, r) => {
  row.forEach((label, i) => {
    const attendance = label === 'Attendance';

    s.rect({ x: 296 + i * 140, y: 324 + r * 42, w: 128, h: 32, label, size: 15, stroke: attendance ? C.iris : C.soft, fill: attendance ? C.irisTint : 'transparent', labelColor: attendance ? C.ink : C.soft });
  });
});

s.iconBox({ x: 280, y: 428, w: 440, h: 50, icon: 'bell', label: 'Notifications: in the system and team chat', size: 16 });

// Outside systems
const outside = [
  ['phone-incoming', 'Phone system', 'shows the caller,\nlogs every call'],
  ['store', 'Clever', 'partner stores, branches,\nbalances, customers'],
  ['send', 'Messaging', 'SMS, WhatsApp\nand Telegram'],
  ['fingerprint-pattern', 'Access-control devices', 'the people on each device\nand their punches']
];

outside.forEach(([icon, title, note], i) => {
  const y = 112 + i * 98;

  s.rect({ x: 810, y, w: 280, h: 84, stroke: C.muted, dashed: true });
  s.icon({ x: 826, y: y + 12, size: 20, name: icon, color: C.ink });
  s.text({ x: 854, y: y + 10, text: title, size: 17 });
  s.text({ x: 826, y: y + 38, text: note, size: 15, color: C.muted });
  s.arrow({ points: [[744, 160 + i * 98], [806, y + 42]], color: i === 3 ? C.iris : C.muted, start: 'arrow' });
});

// What runs behind it
s.arrow({ points: [[380, 502], [380, 530]], color: C.muted });
s.arrow({ points: [[620, 502], [620, 530]], color: C.muted });
s.iconBox({ x: 260, y: 534, w: 220, h: 50, icon: 'database', label: 'Database', size: 17 });
s.iconBox({ x: 500, y: 534, w: 260, h: 50, icon: 'workflow', label: 'Queues & schedules', size: 17 });
s.text({ x: 780, y: 542, text: 'syncs Clever, sends messages,\nimports and pairs punches', size: 15, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
