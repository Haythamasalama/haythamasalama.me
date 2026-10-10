const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

/** `7100` → `7.1K` */
export function formatCount (value: number): string {
  return compact.format(value);
}

/** `plural(1, 'issue')` → `1 issue`, `plural(3, 'issue')` → `3 issues` */
export function plural (count: number, word: string): string {
  return `${count} ${count === 1 ? word : `${word}s`}`;
}
