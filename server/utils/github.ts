/**
 * A `$fetch` client for the GitHub REST API, set up from `runtimeConfig.github`.
 * The token is optional: without one GitHub allows 60 requests an hour per IP.
 */
export function useGitHub () {
  const { github } = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: github.apiBase,
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'haythamasalama.me',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(github.token ? { Authorization: `Bearer ${github.token}` } : {})
    }
  });

  return { api, username: github.username };
}
