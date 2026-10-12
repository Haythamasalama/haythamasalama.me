import { brandColors } from '#shared/brand-colors';

/** Colours for logos in the local `brand` collection, which Simple Icons doesn't cover. */
const localColors: Record<string, string> = { 'brand:linkedin': '#0A66C2' };

/** Relative luminance of a #rrggbb colour, from 0 (black) to 1 (white). */
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;

    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
};

/**
 * The CSS variables that give a `simple-icons:` logo its own colour (see `.brand-icon` in main.css):
 * `--brand` in light mode, and `--brand-dark` on hover in dark mode, left out when the colour is
 * too dark to read there (black logos then hover to the foreground colour). Empty for other icons.
 */
export function brandStyle (icon?: string): Record<string, string> {
  const hex = icon?.startsWith('simple-icons:') ? brandColors[icon.slice('simple-icons:'.length)] : icon && localColors[icon];

  if (!hex) return {};

  return luminance(hex) > 0.08 ? { '--brand': hex, '--brand-dark': hex } : { '--brand': hex };
}
