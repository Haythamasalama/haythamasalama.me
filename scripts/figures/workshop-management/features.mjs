import { createScene } from '../lib.mjs';

const OUT = new URL('../../../app/assets/figures/workshop-management/features.excalidraw', import.meta.url);
const s = createScene('workshop-features');
const { C } = s;

s.frame({ w: 1120, h: 590 });

s.text({ x: 32, y: 24, text: 'Everything in the system', size: 30 });
s.squiggle({ x: 34, y: 70, w: 330 });

// Six areas, each with what it covers; the bay app is the path that matters
const groups = [
  { icon: 'tablet-smartphone', title: 'At the bay', key: true, items: ['sign in with a personal code', 'find a car by plate, phone or name', 'start, save and complete a check', 'one open check per car', 'cancel only with a reason'] },
  { icon: 'folder-open', title: 'Records', items: ['personal and business accounts', 'drivers under each account', 'cars and their history', 'every check, with who did the work'] },
  { icon: 'sliders-horizontal', title: 'Set-up', items: ['services and their categories', 'checklist templates', 'branches and their bays', 'registered devices', 'car properties and tags'] },
  { icon: 'shield-check', title: 'Access', items: ['users for every branch', 'roles and permissions', 'sessions that can be revoked', 'edits after a check, by permission'] },
  { icon: 'layout-dashboard', title: 'Dashboards', items: ['live counters by status and action', 'checks per branch and day', 'filters by branch and date', 'refresh on their own'] },
  { icon: 'chart-column', title: 'Reports', items: ['technicians and supervisors', 'peak days in each branch', 'car types and models', 'customers who stopped coming'] }
];

const W = 336;
const H = 212;

groups.forEach((group, i) => {
  const x = 32 + (i % 3) * (W + 24);
  const y = 112 + Math.floor(i / 3) * (H + 24);
  const color = group.key ? C.iris : C.ink;

  s.rect({ x, y, w: W, h: H, stroke: group.key ? C.iris : C.soft, fill: group.key ? C.irisTint : 'transparent' });
  s.icon({ x: x + 20, y: y + 18, size: 24, name: group.icon, color });
  s.text({ x: x + 56, y: y + 18, text: group.title, size: 20, color: C.ink });

  group.items.forEach((item, n) => {
    s.icon({ x: x + 22, y: y + 66 + n * 32, size: 16, name: 'check', color: group.key ? C.iris : C.muted });
    s.text({ x: x + 48, y: y + 63 + n * 32, text: item, size: 16, color: C.soft });
  });
});

s.write(OUT);
