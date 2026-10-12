import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/crm-and-hr/attendance.excalidraw', import.meta.url);
const s = createScene('crm-attend');
const { C } = s;

s.frame({ w: 1120, h: 560 });

s.text({ x: 32, y: 24, text: 'From punches to shifts', size: 30 });
s.squiggle({ x: 34, y: 70, w: 320 });

// The pipeline
const steps = [
  ['fingerprint-pattern', 'Access-control\ndevices', 'each person on a\ndevice is linked\nto an employee'],
  ['download', 'Import\nthe punches', 'pulled for a period\nand kept raw'],
  ['workflow', 'Pair them\ninto shifts', 'the shift says when\nit starts, ends and\non which day'],
  ['calendar-check', 'Attendance', 'HR fixes a missed\npunch, or re-runs\na day after an outage'],
  ['file-spreadsheet', 'Reports', 'hours worked,\nleave and holidays']
];

steps.forEach(([icon, label, note], i) => {
  const x = 32 + i * 214;
  const key = i === 2;

  s.iconBox({
    x,
    y: 112,
    w: 174,
    h: 100,
    icon,
    label,
    size: 16,
    iconSize: 26,
    layout: 'stack',
    stroke: key ? C.iris : C.ink,
    fill: key ? C.irisTint : 'transparent',
    labelColor: C.ink,
    iconColor: key ? C.iris : C.ink
  });
  s.text({ x: x + 87, y: 224, text: note, size: 15, color: C.muted, align: 'center' });

  if (i < steps.length - 1) {
    s.arrow({ points: [[x + 178, 162], [x + 210, 162]], color: C.iris });
  }
});

// One rule for a day shift and a 24-hour shift
s.line({ points: [[40, 312], [1080, 312]], color: C.line, dashed: true });
s.text({ x: 40, y: 326, text: 'One rule, for a day shift and a 24-hour shift', size: 18, color: C.soft });

const left = 260;
const right = 1060;
const midnight = 660;

s.text({ x: (left + midnight) / 2, y: 362, text: 'day 1', size: 16, color: C.muted, align: 'center' });
s.text({ x: (midnight + right) / 2, y: 362, text: 'day 2', size: 16, color: C.muted, align: 'center' });
s.line({ points: [[midnight, 364], [midnight, 536]], color: C.muted, dashed: true });
s.text({ x: midnight + 10, y: 336, text: 'midnight', size: 15, color: C.muted });

// Positions follow the clock: each day is 400px wide
const shifts = [
  ['day shift', 420, 330, 480, 'one shift'],
  ['24-hour shift', 494, 400, 800, 'one shift, across midnight']
];

shifts.forEach(([label, y, start, end, result]) => {
  s.text({ x: 40, y: y - 11, text: label, size: 17 });
  s.line({ points: [[left, y], [right, y]], color: C.line });
  s.line({ points: [[start, y], [end, y]], color: C.iris, sw: 4 });
  s.ellipse({ x: start - 7, y: y - 7, w: 14, h: 14, stroke: C.ink, fill: C.white });
  s.ellipse({ x: end - 7, y: y - 7, w: 14, h: 14, stroke: C.ink, fill: C.white });
  s.text({ x: start, y: y + 12, text: 'in', size: 15, color: C.soft, align: 'center' });
  s.text({ x: end, y: y + 12, text: 'out', size: 15, color: C.soft, align: 'center' });
  s.text({ x: end + 18, y: y - 30, text: result, size: 15, color: C.iris });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
