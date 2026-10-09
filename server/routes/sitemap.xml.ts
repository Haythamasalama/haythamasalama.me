import { queryCollection } from '@nuxt/content/server';

const staticPages = ['/', '/about', '/projects', '/articles', '/tools', '/uses', '/snippets'];

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

export default defineEventHandler(async (event) => {
  const { url } = useAppConfig();

  const [articles, projects] = await Promise.all([
    queryCollection(event, 'articles').select('path', 'date').all(),
    queryCollection(event, 'projects').select('path').all()
  ]);

  const entries: { path: string; lastmod?: string }[] = [
    ...staticPages.map(path => ({ path })),
    ...articles.map(article => ({ path: article.path, lastmod: article.date })),
    ...projects.map(project => ({ path: project.path }))
  ];

  const urls = entries.map(({ path, lastmod }) => {
    const loc = `<loc>${escapeXml(`${url}${path === '/' ? '' : path}`)}</loc>`;

    return `  <url>${loc}${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</url>`;
  });

  setHeader(event, 'content-type', 'application/xml; charset=utf-8');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>'
  ].join('\n');
});
