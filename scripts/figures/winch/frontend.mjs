import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/winch/frontend.excalidraw', import.meta.url);
const s = createScene('winch-front');
const { C } = s;

s.frame({ w: 1120, h: 452 });

s.text({ x: 32, y: 24, text: 'The business and carrier platforms', size: 30 });
s.squiggle({ x: 34, y: 70, w: 500 });

// One codebase, pages split by product
s.rect({ x: 32, y: 108, w: 360, h: 214 });
s.text({ x: 50, y: 118, text: 'one front-end codebase', size: 16, color: C.soft });

[['business pages', 'briefcase'], ['carrier pages', 'truck'], ['shared pages', 'folder']].forEach(([label, icon], i) => {
  s.iconBox({ x: 52, y: 150 + i * 56, w: 320, h: 44, icon, label, size: 17, stroke: i === 2 ? C.soft : C.ink, labelColor: C.ink });
});

// Built once per product
s.arrow({ points: [[396, 200], [490, 160]], color: C.iris });
s.arrow({ points: [[396, 240], [490, 282]], color: C.iris });
s.text({ x: 448, y: 208, text: 'build ×2', size: 16, color: C.iris, align: 'center' });

s.iconBox({ x: 494, y: 130, w: 250, h: 58, icon: 'briefcase', label: 'Business dashboard', size: 18 });
s.iconBox({ x: 494, y: 254, w: 250, h: 58, icon: 'truck', label: 'Carrier dashboard', size: 18 });

s.arrow({ points: [[748, 159], [826, 200]], color: C.muted });
s.arrow({ points: [[748, 283], [826, 240]], color: C.muted });
s.icon({ x: 834, y: 190, size: 52, name: 'cloud', color: C.ink });
s.text({ x: 904, y: 196, text: 'served from a CDN;\nold tabs notice a new\nrelease and reload', size: 16, color: C.muted });

// The pieces under every page
s.arrow({ points: [[212, 364], [212, 326]], color: C.iris });
s.iconBox({ x: 32, y: 368, w: 360, h: 56, icon: 'package', label: 'shared UI package\ninputs, tables, forms, cards', size: 17, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });

s.iconBox({ x: 494, y: 368, w: 560, h: 56, icon: 'key-round', label: 'permissions decide every route, menu item and button', size: 17, stroke: C.soft, labelColor: C.soft });

s.write(OUT);
console.log('wrote', OUT.pathname);
