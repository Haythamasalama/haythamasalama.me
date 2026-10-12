import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/bulk-card-charging/before-after.excalidraw', import.meta.url);
const s = createScene('charging-before');
const { C } = s;

s.frame({ w: 1120, h: 452 });

s.text({ x: 32, y: 24, text: 'From a list of cards to a checked batch', size: 30 });
s.squiggle({ x: 34, y: 70, w: 500 });

s.line({ points: [[548, 108], [548, 428]], color: C.line, dashed: true });

// Without it: a list goes straight to the platform, with nothing in between
s.text({ x: 40, y: 108, text: 'Without it', size: 22, color: C.muted });

s.iconBox({ x: 44, y: 150, w: 200, h: 58, icon: 'sheet', label: 'cards and\namounts', size: 17, stroke: C.muted, labelColor: C.soft, iconColor: C.soft, dashed: true });
s.arrow({ points: [[248, 179], [430, 179]], color: C.muted, dashed: true });
s.icon({ x: 326, y: 148, size: 24, name: 'circle-question-mark', color: C.soft });
s.icon({ x: 444, y: 152, size: 52, name: 'server', color: C.soft });
s.text({ x: 470, y: 210, text: 'card platform', size: 16, color: C.muted, align: 'center' });

const risks = [
  ['calculator', 'nobody checks that the totals add up'],
  ['user-x', 'nobody approves the list first'],
  ['circle-question-mark', 'no answer in time: was the card charged?'],
  ['repeat', 'send it again, and it may be charged twice']
];

risks.forEach(([icon, label], i) => {
  s.icon({ x: 44, y: 258 + i * 42, size: 22, name: icon, color: C.soft });
  s.text({ x: 76, y: 258 + i * 42, text: label, size: 17, color: C.soft });
});

// With it: a batch that is checked, approved and sent card by card
s.text({ x: 588, y: 108, text: 'With it', size: 22, color: C.iris });

const steps = [
  ['file-spreadsheet', 'upload\n+ totals'],
  ['user-check', 'approve\n+ password'],
  ['layers', 'one job\nper card']
];

steps.forEach(([icon, label], i) => {
  const x = 588 + i * 132;
  const key = i === 1;

  s.iconBox({ x, y: 150, w: 114, h: 96, icon, label, size: 16, iconSize: 24, layout: 'stack', stroke: key ? C.iris : C.ink, labelColor: C.ink, iconColor: key ? C.iris : C.ink });
  s.arrow({ points: [[x + 116, 198], [x + 130, 198]], color: C.iris });
});

s.icon({ x: 1010, y: 170, size: 56, name: 'server', color: C.ink });
s.text({ x: 1038, y: 232, text: 'card platform', size: 16, color: C.muted, align: 'center' });

s.text({ x: 588, y: 270, text: 'every card ends with a clear status', size: 16, color: C.soft });

const outcomes = [
  ['processed', 'charged', C.iris, C.irisTint, C.ink],
  ['failed', 'safe to send again', C.muted, 'transparent', C.soft],
  ['stuck', 'a person checks', C.azure, 'transparent', C.ink]
];

outcomes.forEach(([label, note, stroke, fill, labelColor], i) => {
  const x = 588 + i * 175;

  s.rect({ x, y: 300, w: 150, h: 40, label, size: 17, stroke, fill, labelColor, dashed: i === 2 });
  s.text({ x: x + 75, y: 348, text: note, size: 15, color: C.muted, align: 'center' });
});

s.icon({ x: 590, y: 394, size: 22, name: 'activity', color: C.iris });
s.text({ x: 622, y: 392, text: 'live progress, and a record for every card', size: 17, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
