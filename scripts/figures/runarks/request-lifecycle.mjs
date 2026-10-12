import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/runarks/request-lifecycle.excalidraw', import.meta.url);
const s = createScene('lifecycle');
const { C } = s;

s.frame({ w: 1120, h: 516 });

s.text({ x: 32, y: 24, text: 'The life of a request', size: 30 });
s.squiggle({ x: 34, y: 70, w: 250 });

// Who starts it
s.person({ x: 40, y: 102, size: 48 });
s.pill({ x: 100, y: 110, w: 120, label: 'Requester' });
s.arrow({ points: [[64, 158], [80, 206]] });

// Main path
const rowY = 212;
const h = 60;
const cy = rowY + h / 2;

s.iconBox({ x: 32, y: rowY, w: 136, h, icon: 'file-pen-line', label: 'Draft', size: 22 });
s.iconBox({ x: 230, y: rowY, w: 236, h, icon: 'hourglass', label: 'Pending approval', size: 22 });
s.iconBox({ x: 528, y: rowY, w: 168, h, icon: 'badge-check', label: 'Approved', size: 22 });
s.iconBox({ x: 758, y: rowY, w: 170, h, icon: 'play', label: 'Executing', size: 22 });
s.iconBox({ x: 966, y: 148, w: 146, h: 52, icon: 'check-check', label: 'Executed', size: 20, stroke: C.iris, fill: C.irisTint, labelColor: C.ink });
s.iconBox({ x: 966, y: 286, w: 146, h: 52, icon: 'triangle-alert', label: 'Failed', size: 20, stroke: C.muted, labelColor: C.soft });

s.arrow({ points: [[172, cy], [226, cy]], color: C.iris });
s.arrow({ points: [[470, cy], [524, cy]], color: C.iris });
s.arrow({ points: [[700, cy], [754, cy]], color: C.iris });
s.arrow({ points: [[932, cy - 12], [962, 178]], color: C.iris });
s.arrow({ points: [[932, cy + 12], [962, 310]], color: C.muted });

s.text({ x: 199, y: rowY - 32, text: 'submit', size: 18, color: C.soft, align: 'center' });
s.text({ x: 497, y: rowY - 32, text: 'approve', size: 18, color: C.soft, align: 'center' });
s.text({ x: 727, y: rowY - 32, text: 'run', size: 18, color: C.soft, align: 'center' });

// What each step checks
const noteY = rowY + h + 18;

s.icon({ x: 92, y: noteY + 2, size: 20, name: 'shield-check', color: C.muted });
s.text({ x: 120, y: noteY, text: 'guardrails, grants\nand filters checked', size: 17, color: C.muted });
s.icon({ x: 420, y: noteY + 2, size: 20, name: 'users', color: C.muted });
s.text({ x: 448, y: noteY, text: 'n of m approvers,\nnever your own', size: 17, color: C.muted });
s.icon({ x: 650, y: noteY + 2, size: 20, name: 'repeat-1', color: C.muted });
s.text({ x: 678, y: noteY, text: 'by the requester,\nexactly once', size: 17, color: C.muted });

// Bypass: its own door into Approved, never a threshold of zero
s.arrow({ points: [[340, rowY - 4], [480, 132], [620, rowY - 4]], color: C.azure, dashed: true, curved: true });
s.icon({ x: 362, y: 92, size: 20, name: 'eye', color: C.azure });
s.text({ x: 390, y: 92, text: 'bypass · reads only, flagged', size: 17, color: C.azure });

// Ways out before anything runs
const exitY = 410;

s.arrow({ points: [[300, rowY + h + 4], [274, exitY - 6]], color: C.muted, dotted: true });
s.arrow({ points: [[372, rowY + h + 4], [404, exitY - 6]], color: C.muted, dotted: true });
s.arrow({ points: [[612, rowY + h + 4], [618, exitY - 6]], color: C.muted, dotted: true });

s.iconBox({ x: 210, y: exitY, w: 128, h: 44, icon: 'circle-x', label: 'Rejected', size: 18, iconSize: 18, stroke: C.muted, labelColor: C.soft, dashed: true });
s.iconBox({ x: 348, y: exitY, w: 116, h: 44, icon: 'timer-off', label: 'Expired', size: 18, iconSize: 18, stroke: C.muted, labelColor: C.soft, dashed: true });
s.iconBox({ x: 548, y: exitY, w: 140, h: 44, icon: 'undo-2', label: 'Cancelled', size: 18, iconSize: 18, stroke: C.muted, labelColor: C.soft, dashed: true });

s.text({ x: 274, y: exitY + 52, text: 'one "no" ends it', size: 16, color: C.muted, align: 'center' });
s.text({ x: 406, y: exitY + 52, text: 'lapsed', size: 16, color: C.muted, align: 'center' });
s.text({ x: 618, y: exitY + 52, text: 'withdrawn', size: 16, color: C.muted, align: 'center' });

// The trail
s.icon({ x: 800, y: 414, size: 30, name: 'scroll-text', color: C.soft });
s.text({ x: 842, y: 414, text: 'every move lands in\nan append-only log', size: 17, color: C.soft });

s.write(OUT);
console.log('wrote', OUT.pathname);
