import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/winch/integration-engine.excalidraw', import.meta.url);
const s = createScene('winch-engine');
const { C } = s;

s.frame({ w: 1120, h: 612 });

s.text({ x: 32, y: 24, text: 'The integration engine: every platform, one pipeline', size: 30 });
s.squiggle({ x: 34, y: 70, w: 720 });

// Who calls it
s.iconBox({ x: 32, y: 116, w: 210, h: 104, icon: 'blocks', label: 'a domain needs\na vendor: waybills,\ninvoices, orders…', size: 15, iconSize: 24, layout: 'stack' });
s.iconBox({ x: 32, y: 246, w: 210, h: 84, icon: 'route', label: 'payment and AI\ngateways pick\nthe vendor', size: 15, iconSize: 22 });
s.arrow({ points: [[246, 168], [286, 168]], color: C.iris });
s.arrow({ points: [[246, 288], [286, 288]], color: C.iris });

// 1 · Registry and settings
s.rect({ x: 290, y: 108, w: 520, h: 104, stroke: C.iris, fill: C.irisTint });
s.icon({ x: 308, y: 120, size: 22, name: 'sliders-horizontal', color: C.iris });
s.text({ x: 338, y: 120, text: 'App registry & settings', size: 18 });
s.text({ x: 308, y: 152, text: 'on or off · development mode · logging\nencrypted settings, checked by type\nrate limits per day, week or month', size: 15, color: C.soft });

// 2 · Pipeline
s.arrow({ points: [[550, 214], [550, 230]], color: C.iris });
s.rect({ x: 290, y: 234, w: 520, h: 96 });
s.icon({ x: 308, y: 246, size: 22, name: 'workflow', color: C.ink });
s.text({ x: 338, y: 246, text: 'One pipeline for every call', size: 18 });

['app active?', 'within limits?', 'run & time it', 'record it'].forEach((label, i) => {
  const x = 308 + i * 124;

  s.rect({ x, y: 282, w: 110, h: 34, label, size: 15, stroke: i === 3 ? C.iris : C.soft, labelColor: C.ink });

  if (i < 3) {
    s.arrow({ points: [[x + 112, 299], [x + 122, 299]], color: C.iris });
  }
});

// 3 · HTTP transport
s.arrow({ points: [[550, 332], [550, 348]], color: C.iris });
s.rect({ x: 290, y: 352, w: 520, h: 96 });
s.icon({ x: 308, y: 364, size: 22, name: 'cable', color: C.ink });
s.text({ x: 338, y: 364, text: 'HTTP transport', size: 18 });
s.text({ x: 308, y: 396, text: 'a connector per platform · shared ways to authenticate\nhost guard · secrets scrubbed · safe retries · token refresh', size: 15, color: C.soft });

// The numbers and the ledger
s.arrow({ points: [[794, 299], [852, 270]], color: C.iris });
s.iconBox({ x: 856, y: 196, w: 232, h: 132, icon: 'scroll-text', label: 'Transaction ledger\nstatus, duration, request\nand response of each call,\nlinked to its order', size: 15, iconSize: 24, layout: 'stack', stroke: C.iris, labelColor: C.ink, iconColor: C.iris });
s.text({ x: 972, y: 340, text: 'large payloads moved to\nstorage, old ones expired', size: 14, color: C.muted, align: 'center' });

// The apps on top of it
s.arrow({ points: [[550, 450], [550, 478]], color: C.iris });

const groups = [
  ['landmark', 'Government', 'waybills, authorisations,\ne-invoices, ID checks'],
  ['credit-card', 'Payments', 'payment gateways\nand banking'],
  ['sparkles', 'AI models', 'language and\nvision models'],
  ['message-square', 'Messaging', 'WhatsApp, SMS,\nemail and push'],
  ['map-pin', 'Maps & tracking', 'maps, places\nand live tracking']
];

groups.forEach(([icon, title, items], i) => {
  const x = 32 + i * 214;

  s.rect({ x, y: 482, w: 200, h: 96, stroke: C.muted, dashed: true });
  s.icon({ x: x + 14, y: 494, size: 20, name: icon, color: C.ink });
  s.text({ x: x + 42, y: 494, text: title, size: 16 });
  s.text({ x: x + 14, y: 528, text: items, size: 14, color: C.muted });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
