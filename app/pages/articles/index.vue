<script lang="ts" setup>
  definePageMeta({
    title: 'Articles'
  });

  const { data: articles } = await useAsyncData('articles', () =>
    queryCollection('articles')
      .order('date', 'DESC')
      .all()
  );
</script>

<template>
  <section class="mb-4">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mt-4">
      <Card
        v-for="article in articles"
        :key="article.path"
        :title="article.title"
        :description="article.description"
        :read-more="article.path"
        :date="article.date"
        :to="article.path"
        truncate
      />
    </div>
  </section>
</template>
