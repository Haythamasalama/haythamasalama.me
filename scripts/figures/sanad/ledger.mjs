import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/sanad/ledger.excalidraw', import.meta.url);
const s = createScene('sanad-ledger');
const { C } = s;

s.frame({ w: 1120, h: 512 });

s.text({ x: 32, y: 24, text: 'The wallet ledger', size: 30 });
s.squiggle({ x: 34, y: 70, w: 270 });

s.text({ x: 84, y: 104, text: 'one investor’s wallet, oldest movement first', size: 16, color: C.soft });

// Column labels
s.text({ x: 100, y: 138, text: 'movement', size: 15, color: C.muted });
s.text({ x: 300, y: 138, text: 'where it moves', size: 15, color: C.muted });
s.text({ x: 520, y: 138, text: 'balance after', size: 15, color: C.muted });

// Each movement, with the balance after it drawn as a bar (no amounts)
const movements = [
  ['landmark', 'Deposit', '+', 'bank account to wallet', 1],
  ['house', 'Investment', '−', 'wallet to investment', 0.42],
  ['receipt', 'Fees', '−', 'wallet to investment', 0.34],
  ['calendar-clock', 'Return', '+', 'returns to wallet', 0.56],
  ['arrow-up-right', 'Withdrawal', '−', 'wallet to bank account', 0.3]
];

const rowY = i => 164 + i * 62;

movements.forEach(([icon, label, sign, route, balance], i) => {
  const y = rowY(i);

  s.rect({ x: 84, y, w: 600, h: 48 });
  s.icon({ x: 100, y: y + 13, size: 22, name: icon, color: C.ink });
  s.text({ x: 132, y: y + 13, text: label, size: 18 });
  s.text({ x: 256, y: y + 9, text: sign, size: 24, color: sign === '+' ? C.iris : C.soft });
  s.text({ x: 300, y: y + 15, text: route, size: 16, color: C.muted });
  s.rect({ x: 520, y: y + 17, w: Math.round(140 * balance), h: 14, stroke: C.iris, fill: C.irisTint, sw: 1, rounded: false });

  // Every movement points back to the one before it
  if (i > 0) {
    const prev = rowY(i - 1);

    s.arrow({ points: [[82, y + 24], [54, (y + prev) / 2 + 24], [82, prev + 24]], color: C.iris, curved: true });
  }
});

// What the chain gives
s.text({ x: 724, y: 170, text: 'each movement points\nto the one before it,\nand carries the balance\nafter it', size: 16, color: C.soft });
s.text({ x: 724, y: 270, text: 'the database writes the\nlink and the balance\nitself, on every movement', size: 15, color: C.muted });

s.arrow({ points: [[688, rowY(4) + 24], [748, 420]], color: C.iris });
s.iconBox({ x: 752, y: 376, w: 336, h: 84, icon: 'wallet', label: 'the wallet’s balance is\nalways its last movement', size: 17, iconSize: 26, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

s.text({ x: 84, y: 478, text: 'every movement also reads as one line, in Arabic or English', size: 15, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
