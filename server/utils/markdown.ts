import type { H3Event } from 'h3';
import { queryCollection } from '@nuxt/content/server';
import { livePages as liveSeo } from '#shared/live-pages';
import { patternGroups } from '#shared/pattern-groups';
import { skillGroups } from '#shared/skill-groups';
import { toolCategories } from '#shared/tool-categories';
import type { OpenSourceActivity } from '#shared/types/open-source';
import type { Snippet } from '#shared/types/snippet';

/**
 * Every page of the site as Markdown, for LLMs and agents: `/about.md` is the
 * About page, `/index.md` the home page, `/projects/winch.md` a project. The
 * text comes from the same collections as the pages, so it never drifts from
 * them. `llms.txt` lists these files and `llms-full.txt` joins them.
 */

export interface MarkdownPage {
  path: string;
  title: string;
  description: string;
  markdown: string;
}

/** Where a page's Markdown lives: `/` → `/index.md`, `/about` → `/about.md`. */
export const markdownPath = (path: string) => `${path === '/' ? '/index' : path.replace(/\/$/, '')}.md`;

/** Pages built from collections, in the order `llms.txt` and `llms-full.txt` list them. */
export const staticPages = ['/', '/about', '/projects', '/apps', '/articles', '/learn', '/learn/vue', '/learn/design-patterns', '/tools', '/uses', '/brand'] as const;

/** Pages that read GitHub at request time, like their HTML versions. */
export const livePages = ['/open-source', '/snippets'] as const;

const site = () => {
  const { site } = useAppConfig();

  return site;
};

const absolute = (path: string) => /^[a-z]+:/i.test(path) ? path : `${site().url}${path}`;

const quote = (value: string) => value.replace(/^['"]|['"]$/g, '').replace(/''/g, '\'');

/** Attributes of an MDC block, e.g. `{src="/a.webp" single alt="…"}`. */
function attributes (source: string) {
  const result: Record<string, string> = {};

  for (const [, name, value] of source.matchAll(/([\w-]+)(?:="([^"]*)")?/g)) {
    result[name!] = value ?? 'true';
  }

  return result;
}

/**
 * A page's raw Markdown with the site's own components turned into plain
 * Markdown: figures become their description, screenshots images, feature
 * grids lists and notes quotes. Links to the site become absolute.
 */
export function plainMarkdown (raw: string) {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  const blocks = body.replace(/^::([\w-]+)(?:\{([^\n]*)\})?\n([\s\S]*?)^::$/gm, (_, name: string, attrs = '', inner: string) => {
    const props = attributes(attrs);
    const caption = inner.trim();

    switch (name) {
      case 'sketch-figure':
        return `> **Figure:** ${props.alt}${caption ? `\n>\n> ${caption}` : ''}\n`;
      case 'project-shot': {
        const src = props.single ? props.src! : `${props.src}-light.webp`;

        return `![${props.alt}](${src})${caption ? `\n\n*${caption}*` : ''}\n`;
      }
      case 'feature-grid': {
        const items = [...inner.matchAll(/title: (.+)\n\s+text: (.+)/g)]
          .map(([, title, text]) => `- **${quote(title!.trim())}**: ${quote(text!.trim())}`);

        return `${items.join('\n')}\n`;
      }
      case 'alert-info':
        return `> **Note:** ${caption}${props.to ? ` [Read more](${props.to})` : ''}\n`;
      default:
        return caption ? `${caption}\n` : '';
    }
  });

  return blocks
    .replace(/\]\((\/[^)\s]*)/g, (_, path: string) => `](${absolute(path)}`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** The header every page starts with: title, summary and the HTML page it mirrors. */
function document (page: Omit<MarkdownPage, 'markdown'>, body: string[]): MarkdownPage {
  const markdown = [
    `# ${page.title}`,
    `> ${page.description}`,
    `Page: ${absolute(page.path)}`,
    ...body.filter(Boolean)
  ].join('\n\n');

  return { ...page, markdown: `${markdown.trim()}\n` };
}

const link = (label: string, to: string, note?: string) => `- [${label}](${absolute(to)})${note ? `: ${note}` : ''}`;

const markOf = (path: string) => absolute(markdownPath(path));

async function projectsWithPages (event: H3Event) {
  const [projects, pages] = await Promise.all([
    queryCollection(event, 'projects').all(),
    queryCollection(event, 'projectPages').select('path').all()
  ]);
  const paths = new Set(pages.map(page => page.path));

  return projects
    .sort((a, b) => b.year - a.year || a.order - b.order)
    .map(project => ({ ...project, page: paths.has(`/${project.stem}`) ? `/${project.stem}` : undefined }));
}

async function skills (event: H3Event, homeOnly = false) {
  const technologies = await queryCollection(event, 'technologies').order('order', 'ASC').all();

  return skillGroups
    .map(group => ({ group, items: technologies.filter(tech => tech.group === group && (!homeOnly || tech.home)) }))
    .filter(row => row.items.length)
    .map(row => `- **${row.group}**: ${row.items.map(tech => tech.name).join(', ')}`)
    .join('\n');
}

async function home (event: H3Event) {
  const { socials } = useAppConfig();
  const [projects, articles, profile] = await Promise.all([
    projectsWithPages(event),
    queryCollection(event, 'articles').order('date', 'DESC').limit(3).all(),
    queryCollection(event, 'profile').first()
  ]);

  const work = projects
    .filter(project => project.highlight)
    .sort((a, b) => a.highlight!.order - b.highlight!.order)
    .map(project => link(project.highlight!.title, project.page ?? '/projects', `${project.highlight!.description} (${project.highlight!.period})`));

  return document({ path: '/', title: site().name, description: site().description }, [
    `${site().role}${profile ? ` · ${profile.location}` : ''}`,
    '## Selected work',
    work.join('\n'),
    '## Open source',
    `On the Nuxt UI team, with pull requests to Laravel, Nuxt, Uptime Kuma and the Vue ecosystem. Live numbers: ${markOf('/open-source')}`,
    '## Skills & stack',
    await skills(event, true),
    '## Latest writing',
    articles.map(article => link(article.title, article.path, article.description)).join('\n'),
    '## Elsewhere',
    socials.map((social: { label: string; to: string }) => link(social.label, social.to)).join('\n')
  ]);
}

async function about (event: H3Event) {
  const { socials } = useAppConfig();
  const [profile, experience, education] = await Promise.all([
    queryCollection(event, 'profile').first(),
    queryCollection(event, 'experience').order('order', 'ASC').all(),
    queryCollection(event, 'education').order('order', 'ASC').all()
  ]);

  if (!profile) {
    return null;
  }

  const jobs = experience.map((job) => {
    const held = [job.type, job.location, job.workplace].filter(Boolean).join(' · ');
    const lines = [
      `### ${job.role} · ${job.company}`,
      [`${job.start} – ${job.end}`, held].filter(Boolean).join(' · '),
      job.url ? `${job.summary} ${job.url}` : job.summary,
      (job.highlights ?? []).map(item => `- ${item}`).join('\n')
    ];

    return lines.filter(Boolean).join('\n\n');
  });

  return document({
    path: '/about',
    title: `About ${site().name}`,
    description: 'Experience, products, open source, skills and where his work with AI agents is going.'
  }, [
    `${profile.headline} · ${profile.focus} · ${profile.location}`,
    profile.about.join('\n\n'),
    '## Experience',
    jobs.join('\n\n'),
    '## Open source',
    `Maintainer roles, merged pull requests and contributor ranks, live from GitHub: ${markOf('/open-source')}`,
    '## Skills',
    await skills(event),
    '## Education',
    education.map(school => `- **${school.degree}**, ${school.school} (${school.period})`).join('\n'),
    profile.awards.length ? '## Awards' : '',
    profile.awards.map(award => `- **${award.title}**, ${award.issuer} (${award.year})${award.note ? `. ${award.note}` : ''}`).join('\n'),
    profile.organizations.length ? '## Organizations' : '',
    profile.organizations.map(org => link(org.name, org.url)).join('\n'),
    '## Vision',
    `**${profile.vision.line}** ${profile.vision.text}`,
    '## Contact',
    socials.map((social: { label: string; to: string }) => link(social.label, social.to)).join('\n')
  ]);
}

async function projects (event: H3Event) {
  const list = await projectsWithPages(event);

  const card = (project: typeof list[number]) => [
    `### ${project.title}`,
    project.context ?? String(project.year),
    project.description,
    [
      project.page && `Case study: ${markOf(project.page)}`,
      ...(project.links ?? []).map(item => `${item.label}: ${item.to}`)
    ].filter(Boolean).join('\n')
  ].filter(Boolean).join('\n\n');

  return document({
    path: '/projects',
    title: 'Projects',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today.'
  }, [
    '## Case studies',
    list.filter(project => project.page).map(card).join('\n\n'),
    '## Earlier work',
    list.filter(project => !project.page).map(card).join('\n\n')
  ]);
}

async function project (event: H3Event, path: string) {
  const [page, card] = await Promise.all([
    queryCollection(event, 'projectPages').path(path).first(),
    queryCollection(event, 'projects').where('stem', '=', path.slice(1)).first()
  ]);

  if (!page || !card) {
    return null;
  }

  return document({ path, title: card.title, description: page.description }, [
    card.description,
    [card.context, ...(card.links ?? []).map(item => `${item.label}: ${item.to}`)].filter(Boolean).join('\n'),
    plainMarkdown(page.rawbody)
  ]);
}

async function appsWithPages (event: H3Event) {
  const [apps, pages] = await Promise.all([
    queryCollection(event, 'apps').order('order', 'ASC').all(),
    queryCollection(event, 'appPages').select('path').all()
  ]);
  const paths = new Set(pages.map(page => page.path));

  return apps.map(app => ({ ...app, page: paths.has(`/${app.stem}`) ? `/${app.stem}` : undefined }));
}

const appLinks = (app: { links?: { label: string; to: string }[]; repo: string }) =>
  [...(app.links ?? []).map(item => `${item.label}: ${item.to}`), `Source: ${app.repo}`];

async function apps (event: H3Event) {
  const list = await appsWithPages(event);

  return document({
    path: '/apps',
    title: 'Apps',
    description: 'Free, open-source apps by Haytham A. Salama: EasyShoot for screenshots on the Mac, a dashboard for WhatsApp Business templates, and more.'
  }, list.map(app => [
    `## ${app.name}`,
    `${app.kind} · ${[...app.platforms ?? [], app.license && `${app.license} licence`].filter(Boolean).join(' · ')} · since ${app.since}`,
    app.description,
    [app.page && `About the app: ${markOf(app.page)}`, ...appLinks(app)].filter(Boolean).join('\n')
  ].join('\n\n')));
}

async function appPage (event: H3Event, path: string) {
  const [page, card] = await Promise.all([
    queryCollection(event, 'appPages').path(path).first(),
    queryCollection(event, 'apps').where('stem', '=', path.slice(1)).first()
  ]);

  if (!page || !card) {
    return null;
  }

  return document({ path, title: `${card.name} · ${card.kind}`, description: page.description }, [
    card.description,
    [[...card.platforms ?? [], `since ${card.since}`, card.license && `${card.license} licence`].filter(Boolean).join(' · '), ...appLinks(card)].join('\n'),
    plainMarkdown(page.rawbody)
  ]);
}

async function learn (event: H3Event) {
  const articles = await queryCollection(event, 'articles').select('path', 'title', 'description', 'date').order('date', 'DESC').limit(3).all();

  return document({
    path: '/learn',
    title: 'Learn',
    description: 'Learning material by Haytham A. Salama: a step-by-step path to Vue.js, design patterns explained with Java examples, and practical articles.'
  }, [
    '## Paths',
    [
      link('Vue.js path', markdownPath('/learn/vue'), 'Vue one stage at a time, from your first component to Vue Router and Pinia.'),
      link('Design patterns', markdownPath('/learn/design-patterns'), 'The classic patterns in plain words, each with a small Java example.')
    ].join('\n'),
    '## From the blog',
    articles.map(article => link(article.title, markdownPath(article.path), article.description)).join('\n')
  ]);
}

async function vuePath (event: H3Event) {
  const path = await queryCollection(event, 'vuePath').first();

  if (!path) {
    return null;
  }

  const resources = (links: { label: string; to: string }[]) => links.map(item => `  - [${item.label}](${item.to})`).join('\n');
  let stage = 0;

  return document({ path: '/learn/vue', title: 'Vue.js path', description: path.description }, [
    path.intro.replace(/ Tick topics.*$/, ''),
    `Source: ${path.source}`,
    '## Before you start',
    path.before.map(item => [
      `- **${item.title}**${item.topics?.length ? `: ${item.topics.join(', ')}` : ''}`,
      resources(item.links ?? [])
    ].filter(Boolean).join('\n')).join('\n'),
    '## The path',
    path.steps.map(step => [
      `### ${step.project ? 'Project' : `Stage ${++stage}`}: ${step.title}`,
      step.note ?? '',
      (step.topics ?? []).map(topic => `- ${topic}`).join('\n'),
      step.links?.length ? `Resources:\n\n${step.links.map(item => link(item.label, item.to)).join('\n')}` : ''
    ].filter(Boolean).join('\n\n')).join('\n\n')
  ]);
}

async function designPatterns (event: H3Event) {
  const list = await queryCollection(event, 'patterns').select('path', 'title', 'group', 'summary', 'example', 'order').order('order', 'ASC').all();

  return document({
    path: '/learn/design-patterns',
    title: 'Design patterns',
    description: 'The classic design patterns in plain words: creational, structural and behavioral, each with when to use it, its pros and cons, and a small Java example.'
  }, patternGroups.map(group => [
    `## ${group.name}`,
    group.description,
    list
      .filter(pattern => pattern.group === group.name)
      .map(pattern => link(pattern.title, markdownPath(pattern.path), `${pattern.summary} Example: ${pattern.example}.`))
      .join('\n')
  ].join('\n\n')));
}

async function designPattern (event: H3Event, path: string) {
  const page = await queryCollection(event, 'patterns').path(path).first();

  if (!page) {
    return null;
  }

  return document({ path, title: `${page.title} pattern`, description: page.description }, [
    `${page.group} design pattern · Example: ${page.example} · Java code: ${page.source}`,
    page.summary,
    plainMarkdown(page.rawbody)
  ]);
}

async function articles (event: H3Event) {
  const list = await queryCollection(event, 'articles').order('date', 'DESC').all();

  return document({
    path: '/articles',
    title: 'Blog',
    description: 'Short, practical notes on Laravel, Vue and shipping software by Haytham A. Salama.'
  }, [
    list.map(article => link(article.title, markdownPath(article.path), `${article.description} (${article.date}, ${article.category})`)).join('\n')
  ]);
}

async function article (event: H3Event, path: string) {
  const page = await queryCollection(event, 'articles').path(path).first();

  if (!page) {
    return null;
  }

  return document({ path, title: page.title, description: page.description }, [
    `${page.date} · ${page.category} · ${page.readingTime} · by ${site().name}`,
    plainMarkdown(page.rawbody)
  ]);
}

async function tools (event: H3Event) {
  const list = await queryCollection(event, 'tools').all();

  const sections = toolCategories.map((category) => {
    const items = list
      .filter(tool => tool.category === category.name)
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
      .map(tool => link(tool.name, tool.url, `${tool.description} (${tool.kind}${tool.featured ? ', a favourite' : ''})`));

    return items.length ? `## ${category.name}\n\n${category.description}\n\n${items.join('\n')}` : '';
  });

  return document({
    path: '/tools',
    title: 'Tools',
    description: 'Tools Haytham A. Salama recommends for AI, development, design, writing, productivity, media, documents and the browser.'
  }, sections);
}

async function uses (event: H3Event) {
  const sections = await queryCollection(event, 'uses').order('order', 'ASC').all();

  return document({
    path: '/uses',
    title: 'Uses',
    description: 'The hardware and software Haytham A. Salama uses every day: editors, terminal, databases, planning and design tools.'
  }, [
    'My own setup: the hardware and software I open every day. Recommendations live on Tools.',
    ...sections.map(section => `## ${section.title}\n\n${section.items
      .map(item => `- **${item.name}**: ${item.note}${item.theme ? ` (theme: ${item.theme})` : ''}`)
      .join('\n')}`)
  ]);
}

/** The /brand page in short. Its full data sits in `app/pages/brand.vue`; keep these facts in step. */
function brand () {
  const kit = [
    ['haytham-signature-white.svg', 'Signature, white, for dark backgrounds'],
    ['haytham-signature-black.svg', 'Signature, black, for light backgrounds'],
    ['haytham-signature-gradient.svg', 'Signature in the Iris to Azure gradient, for artwork only'],
    ['haytham-app-icon.svg', 'App icon'],
    ['haytham-favicon.svg', 'Favicon'],
    ['haytham-brand-tokens.css', 'Colour tokens as CSS custom properties'],
    ['haytham-portrait.jpg', 'Portrait']
  ];

  return document({
    path: '/brand',
    title: 'Brand guidelines',
    description: 'The visual identity of Haytham A. Salama: the handwritten signature, colour, type and voice, plus a brand kit to download.'
  }, [
    '## Principles',
    [
      '- **Ink first**: black, white and generous space carry everything.',
      '- **Signed by hand**: the handwritten signature is the logo. It is never retyped, redrawn, recoloured or stretched.',
      '- **Colour is a signal**: Iris and Azure live in small places (a badge, a hairline, a focus ring), never more than about 5% of a screen.'
    ].join('\n'),
    '## Colour',
    [
      '- Ink `#0B0B0C`: page, dark theme (the default)',
      '- Paper `#FFFFFF`: page, light theme',
      '- Text `#EDEDEF` and Muted `#A1A1AA` on Ink',
      '- Iris 500 `#7F7CF2`: the creative',
      '- Azure 500 `#4F9BFF`: the engineer'
    ].join('\n'),
    '## Typography',
    [
      '- **Geist** (400, 500, 600) for headings and text',
      '- **Geist Mono** for labels, dates, repositories and code',
      '- **Instrument Serif** italic for one human phrase per page'
    ].join('\n'),
    '## Name',
    `Write the name as "${site().name}" and the title as "${site().role}".`,
    '## Brand kit',
    kit.map(([file, note]) => link(file!, `/brand-kit/${file}`, note)).join('\n')
  ]);
}

async function openSource (event: H3Event) {
  const curated = await queryCollection(event, 'contributions').order('order', 'ASC').all();
  const activity = await event.$fetch<OpenSourceActivity>('/api/open-source').catch(() => null);

  const entry = (item: typeof curated[number]) => [
    `### ${item.name ?? item.repo}${item.badge ? ` · ${item.badge}` : ''}`,
    [item.role, item.description, item.note].filter(Boolean).map(text => text!.replace(/\.$/, '')).join('. ') + '.',
    [
      `Repository: ${item.url}`,
      ...(item.stats ?? []).map(stat => `${stat.label}: ${stat.value}`),
      ...(item.links ?? []).map(entry => `${entry.label}: ${entry.to}`)
    ].join('\n')
  ].filter(Boolean).join('\n\n');

  const repos = (activity?.repos ?? []).map((repo) => {
    const standing = repo.rank ? ` · #${repo.rank} contributor` : '';
    const lines = [
      ...repo.pullRequests.map(pr => `- Merged ${pr.date.slice(0, 10)}: [${pr.title} #${pr.number}](${pr.url})`),
      ...repo.otherPullRequests.map(pr => `- Pull request (${pr.state}) ${pr.date.slice(0, 10)}: [${pr.title} #${pr.number}](${pr.url})`),
      ...repo.issues.map(issue => `- Issue ${issue.date.slice(0, 10)}: [${issue.title} #${issue.number}](${issue.url})`)
    ];

    return `### [${repo.name}](${repo.url})\n\n${repo.stars} stars${standing}${repo.description ? `. ${repo.description}` : ''}\n\n${lines.join('\n')}`;
  });

  const totals = activity
    ? `${activity.totals.pullRequests} merged pull requests and ${activity.totals.issues} issues across ${activity.totals.repositories} repositories, read from GitHub on ${activity.fetchedAt.slice(0, 10)}.`
    : '';

  return {
    live: !!activity,
    page: document({
      path: '/open-source',
      title: 'Open source',
      description: liveSeo['open-source'].description
    }, [
      totals,
      '## Maintainer roles',
      curated.filter(item => item.kind === 'maintainer').map(entry).join('\n\n'),
      '## Projects I started',
      curated.filter(item => item.kind === 'created').map(entry).join('\n\n'),
      '## Discussions and other contributions',
      curated.filter(item => item.kind === 'discussion' || item.kind === 'contributor').map(entry).join('\n\n'),
      repos.length ? '## Pull requests and issues by repository' : '',
      repos.join('\n\n')
    ])
  };
}

async function snippets (event: H3Event) {
  const list = await event.$fetch<Snippet[]>('/api/snippets').catch(() => null);

  return {
    live: !!list,
    page: document({
      path: '/snippets',
      title: 'Snippets',
      description: liveSeo.snippets.description
    }, [
      (list ?? []).map(gist => link(gist.title, gist.url, `${gist.kind}; files: ${gist.files.join(', ')}; updated ${gist.updatedAt.slice(0, 10)}`)).join('\n')
    ])
  };
}

/**
 * The Markdown version of a page, or `null` when there is no such page. Pages
 * that read GitHub report `live: false` when GitHub failed, so the caller can
 * answer with a 503 and keep the last good copy cached.
 */
export async function pageMarkdown (event: H3Event, path: string): Promise<{ page: MarkdownPage; live: boolean } | null> {
  const done = (page: MarkdownPage | null) => page && { page, live: true };

  switch (path) {
    case '/': return done(await home(event));
    case '/about': return done(await about(event));
    case '/projects': return done(await projects(event));
    case '/apps': return done(await apps(event));
    case '/articles': return done(await articles(event));
    case '/learn': return done(await learn(event));
    case '/learn/vue': return done(await vuePath(event));
    case '/learn/design-patterns': return done(await designPatterns(event));
    case '/tools': return done(await tools(event));
    case '/uses': return done(await uses(event));
    case '/brand': return done(brand());
    case '/open-source': return openSource(event);
    case '/snippets': return snippets(event);
  }

  if (path.startsWith('/projects/')) {
    return done(await project(event, path));
  }

  if (path.startsWith('/apps/')) {
    return done(await appPage(event, path));
  }

  if (path.startsWith('/articles/')) {
    return done(await article(event, path));
  }

  if (path.startsWith('/learn/design-patterns/')) {
    return done(await designPattern(event, path));
  }

  return null;
}

/** Project, app, article and design pattern pages, for `llms.txt` and `llms-full.txt`. */
export async function contentPages (event: H3Event) {
  const [list, appList, posts, patterns] = await Promise.all([
    projectsWithPages(event),
    appsWithPages(event),
    queryCollection(event, 'articles').select('path', 'title', 'description', 'date').order('date', 'DESC').all(),
    queryCollection(event, 'patterns').select('path', 'title', 'summary', 'order').order('order', 'ASC').all()
  ]);

  return {
    projects: list.filter(item => item.page).map(item => ({ path: item.page!, title: item.title, description: item.description })),
    apps: appList.filter(item => item.page).map(item => ({ path: item.page!, title: item.name, description: item.description })),
    articles: posts.map(post => ({ path: post.path, title: post.title, description: post.description })),
    patterns: patterns.map(pattern => ({ path: pattern.path, title: `${pattern.title} pattern`, description: pattern.summary }))
  };
}
