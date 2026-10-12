import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/scan-flow.excalidraw', import.meta.url);
const s = createScene('wash-scan');
const { C } = s;

s.frame({ w: 1120, h: 452 });

s.text({ x: 32, y: 24, text: 'From a scan to a running pump', size: 30 });
s.squiggle({ x: 34, y: 70, w: 410 });

// The scan and the three checks, in a fixed order
const steps = [
  ['scan-qr-code', 'Scan the\nFaris card', null],
  ['monitor-check', 'A registered\nbay?', 'unknown device:\nrefused'],
  ['fuel', 'Fuelled\nrecently?', 'no recent\nfuelling: refused'],
  ['timer', 'Time left\ntoday?', 'used up today:\nrefused'],
  ['droplets', 'Pump on,\nstop job queued', null]
];

steps.forEach(([icon, label, exit], i) => {
  const x = 40 + i * 210;
  const last = i === steps.length - 1;

  s.iconBox({
    x,
    y: 116,
    w: 170,
    h: 100,
    icon,
    label,
    size: 16,
    iconSize: 26,
    layout: 'stack',
    stroke: last ? C.iris : C.ink,
    fill: last ? C.irisTint : 'transparent',
    labelColor: C.ink,
    iconColor: last ? C.iris : C.ink
  });

  if (!last) {
    s.arrow({ points: [[x + 174, 166], [x + 206, 166]], color: C.iris });
  }

  if (exit) {
    s.arrow({ points: [[x + 85, 220], [x + 85, 252]], color: C.muted, dotted: true });
    s.text({ x: x + 85, y: 258, text: exit, size: 15, color: C.muted, align: 'center' });
  }
});

s.text({ x: 545, y: 88, text: 'local record first, then the card system', size: 15, color: C.soft, align: 'center' });

// While a wash runs
s.line({ points: [[40, 324], [1080, 324]], color: C.line, dashed: true });
s.text({ x: 40, y: 336, text: 'While a wash runs', size: 18, color: C.soft });

const later = [
  ['circle-pause', 'scan again: paused,\nthe time used is kept', C.ink],
  ['play', 'scan later: carries on\nwith the time left', C.ink],
  ['alarm-clock', 'end of a turn: a queued\njob stops the pump', C.iris]
];

later.forEach(([icon, label, color], i) => {
  s.iconBox({ x: 40 + i * 350, y: 372, w: 320, h: 58, icon, label, size: 16, iconSize: 22, stroke: color, labelColor: C.ink, iconColor: color });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
