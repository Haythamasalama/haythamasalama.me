export interface LogoAsset {
  src: string;
  /** Size inside a 44px tile; other tile sizes scale from this. */
  width: number;
  height: number;
  name: string;
}

/** One-colour logos in `public/logos`, drawn as masks so they follow the theme. */
export const logos: Record<string, LogoAsset> = {
  'winch': { src: '/logos/winch.png', width: 24, height: 16, name: 'WINCH' },
  'sanad': { src: '/logos/sanad.svg', width: 30, height: 14, name: 'Sanad' },
  'faris': { src: '/logos/faris.png', width: 23, height: 29, name: 'Faris Petrol Company' },
  'patric': { src: '/logos/patric.png', width: 22, height: 22, name: 'Patric Technology' },
  'al-azhar': { src: '/logos/al-azhar.svg', width: 32, height: 32, name: 'Al Azhar University' },
  'clever': { src: '/logos/clever.png', width: 22, height: 25, name: 'Clever' },
  'faris-oil-center': { src: '/logos/faris-oil-center.svg', width: 30, height: 23, name: 'Faris Oil Center' },
  'runarks': { src: '/logos/runarks.svg', width: 14, height: 22, name: 'Runarks' },
  'easyshoot': { src: '/logos/easyshoot.svg', width: 22, height: 22, name: 'EasyShoot' },
  'whatsapp-manager': { src: '/logos/whatsapp-manager.svg', width: 24, height: 21, name: 'WhatsApp Business Monitor' }
};
