import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/sanad/returns.excalidraw', import.meta.url);
const s = createScene('sanad-returns');
const { C } = s;

s.frame({ w: 1120, h: 516 });

s.text({ x: 32, y: 24, text: 'Returns for every investor', size: 30 });
s.squiggle({ x: 34, y: 70, w: 380 });

// The life of an opportunity
s.text({ x: 32, y: 104, text: 'an opportunity’s life', size: 16, color: C.soft });

const stages = ['Soon', 'Available', 'Offering\ncomplete', 'Profit\ndistribution', 'Liquidation\ncomplete', 'Completed'];

stages.forEach((label, i) => {
  const x = 32 + i * 180;
  const paying = i === 3;

  s.rect({ x, y: 132, w: 156, h: 54, label, size: 16, stroke: paying ? C.iris : C.ink, fill: paying ? C.irisTint : 'transparent', labelColor: C.ink });

  if (i < stages.length - 1) {
    s.arrow({ points: [[x + 158, 159], [x + 178, 159]], color: C.muted });
  }
});

s.text({ x: 290, y: 196, text: 'investors buy units', size: 15, color: C.muted, align: 'center' });
s.text({ x: 650, y: 196, text: 'returns are paid', size: 15, color: C.iris, align: 'center' });

// 1 · The plan the team sets once
s.rect({ x: 32, y: 244, w: 300, h: 196 });
s.icon({ x: 50, y: 258, size: 22, name: 'sliders-horizontal', color: C.ink });
s.text({ x: 82, y: 258, text: '1 · A return plan', size: 17 });
s.text({ x: 50, y: 298, text: 'a fixed amount or a percentage\npaid once, monthly or yearly\nbetween a start and end date', size: 15, color: C.soft });
s.text({ x: 50, y: 384, text: 'it can change until the\nfirst period is paid', size: 15, color: C.muted });

s.arrow({ points: [[336, 342], [356, 342]], color: C.iris });

// 2 · The schedule the platform builds from it
s.rect({ x: 360, y: 244, w: 300, h: 196 });
s.icon({ x: 378, y: 258, size: 22, name: 'calendar-range', color: C.ink });
s.text({ x: 410, y: 258, text: '2 · A schedule', size: 17 });

['1', '2', '3', '4', '…'].forEach((label, i) => {
  s.rect({ x: 378 + i * 54, y: 300, w: 44, h: 36, label, size: 16, stroke: C.soft, labelColor: C.soft });
});

s.text({ x: 378, y: 356, text: 'each period’s return,\nsplit per unit sold', size: 15, color: C.soft });

s.arrow({ points: [[664, 342], [684, 342]], color: C.iris });

// 3 · Paying a period, to everyone at once
s.rect({ x: 688, y: 244, w: 400, h: 248, stroke: C.iris });
s.icon({ x: 706, y: 258, size: 22, name: 'hand-coins', color: C.iris });
s.text({ x: 738, y: 258, text: '3 · Paying a period', size: 17 });

s.icon({ x: 706, y: 296, size: 18, name: 'key-round', color: C.soft });
s.text({ x: 732, y: 294, text: 'an admin confirms their password', size: 15, color: C.soft });
s.icon({ x: 706, y: 324, size: 18, name: 'scale', color: C.soft });
s.text({ x: 732, y: 322, text: 'and records a profit or a loss', size: 15, color: C.soft });

[742, 862, 982].forEach((x) => {
  s.arrow({ points: [[862, 352], [x + 18, 370]], color: C.iris });
  s.person({ x, y: 374, size: 36 });
});

s.text({ x: 706, y: 424, text: 'each investor gets units × share', size: 15, color: C.soft });
s.text({ x: 706, y: 452, text: 'one transaction, one ledger row each', size: 15, color: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
