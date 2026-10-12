import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/crm-and-hr/incoming-call.excalidraw', import.meta.url);
const s = createScene('crm-call');
const { C } = s;

s.frame({ w: 1120, h: 436 });

s.text({ x: 32, y: 24, text: 'Calls and contacts', size: 30 });
s.squiggle({ x: 34, y: 70, w: 260 });

// When the phone rings
s.text({ x: 40, y: 112, text: 'When a call comes in', size: 18, color: C.soft });

s.person({ x: 40, y: 156, size: 44 });
s.pill({ x: 92, y: 162, w: 112, label: 'Customer' });
s.arrow({ points: [[208, 178], [240, 178]], color: C.iris });

s.iconBox({ x: 244, y: 146, w: 200, h: 64, icon: 'phone-incoming', label: 'Phone system', size: 17, iconSize: 22 });
s.arrow({ points: [[448, 178], [476, 178]], color: C.iris });
s.iconBox({ x: 480, y: 146, w: 236, h: 64, icon: 'user-round-search', label: 'CRM: who is\nthis number?', size: 16, iconSize: 22 });

s.arrow({ points: [[720, 166], [784, 150]], color: C.iris });
s.iconBox({ x: 788, y: 118, w: 302, h: 62, icon: 'contact', label: 'known: the agent opens\ntheir record and calls', size: 16, iconSize: 22, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
s.arrow({ points: [[720, 192], [784, 222]], color: C.muted, dotted: true });
s.iconBox({ x: 788, y: 200, w: 302, h: 62, icon: 'user-plus', label: 'unknown: the number\nis kept for later', size: 16, iconSize: 22, stroke: C.muted, labelColor: C.soft, iconColor: C.soft, dashed: true });

// When the call ends
s.line({ points: [[40, 292], [1080, 292]], color: C.line, dashed: true });
s.text({ x: 40, y: 304, text: 'When the call ends', size: 18, color: C.soft });

s.iconBox({ x: 244, y: 342, w: 200, h: 64, icon: 'phone', label: 'Phone system\nreports it', size: 16, iconSize: 22 });
s.arrow({ points: [[448, 374], [476, 374]], color: C.iris });
s.iconBox({ x: 480, y: 342, w: 236, h: 64, icon: 'list', label: 'Call log: in,\nout or missed', size: 16, iconSize: 22 });
s.arrow({ points: [[720, 374], [784, 374]], color: C.iris });
s.iconBox({ x: 788, y: 342, w: 302, h: 64, icon: 'contact', label: 'logged on the contact,\nwith agent and times', size: 16, iconSize: 22 });

s.write(OUT);
console.log('wrote', OUT.pathname);
