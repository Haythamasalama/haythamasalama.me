import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/workshop-management/check-lifecycle.excalidraw', import.meta.url);
const s = createScene('workshop-lifecycle');
const { C } = s;

s.frame({ w: 1120, h: 488 });

s.text({ x: 32, y: 24, text: 'The life of a check', size: 30 });
s.squiggle({ x: 34, y: 70, w: 260 });

// Who starts it
s.person({ x: 40, y: 102, size: 46 });
s.pill({ x: 100, y: 110, w: 124, label: 'Technician' });
s.arrow({ points: [[64, 156], [84, 206]] });

// Main path
const rowY = 212;
const h = 60;
const cy = rowY + h / 2;

s.iconBox({ x: 32, y: rowY, w: 208, h, icon: 'search', label: 'Find the car', size: 20 });
s.iconBox({ x: 286, y: rowY, w: 220, h, icon: 'hourglass', label: 'In progress', size: 22 });
s.iconBox({ x: 594, y: rowY, w: 200, h, icon: 'check-check', label: 'Completed', size: 22, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

s.arrow({ points: [[244, cy], [282, cy]], color: C.iris });
s.arrow({ points: [[510, cy], [590, cy]], color: C.iris });

s.text({ x: 263, y: rowY - 32, text: 'start', size: 18, color: C.soft, align: 'center' });
s.text({ x: 550, y: rowY - 32, text: 'complete', size: 18, color: C.soft, align: 'center' });

// Saved as often as needed while the work goes on
s.arrow({ points: [[336, rowY - 4], [396, 148], [456, rowY - 4]], color: C.iris, curved: true });
s.text({ x: 396, y: 116, text: 'save, as often as needed', size: 17, color: C.soft, align: 'center' });

// After completion
s.icon({ x: 812, y: rowY + 4, size: 20, name: 'timer', color: C.muted });
s.text({ x: 842, y: rowY, text: 'editable for a short\nwindow, then only with\na special permission', size: 16, color: C.muted });

// What each step checks
const noteY = rowY + h + 18;

s.icon({ x: 44, y: noteY + 2, size: 20, name: 'car', color: C.muted });
s.text({ x: 72, y: noteY, text: 'by plate, phone\nor name', size: 16, color: C.muted });
s.icon({ x: 322, y: noteY + 2, size: 20, name: 'map-pin', color: C.muted });
s.text({ x: 350, y: noteY, text: 'branch from the device,\none open check per car', size: 16, color: C.muted });
s.icon({ x: 608, y: noteY + 2, size: 20, name: 'list-checks', color: C.muted });
s.text({ x: 636, y: noteY, text: 'needs a bay, technicians,\na service and the odometer', size: 16, color: C.muted });

// The way out before it closes
s.arrow({ points: [[300, rowY + h + 4], [300, 404]], color: C.muted, dotted: true });
s.iconBox({ x: 232, y: 408, w: 164, h: 44, icon: 'circle-x', label: 'Cancelled', size: 18, iconSize: 18, stroke: C.muted, labelColor: C.soft, dashed: true });
s.text({ x: 410, y: 412, text: 'with a reason, and never\nedited again', size: 16, color: C.muted });

// Every refusal explains itself
s.icon({ x: 700, y: 412, size: 22, name: 'circle-alert', color: C.soft });
s.text({ x: 732, y: 410, text: 'every refusal comes with a code\nand a message in Arabic', size: 16, color: C.soft });

s.write(OUT);
console.log('wrote', OUT.pathname);
