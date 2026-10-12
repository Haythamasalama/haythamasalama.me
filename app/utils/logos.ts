export interface LogoAsset {
  src: string;
  /** Size inside a 44px tile; other tile sizes scale from this. */
  width: number;
  height: number;
  name: string;
  /** The logo in its own colours, from the company's website: shown in light mode, and on hover in dark mode. */
  /** `fill`: an app icon that covers its whole tile, instead of sitting inside it. */
  color?: { src: string; width: number; height: number; fill?: boolean };
}

/** Logos in `public/logos`: a one-colour mask that follows the theme, plus the colour original. */
export const logos: Record<string, LogoAsset> = {
  'winch': { src: '/logos/winch.png', width: 24, height: 16, name: 'WINCH', color: { src: '/logos/winch-color.svg', width: 44, height: 44, fill: true } },
  'sanad': { src: '/logos/sanad.svg', width: 30, height: 14, name: 'Sanad', color: { src: '/logos/sanad-color.png', width: 30, height: 13 } },
  'faris': { src: '/logos/faris.png', width: 23, height: 29, name: 'Faris Petrol Company', color: { src: '/logos/faris-color.png', width: 24, height: 30 } },
  'patric': { src: '/logos/patric.png', width: 22, height: 22, name: 'Patric Technology', color: { src: '/logos/patric-color.png', width: 44, height: 44, fill: true } },
  'al-azhar': { src: '/logos/al-azhar.svg', width: 32, height: 32, name: 'Al Azhar University', color: { src: '/logos/al-azhar-color.png', width: 32, height: 32 } },
  'faris-oil-center': { src: '/logos/faris-oil-center.svg', width: 30, height: 23, name: 'Faris Oil Center', color: { src: '/logos/faris-oil-center.svg', width: 30, height: 23 } },
  'runarks': { src: '/logos/runarks.svg', width: 14, height: 22, name: 'Runarks', color: { src: '/logos/runarks-color.svg', width: 44, height: 44, fill: true } }
};
