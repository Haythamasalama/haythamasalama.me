<script lang="ts" setup>
  definePageMeta({
    title: 'Snippets'
  });

  const { data: snippets } = await useAsyncData<{
    description: string;
    created_at: string;
    html_url: string;
  }[]>('gists', () => $fetch('https://api.github.com/users/haythamasalama/gists'));
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
    <Card
      v-for="(snippet, key) in snippets"
      :key="key"
      :to="snippet.html_url"
      target="_blank"
      class="h-full"
      :title="snippet.description"
      :date="new Date(snippet.created_at).toLocaleDateString()"
    />
  </div>
</template>
