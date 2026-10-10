/**
 * My open-source activity on other people's projects, read from GitHub: merged
 * pull requests and opened issues grouped by repository, with stars and, where
 * I have a few merged pull requests, my rank among the repository's
 * contributors. Cached for six hours and refreshed in the background.
 */

interface SearchItem {
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  repository_url: string;
  pull_request?: { merged_at: string | null };
}

interface SearchResult {
  total_count: number;
  items: SearchItem[];
}

interface Repository {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  owner: { avatar_url: string };
}

interface Contributor {
  login: string;
  type: string;
  contributions: number;
}

type GitHub = ReturnType<typeof useGitHub>['api'];

/** Rank only where it means something: a few merged pull requests, not a one-off fix. */
const RANKED_FROM = 3;

/** Search results come 100 per page; three pages is far more than enough here. */
async function search (api: GitHub, q: string): Promise<SearchItem[]> {
  const items: SearchItem[] = [];

  for (let page = 1; page <= 3; page++) {
    const result = await api<SearchResult>('/search/issues', {
      query: { q, per_page: 100, page, sort: 'created', order: 'desc' }
    });

    items.push(...result.items);

    if (result.items.length < 100 || items.length >= result.total_count) {
      break;
    }
  }

  return items;
}

/** My place among human contributors (bots skipped), looking at the top 300 at most. */
async function contributorRank (api: GitHub, repo: string, username: string) {
  let rank = 0;

  for (let page = 1; page <= 3; page++) {
    const people = await api<Contributor[]>(`/repos/${repo}/contributors`, { query: { per_page: 100, page } });

    for (const person of people ?? []) {
      if (person.type === 'Bot' || person.login.endsWith('[bot]')) {
        continue;
      }

      rank++;

      if (person.login.toLowerCase() === username.toLowerCase()) {
        return { rank, commits: person.contributions };
      }
    }

    if (!people || people.length < 100) {
      break;
    }
  }

  return {};
}

const repoOf = (item: SearchItem) => item.repository_url.split('/repos/')[1]!;

const toItem = (item: SearchItem): OpenSourceItem => ({
  number: item.number,
  title: item.title,
  url: item.html_url,
  date: item.pull_request?.merged_at ?? item.created_at
});

const newestFirst = (a: OpenSourceItem, b: OpenSourceItem) => b.date.localeCompare(a.date);

export default defineCachedEventHandler(async (): Promise<OpenSourceActivity> => {
  const { api, username } = useGitHub();
  const { github } = useRuntimeConfig();

  // Only other people's projects: not my own account, not my own organisations.
  const scope = [`author:${username}`, `-user:${username}`, ...github.ownOrgs.map(org => `-org:${org}`)].join(' ');

  try {
    // Search has its own, stricter rate limit, so the two queries run one after the other.
    const pullRequests = await search(api, `${scope} type:pr is:merged`);
    const issues = await search(api, `${scope} type:issue`);

    const names = [...new Set([...pullRequests, ...issues].map(repoOf))];

    const repos = await Promise.all(names.map(async (name): Promise<OpenSourceRepo> => {
      const merged = pullRequests.filter(item => repoOf(item) === name).map(toItem).sort(newestFirst);
      const opened = issues.filter(item => repoOf(item) === name).map(toItem).sort(newestFirst);

      const [repo, standing] = await Promise.all([
        api<Repository>(`/repos/${name}`),
        merged.length >= RANKED_FROM
          ? contributorRank(api, name, username).catch(() => ({}))
          : {}
      ]);

      return {
        name: repo.full_name,
        url: repo.html_url,
        avatar: `${repo.owner.avatar_url}${repo.owner.avatar_url.includes('?') ? '&' : '?'}s=88`,
        description: repo.description,
        stars: repo.stargazers_count,
        pullRequests: merged,
        issues: opened,
        pullRequestsUrl: `${repo.html_url}/pulls?q=${encodeURIComponent(`is:pr is:merged author:${username}`)}`,
        issuesUrl: `${repo.html_url}/issues?q=${encodeURIComponent(`is:issue author:${username}`)}`,
        ...standing,
        lastActive: [...merged, ...opened].sort(newestFirst)[0]?.date ?? ''
      };
    }));

    // Most merged pull requests first, then issues, then the bigger project.
    repos.sort((a, b) => b.pullRequests.length - a.pullRequests.length
      || b.issues.length - a.issues.length
      || b.stars - a.stars);

    return {
      username,
      repos,
      totals: {
        pullRequests: pullRequests.length,
        issues: issues.length,
        repositories: repos.length
      },
      fetchedAt: new Date().toISOString()
    };
  }
  catch (error) {
    // Failures are never cached: the last good copy keeps being served.
    const reason = describeGitHubError(error);

    // Shows up in the Vercel function logs; /api/open-source returns it too.
    console.error('[github] Loading contributions failed:', reason);

    throw createError({ statusCode: 502, statusMessage: 'Could not load contributions from GitHub', data: reason, cause: error });
  }
}, {
  name: 'open-source',
  maxAge: 6 * 60 * 60,
  swr: true
});
