import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/one-server.excalidraw', import.meta.url);
const s = createScene('wash-one-server');
const { C } = s;

s.frame({ w: 1120, h: 464 });

s.text({ x: 32, y: 24, text: 'One server for all stations', size: 30 });
s.squiggle({ x: 34, y: 70, w: 400 });

// Stations and their bays, registered in the dashboard
s.rect({ x: 32, y: 108, w: 330, h: 312, stroke: C.muted, dashed: true });
s.icon({ x: 50, y: 122, size: 22, name: 'layout-dashboard', color: C.ink });
s.text({ x: 82, y: 122, text: 'Registered in the dashboard', size: 17 });

const stations = [
  ['Station 1', ['bay 1', 'bay 2'], 164],
  ['Station 2', ['bay 1'], 288]
];

stations.forEach(([name, bays, y]) => {
  s.icon({ x: 52, y, size: 20, name: 'map-pin', color: C.soft });
  s.text({ x: 80, y, text: name, size: 17, color: C.soft });

  bays.forEach((bay, i) => {
    s.rect({ x: 64, y: y + 32 + i * 44, w: 280, h: 36, label: `${bay}: its address and pins`, size: 15, stroke: C.soft, labelColor: C.ink });
  });
});

s.text({ x: 50, y: 384, text: 'a scan counts only from a registered bay', size: 14, color: C.muted });
s.arrow({ points: [[366, 180], [416, 180]], color: C.soft });

// The server: for every change, connect, set the pins, close
s.iconBox({ x: 420, y: 150, w: 300, h: 58, icon: 'server', label: 'The server', size: 18, stroke: C.iris, fill: C.irisTint, labelColor: C.ink, iconColor: C.iris });
s.text({ x: 570, y: 224, text: 'for every change', size: 15, color: C.soft, align: 'center' });

['connect to the bay\'s Pi', 'set the pump and lights', 'close the connection'].forEach((label, i) => {
  const y = 250 + i * 60;

  s.rect({ x: 450, y, w: 240, h: 36, label, size: 15, stroke: i === 1 ? C.iris : C.soft, labelColor: C.ink });

  if (i < 2) {
    s.arrow({ points: [[570, y + 38], [570, y + 58]], color: C.iris });
  }
});

// A Pi at every bay, holding no data
const pis = ['Station 1 · bay 1', 'Station 1 · bay 2', 'Station 2 · bay 1'];

pis.forEach((label, i) => {
  const y = 130 + i * 100;

  s.iconBox({ x: 800, y, w: 290, h: 64, icon: 'simple-icons:raspberrypi', label: `Pi at ${label}`, size: 16, iconSize: 24 });
  s.arrow({ points: [[694, 328], [796, y + 32]], color: C.iris });
});

s.text({ x: 945, y: 408, text: 'each Pi holds no data and no rules', size: 15, color: C.muted, align: 'center' });

s.write(OUT);
console.log('wrote', OUT.pathname);
