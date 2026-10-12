import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/hardware.excalidraw', import.meta.url);
const s = createScene('wash-hw');
const { C } = s;

s.frame({ w: 1120, h: 500 });

s.text({ x: 32, y: 24, text: 'The circuit at every bay', size: 30 });
s.squiggle({ x: 34, y: 70, w: 340 });

// What the customer uses, plugged into the Pi
s.iconBox({ x: 40, y: 170, w: 240, h: 62, icon: 'monitor', label: 'Bay screen', size: 17, iconSize: 24 });
s.iconBox({ x: 40, y: 262, w: 240, h: 62, icon: 'scan-qr-code', label: 'Card scanner', size: 17, iconSize: 24 });
s.line({ points: [[284, 201], [358, 201]], color: C.soft });
s.line({ points: [[284, 293], [358, 293]], color: C.soft });
s.text({ x: 40, y: 340, text: 'the screen sends the card\nnumber to the server', size: 15, color: C.muted });

// The Raspberry Pi
s.rect({ x: 360, y: 160, w: 320, h: 200, sw: 2 });
s.icon({ x: 382, y: 178, size: 34, name: 'simple-icons:raspberrypi', color: C.ink });
s.text({ x: 428, y: 184, text: 'Raspberry Pi', size: 20 });
s.text({ x: 382, y: 228, text: 'runs a GPIO service\nthe server talks to', size: 15, color: C.muted });
s.rect({ x: 382, y: 306, w: 276, h: 32, label: 'GPIO pins', size: 15, stroke: C.soft, labelColor: C.soft });

// The server, over the network
s.iconBox({ x: 820, y: 112, w: 270, h: 56, icon: 'server', label: 'The server', size: 18, stroke: C.iris, labelColor: C.ink, iconColor: C.iris });
s.arrow({ points: [[816, 140], [640, 140], [640, 156]], color: C.iris });
s.text({ x: 700, y: 92, text: 'commands over\nthe network', size: 15, color: C.iris });

// The relay switches the pump
s.line({ points: [[658, 322], [758, 322]], color: C.ink });
s.iconBox({ x: 760, y: 280, w: 150, h: 84, icon: 'toggle-right', label: 'Relay', size: 17, iconSize: 26, layout: 'stack' });
s.text({ x: 835, y: 374, text: 'switches the\npump\'s power', size: 15, color: C.muted, align: 'center' });
s.line({ points: [[912, 322], [978, 322]], color: C.ink });
s.icon({ x: 986, y: 298, size: 44, name: 'droplets', color: C.ink });
s.text({ x: 1008, y: 350, text: 'Pump', size: 17, align: 'center' });

// Three status lights, each through a resistor
const lights = [
  ['green', 'running', C.iris, C.irisTint],
  ['red', 'stopped', C.ink, 'transparent'],
  ['yellow', 'warning', C.ink, 'transparent']
];

lights.forEach(([colour, meaning, stroke, fill], i) => {
  const x = 432 + i * 90;

  s.line({ points: [[x, 340], [x, 372], [x - 7, 377], [x + 7, 383], [x - 7, 389], [x + 7, 395], [x, 400], [x, 410]], color: C.soft });
  s.ellipse({ x: x - 12, y: 410, w: 24, h: 24, stroke, fill });
  s.text({ x, y: 442, text: `${colour}\n${meaning}`, size: 15, color: C.soft, align: 'center' });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
