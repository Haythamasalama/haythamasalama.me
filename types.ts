export const toolCatogories = [
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

export const technologyCatogories = [
    'main stack',
    'back end',
    'front end',
    'deployment',
    'programming language'
];

export type Tool = {
    name: string;
    description: string;
    icon?: string;
    website: string;
    category: string;
    tags?: string[];
    createdAt?: number;
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
}
