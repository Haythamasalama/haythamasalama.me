<script lang="ts" setup>
  definePageMeta({
    title: 'Articles'
  });

  const route = useRoute();

  const category = computed(() => String(route.params.category));
</script>

<template>
  <IndexContentLayout
    collection="articles"
    :category="category"
    not-found-text="No articles found"
  />
</template>
