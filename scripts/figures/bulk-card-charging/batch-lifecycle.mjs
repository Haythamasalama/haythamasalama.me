import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/bulk-card-charging/batch-lifecycle.excalidraw', import.meta.url);
const s = createScene('charging-lifecycle');
const { C } = s;

s.frame({ w: 1120, h: 532 });

s.text({ x: 32, y: 24, text: 'The life of a batch', size: 30 });
s.squiggle({ x: 34, y: 70, w: 260 });

// Who starts it
s.person({ x: 40, y: 102, size: 46 });
s.pill({ x: 100, y: 110, w: 112, label: 'Operator' });
s.arrow({ points: [[64, 156], [84, 206]] });

// Main path
const rowY = 212;
const h = 60;
const cy = rowY + h / 2;

s.iconBox({ x: 32, y: rowY, w: 170, h, icon: 'upload', label: 'Uploaded', size: 22 });
s.iconBox({ x: 260, y: rowY, w: 180, h, icon: 'badge-check', label: 'Approved', size: 22 });
s.iconBox({ x: 498, y: rowY, w: 180, h, icon: 'send', label: 'Sending', size: 22 });
s.iconBox({ x: 746, y: 148, w: 200, h: 52, icon: 'check-check', label: 'Processed', size: 20, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
s.iconBox({ x: 746, y: 284, w: 274, h: 52, icon: 'list-checks', label: 'Partly processed', size: 20, stroke: C.muted, labelColor: C.soft, iconColor: C.soft });

s.arrow({ points: [[206, cy], [256, cy]], color: C.iris });
s.arrow({ points: [[444, cy], [494, cy]], color: C.iris });
s.arrow({ points: [[682, cy - 12], [742, 176]], color: C.iris });
s.arrow({ points: [[682, cy + 12], [742, 308]], color: C.muted });

s.text({ x: 231, y: rowY - 32, text: 'approve', size: 18, color: C.soft, align: 'center' });
s.text({ x: 469, y: rowY - 32, text: 'send', size: 18, color: C.soft, align: 'center' });

s.text({ x: 846, y: 206, text: 'every card charged', size: 15, color: C.muted, align: 'center' });
s.text({ x: 883, y: 342, text: 'closed by hand, with a note', size: 15, color: C.muted, align: 'center' });

// What each step checks
const noteY = rowY + h + 18;

s.icon({ x: 44, y: noteY + 2, size: 20, name: 'calculator', color: C.muted });
s.text({ x: 72, y: noteY, text: 'totals must\nmatch the file', size: 16, color: C.muted });
s.icon({ x: 272, y: noteY + 2, size: 20, name: 'key-round', color: C.muted });
s.text({ x: 300, y: noteY, text: 'a permission\nand a password', size: 16, color: C.muted });
s.icon({ x: 510, y: noteY + 2, size: 20, name: 'layers', color: C.muted });
s.text({ x: 538, y: noteY, text: 'one job per card,\nlive progress', size: 16, color: C.muted });

// Ways out before the end
s.line({ points: [[60, 350], [680, 350]], color: C.muted, dotted: true });
s.text({ x: 360, y: 358, text: 'cancel at any point', size: 15, color: C.muted, align: 'center' });
s.arrow({ points: [[180, 352], [180, 398]], color: C.muted, dotted: true });
s.arrow({ points: [[573, 352], [573, 398]], color: C.muted, dotted: true });

s.iconBox({ x: 90, y: 402, w: 180, h: 44, icon: 'circle-x', label: 'Cancelled', size: 18, iconSize: 18, stroke: C.muted, labelColor: C.soft, dashed: true });
s.iconBox({ x: 446, y: 402, w: 254, h: 44, icon: 'octagon-x', label: 'Partly cancelled', size: 18, iconSize: 18, stroke: C.muted, labelColor: C.soft, dashed: true });

s.text({ x: 180, y: 456, text: 'nothing was sent', size: 16, color: C.muted, align: 'center' });
s.text({ x: 573, y: 456, text: 'the cards not yet sent\nnever go out', size: 16, color: C.muted, align: 'center' });

// Rules that hold the whole way
s.icon({ x: 760, y: 410, size: 22, name: 'circle-question-mark', color: C.azure });
s.text({ x: 792, y: 408, text: 'a stuck card must be settled\nbefore a batch closes or\nis cancelled', size: 16, color: C.azure });
s.icon({ x: 760, y: 478, size: 22, name: 'file-down', color: C.soft });
s.text({ x: 792, y: 476, text: 'results export to Excel', size: 16, color: C.soft });

s.write(OUT);
console.log('wrote', OUT.pathname);
