import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/workshop-management/before-after.excalidraw', import.meta.url);
const s = createScene('workshop-before');
const { C } = s;

s.frame({ w: 1120, h: 460 });

s.text({ x: 32, y: 24, text: 'From a paper form to one system', size: 30 });
s.squiggle({ x: 34, y: 70, w: 430 });

s.line({ points: [[548, 108], [548, 436]], color: C.line, dashed: true });

// Before: four tools, each keeping part of a visit
s.text({ x: 40, y: 108, text: 'Before', size: 22, color: C.muted });

const tools = [
  ['clipboard-list', 'paper form', 'filled in by hand'],
  ['sheet', 'spreadsheet', 'name, phone, car, date'],
  ['file-text', 'online form', 'checks, not who did them'],
  ['database', 'desktop database', 'the records so far']
];

tools.forEach(([icon, label, note], i) => {
  const y = 146 + i * 64;

  s.iconBox({ x: 44, y, w: 236, h: 42, icon, label, size: 17, iconSize: 20, stroke: C.muted, labelColor: C.soft, iconColor: C.soft, dashed: true });
  s.text({ x: 294, y: y + 10, text: note, size: 16, color: C.muted });

  if (i < tools.length - 1) {
    s.arrow({ points: [[162, y + 44], [162, y + 62]], color: C.muted });
  }
});

s.text({ x: 44, y: 396, text: 'each kept part of a visit,\nnone kept the whole of it', size: 17, color: C.muted });

// Now: one record per visit, filled in at the bay
s.text({ x: 588, y: 108, text: 'Now', size: 22, color: C.iris });

s.person({ x: 596, y: 140, size: 40 });
s.pill({ x: 644, y: 146, w: 124, label: 'Technician' });
s.person({ x: 948, y: 140, size: 40 });
s.pill({ x: 994, y: 146, w: 116, label: 'Supervisor' });

const steps = [
  ['tablet-smartphone', 'bay app,\ncode sign-in'],
  ['clipboard-check', 'one record\nper visit'],
  ['layout-dashboard', 'dashboards\nper branch']
];

steps.forEach(([icon, label], i) => {
  const x = 588 + i * 180;
  const key = i === 1;

  s.iconBox({
    x,
    y: 196,
    w: 140,
    h: 96,
    icon,
    label,
    size: 16,
    iconSize: 24,
    layout: 'stack',
    stroke: key ? C.iris : C.ink,
    fill: key ? C.irisTint : 'transparent',
    labelColor: C.ink,
    iconColor: key ? C.iris : C.ink
  });

  if (i < steps.length - 1) {
    s.arrow({ points: [[x + 144, 244], [x + 176, 244]], color: C.iris });
  }
});

const notes = [
  ['list-checks', 'a check closes only when it is complete', C.soft],
  ['sliders-horizontal', 'the workshop edits the checklist itself', C.soft],
  ['shield-check', 'only registered devices can reach it', C.iris]
];

notes.forEach(([icon, label, color], i) => {
  const y = 322 + i * 36;

  s.icon({ x: 590, y: y + 1, size: 20, name: icon, color });
  s.text({ x: 620, y, text: label, size: 17, color });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
