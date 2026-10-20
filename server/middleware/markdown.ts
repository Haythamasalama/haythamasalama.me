/**
 * Serves the Markdown version of any page at its path plus `.md`: `/about.md`,
 * `/projects/winch.md`, `/index.md` for the home page. Most are prerendered;
 * `/open-source.md` and `/snippets.md` read GitHub like their pages and answer
 * with a 503 when it fails, so the last good copy stays cached.
 */
export default defineEventHandler(async (event) => {
  const path = event.path.split('?')[0]!;

  if (!path.endsWith('.md') || path.startsWith('/_') || path.startsWith('/api/')) {
    return;
  }

  const page = path === '/index.md' ? '/' : path.slice(0, -'.md'.length);
  const result = await pageMarkdown(event, page);

  if (!result) {
    return;
  }

  setResponseHeaders(event, {
    'Content-Type': 'text/markdown; charset=utf-8',
    // Search engines should index the HTML page; this is the same text for machines.
    'Link': `<${useAppConfig().site.url}${page === '/' ? '' : page}>; rel="canonical"`
  });

  if (!result.live) {
    setResponseStatus(event, 503);
  }

  return result.page.markdown;
});
