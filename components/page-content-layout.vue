<script lang="ts" setup>
  const route = useRoute();

  defineProps<{
    notFoundText?: string;
  }>();

  const collectionName = computed<'blog' | 'projects' | 'articles'>(() => {
    const segments = route.path.split('/').filter(Boolean);

    return segments[0] as 'blog' | 'projects' | 'articles';
  });

  const { data: doc } = await useAsyncData(route.path, () => {
    return queryCollection(collectionName.value).path(route.path).first();
  });

  const { data: relatedContent } = await useAsyncData(
    `related-${collectionName.value}`,
    () => queryCollection(collectionName.value)
      .where('path', '<>', route.path)
      .limit(6)
      .all()
  );
</script>

<template>
  <div v-if="doc">
    <HeaderTitle :title="doc.title" />

    <HeaderInfo class="my-10" :post="doc" />

    <div class="text-white whitespace-pre-line mt-8">
      <ContentRenderer :value="doc" class="prose prose-md max-w-none mx-auto-prose prose-primary" />
    </div>

    <SubTitle class="mt-8">
      Related Articles
    </SubTitle>

    <div v-if="relatedContent && relatedContent.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-4">
      <Card
        v-for="content in relatedContent"
        :key="content.path"
        :to="content.path"
        class="h-full"
        :title="content.title"
        :date="content.meta.date || `${content.meta.startAt} - ${content.meta.endAt}`"
      />
    </div>
    <div v-else>
      <Card :title="notFoundText || 'No related content found'" />
    </div>
  </div>
  <div v-else>
    <Card :title="notFoundText || 'Content not found'" />
  </div>
</template>
