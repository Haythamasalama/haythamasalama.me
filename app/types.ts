export const toolCategories = [
  'windows tool',
  'website online',
  'video downloader',
  'ux-ui',
  'qr generator',
  'productivity',
  'pdf',
  'images',
  'illustrations',
  'icons',
  'english',
  'css generator',
  'colors',
  'code screenshots',
  'chrome extension'
];

// Display names for tool categories whose stored value is not already proper case.
export const toolCategoryLabels: Record<string, string> = {
  'ux-ui': 'UX/UI',
  'qr generator': 'QR generator',
  'pdf': 'PDF',
  'css generator': 'CSS generator'
};

export const technologyCategories = [
  'main stack',
  'back end',
  'front end',
  'deployment',
  'programming language'
];

export type MenuItem = {
  name: string;
  path: string;
};

export type Experience = {
  title: string;
  employmentType: 'full-time' | 'part-time' | 'freelance';
  location?: {
    name: string;
    type?: string;
  };
  startDate: string;
  endDate: string;
  descriptions: string[];
  company?: {
    name: string;
    url?: string;
  };
};
