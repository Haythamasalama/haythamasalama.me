/**
 * The site's map for LLMs and agents (https://llmstxt.org): who Haytham is,
 * then every page as a link to its Markdown version.
 */
export default defineEventHandler(async (event) => {
  const { site } = useAppConfig();
  const { projects, articles } = await contentPages(event);

  const link = (page: { path: string; title: string; description: string }) =>
    `- [${page.title}](${site.url}${markdownPath(page.path)}): ${page.description}`;

  const pages = await Promise.all(staticPages.map(path => pageMarkdown(event, path)));

  const text = [
    `# ${site.name}`,
    `> ${site.description}`,
    `${site.role}. Every page on ${site.url} has a Markdown version at the same address plus \`.md\` (\`/index.md\` for the home page), listed below. ${site.url}/llms-full.txt holds all of them in one file.`,
    '## Pages',
    [
      ...pages.filter(result => !!result).map(result => link(result.page)),
      `- [Open source](${site.url}/open-source.md): Maintainer roles, merged pull requests, issues and contributor ranks, live from GitHub.`,
      `- [Snippets](${site.url}/snippets.md): Public GitHub gists of config and code, live from GitHub.`
    ].join('\n'),
    '## Projects',
    projects.map(link).join('\n'),
    '## Articles',
    articles.map(link).join('\n'),
    '## Optional',
    [
      `- [Sitemap](${site.url}/sitemap.xml): Every HTML page, for crawlers.`,
      `- [Open-source activity as JSON](${site.url}/api/open-source): Pull requests, issues and ranks by repository.`,
      `- [Snippets as JSON](${site.url}/api/snippets): Public gists with their files.`
    ].join('\n')
  ].join('\n\n');

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8');

  return `${text}\n`;
});
