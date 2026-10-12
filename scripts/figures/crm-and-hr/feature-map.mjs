import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/crm-and-hr/feature-map.excalidraw', import.meta.url);
const s = createScene('crm-features');
const { C } = s;

s.frame({ w: 1120, h: 656 });

s.text({ x: 32, y: 24, text: 'Everything in the system', size: 30 });
s.squiggle({ x: 34, y: 70, w: 360 });

const sides = [
  {
    x: 32,
    pill: 'CRM',
    pillW: 76,
    who: 'customer service and the field team',
    items: [
      ['contact', 'Contacts', 'cards, notes, tickets\nand calls'],
      ['phone-incoming', 'Calls', 'the caller on screen,\nevery call logged'],
      ['ticket', 'Tickets', 'an owner, a priority\nand reminders'],
      ['store', 'Partner stores', 'synced from Clever,\nlow-balance alerts'],
      ['map-pin', 'Visit plans', 'a monthly visit to\nevery active store'],
      ['send', 'Messages', 'SMS from templates,\nWhatsApp in bulk']
    ]
  },
  {
    x: 568,
    pill: 'HR',
    pillW: 60,
    who: 'HR and managers',
    items: [
      ['users', 'Employees', 'imported from\nspreadsheets'],
      ['file-text', 'Contracts', 'type, pay\nand dates'],
      ['clock', 'Shifts', 'day shifts and\n24-hour shifts'],
      ['calendar-x', 'Leave & holidays', 'by type, for each\nemployee'],
      ['fingerprint-pattern', 'Attendance', 'punches from the\naccess-control devices'],
      ['file-spreadsheet', 'Reports', 'hours worked, leave\nand holidays']
    ]
  }
];

sides.forEach(({ x, pill, pillW, who, items }) => {
  s.rect({ x, y: 104, w: 520, h: 424, stroke: C.muted, dashed: true });
  s.person({ x: x + 20, y: 118, size: 38 });
  s.pill({ x: x + 66, y: 122, w: pillW, label: pill });
  s.text({ x: x + 80 + pillW, y: 128, text: who, size: 16, color: C.muted });

  items.forEach(([icon, title, note], i) => {
    const cx = x + 20 + (i % 2) * 250;
    const cy = 178 + Math.floor(i / 2) * 114;

    s.rect({ x: cx, y: cy, w: 230, h: 100 });
    s.icon({ x: cx + 16, y: cy + 16, size: 24, name: icon });
    s.text({ x: cx + 50, y: cy + 17, text: title, size: 18 });
    s.text({ x: cx + 16, y: cy + 50, text: note, size: 16, color: C.muted });
  });
});

// What both sides share
s.rect({ x: 32, y: 548, w: 1056, h: 84, stroke: C.muted, dashed: true });
s.text({ x: 52, y: 578, text: 'both sides share', size: 16, color: C.muted });
s.iconBox({ x: 200, y: 564, w: 430, h: 52, icon: 'bell', label: 'Notifications, in the system and team chat', size: 16 });
s.iconBox({ x: 652, y: 564, w: 416, h: 52, icon: 'shield-check', label: 'Roles and permissions: who sees what', size: 16 });

s.write(OUT);
console.log('wrote', OUT.pathname);
