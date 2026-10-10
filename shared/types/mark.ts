/**
 * What to show inside a small square tile: a company logo, an Iconify icon,
 * a full-colour image (such as a GitHub avatar) or a short monogram.
 */
export interface Mark {
  /** Key of a one-colour logo in `app/utils/logos.ts`. */
  logo?: string;
  /** Iconify name, e.g. `simple-icons:laravel` or `lucide:atom`. */
  icon?: string;
  /** Path to a full-colour image in `public/`. */
  image?: string;
  /** One or two letters, used when there is no logo or icon. */
  text?: string;
}
