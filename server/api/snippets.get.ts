import type { MDCElement, MDCNode, MDCRoot } from '@nuxtjs/mdc';
import { createShikiHighlighter, parseMarkdown } from '@nuxtjs/mdc/runtime';
import { fromHast } from 'minimark/hast';
import { codeThemeDark, codeThemeLight } from '#shared/code-theme';

/**
 * The Snippets page: every public gist of the configured GitHub user, rendered
 * to the same Markdown AST as articles. Cached for an hour and refreshed in the
 * background, so the page follows GitHub without a redeploy.
 */

interface GistFile {
  filename: string;
  raw_url: string;
}

interface Gist {
  id: string;
  html_url: string;
  description: string | null;
  public: boolean;
  created_at: string;
  updated_at: string;
  files: Record<string, GistFile>;
}

interface Language {
  /** Shiki grammar for the code fence. */
  shiki: string;
  label: string;
  icon: string;
}

/** File extension → grammar, filter label and fallback icon. Markdown files render as prose. */
const languages: Record<string, Language> = {
  json: { shiki: 'json', label: 'JSON', icon: 'simple-icons:json' },
  ts: { shiki: 'typescript', label: 'TypeScript', icon: 'simple-icons:typescript' },
  js: { shiki: 'javascript', label: 'JavaScript', icon: 'simple-icons:javascript' },
  mjs: { shiki: 'javascript', label: 'JavaScript', icon: 'simple-icons:javascript' },
  cjs: { shiki: 'javascript', label: 'JavaScript', icon: 'simple-icons:javascript' },
  php: { shiki: 'php', label: 'PHP', icon: 'simple-icons:php' },
  vue: { shiki: 'vue', label: 'Vue', icon: 'simple-icons:vuedotjs' },
  sh: { shiki: 'bash', label: 'Shell', icon: 'simple-icons:gnubash' },
  bash: { shiki: 'bash', label: 'Shell', icon: 'simple-icons:gnubash' },
  zsh: { shiki: 'bash', label: 'Shell', icon: 'simple-icons:gnubash' },
  yml: { shiki: 'yaml', label: 'YAML', icon: 'simple-icons:yaml' },
  yaml: { shiki: 'yaml', label: 'YAML', icon: 'simple-icons:yaml' },
  env: { shiki: 'dotenv', label: 'Env', icon: 'simple-icons:dotenv' },
  sql: { shiki: 'sql', label: 'SQL', icon: 'lucide:database' },
  py: { shiki: 'python', label: 'Python', icon: 'simple-icons:python' },
  css: { shiki: 'css', label: 'CSS', icon: 'simple-icons:css' },
  html: { shiki: 'html', label: 'HTML', icon: 'simple-icons:html5' },
  md: { shiki: 'markdown', label: 'Guides', icon: 'simple-icons:markdown' }
};

const plainText: Language = { shiki: 'text', label: 'Other', icon: 'lucide:file-code' };

/** A recognisable topic beats the language: a Laravel Pint config shows Laravel, not JSON. */
const topics: [RegExp, string][] = [
  [/laravel|illuminate|sanctum|\bpint\b/i, 'simple-icons:laravel'],
  [/prettier/i, 'simple-icons:prettier'],
  [/telegram/i, 'simple-icons:telegram'],
  [/\bnuxt/i, 'simple-icons:nuxt'],
  [/\bvue\b|vue-router/i, 'simple-icons:vuedotjs'],
  [/docker/i, 'simple-icons:docker']
];

/** Grammars load on first use, so the server bundle only parses what the gists need. */
const grammars = {
  bash: () => import('shiki/langs/bash.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  dotenv: () => import('shiki/langs/dotenv.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  ini: () => import('shiki/langs/ini.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  php: () => import('shiki/langs/php.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  vue: () => import('shiki/langs/vue.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs')
};

// Fences in Markdown gists use short names too (```sh, ```js), so map those as well.
const highlighter = createShikiHighlighter({
  themes: [codeThemeDark, codeThemeLight],
  bundledLangs: {
    ...grammars,
    sh: grammars.bash,
    shell: grammars.bash,
    zsh: grammars.bash,
    env: grammars.dotenv,
    js: grammars.javascript,
    md: grammars.markdown,
    py: grammars.python,
    ts: grammars.typescript,
    yml: grammars.yaml
  }
});

const extensionOf = (filename: string) => filename.split('.').pop()?.toLowerCase() ?? '';
const languageOf = (filename: string) => languages[extensionOf(filename)] ?? plainText;
const isMarkdown = (filename: string) => ['md', 'markdown'].includes(extensionOf(filename));

/** Drop emoji so headings like "📦 Batch processor" read cleanly as titles. */
const stripEmoji = (text: string) => text.replace(/[\p{Extended_Pictographic}️‍]/gu, '').replace(/\s+/g, ' ').trim();

/** Wrap a code file in a fence long enough to survive backticks inside it. */
function fence (filename: string, content: string): string {
  const longestRun = Math.max(0, ...[...content.matchAll(/`+/g)].map(match => match[0].length));
  const ticks = '`'.repeat(Math.max(3, longestRun + 1));

  return `${ticks}${languageOf(filename).shiki} [${filename}]\n${content.trimEnd()}\n${ticks}`;
}

/**
 * Card titles are h2, so headings inside a gist start at h3. Heading ids get the
 * gist id as a prefix so two gists with the same heading do not clash.
 */
function nestHeadings (body: MDCRoot, prefix: string): MDCRoot {
  const headings: MDCElement[] = [];
  const walk = (node: MDCNode) => {
    if (node.type !== 'element') {
      return;
    }

    if (/^h[1-6]$/.test(node.tag)) {
      headings.push(node);
    }

    node.children?.forEach(walk);
  };

  body.children.forEach(walk);

  const top = Math.min(...headings.map(heading => Number(heading.tag[1])));
  const shift = Math.max(0, 3 - top);

  for (const heading of headings) {
    heading.tag = `h${Math.min(6, Number(heading.tag[1]) + shift)}`;

    if (typeof heading.props?.id === 'string') {
      heading.props.id = `${prefix}-${heading.props.id}`;
    }
  }

  return body;
}

async function toSnippet (gist: Gist): Promise<Snippet> {
  const files = await Promise.all(Object.values(gist.files).map(async file => ({
    name: file.filename,
    content: await $fetch<string>(file.raw_url, { responseType: 'text' })
  })));

  const names = files.map(file => file.name);
  const prose = names.some(isMarkdown);
  const first = files[0]!;

  // GitHub appends " - filename" to many descriptions; the file name is shown separately.
  let title = names.reduce((text, name) => text.replace(` - ${name}`, ''), gist.description?.trim() ?? '');

  // Markdown gists open with their own heading, which makes the better title.
  const heading = isMarkdown(first.name) ? first.content.match(/^\s*#{1,3}\s+(.+?)\s*#*\s*(?:\n|$)/) : null;

  if (heading?.[1] && stripEmoji(heading[1])) {
    title = stripEmoji(heading[1]);
    first.content = first.content.slice(heading[0].length);
  }

  const markdown = files
    .map(file => isMarkdown(file.name) ? file.content.trim() : fence(file.name, file.content))
    .join('\n\n');

  const { body } = await parseMarkdown(markdown, {
    highlight: {
      highlighter,
      theme: { default: codeThemeDark.name!, light: codeThemeLight.name! }
    },
    toc: false
  });

  const searchable = [gist.description, ...names, markdown.slice(0, 2000)].join(' ');
  const language = prose ? languages.md! : languageOf(first.name);

  return {
    id: gist.id,
    title: title || first.name,
    url: gist.html_url,
    createdAt: gist.created_at,
    updatedAt: gist.updated_at,
    kind: language.label,
    icon: topics.find(([pattern]) => pattern.test(searchable))?.[1] ?? language.icon,
    files: names,
    prose,
    long: markdown.split('\n').length > 32,
    body: fromHast(nestHeadings(body, gist.id.slice(0, 7)))
  };
}

export default defineCachedEventHandler(async () => {
  const { github } = useRuntimeConfig();

  try {
    const gists = await $fetch<Gist[]>(`/users/${github.gistsUser}/gists`, {
      baseURL: github.apiBase,
      query: { per_page: 100 },
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'haythamasalama.me',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(github.token ? { Authorization: `Bearer ${github.token}` } : {})
      }
    });

    const snippets = await Promise.all(gists.filter(gist => gist.public).map(toSnippet));

    return snippets.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  catch (error) {
    // Usually GitHub's rate limit. Failures are never cached: the last good copy
    // keeps being served and the next request tries again.
    throw createError({ statusCode: 502, statusMessage: 'Could not load gists from GitHub', cause: error });
  }
}, {
  name: 'gists',
  maxAge: 60 * 60,
  swr: true
});
