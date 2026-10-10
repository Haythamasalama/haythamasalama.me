/**
 * Open-source activity for the Home teaser and /open-source: live pull requests
 * and issues from GitHub (`/api/open-source`), plus the context kept in
 * `content/contributions` (roles, discussions, projects I started).
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

  const discussions = computed(() => (curated.value ?? []).filter(entry => entry.kind === 'discussion'));
  const created = computed(() => (curated.value ?? []).filter(entry => entry.kind === 'created'));

  /** The short list on the home page: maintained projects, my busiest repositories, then my own. */
  const highlights = computed(() => {
    const maintainedNames = maintained.value.map(entry => entry.repo.toLowerCase());

    return [
      ...maintained.value.map(entry => ({
        key: entry.id,
        name: entry.repo,
        avatar: entry.avatar,
        url: entry.github?.pullRequestsUrl ?? entry.url,
        note: entry.github?.rank ? `Maintainer · #${entry.github.rank} contributor` : 'Maintainer'
      })),
      ...repos.value
        .filter(repo => !maintainedNames.includes(repo.name.toLowerCase()) && repo.pullRequests.length)
        .slice(0, 4)
        .map(repo => ({
          key: repo.name,
          name: repo.name,
          avatar: repo.avatar,
          url: repo.pullRequestsUrl,
          note: plural(repo.pullRequests.length, 'pull request')
        })),
      ...created.value.map(entry => ({
        key: entry.id,
        name: entry.repo,
        avatar: entry.avatar,
        url: entry.url,
        note: 'Creator'
      }))
    ];
  });

  return {
    live: computed(() => Boolean(activity.value)),
    activity,
    repos,
    maintained,
    discussions,
    created,
    highlights
  };
}
