import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/iot-wash-stations/feature-map.excalidraw', import.meta.url);
const s = createScene('wash-features');
const { C } = s;

s.frame({ w: 1120, h: 610 });

s.text({ x: 32, y: 24, text: 'Everything the system does', size: 30 });
s.squiggle({ x: 34, y: 70, w: 400 });

const columns = [
  {
    head: { person: 'Customer', w: 120 },
    title: 'At the bay',
    items: [
      ['scan-qr-code', 'Scan or type the card', 'the bay screen sends its number'],
      ['circle-pause', 'Pause and carry on', 'scan again to pause, then resume'],
      ['lightbulb', 'Status lights', 'running, stopped or a warning'],
      ['toggle-right', 'A relay for the pump', 'the Pi switches its power'],
      ['credit-card', 'One card at a time', 'a new card ends the last turn']
    ]
  },
  {
    head: { icon: 'server' },
    title: 'On the server',
    items: [
      ['monitor-check', 'Registered bays only', 'a scan counts from a known Pi'],
      ['fuel', 'Fuelled recently?', 'asked of the Faris card system'],
      ['database', 'Cards remembered', 'a recent record skips the call'],
      ['timer', 'Daily wash time', 'per card, used in turns'],
      ['alarm-clock', 'Stop on time', 'a queued job switches it off']
    ]
  },
  {
    head: { person: 'Staff', w: 84 },
    title: 'In the dashboard',
    items: [
      ['layout-dashboard', 'Every wash on record', 'by station, bay, card, customer'],
      ['circle-plus', 'Extra time', 'staff add minutes to a wash'],
      ['power', 'Bay on or off', 'staff switch a pump directly'],
      ['map-pin', 'Stations and bays', 'each bay\'s Pi and its GPIO pins'],
      ['sliders-horizontal', 'Settings', 'wash time, turn, fuelling window']
    ]
  }
];

columns.forEach(({ head, title, items }, c) => {
  const x = 32 + c * 363;

  if (head.person) {
    s.person({ x, y: 102, size: 40 });
    s.pill({ x: x + 50, y: 106, w: head.w, label: head.person });
    s.text({ x: x + head.w + 64, y: 110, text: title, size: 20, color: C.soft });
  }
  else {
    s.icon({ x: x + 4, y: 106, size: 30, name: head.icon, color: C.iris });
    s.text({ x: x + 46, y: 110, text: title, size: 20, color: C.soft });
  }

  items.forEach(([icon, label, line], i) => {
    const y = 164 + i * 88;

    s.rect({ x, y, w: 330, h: 74, stroke: c === 1 ? C.ink : C.soft });
    s.icon({ x: x + 16, y: y + 14, size: 22, name: icon, color: c === 1 ? C.iris : C.ink });
    s.text({ x: x + 50, y: y + 12, text: label, size: 17 });
    s.text({ x: x + 50, y: y + 40, text: line, size: 15, color: C.muted });
  });
});

s.write(OUT);
console.log('wrote', OUT.pathname);
