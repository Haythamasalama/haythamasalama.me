/** "Writing & grammar" → "writing-grammar", for section ids that read well in a shared link. */
export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
