import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/bulk-card-charging/failed-or-stuck.excalidraw', import.meta.url);
const s = createScene('charging-stuck');
const { C } = s;

s.frame({ w: 1120, h: 508 });

s.text({ x: 32, y: 24, text: 'Failed or stuck', size: 30 });
s.squiggle({ x: 34, y: 70, w: 220 });

/** An outcome: a box with an icon, a title and a muted note under it. */
const outcome = ({ x, y, w, h, icon, title, note, stroke = C.ink, fill = 'transparent', iconColor = stroke, dashed }) => {
  s.rect({ x, y, w, h, stroke, fill, dashed });
  s.icon({ x: x + 14, y: y + 13, size: 22, name: icon, color: iconColor });
  s.text({ x: x + 44, y: y + 12, text: title, size: 18 });
  s.text({ x: x + 44, y: y + 40, text: note, size: 15, color: C.muted });
};

// One card's job
s.iconBox({ x: 32, y: 217, w: 170, h: 66, icon: 'layers', label: 'one job\nper card', size: 17 });
s.arrow({ points: [[206, 250], [246, 250]], color: C.iris });
s.iconBox({ x: 250, y: 217, w: 200, h: 66, icon: 'send', label: 'sent to the\ncard platform', size: 17 });
s.arrow({ points: [[454, 250], [494, 250]], color: C.iris });

s.text({ x: 44, y: 300, text: 'cards wait their turn;\none failure never\nstops the rest', size: 15, color: C.muted });
s.icon({ x: 262, y: 302, size: 20, name: 'lock', color: C.muted });
s.text({ x: 290, y: 300, text: 'locked while it is\nsent, so it can’t\ngo out twice', size: 15, color: C.muted });

// What came back?
s.diamond({ x: 498, y: 180, w: 190, h: 140, label: 'what came\nback?', size: 18 });

s.arrow({ points: [[644, 212], [796, 140]], color: C.iris });
s.text({ x: 668, y: 118, text: 'an invoice', size: 15, color: C.soft });
s.arrow({ points: [[692, 250], [796, 250]], color: C.azure, dashed: true });
s.text({ x: 744, y: 218, text: 'no reply', size: 15, color: C.azure, align: 'center' });
s.arrow({ points: [[644, 288], [796, 368]], color: C.muted });
s.text({ x: 652, y: 348, text: 'an error', size: 15, color: C.soft });

// The three answers
outcome({ x: 800, y: 104, w: 230, h: 72, icon: 'check-check', title: 'Processed', note: 'the card was charged', stroke: C.iris, fill: C.irisTint });
outcome({ x: 800, y: 210, w: 230, h: 88, icon: 'circle-question-mark', title: 'Stuck', note: 'outcome unknown;\nheld for a person', stroke: C.azure, dashed: true });
outcome({ x: 800, y: 326, w: 230, h: 88, icon: 'triangle-alert', title: 'Failed', note: 'nothing was charged;\nsafe to send again', stroke: C.muted, iconColor: C.soft });

// A person settles a stuck card
s.person({ x: 1050, y: 232, size: 40 });
s.arrow({ points: [[1064, 226], [1036, 150]], color: C.azure, dotted: true });
s.arrow({ points: [[1064, 278], [1036, 368]], color: C.azure, dotted: true });

s.icon({ x: 500, y: 442, size: 22, name: 'user-check', color: C.azure });
s.text({ x: 532, y: 440, text: 'a person checks the card on the platform, then marks it\nprocessed or failed and confirms with a password', size: 16, color: C.azure });

s.icon({ x: 32, y: 402, size: 20, name: 'octagon-x', color: C.muted });
s.text({ x: 62, y: 400, text: 'a batch can’t be closed\nor cancelled while one\nof its cards is stuck', size: 15, color: C.muted });

s.write(OUT);
console.log('wrote', OUT.pathname);
