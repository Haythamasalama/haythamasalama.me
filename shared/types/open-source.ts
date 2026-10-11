/** A pull request or an opened issue. */
export interface OpenSourceItem {
  number: number;
  title: string;
  url: string;
  /** Merged date for merged pull requests, opened date for everything else. */
  date: string;
  /** Only on pull requests GitHub doesn't count as merged. */
  state?: 'open' | 'closed';
}

/** Everything I have done in one repository, straight from GitHub. */
export interface OpenSourceRepo {
  /** `owner/name` */
  name: string;
  url: string;
  avatar: string;
  description: string | null;
  stars: number;
  /** Merged pull requests, newest first. */
  pullRequests: OpenSourceItem[];
  /**
   * Pull requests pinned in `content/contributions` that aren't merged: still
   * open, or closed by maintainers who landed the change another way.
   */
  otherPullRequests: OpenSourceItem[];
  /** Issues I opened, newest first. */
  issues: OpenSourceItem[];
  /** My merged pull requests and issues in this repository on github.com. */
  pullRequestsUrl: string;
  issuesUrl: string;
  /**
   * Commits on the default branch and my place among human contributors, as on
   * the repository's contributors graph (and the Nuxt UI team page). Only looked
   * up where I have a few merged pull requests.
   */
  commits?: number;
  rank?: number;
  /** Latest merged pull request or issue. */
  lastActive: string;
}

export interface OpenSourceActivity {
  username: string;
  repos: OpenSourceRepo[];
  totals: {
    pullRequests: number;
    issues: number;
    repositories: number;
  };
  /** When this was read from GitHub. */
  fetchedAt: string;
}
