/** A merged pull request or an opened issue. */
export interface OpenSourceItem {
  number: number;
  title: string;
  url: string;
  /** Merged date for pull requests, opened date for issues. */
  date: string;
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
