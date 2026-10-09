<script lang="ts" setup>
  const { path } = useRoute();

  defineProps<{
    notFoundText?: string;
  }>();

  const parentPath = computed(() => path.split('/').filter(path => path)[0]);

  const collectionName = computed(() => {
    if (parentPath.value === 'articles') return 'articles';
    if (parentPath.value === 'projects') return 'projects';

    return parentPath.value;
  });

  const { data: list } = await useAsyncData(
    `content-${parentPath.value}`,
    () => queryCollection(collectionName.value).all()
  );

  const nav = computed(() => {
    return {
      show: false,
      children: []
    };
  });
</script>

<template>
  <NavSection v-if="nav.show" :menus="nav.children" />

  <div v-if="list && list.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
    <Card
      v-for="content in list"
      :key="content.path || content.path"
      :to="content.path || content.path"
      class="h-full"
      :title="content.title"
      :date="content.meta.date || `${content.meta.startAt} - ${content.meta.endAt}`"
    />
  </div>
  <div v-else>
    <Card :title="notFoundText || 'No content found'" />
  </div>
</template>
