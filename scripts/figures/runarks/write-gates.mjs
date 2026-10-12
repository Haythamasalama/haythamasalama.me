import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/runarks/write-gates.excalidraw', import.meta.url);
const s = createScene('gates');
const { C } = s;

s.frame({ w: 1120, h: 472 });

s.text({ x: 32, y: 24, text: 'Approve the measurement, not the SQL', size: 30 });
s.squiggle({ x: 34, y: 70, w: 470 });

// Six gates run before anyone is asked
s.rect({ x: 32, y: 104, w: 1056, h: 152, stroke: C.muted, dashed: true });
s.text({ x: 50, y: 114, text: 'before anyone is asked to approve', size: 16, color: C.muted });

const gates = [
  ['1 · scan the\nraw text', 'scan-text'],
  ['2 · parse into\none description', 'braces'],
  ['3 · write\nrules', 'list-checks'],
  ['4 · grants on\nevery column', 'key-round'],
  ['5 · dry run,\nrolled back', 'flask-conical'],
  ['6 · fingerprint\nthe facts', 'hash']
];

gates.forEach(([label, icon], i) => {
  const x = 50 + i * 172;
  const key = i === 4;

  s.iconBox({
    x,
    y: 144,
    w: 150,
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

  if (i < gates.length - 1) {
    s.arrow({ points: [[x + 152, 192], [x + 170, 192]], color: C.iris });
  }
});

s.text({ x: 813, y: 264, text: 'counts the rows a write would touch,\ntriggers and cascades included', size: 16, color: C.iris, align: 'center' });

// The approver judges the measured effect
s.arrow({ points: [[985, 244], [985, 318]], color: C.iris });
s.iconBox({
  x: 690,
  y: 322,
  w: 398,
  h: 88,
  icon: 'user-check',
  iconSize: 30,
  label: 'the approver sees the statement,\nthe tables, the measured rows\nand the masked columns',
  size: 17,
  stroke: C.iris,
  labelColor: C.ink
});

// Gate 7: run once, capped by what was approved
s.arrow({ points: [[686, 366], [628, 366]], color: C.iris });
s.iconBox({ x: 330, y: 324, w: 294, h: 84, icon: 'timer', label: '7 · run in a transaction\nrow cap · timeout', size: 18, iconSize: 26 });

s.arrow({ points: [[326, 350], [266, 334]], color: C.iris });
s.arrow({ points: [[326, 384], [266, 414]], color: C.muted, dotted: true });
s.icon({ x: 32, y: 312, size: 24, name: 'database', color: C.ink });
s.text({ x: 64, y: 310, text: 'commit, and log\nthe real count', size: 16 });
s.icon({ x: 32, y: 404, size: 22, name: 'rotate-ccw', color: C.muted });
s.text({ x: 62, y: 400, text: 'more rows than approved:\nroll back and fail', size: 16, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
