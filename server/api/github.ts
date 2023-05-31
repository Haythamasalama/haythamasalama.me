export default defineEventHandler((event) => {
  const query = `{
    viewer {
      repositoriesContributedTo(first: 9 {after} orderBy: {field: UPDATED_AT, direction: DESC} contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        nodes {
          nameWithOwner
          description
          url
          owner {
            avatarUrl
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }`;

  const endCursorQuery = getQuery(event)?.endCursor || '' ;

  return $fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${useRuntimeConfig().githubToken}`
    },
    body: {
      query: endCursorQuery ? query.replace('{after}', `after: "${endCursorQuery}"`) : query.replace('{after}', '')
    }
  });
});
