/**
 * How the Tools page is organised: a few broad groups (the filter chips) and,
 * inside each, specific categories (the section headings). To add a category,
 * add one line here and use its `name` in the tool's YAML file.
 */
export const toolGroups = [
  { id: 'ai', label: 'AI', isNew: true },
  { id: 'development', label: 'Development' },
  { id: 'design', label: 'Design' },
  { id: 'writing', label: 'Writing' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'media', label: 'Images & video' },
  { id: 'documents', label: 'Documents' },
  { id: 'browser', label: 'Browser' }
] as const;

export type ToolGroupId = typeof toolGroups[number]['id'];

export interface ToolCategory {
  name: string;
  group: ToolGroupId;
  description: string;
}

export const toolCategories = [
  { name: 'AI assistants', group: 'ai', description: 'Ask, research and think things through.' },
  { name: 'AI for code', group: 'ai', description: 'Agents and editors that write code with you.' },
  { name: 'AI for audio & video', group: 'ai', description: 'Voices and sound for videos and lessons.' },
  { name: 'Web development', group: 'development', description: 'Inspect, test and debug websites.' },
  { name: 'Code screenshots', group: 'development', description: 'Turn code into images worth sharing.' },
  { name: 'Colours & gradients', group: 'design', description: 'Palettes, gradients and colour pickers.' },
  { name: 'Backgrounds & CSS generators', group: 'design', description: 'Patterns, waves, shapes and CSS effects.' },
  { name: 'Icons & emoji', group: 'design', description: 'Icon sets and emoji references.' },
  { name: 'Illustrations & animation', group: 'design', description: 'Free illustrations and ready-made animations.' },
  { name: 'UI inspiration', group: 'design', description: 'Real interfaces to learn patterns from.' },
  { name: 'Writing & grammar', group: 'writing', description: 'Clearer, correct English as you type.' },
  { name: 'Translation & pronunciation', group: 'writing', description: 'Translate words and hear them said.' },
  { name: 'Notes & time tracking', group: 'productivity', description: 'Plan work and see where the time goes.' },
  { name: 'Typing practice', group: 'productivity', description: 'Type faster and more accurately.' },
  { name: 'Desktop utilities', group: 'productivity', description: 'Small upgrades for your computer.' },
  { name: 'Images & screenshots', group: 'media', description: 'Capture, compress and polish images.' },
  { name: 'Video & YouTube', group: 'media', description: 'Download, watch and grow on YouTube.' },
  { name: 'PDF tools', group: 'documents', description: 'Merge, split, compress and edit PDFs.' },
  { name: 'QR codes', group: 'documents', description: 'QR codes with your colours and logo.' },
  { name: 'Presentations', group: 'documents', description: 'Slide templates for talks and lessons.' },
  { name: 'Privacy & ad blocking', group: 'browser', description: 'Fewer ads and trackers while you browse.' },
  { name: 'Dark mode', group: 'browser', description: 'Dark themes for sites that lack one.' },
  { name: 'Shopping', group: 'browser', description: 'Price history before you buy.' }
] as const satisfies readonly ToolCategory[];

export type ToolCategoryName = typeof toolCategories[number]['name'];

export const toolCategoryNames = toolCategories.map(category => category.name) as [ToolCategoryName, ...ToolCategoryName[]];
