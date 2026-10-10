const monthYear = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const monthDay = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const fullDate = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });

/** `2023-07-21` → `Jul 2023` */
export function formatMonth(date: string): string {
  return monthYear.format(new Date(date));
}

/** `2023-07-21` → `Jul 21` */
export function formatDay(date: string): string {
  return monthDay.format(new Date(date));
}

/** `2023-07-21` → `July 21, 2023` */
export function formatDate(date: string): string {
  return fullDate.format(new Date(date));
}

/** `2023-07-21` → `2023` */
export function yearOf(date: string): number {
  return new Date(date).getUTCFullYear();
}
