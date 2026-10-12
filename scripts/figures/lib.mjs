// Helpers that write Excalidraw scenes by code. The output is a plain
// .excalidraw file: it opens in excalidraw.com and renders on the site
// through modules/sketch-figures. See .claude/skills/figures/SKILL.md.
import { readFileSync, writeFileSync } from 'node:fs';

export const C = {
  ink: '#1e1e1e',
  soft: '#495057',
  muted: '#868e96',
  line: '#ced4da',
  iris: '#7f7cf2',
  azure: '#4f9bff',
  white: '#ffffff',
  irisTint: '#e9ebfe',
  azureTint: '#e2eeff',
  raised: '#f8f9fa',
  chip: '#e9ecef'
};

const collections = {
  'lucide': JSON.parse(readFileSync(new URL('../../node_modules/@iconify-json/lucide/icons.json', import.meta.url), 'utf8')),
  'simple-icons': JSON.parse(readFileSync(new URL('../../node_modules/@iconify-json/simple-icons/icons.json', import.meta.url), 'utf8'))
};

function hash (value) {
  let h = 2166136261;

  for (const char of value) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }

  return Math.abs(h) % 2147483647;
}

// Excalifont advance is about half an em; good enough for bounds and centring.
const textWidth = (line, size) => line.length * size * 0.5;

export function createScene (name) {
  const elements = [];
  const files = {};
  let count = 0;

  const base = (type, props) => {
    const id = props.id ?? `${name}-${type}-${++count}`;

    // `id` goes last so a caller's own props can't replace it.
    return {
      type,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      angle: 0,
      strokeColor: C.ink,
      backgroundColor: 'transparent',
      fillStyle: 'solid',
      strokeWidth: 2,
      strokeStyle: 'solid',
      roughness: 1,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: null,
      seed: hash(id),
      version: 1,
      versionNonce: hash(`${id}:n`),
      isDeleted: false,
      boundElements: null,
      updated: 1,
      link: null,
      locked: false,
      ...props,
      id
    };
  };

  const add = (element) => {
    elements.push(element);

    return element;
  };

  const text = ({ x, y, text: value, size = 20, color = C.ink, align = 'left', family = 5, containerId = null, width, group }) => {
    const lines = value.split('\n');
    const w = width ?? Math.max(...lines.map(line => textWidth(line, size)));
    const h = lines.length * size * 1.25;
    const left = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;

    return add(base('text', {
      x: left,
      y,
      width: w,
      height: h,
      strokeColor: color,
      text: value,
      originalText: value,
      fontSize: size,
      fontFamily: family,
      textAlign: align,
      verticalAlign: containerId ? 'middle' : 'top',
      containerId,
      autoResize: true,
      lineHeight: 1.25,
      groupIds: group ? [group] : []
    }));
  };

  const shape = (type, { x, y, w, h, stroke = C.ink, fill = 'transparent', fillStyle = 'solid', dashed, dotted, rounded = true, sw = 2, label, size = 20, labelColor, family = 5, roughness = 1, group }) => {
    const element = add(base(type, {
      x,
      y,
      width: w,
      height: h,
      strokeColor: stroke,
      backgroundColor: fill,
      fillStyle,
      strokeWidth: sw,
      strokeStyle: dashed ? 'dashed' : dotted ? 'dotted' : 'solid',
      roughness,
      roundness: rounded && type !== 'ellipse' ? { type: 3 } : null,
      groupIds: group ? [group] : []
    }));

    if (label) {
      const lines = label.split('\n').length;
      const t = text({
        x: x + w / 2,
        y: y + h / 2 - (lines * size * 1.25) / 2,
        text: label,
        size,
        color: labelColor ?? stroke,
        align: 'center',
        family,
        containerId: element.id,
        group
      });

      element.boundElements = [{ type: 'text', id: t.id }];
    }

    return element;
  };

  const linear = (type, { points, color = C.ink, dashed, dotted, sw = 2, start = null, end = type === 'arrow' ? 'arrow' : null, curved = false, roughness = 1, group }) => {
    const [x0, y0] = points[0];
    const relative = points.map(([px, py]) => [px - x0, py - y0]);
    const xs = relative.map(([px]) => px);
    const ys = relative.map(([, py]) => py);

    return add(base(type, {
      x: x0,
      y: y0,
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
      strokeColor: color,
      strokeWidth: sw,
      strokeStyle: dashed ? 'dashed' : dotted ? 'dotted' : 'solid',
      roughness,
      roundness: curved ? { type: 2 } : null,
      points: relative,
      lastCommittedPoint: null,
      startBinding: null,
      endBinding: null,
      startArrowhead: start,
      endArrowhead: end,
      elbowed: false,
      groupIds: group ? [group] : []
    }));
  };

  const icon = ({ x, y, size = 28, name: iconName, color = C.ink, group }) => {
    const [set, key] = iconName.includes(':') ? iconName.split(':') : ['lucide', iconName];
    const data = collections[set]?.icons[key];

    if (!data) {
      throw new Error(`No icon "${iconName}"`);
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${data.body}</svg>`;
    const fileId = `${set}-${key}`;

    files[fileId] = {
      mimeType: 'image/svg+xml',
      id: fileId,
      dataURL: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
      created: 1
    };

    return add(base('image', { x, y, width: size, height: size, strokeColor: color, fileId, status: 'saved', scale: [1, 1], crop: null, groupIds: group ? [group] : [] }));
  };

  // Group ids keep a drawn piece together when it is moved in Excalidraw.
  let groups = 0;
  const groupId = () => `${name}-group-${++groups}`;

  /**
   * A box with an icon and a label. `row` puts the icon left of a one- or two-line
   * label; `stack` puts it above a centred label.
   */
  const iconBox = ({ x, y, w, h, icon: iconName, label, size = 20, iconSize = 22, layout = 'row', stroke = C.ink, fill = 'transparent', labelColor, iconColor, dashed, dotted, sw = 2 }) => {
    const group = groupId();
    const lines = label.split('\n').length;
    const textHeight = lines * size * 1.25;

    shape('rectangle', { x, y, w, h, stroke, fill, dashed, dotted, sw, group });

    if (layout === 'stack') {
      const top = y + (h - iconSize - 8 - textHeight) / 2;

      icon({ x: x + w / 2 - iconSize / 2, y: top, size: iconSize, name: iconName, color: iconColor ?? stroke, group });
      text({ x: x + w / 2, y: top + iconSize + 8, text: label, size, color: labelColor ?? stroke, align: 'center', group });
    }
    else {
      const labelWidth = Math.max(...label.split('\n').map(line => textWidth(line, size)));
      const left = x + (w - iconSize - 10 - labelWidth) / 2;

      icon({ x: left, y: y + h / 2 - iconSize / 2, size: iconSize, name: iconName, color: iconColor ?? stroke, group });
      text({ x: left + iconSize + 10, y: y + h / 2 - textHeight / 2, text: label, size, color: labelColor ?? stroke, group });
    }

    return group;
  };

  /** A hand-drawn person: a round head over a shoulders curve. */
  const person = ({ x, y, size = 48, color = C.ink, fill = 'transparent' }) => {
    const group = groupId();
    const head = size * 0.4;

    shape('ellipse', { x: x + (size - head) / 2, y, w: head, h: head, stroke: color, fill, group });
    linear('line', {
      points: [[x + size * 0.08, y + size], [x + size * 0.2, y + size * 0.58], [x + size * 0.5, y + size * 0.48], [x + size * 0.8, y + size * 0.58], [x + size * 0.92, y + size]],
      color,
      curved: true,
      group
    });

    return group;
  };

  /** A filled label in the eqraatech manner: Iris with white text. */
  const pill = ({ x, y, w, h = 32, label, size = 17, fill = C.iris, color = C.white, stroke = C.ink }) =>
    shape('rectangle', { x, y, w, h, stroke, fill, label, size, labelColor: color });

  return {
    C,
    iconBox,
    person,
    pill,
    text,
    rect: props => shape('rectangle', props),
    ellipse: props => shape('ellipse', props),
    diamond: props => shape('diamond', props),
    arrow: props => linear('arrow', props),
    line: props => linear('line', props),
    icon,
    frame: ({ w, h }) => add(base('frame', { x: 0, y: 0, width: w, height: h, name: null, strokeColor: '#bbb' })),
    /** A hand-drawn wave under a title. */
    squiggle: ({ x, y, w, color = C.iris }) => {
      const points = [];

      for (let i = 0; i <= 8; i++) {
        points.push([x + (w / 8) * i, y + (i % 2 ? -4 : 4)]);
      }

      return linear('line', { points, color, curved: true, sw: 2 });
    },
    write (path) {
      writeFileSync(path, `${JSON.stringify({
        type: 'excalidraw',
        version: 2,
        source: 'https://excalidraw.com',
        elements,
        appState: { gridSize: 20, viewBackgroundColor: '#ffffff' },
        files
      }, null, 2)}\n`);
    }
  };
}
