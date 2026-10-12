import type { Mark } from '#shared/types/mark';

/**
 * Open-source activity for the Home teaser and /open-source: live pull requests
 * and issues from GitHub (`/api/open-source`), plus the context kept in
 * `content/contributions` (roles, projects I contributed to, discussions,
 * projects I started).
 */
export async function useOpenSource () {
  // Read before awaiting: the Nuxt context is gone afterwards.
  const event = useRequestEvent();

  const [{ data: activity }, { data: curated }] = await Promise.all([
    useFetch<OpenSourceActivity>('/api/open-source', { key: 'open-source' }),
    useAsyncData('contributions', () => queryCollection('contributions').order('order', 'ASC').all())
  ]);

  // The page still renders without GitHub, but as a 503: Vercel then keeps
  // serving the last good copy and retries, so an outage is never cached.
  if (import.meta.server && event && !activity.value) {
    setResponseStatus(event, 503);
  }

  const repos = computed(() => activity.value?.repos ?? []);
  const findRepo = (name: string) => repos.value.find(repo => repo.name.toLowerCase() === name.toLowerCase());

  /** Projects I help maintain, with their live numbers when GitHub answered. */
  const maintained = computed(() => (curated.value ?? [])
    .filter(entry => entry.kind === 'maintainer')
    .map(entry => ({ ...entry, github: findRepo(entry.repo) })));

  const contributors = computed(() => (curated.value ?? []).filter(entry => entry.kind === 'contributor'));
  const discussions = computed(() => (curated.value ?? []).filter(entry => entry.kind === 'discussion'));
  const created = computed(() => (curated.value ?? []).filter(entry => entry.kind === 'created'));

  /** The projects named under "Contributed to" at the top of /open-source. */
  const featured = computed(() => (curated.value ?? []).filter(entry => entry.featured));

  const markOf = (entry?: { icon?: string; avatar?: string }, avatar?: string): Mark => {
    if (entry?.icon) {
      return { icon: entry.icon };
    }

    const image = entry?.avatar ?? avatar;

    return image ? { image } : { icon: 'lucide:git-pull-request' };
  };

  /**
   * Every project I've sent pull requests to, except the ones I maintain,
   * biggest first. When GitHub is down, the pinned ones still show, with bare
   * pull request numbers.
   */
  const projects = computed(() => {
    const maintainedNames = maintained.value.map(entry => entry.repo.toLowerCase());
    const entryOf = (name: string) => contributors.value.find(entry => entry.repo.toLowerCase() === name.toLowerCase());

    if (!activity.value) {
      return contributors.value.map(entry => ({
        id: slugify(entry.repo),
        repo: entry.repo,
        name: entry.name ?? entry.repo,
        url: entry.url,
        description: entry.description ?? null,
        mark: markOf(entry),
        stars: undefined as number | undefined,
        pullRequests: (entry.pullRequests ?? []).map((number): OpenSourceItem => ({
          number,
          title: '',
          url: `https://github.com/${entry.repo}/pull/${number}`,
          date: ''
        })),
        allUrl: entry.url
      }));
    }

    const author = encodeURIComponent(`is:pr author:${activity.value.username}`);

    return repos.value
      .filter(repo => !maintainedNames.includes(repo.name.toLowerCase())
        && (repo.pullRequests.length || repo.otherPullRequests.length))
      .map((repo) => {
        const entry = entryOf(repo.name);

        return {
          id: slugify(repo.name),
          repo: repo.name,
          name: entry?.name ?? repo.name.split('/')[1]!,
          url: entry?.url ?? repo.url,
          description: entry?.description ?? repo.description,
          mark: markOf(entry, repo.avatar),
          stars: repo.stars as number | undefined,
          pullRequests: [...repo.pullRequests, ...repo.otherPullRequests],
          allUrl: `${repo.url}/pulls?q=${author}`
        };
      })
      .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0));
  });

  /** Stars across every project where a pull request of mine was merged. */
  const reach = computed(() => repos.value
    .filter(repo => repo.pullRequests.length)
    .reduce((sum, repo) => sum + repo.stars, 0));

  /** Repositories I opened issues in, the most first. */
  const issueRepos = computed(() => repos.value
    .filter(repo => repo.issues.length)
    .sort((a, b) => b.issues.length - a.issues.length || b.stars - a.stars));

  /** The short list on the home page: maintained projects, my busiest repositories, then my own. */
  const highlights = computed(() => {
    const maintainedNames = maintained.value.map(entry => entry.repo.toLowerCase());

    return [
      ...maintained.value.map(entry => ({
        key: entry.id,
        name: entry.repo,
        avatar: entry.avatar,
        icon: entry.icon,
        url: entry.github?.pullRequestsUrl ?? entry.url,
        // The role says how long, e.g. "Maintainer · 2 months".
        note: [entry.role ?? 'Maintainer', entry.github?.rank && `#${entry.github.rank} contributor`].filter(Boolean).join(' · ')
      })),
      // Live: my busiest repositories. Without GitHub: the featured ones, so the list never runs dry.
      ...(repos.value.length
        ? repos.value
            .filter(repo => !maintainedNames.includes(repo.name.toLowerCase()) && repo.pullRequests.length)
            .slice(0, 4)
            .map(repo => ({
              key: repo.name,
              name: repo.name,
              avatar: repo.avatar as string | undefined,
              icon: undefined as string | undefined,
              url: repo.pullRequestsUrl,
              note: plural(repo.pullRequests.length, 'pull request')
            }))
        : contributors.value
            .filter(entry => entry.featured)
            .map(entry => ({
              key: entry.id,
              name: entry.repo,
              avatar: entry.avatar,
              icon: entry.icon,
              url: entry.url,
              note: 'Contributor'
            }))),
      ...created.value.map(entry => ({
        key: entry.id,
        name: entry.repo,
        avatar: entry.avatar,
        icon: entry.icon,
        url: entry.url,
        note: 'Creator'
      }))
    ];
  });

  /** One line for the home page: the role first, then the projects I've sent pull requests to. */
  const summary = computed(() => {
    const lead = maintained.value[0];
    const rank = lead?.github?.rank;
    const others = contributors.value.filter(entry => entry.featured).map(entry => entry.name ?? entry.repo);
    const role = lead && `On the ${lead.name ?? lead.repo} team${rank ? ` as its #${rank} contributor` : ''}`;
    const list = others.length > 1 ? `${others.slice(0, -1).join(', ')} and ${others.at(-1)}` : others[0];

    if (role && list) {
      return `${role}, with pull requests to ${list}.`;
    }

    return role ? `${role}.` : list ? `Pull requests to ${list}.` : '';
  });

  return {
    live: computed(() => Boolean(activity.value)),
    activity,
    repos,
    findRepo,
    maintained,
    featured,
    projects,
    reach,
    issueRepos,
    discussions,
    created,
    highlights,
    summary
  };
}
