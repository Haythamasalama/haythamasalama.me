/**
 * Every page that doesn't read GitHub, as Markdown in one file, for LLMs that
 * want the whole site at once. The live pages are linked at the end.
 */
export default defineEventHandler(async (event) => {
  const { site } = useAppConfig();
  const { projects, articles } = await contentPages(event);

  const paths = [...staticPages, ...projects.map(page => page.path), ...articles.map(page => page.path)];
  const pages = await Promise.all(paths.map(path => pageMarkdown(event, path)));

  const text = [
    ...pages.filter(result => !!result).map(result => result.page.markdown.trim()),
    `Live from GitHub, not included here: ${site.url}/open-source.md (open-source contributions) and ${site.url}/snippets.md (gists).`
  ].join('\n\n---\n\n');

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8');

  return `${text}\n`;
});
