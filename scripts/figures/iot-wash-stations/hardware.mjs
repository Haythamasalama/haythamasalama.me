import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/hardware.excalidraw', import.meta.url);
const s = createScene('wash-circuit');
const { C } = s;

s.frame({ w: 1120, h: 590 });

s.text({ x: 32, y: 24, text: 'The circuit at every bay', size: 30 });
s.squiggle({ x: 34, y: 70, w: 340 });

// The Raspberry Pi, with its 40-pin header along the bottom edge
s.rect({ x: 40, y: 104, w: 680, h: 216, sw: 2 });
s.icon({ x: 62, y: 122, size: 34, name: 'simple-icons:raspberrypi', color: C.ink });
s.text({ x: 106, y: 128, text: 'Raspberry Pi', size: 20 });
s.text({ x: 62, y: 170, text: 'runs a small GPIO service;\nthe server sets its pins', size: 15, color: C.muted });
s.icon({ x: 672, y: 117, size: 32, name: 'ethernet-port', color: C.soft });

s.text({ x: 678, y: 210, text: 'GPIO header', size: 14, color: C.muted, align: 'right' });
s.rect({ x: 72, y: 232, w: 606, h: 56, stroke: C.soft, roughness: 0.5 });
s.text({ x: 54, y: 239, text: '1', size: 14, color: C.muted });
s.text({ x: 686, y: 263, text: '40', size: 14, color: C.muted });

// Physical pin n sits in column ceil(n / 2); even pins are on the outer row.
const pinX = pin => 90 + 30 * (Math.ceil(pin / 2) - 1);
const used = { 2: C.ink, 6: C.ink, 8: C.ink, 10: C.ink, 12: C.ink, 18: C.iris, 32: C.ink };

for (let pin = 1; pin <= 40; pin++) {
  const x = pinX(pin);
  const y = pin % 2 ? 248 : 272;
  const colour = used[pin];

  s.rect({ x: x - 5, y: y - 5, w: 10, h: 10, stroke: colour ?? C.line, fill: colour ?? 'transparent', sw: 1, rounded: false, roughness: 0 });

  if (colour) {
    s.text({ x: x + 6, y: 292, text: String(pin), size: 14, color: pin === 18 ? C.iris : C.soft });
  }
}

// The server, over the network
s.iconBox({ x: 800, y: 104, w: 290, h: 58, icon: 'server', label: 'The server', size: 18, stroke: C.iris, labelColor: C.ink, iconColor: C.iris });
s.arrow({ points: [[796, 133], [724, 133]], color: C.iris });
s.text({ x: 945, y: 170, text: 'sends commands over the network', size: 15, color: C.iris, align: 'center' });

// What the customer uses, plugged into the Pi
s.iconBox({ x: 800, y: 222, w: 290, h: 58, icon: 'scan-qr-code', label: 'Bay screen + card scanner', size: 16, iconSize: 22 });
s.line({ points: [[796, 251], [724, 251]], color: C.soft });
s.text({ x: 945, y: 288, text: 'plugged into the Pi', size: 14, color: C.muted, align: 'center' });

// Pin 2 · 5V and pin 6 · GND
s.line({ points: [[pinX(2), 277], [pinX(2), 392]], color: C.soft });
s.rect({ x: 64, y: 392, w: 52, h: 30, label: '5V', size: 15, stroke: C.soft, labelColor: C.ink });
s.text({ x: 90, y: 430, text: 'powers\nthe relay', size: 14, color: C.muted, align: 'center' });

const ground = (x, y) => {
  s.line({ points: [[x - 12, y], [x + 12, y]], color: C.soft });
  s.line({ points: [[x - 8, y + 7], [x + 8, y + 7]], color: C.soft });
  s.line({ points: [[x - 4, y + 14], [x + 4, y + 14]], color: C.soft });
};

s.line({ points: [[pinX(6), 277], [pinX(6), 396]], color: C.soft });
ground(pinX(6), 396);
s.text({ x: pinX(6), y: 418, text: 'GND', size: 14, color: C.soft, align: 'center' });

// Pins 8, 10 and 12 · a status light each, through a resistor
const lights = [
  [8, 200, 'red', 'stopped'],
  [10, 280, 'yellow', 'warning'],
  [12, 360, 'green', 'running']
];

lights.forEach(([pin, x, colour, meaning]) => {
  s.line({ points: [[pinX(pin), 277], [pinX(pin), 352], [x, 388], [x, 394]], color: C.soft });
  s.line({ points: [[x, 394], [x - 7, 399], [x + 7, 405], [x - 7, 411], [x + 7, 417], [x - 7, 423], [x, 428], [x, 434]], color: C.soft });
  s.ellipse({ x: x - 12, y: 434, w: 24, h: 24, stroke: C.ink });
  s.line({ points: [[x, 458], [x, 466]], color: C.soft });
  ground(x, 466);
  s.text({ x, y: 490, text: `${colour}\n${meaning}`, size: 15, color: C.soft, align: 'center' });
});

s.text({ x: 280, y: 544, text: 'each light through a resistor', size: 14, color: C.muted, align: 'center' });

// Pin 18 · the relay that switches the pump: the path that matters
s.line({ points: [[pinX(18), 277], [pinX(18), 340], [500, 340], [500, 398]], color: C.iris });
s.iconBox({ x: 420, y: 400, w: 160, h: 72, icon: 'toggle-right', label: 'Relay module', size: 16, iconSize: 24, layout: 'stack', stroke: C.iris, labelColor: C.ink, iconColor: C.iris });
s.text({ x: 500, y: 482, text: 'on 5V and GND', size: 14, color: C.muted, align: 'center' });
s.line({ points: [[582, 436], [640, 436]], color: C.iris });
s.icon({ x: 646, y: 412, size: 44, name: 'droplets', color: C.iris });
s.text({ x: 668, y: 462, text: 'Pump', size: 17, align: 'center' });
s.text({ x: 668, y: 486, text: 'the load', size: 14, color: C.muted, align: 'center' });

// Pin 32 · the push button
s.line({ points: [[pinX(32), 277], [pinX(32), 352], [880, 352], [880, 398]], color: C.soft });
s.iconBox({ x: 800, y: 400, w: 160, h: 72, icon: 'circle-dot', label: 'Push button', size: 16, iconSize: 24, layout: 'stack' });
s.text({ x: 880, y: 482, text: 'to stop or start a wash', size: 14, color: C.muted, align: 'center' });

s.write(OUT);
console.log('wrote', OUT.pathname);
