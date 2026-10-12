import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/winch/ai-workflow.excalidraw', import.meta.url);
const s = createScene('winch-ai');
const { C } = s;

s.frame({ w: 1120, h: 552 });

s.text({ x: 32, y: 24, text: 'How AI fits into the way the team builds', size: 30 });
s.squiggle({ x: 34, y: 70, w: 560 });

// The engineer asks; the engineer also improves the rules
s.person({ x: 40, y: 128, size: 46 });
s.pill({ x: 100, y: 136, w: 110, label: 'Engineer' });
s.arrow({ points: [[214, 152], [276, 176]], color: C.iris });
s.text({ x: 40, y: 200, text: 'asks for a feature,\na fix or a review,\nand adds to the rules\nwhen they find a gap', size: 15, color: C.muted });

// A coding agent loads only what the task needs
s.rect({ x: 280, y: 108, w: 440, h: 252, stroke: C.iris, dashed: true });
s.icon({ x: 298, y: 120, size: 22, name: 'bot', color: C.iris });
s.text({ x: 328, y: 120, text: 'a coding agent loads only what it needs', size: 16, color: C.iris });

const layers = [
  ['file-text', 'Project guide · always loaded'],
  ['file-code-2', 'Topic rules · only the topics in play'],
  ['route', 'Layer guide · when a file in it opens']
];

layers.forEach(([icon, label], i) => {
  const y = 160 + i * 64;

  s.iconBox({ x: 300, y, w: 400, h: 50, icon, label, size: 17 });

  if (i < layers.length - 1) {
    s.arrow({ points: [[500, y + 52], [500, y + 62]], color: C.muted });
  }
});

// Agents with one job each
s.arrow({ points: [[724, 230], [756, 230]], color: C.iris });
s.rect({ x: 760, y: 108, w: 328, h: 252 });
s.icon({ x: 778, y: 120, size: 22, name: 'users', color: C.ink });
s.text({ x: 808, y: 120, text: 'agents with one job each', size: 16 });

[['scaffold', 'review', 'audit'], ['UI', 'integration'], ['simplify', 'rename']].forEach((row, r) => {
  let x = 778;

  row.forEach((label) => {
    const w = label.length * 8.6 + 24;

    s.rect({ x, y: 160 + r * 48, w, h: 36, label, size: 16, stroke: C.soft, labelColor: C.soft });
    x += w + 10;
  });
});

s.text({ x: 778, y: 310, text: 'scaffold a whole feature, review a change,\nscore a domain against the rules', size: 14, color: C.muted });

// What comes out
s.arrow({ points: [[500, 362], [500, 390]], color: C.iris });

const steps = [
  ['blocks', 'fits the domain structure'],
  ['sparkles', 'formatted on each edit'],
  ['list-checks', 'checked against the rules']
];

steps.forEach(([icon, label], i) => {
  const x = 280 + i * 276;

  s.iconBox({ x, y: 394, w: i === 0 ? 256 : 252, h: 50, icon, label, size: 15 });

  if (i < steps.length - 1) {
    s.arrow({ points: [[x + 258, 419], [x + 274, 419]], color: C.iris });
  }
});

// The same rules for people
s.iconBox({ x: 280, y: 476, w: 380, h: 50, icon: 'book-open', label: 'engineering handbook, for people', size: 16, stroke: C.soft, labelColor: C.soft });
s.arrow({ points: [[664, 501], [704, 501]], color: C.iris, start: 'arrow' });
s.iconBox({ x: 708, y: 476, w: 380, h: 50, icon: 'file-code-2', label: 'the same rules, for agents', size: 16, stroke: C.iris, labelColor: C.ink, iconColor: C.iris });

s.write(OUT);
console.log('wrote', OUT.pathname);
