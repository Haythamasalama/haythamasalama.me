import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/easyshoot/architecture.excalidraw', import.meta.url);
const s = createScene('easyshoot-architecture');
const { C } = s;

s.frame({ w: 1120, h: 440 });

s.text({ x: 32, y: 24, text: 'One renderer for the screen and the file', size: 30 });
s.squiggle({ x: 34, y: 70, w: 560 });

// Capture sources
s.rect({ x: 32, y: 116, w: 300, h: 300, stroke: C.line, dashed: true });
s.text({ x: 48, y: 128, text: 'Capture', size: 18, color: C.muted });
s.iconBox({ x: 52, y: 166, w: 260, h: 52, icon: 'square-dashed', label: 'area, window, fullscreen', size: 16, stroke: C.ink });
s.iconBox({ x: 52, y: 234, w: 260, h: 52, icon: 'move-vertical', label: 'scrolling frames', size: 16, stroke: C.ink });
s.iconBox({ x: 52, y: 302, w: 260, h: 52, icon: 'rows-3', label: 'stitcher joins rows', size: 16, stroke: C.soft, labelColor: C.soft });
s.arrow({ points: [[182, 288], [182, 300]], color: C.muted });

// The document and the renderer
s.arrow({ points: [[334, 222], [408, 222]], color: C.iris });
s.iconBox({ x: 412, y: 176, w: 250, h: 92, icon: 'file-image', label: 'document\nimage + marks + frame', size: 16, iconSize: 24, layout: 'stack', stroke: C.ink });
s.arrow({ points: [[664, 222], [736, 222]], color: C.iris });
s.iconBox({ x: 740, y: 176, w: 170, h: 92, icon: 'paintbrush', label: 'renderer', size: 18, iconSize: 26, layout: 'stack', stroke: C.iris, labelColor: C.iris, iconColor: C.iris });

// Outputs
s.arrow({ points: [[912, 200], [962, 150]], color: C.iris });
s.arrow({ points: [[912, 244], [962, 296]], color: C.iris });
s.iconBox({ x: 966, y: 118, w: 128, h: 64, icon: 'app-window', label: 'editor', size: 16, stroke: C.ink });
s.iconBox({ x: 966, y: 266, w: 128, h: 64, icon: 'image-down', label: 'export', size: 16, stroke: C.ink });

// Settings that shape the document
s.rect({ x: 412, y: 318, w: 498, h: 98, stroke: C.line, dashed: true });
s.iconBox({ x: 428, y: 340, w: 150, h: 52, icon: 'wand-sparkles', label: 'presets', size: 16, stroke: C.soft, labelColor: C.soft });
s.iconBox({ x: 590, y: 340, w: 150, h: 52, icon: 'type', label: 'any font', size: 16, stroke: C.soft, labelColor: C.soft });
s.iconBox({ x: 752, y: 340, w: 142, h: 52, icon: 'languages', label: 'RTL text', size: 16, stroke: C.soft, labelColor: C.soft });
s.arrow({ points: [[536, 316], [536, 272]], color: C.muted, dotted: true });

s.write(OUT);
console.log('wrote', OUT.pathname);
