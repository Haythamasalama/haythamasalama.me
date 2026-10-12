import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/quran-tracker/week.excalidraw', import.meta.url);
const s = createScene('quran-week');
const { C } = s;

s.frame({ w: 1120, h: 486 });

s.text({ x: 32, y: 24, text: 'A week in a memorization circle', size: 30 });
s.squiggle({ x: 34, y: 70, w: 450 });

// The teacher records each student's week
s.person({ x: 70, y: 118, size: 52 });
s.pill({ x: 44, y: 182, w: 104, label: 'teacher' });

const entries = [
  ['calendar-check', 'days attended'],
  ['book-open', 'pages memorized'],
  ['repeat', 'pages reviewed'],
  ['trophy', 'grade + rank'],
  ['clipboard-check', 'tests: part + grade']
];

s.rect({ x: 176, y: 108, w: 270, h: 236, dashed: true, stroke: C.muted });
s.text({ x: 192, y: 118, text: 'each student’s week', size: 16, color: C.muted });

entries.forEach(([icon, label], i) => {
  s.icon({ x: 194, y: 152 + i * 38, size: 22, name: icon, color: C.ink });
  s.text({ x: 226, y: 152 + i * 38, text: label, size: 17, color: C.ink });
});

s.arrow({ points: [[450, 226], [520, 226]], color: C.iris });

// Each student's record, kept week by week
s.iconBox({ x: 528, y: 168, w: 200, h: 116, icon: 'database', label: 'the student’s\nrecord', size: 18, iconSize: 28, layout: 'stack', stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
s.arrow({ points: [[732, 226], [802, 226]], color: C.iris });

// The student sees where they stand
s.rect({ x: 810, y: 108, w: 270, h: 236, stroke: C.ink });
s.text({ x: 826, y: 118, text: 'the student’s dashboard', size: 16, color: C.muted });

const views = [
  'memorized 5 of 5 pages',
  'reviewed 5 of 7 pages',
  'attended 5 of 6 days',
  'grade 100 of 100',
  'rank 1 of 12'
];

views.forEach((view, i) => {
  s.text({ x: 828, y: 152 + i * 38, text: view, size: 17, color: i === 4 ? C.iris : C.ink });
});

s.person({ x: 918, y: 362, size: 52 });
s.pill({ x: 892, y: 426, w: 104, label: 'student' });

s.line({ points: [[40, 372], [800, 372]], color: C.line, dashed: true });
s.icon({ x: 44, y: 394, size: 22, name: 'download', color: C.muted });
s.text({ x: 76, y: 392, text: 'memorization and test data can be exported', size: 17, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
