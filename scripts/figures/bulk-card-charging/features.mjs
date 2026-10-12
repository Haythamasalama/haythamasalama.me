import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/bulk-card-charging/features.excalidraw', import.meta.url);
const s = createScene('charging-features');
const { C } = s;

s.frame({ w: 1120, h: 590 });

s.text({ x: 32, y: 24, text: 'Everything the system does', size: 30 });
s.squiggle({ x: 34, y: 70, w: 400 });

// Four stages, left to right, each with what it covers; the three outcomes are what matters
const columns = [
  {
    title: 'Set up',
    items: [
      ['store', 'Merchants', 'their Clever accounts,\nsigned in once'],
      ['shield-check', 'Users and roles', 'a permission for\neach action'],
      ['monitor-smartphone', 'Registered devices', 'only these can\nopen the app']
    ]
  },
  {
    title: 'Run a batch',
    items: [
      ['file-spreadsheet', 'Upload a spreadsheet', 'its totals must match\nwhat was typed'],
      ['user-check', 'Approval', 'its own permission,\nand the password'],
      ['octagon-x', 'Cancel', 'cards not yet sent\nnever go out'],
      ['notebook-pen', 'Close by hand', 'with a note that stays\nwith the batch']
    ]
  },
  {
    title: 'Every card',
    items: [
      ['layers', 'One job per card', 'queued, and locked\nwhile it is sent'],
      ['activity', 'Live progress', 'every change reaches\nthe page'],
      ['list-checks', 'Three outcomes', 'processed, failed\nor stuck', true]
    ]
  },
  {
    title: 'Follow up',
    items: [
      ['circle-question-mark', 'Settle a stuck card', 'by a person, with\nthe password'],
      ['repeat', 'Resend failed cards', 'nothing was charged,\nso it is safe'],
      ['file-warning', 'Error log', 'every failure, with\nthe platform’s reply'],
      ['file-down', 'Excel export', 'every card’s result\nin one file']
    ]
  }
];

const W = 250;
const H = 90;
const GAP = 20;

columns.forEach((column, c) => {
  const x = 32 + c * (W + GAP);

  s.text({ x: x + 4, y: 106, text: column.title, size: 20, color: C.ink });

  if (c < columns.length - 1) {
    s.arrow({ points: [[x + 20 + column.title.length * 11, 120], [x + W + GAP - 8, 120]], color: C.muted });
  }

  column.items.forEach(([icon, title, note, key], i) => {
    const y = 148 + i * (H + 14);

    s.rect({ x, y, w: W, h: H, stroke: key ? C.iris : C.soft, fill: key ? C.irisTint : 'transparent' });
    s.icon({ x: x + 16, y: y + 16, size: 22, name: icon, color: key ? C.iris : C.ink });
    s.text({ x: x + 48, y: y + 14, text: title, size: 17, color: C.ink });
    s.text({ x: x + 48, y: y + 40, text: note, size: 15, color: C.muted });
  });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
