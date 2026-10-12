import rough from 'roughjs';
import type { Drawable, Op, Options } from 'roughjs/bin/core';
import type { RoughGenerator } from 'roughjs/bin/generator';

/** The fields of an Excalidraw element this renderer reads. */
export interface SketchElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: 'hachure' | 'cross-hatch' | 'solid' | 'zigzag';
  strokeWidth: number;
  strokeStyle: 'solid' | 'dashed' | 'dotted';
  roughness: number;
  opacity: number;
  roundness?: { type: number; value?: number } | null;
  seed: number;
  isDeleted?: boolean;
  points?: [number, number][];
  startArrowhead?: string | null;
  endArrowhead?: string | null;
  text?: string;
  fontSize?: number;
  fontFamily?: number;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  fileId?: string | null;
}

export interface SketchScene {
  elements: SketchElement[];
  files?: Record<string, { mimeType: string; dataURL: string }>;
}

/**
 * Excalidraw colours that stand for site tokens, so a figure follows the
 * light and dark themes. Pick these values in Excalidraw; any other colour
 * is drawn as it is. The `--sk-*` variables are defined in main.css.
 */
const strokeTokens: Record<string, string> = {
  '#1e1e1e': 'ink',
  '#000000': 'ink',
  '#495057': 'soft',
  '#868e96': 'muted',
  '#ced4da': 'line',
  '#7f7cf2': 'iris',
  '#4f9bff': 'azure',
  '#ffffff': 'on-accent'
};

const fillTokens: Record<string, string> = {
  '#ffffff': 'paper',
  '#f8f9fa': 'raised',
  '#e9ecef': 'chip',
  '#e9ebfe': 'iris-tint',
  '#e2eeff': 'azure-tint'
};

function paint (color: string | undefined, kind: 'stroke' | 'fill' = 'stroke'): string {
  if (!color || color === 'transparent') {
    return 'none';
  }

  const key = color.toLowerCase();
  const token = kind === 'fill' ? fillTokens[key] ?? strokeTokens[key] : strokeTokens[key];

  return token ? `var(--sk-${token})` : color;
}

/** Excalidraw's font ids, drawn with the site's own faces. */
const fontFaces: Record<number, string> = {
  1: 'var(--font-sketch)',
  3: 'var(--font-mono)',
  5: 'var(--font-sketch)',
  8: 'var(--font-mono)'
};

/** Excalidraw's metrics per font id, so baselines land where Excalidraw puts them. */
const fontMetrics: Record<number, { unitsPerEm: number; ascender: number; descender: number; lineHeight: number }> = {
  1: { unitsPerEm: 1000, ascender: 886, descender: -374, lineHeight: 1.25 },
  2: { unitsPerEm: 2048, ascender: 1577, descender: -471, lineHeight: 1.15 },
  3: { unitsPerEm: 2048, ascender: 1900, descender: -480, lineHeight: 1.2 },
  5: { unitsPerEm: 1000, ascender: 886, descender: -374, lineHeight: 1.25 },
  6: { unitsPerEm: 1000, ascender: 1011, descender: -353, lineHeight: 1.35 },
  8: { unitsPerEm: 1000, ascender: 750, descender: -250, lineHeight: 1.25 },
  9: { unitsPerEm: 2048, ascender: 1854, descender: -434, lineHeight: 1.15 }
};

const round = (value: number) => Math.round(value * 10) / 10;

function escapeXml (value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Excalidraw softens small shapes so they don't look scribbled. */
function adjustRoughness (element: SketchElement): number {
  const maxSize = Math.max(element.width, element.height);
  const minSize = Math.min(element.width, element.height);
  const linear = element.type === 'line' || element.type === 'arrow';

  if ((minSize >= 20 && maxSize >= 50) || (minSize >= 15 && element.roundness) || (linear && maxSize >= 50)) {
    return element.roughness;
  }

  return Math.min(element.roughness / (maxSize < 10 ? 3 : 2), 2.5);
}

/** The same rough.js options Excalidraw uses for an element. */
function roughOptions (element: SketchElement): Options {
  const options: Options = {
    seed: element.seed,
    strokeLineDash: element.strokeStyle === 'dashed'
      ? [8, 8 + element.strokeWidth]
      : element.strokeStyle === 'dotted' ? [1.5, 6 + element.strokeWidth] : undefined,
    disableMultiStroke: element.strokeStyle !== 'solid',
    strokeWidth: element.strokeStyle === 'solid' ? element.strokeWidth : element.strokeWidth + 0.5,
    fillWeight: element.strokeWidth / 2,
    hachureGap: element.strokeWidth * 4,
    roughness: adjustRoughness(element),
    stroke: element.strokeColor,
    preserveVertices: element.roughness < 2
  };

  if (['rectangle', 'diamond', 'ellipse'].includes(element.type)) {
    options.fillStyle = element.fillStyle;
    options.fill = element.backgroundColor === 'transparent' ? undefined : element.backgroundColor;

    if (element.type === 'ellipse') {
      options.curveFitting = 1;
    }
  }

  return options;
}

function cornerRadius (size: number, element: SketchElement): number {
  if (element.roundness?.type === 3) {
    const fixed = element.roundness.value ?? 32;

    return size <= fixed / 0.25 ? size * 0.25 : fixed;
  }

  return size * 0.25;
}

function shape (element: SketchElement, generator: RoughGenerator): Drawable {
  const options = roughOptions(element);
  const { width: w, height: h } = element;

  if (element.type === 'ellipse') {
    return generator.ellipse(w / 2, h / 2, w, h, options);
  }

  if (element.type === 'diamond') {
    const [tx, ty, rx, ry, bx, by, lx, ly] = [w / 2, 0, w, h / 2, w / 2, h, 0, h / 2];

    if (!element.roundness) {
      return generator.polygon([[tx, ty], [rx, ry], [bx, by], [lx, ly]], options);
    }

    const v = cornerRadius(Math.abs(tx - lx), element);
    const r = cornerRadius(Math.abs(ry - ty), element);

    return generator.path(
      `M ${tx + v} ${ty + r} L ${rx - v} ${ry - r} C ${rx} ${ry}, ${rx} ${ry}, ${rx - v} ${ry + r} `
      + `L ${bx + v} ${by - r} C ${bx} ${by}, ${bx} ${by}, ${bx - v} ${by - r} `
      + `L ${lx + v} ${ly + r} C ${lx} ${ly}, ${lx} ${ly}, ${lx + v} ${ly - r} `
      + `L ${tx - v} ${ty + r} C ${tx} ${ty}, ${tx} ${ty}, ${tx + v} ${ty + r}`,
      options
    );
  }

  if (!element.roundness) {
    return generator.rectangle(0, 0, w, h, options);
  }

  const r = cornerRadius(Math.min(w, h), element);

  return generator.path(
    `M ${r} 0 L ${w - r} 0 Q ${w} 0, ${w} ${r} L ${w} ${h - r} Q ${w} ${h}, ${w - r} ${h} `
    + `L ${r} ${h} Q 0 ${h}, 0 ${h - r} L 0 ${r} Q 0 0, ${r} 0`,
    options
  );
}

function rotate ([x, y]: [number, number], [cx, cy]: [number, number], angle: number): [number, number] {
  return [
    (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
    (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy
  ];
}

/** Arrowheads placed the way Excalidraw places them, along the end of the curve. */
function arrowhead (
  element: SketchElement,
  body: Drawable,
  position: 'start' | 'end',
  kind: string,
  generator: RoughGenerator
): Drawable[] {
  const ops: Op[] = (body.sets.find(set => set.type === 'path') ?? body.sets[0])?.ops ?? [];
  const index = position === 'start' ? 1 : ops.length - 1;
  const segment = ops[index];
  const points = element.points ?? [];

  if (!segment || segment.op !== 'bcurveTo' || points.length < 2) {
    return [];
  }

  const p1 = [segment.data[0]!, segment.data[1]!];
  const p2 = [segment.data[2]!, segment.data[3]!];
  const p3 = [segment.data[4]!, segment.data[5]!];
  const previous = ops[index - 1];
  const p0 = previous?.op === 'move'
    ? [previous.data[0]!, previous.data[1]!]
    : previous?.op === 'bcurveTo' ? [previous.data[4]!, previous.data[5]!] : [0, 0];

  const at = (t: number, i: number) => (1 - t) ** 3 * p3[i]! + 3 * t * (1 - t) ** 2 * p2[i]! + 3 * t ** 2 * (1 - t) * p1[i]! + p0[i]! * t ** 3;
  const [x2, y2] = position === 'start' ? p0 : p3;
  const [x1, y1] = [at(0.3, 0), at(0.3, 1)];
  const distance = Math.hypot(x2! - x1, y2! - y1) || 1;
  const nx = (x2! - x1) / distance;
  const ny = (y2! - y1) / distance;

  const [cx, cy] = position === 'end' ? points[points.length - 1]! : points[0]!;
  const [px, py] = position === 'end' ? points[points.length - 2]! : points[1]!;
  const size = kind === 'arrow' ? 25 : 15;
  const length = Math.min(size, Math.hypot(cx - px, cy - py) * 0.5);
  const base: [number, number] = [x2! - nx * length, y2! - ny * length];
  const tip: [number, number] = [x2!, y2!];
  const options = roughOptions(element);

  delete options.strokeLineDash;

  if (kind === 'dot' || kind === 'circle') {
    const diameter = Math.hypot(base[1] - tip[1], base[0] - tip[0]) + element.strokeWidth - 2;

    return [generator.circle(tip[0], tip[1], diameter, {
      ...options,
      fill: element.strokeColor,
      fillStyle: 'solid',
      roughness: Math.min(0.5, options.roughness ?? 0)
    })];
  }

  const angle = (kind === 'arrow' ? 20 : kind === 'bar' ? 90 : 25) * Math.PI / 180;
  const left = rotate(base, tip, -angle);
  const right = rotate(base, tip, angle);

  if (kind === 'triangle') {
    return [generator.polygon([tip, left, right, tip], {
      ...options,
      fill: element.strokeColor,
      fillStyle: 'solid',
      roughness: Math.min(1, options.roughness ?? 0)
    })];
  }

  options.roughness = Math.min(1, options.roughness ?? 0);

  return [generator.line(left[0], left[1], tip[0], tip[1], options), generator.line(right[0], right[1], tip[0], tip[1], options)];
}

function linear (element: SketchElement, generator: RoughGenerator): Drawable[] {
  const options = roughOptions(element);
  const points = element.points ?? [];
  const body = element.roundness ? generator.curve(points, options) : generator.linearPath(points, options);

  return [
    body,
    ...(element.startArrowhead ? arrowhead(element, body, 'start', element.startArrowhead, generator) : []),
    ...(element.endArrowhead ? arrowhead(element, body, 'end', element.endArrowhead, generator) : [])
  ];
}

/** Mirrors rough.js's own SVG renderer, with colours mapped to theme tokens. */
function drawableToSvg (drawable: Drawable, generator: RoughGenerator): string {
  const options = drawable.options;

  return drawable.sets.map((set) => {
    const d = generator.opsToPath(set, 1);

    if (set.type === 'fillPath') {
      return `<path d="${d}" style="fill:${paint(options.fill, 'fill')};stroke:none"/>`;
    }

    if (set.type === 'fillSketch') {
      const weight = options.fillWeight < 0 ? options.strokeWidth / 2 : options.fillWeight;

      return `<path d="${d}" style="stroke:${paint(options.fill, 'fill')};stroke-width:${weight};fill:none"/>`;
    }

    const dash = options.strokeLineDash ? `;stroke-dasharray:${options.strokeLineDash.join(' ')}` : '';

    return `<path d="${d}" style="stroke:${paint(options.stroke)};stroke-width:${options.strokeWidth};fill:none${dash}"/>`;
  }).join('');
}

function text (element: SketchElement): string {
  const lines = (element.text ?? '').replace(/\r\n?/g, '\n').split('\n');
  const family = element.fontFamily ?? 5;
  const metrics = fontMetrics[family] ?? fontMetrics[5]!;
  const size = element.fontSize ?? 20;
  const lineHeight = size * (element.lineHeight ?? metrics.lineHeight);
  const em = size / metrics.unitsPerEm;
  const offset = em * metrics.ascender + (lineHeight - em * metrics.ascender + em * metrics.descender) / 2;
  const anchor = element.textAlign === 'center' ? 'middle' : element.textAlign === 'right' ? 'end' : 'start';
  const x = element.textAlign === 'center' ? element.width / 2 : element.textAlign === 'right' ? element.width : 0;
  const style = `font-family:${fontFaces[family] ?? 'var(--font-sans)'};font-size:${size}px;fill:${paint(element.strokeColor)};white-space:pre`;

  return lines
    .map((line, i) => `<text x="${round(x)}" y="${round(i * lineHeight + offset)}" text-anchor="${anchor}" style="${style}">${escapeXml(line)}</text>`)
    .join('');
}

/** Inlines SVG images (icons) so they take the element's colour; other images stay as they are. */
function image (element: SketchElement, scene: SketchScene): string {
  const file = element.fileId ? scene.files?.[element.fileId] : undefined;

  if (!file) {
    return '';
  }

  if (file.mimeType !== 'image/svg+xml') {
    return `<image href="${file.dataURL}" width="${element.width}" height="${element.height}"/>`;
  }

  const [meta, data = ''] = file.dataURL.split(',');
  const source = meta?.includes(';base64') ? Buffer.from(data, 'base64').toString('utf8') : decodeURIComponent(data);

  return source
    .replace(/^[\s\S]*?(?=<svg)/, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<svg([^>]*)>/, (_, attributes: string) => {
      const kept = attributes.replace(/\s(width|height|x|y|style)="[^"]*"/g, '');

      return `<svg${kept} width="${element.width}" height="${element.height}" style="color:${paint(element.strokeColor)}">`;
    });
}

function bounds (element: SketchElement): [number, number, number, number] {
  if (element.points?.length) {
    const xs = element.points.map(([x]) => element.x + x);
    const ys = element.points.map(([, y]) => element.y + y);

    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  }

  return [element.x, element.y, element.x + element.width, element.y + element.height];
}

function renderElement (element: SketchElement, scene: SketchScene, generator: RoughGenerator): string {
  let body: string;

  if (['rectangle', 'diamond', 'ellipse'].includes(element.type)) {
    body = drawableToSvg(shape(element, generator), generator);
  }
  else if (element.type === 'line' || element.type === 'arrow') {
    body = linear(element, generator).map(drawable => drawableToSvg(drawable, generator)).join('');
  }
  else if (element.type === 'text') {
    body = text(element);
  }
  else if (element.type === 'image') {
    body = image(element, scene);
  }
  else {
    return '';
  }

  const [minX, minY, maxX, maxY] = bounds(element);
  const rotation = element.angle
    ? ` rotate(${round(element.angle * 180 / Math.PI)} ${round((minX + maxX) / 2 - element.x)} ${round((minY + maxY) / 2 - element.y)})`
    : '';
  const opacity = element.opacity < 100 ? ` opacity="${element.opacity / 100}"` : '';

  return `<g transform="translate(${round(element.x)} ${round(element.y)})${rotation}"${opacity}>${body}</g>`;
}

/**
 * Renders an Excalidraw scene to an SVG string with the same rough.js strokes
 * Excalidraw draws. A frame, when there is one, sets the canvas; otherwise the
 * drawing is trimmed to its content with a small margin.
 */
export function renderSketch (scene: SketchScene): string {
  const generator = rough.generator();
  const elements = scene.elements.filter(element => !element.isDeleted);
  const frame = elements.find(element => element.type === 'frame');
  const margin = frame ? 0 : 16;
  const [minX, minY, maxX, maxY] = (frame ? [frame] : elements)
    .map(bounds)
    .reduce(([a, b, c, d], [e, f, g, h]) => [Math.min(a, e), Math.min(b, f), Math.max(c, g), Math.max(d, h)]);
  const viewBox = [minX - margin, minY - margin, maxX - minX + margin * 2, maxY - minY + margin * 2].map(round).join(' ');
  const body = elements.map(element => renderElement(element, scene, generator)).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" aria-hidden="true" focusable="false" style="stroke-linecap:round;stroke-linejoin:round">${body}</svg>`;
}
