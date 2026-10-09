<script lang="ts" setup>
  const props = defineProps<{
    collection?: 'articles';
    category?: string;
    notFoundText?: string;
  }>();

  const { data: list } = await useAsyncData(
    () => `content-list-${props.collection ?? 'none'}-${props.category ?? 'all'}`,
    () => {
      if (!props.collection) {
        return Promise.resolve([]);
      }

      const query = queryCollection(props.collection);

      if (props.category) {
        query.where('path', 'LIKE', `/${props.collection}/${props.category}/%`);
      }

      return query.order('date', 'DESC').all();
    }
  );
</script>

<template>
  <div v-if="list && list.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
    <Card
      v-for="content in list"
      :key="content.path"
      :to="content.path"
      class="h-full"
      :title="content.title"
      :date="content.date"
    />
  </div>
  <div v-else>
    <Card :title="notFoundText || 'No content found'" />
  </div>
</template>
