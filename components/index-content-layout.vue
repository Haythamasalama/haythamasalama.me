<script lang="ts" setup>
  const { path } = useRoute();

  defineProps<{
    notFoundText?: string;
  }>();

  const parentPath = computed(() => path.split('/').filter(path => path)[0]);

  const { data: navigation } = await useAsyncData(
    'navigation',
    () => fetchContentNavigation(queryContent(parentPath.value).sort({ name: -1 }).sort({ endAt: -1 }))
  );

  const nav = computed(() => {
    return {
      show: Boolean(navigation.value?.[0]?.children?.[0].children),
      children: navigation.value?.[0]?.children
    };
  });
</script>

<template>
  <NavSection v-if="nav.show" :menus="nav.children" />

  <ContentList :path="path">
    <template #default="{ list }">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
        <Card
          v-for="content in list"
          :key="content._path"
          :to="content._path"
          class="h-full"
          :title="content.title"
          :date="content.date || `${content.startAt} - ${content.endAt}`"
        />
      </div>
    </template>

    <template #not-found>
      <Card :title="notFoundText || 'No content found'" />
    </template>
  </ContentList>
</template>
