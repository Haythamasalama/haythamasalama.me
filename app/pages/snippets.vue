<script lang="ts" setup>
  definePageMeta({
    title: 'Snippets'
  });

  type Gist = {
    description: string | null;
    created_at: string;
    html_url: string;
  };

  // Format on a fixed locale/time zone so the server and the client render the same text.
  const dateFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' });

  const { data: snippets } = await useAsyncData(
    'gists',
    async () => {
      const gists = await $fetch<Gist[]>('https://api.github.com/users/haythamasalama/gists');

      // Only keep what the page renders, so the full GitHub response is not serialized into the payload.
      return gists.map(gist => ({
        description: gist.description ?? '',
        date: dateFormatter.format(new Date(gist.created_at)),
        url: gist.html_url
      }));
    },
    {
      default: () => []
    }
  );
</script>

<template>
  <div v-if="snippets.length" class="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
    <Card
      v-for="snippet in snippets"
      :key="snippet.url"
      :to="snippet.url"
      target="_blank"
      class="h-full"
      :title="snippet.description"
      :date="snippet.date"
    />
  </div>
  <div v-else>
    <Card title="Snippets are unavailable right now, check them on GitHub Gist" to="https://gist.github.com/haythamasalama" target="_blank" />
  </div>
</template>
