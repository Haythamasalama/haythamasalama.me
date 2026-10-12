import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/sanad/before-after.excalidraw', import.meta.url);
const s = createScene('sanad-before');
const { C } = s;

s.frame({ w: 1120, h: 508 });

s.text({ x: 32, y: 24, text: 'What could go wrong, and what prevents it', size: 30 });
s.squiggle({ x: 34, y: 70, w: 600 });

s.text({ x: 40, y: 108, text: 'The risk', size: 22, color: C.muted });
s.text({ x: 560, y: 108, text: 'What the platform does', size: 22, color: C.iris });

// One row per problem: the risk on the left, the safeguard on the right
const rows = [
  ['circle-question-mark', 'a balance nobody can trace\nback to its movements', 'scroll-text', 'a ledger: every movement linked to the\none before, with the balance after it'],
  ['unlink', 'units sold but not paid for,\nor paid for but not sold', 'package-check', 'one all-or-nothing step for units, money\nand fees, confirmed by a code'],
  ['calculator', 'returns worked out by hand,\ninvestor by investor', 'calendar-clock', 'a schedule of returns, paid per unit to\nevery investor in one action'],
  ['circle-alert', 'money moving in or out\nwith nobody checking it', 'user-check', 'deposits, withdrawals and bank accounts\napproved by a person on the team']
];

rows.forEach(([riskIcon, risk, fixIcon, fix], i) => {
  const y = 152 + i * 86;

  s.iconBox({ x: 40, y, w: 420, h: 64, icon: riskIcon, label: risk, size: 17, stroke: C.muted, labelColor: C.soft, dashed: true });
  s.arrow({ points: [[466, y + 32], [554, y + 32]], color: C.iris });
  s.iconBox({ x: 560, y, w: 520, h: 64, icon: fixIcon, label: fix, size: 17, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
