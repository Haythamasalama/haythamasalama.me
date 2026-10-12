import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/interactive-physics/study.excalidraw', import.meta.url);
const s = createScene('physics-study');
const { C } = s;

s.frame({ w: 1120, h: 470 });

s.text({ x: 32, y: 24, text: 'The study', size: 30 });
s.squiggle({ x: 34, y: 70, w: 150 });

// Who answered: the school, a random sample, the survey
s.icon({ x: 92, y: 120, size: 56, name: 'school', color: C.soft });
s.text({ x: 120, y: 186, text: '1,180 students\nat the school', size: 17, color: C.soft, align: 'center' });
s.arrow({ points: [[196, 150], [256, 150]], color: C.muted, dashed: true });

[0, 1, 2].forEach(i => s.person({ x: 268 + i * 38, y: 118, size: 40 }));
s.text({ x: 326, y: 186, text: '70 picked\nat random', size: 17, color: C.ink, align: 'center' });
s.arrow({ points: [[402, 150], [458, 150]], color: C.iris });

s.iconBox({ x: 466, y: 104, w: 220, h: 92, icon: 'clipboard-list', label: '15 statements\nagree · neutral · disagree', size: 16, iconSize: 26, layout: 'stack', stroke: C.ink });

s.text({ x: 576, y: 212, text: 'in three parts: physics and me,\nthe program, and motivation', size: 15, color: C.muted, align: 'center' });

s.arrow({ points: [[690, 150], [744, 150]], color: C.iris });

// What students rated highest in each part
s.text({ x: 756, y: 100, text: 'rated highest', size: 18, color: C.iris });

const findings = [
  ['about physics', '“physics is a hard subject”'],
  ['about the program', 'the short videos'],
  ['about motivation', '“the program raised my\nmotivation to learn physics”']
];

findings.forEach(([part, finding], i) => {
  const y = 132 + i * 82;
  const key = i === 2;

  s.rect({ x: 756, y, w: 330, h: 70, stroke: key ? C.iris : C.ink, fill: key ? C.irisTint : 'transparent' });
  s.text({ x: 772, y: y + 8, text: part, size: 14, color: C.muted });
  s.text({ x: 772, y: y + 28, text: finding, size: 16, color: C.ink });
});

s.line({ points: [[40, 400], [1080, 400]], color: C.line, dashed: true });
s.icon({ x: 44, y: 420, size: 24, name: 'trophy', color: C.iris });
s.text({ x: 78, y: 420, text: 'Research Excellence Award · West Gaza Education Directorate · 2017', size: 18, color: C.ink });

s.write(OUT);
console.log('wrote', OUT.pathname);
