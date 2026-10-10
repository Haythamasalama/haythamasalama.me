import type { MinimarkTree } from 'minimark';

/** A public GitHub gist, ready to render on the Snippets page. */
export interface Snippet {
  id: string;
  title: string;
  /** The gist on github.com. */
  url: string;
  createdAt: string;
  updatedAt: string;
  /** Filter chip label: the language of the main file, or `Guides` for Markdown. */
  kind: string;
  /** Iconify name picked from the topic (Laravel, Vue, …) or the language. */
  icon: string;
  files: string[];
  /** True when the gist has a Markdown file: it renders as prose instead of a bare code block. */
  prose: boolean;
  /** More than about 30 lines: starts collapsed on the page. */
  long: boolean;
  /** Rendered Markdown in Nuxt Content's compact format, for `<ContentRenderer>`. */
  body: MinimarkTree;
}
