import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/interactive-physics/lesson.excalidraw', import.meta.url);
const s = createScene('physics-lesson');
const { C } = s;

s.frame({ w: 1120, h: 500 });

s.text({ x: 32, y: 24, text: 'A lesson in the program', size: 30 });
s.squiggle({ x: 34, y: 70, w: 330 });

// The path a student takes through a lesson, left to right
const steps = [
  ['log-in', 'sign in as\na student'],
  ['layout-grid', 'pick a\nsection'],
  ['play', 'read and\nwatch'],
  ['calculator', 'solve\na law'],
  ['clipboard-check', 'take\nthe test']
];

steps.forEach(([icon, label], i) => {
  const x = 40 + i * 212;
  const key = i === 3;

  s.iconBox({ x, y: 112, w: 180, h: 112, icon, label, size: 18, iconSize: 28, layout: 'stack', stroke: key ? C.iris : C.ink, fill: key ? C.irisTint : 'transparent', labelColor: C.ink, iconColor: key ? C.iris : C.ink });

  if (i < steps.length - 1) {
    s.arrow({ points: [[x + 184, 168], [x + 208, 168]], color: C.iris });
  }
});

// What each step holds
const details = [
  [],
  ['pressure', 'liquid pressure', 'atmospheric pressure', 'gas pressure', 'Pascal’s principle', 'Archimedes’ principle'],
  ['the interactive book', 'short videos:', '“What are fluids?”', '“What is pressure?”'],
  ['1  pick a law', '2  enter the values', '3  guess the answer', '4  show the result'],
  ['multiple choice', 'fill in the blank', 'a mark out of 100']
];

details.forEach((lines, i) => {
  lines.forEach((line, j) => {
    s.text({ x: 44 + i * 212, y: 248 + j * 26, text: line, size: 16, color: i === 3 && j === 2 ? C.iris : C.soft });
  });
});

s.text({ x: 44, y: 248, text: 'with a name and\nthe student role', size: 16, color: C.soft });

s.line({ points: [[40, 420], [1080, 420]], color: C.line, dashed: true });
s.icon({ x: 44, y: 442, size: 22, name: 'mouse-pointer-click', color: C.muted });
s.text({ x: 76, y: 440, text: 'one click away on every screen: a calculator, simple games and a guide to the program', size: 17, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
