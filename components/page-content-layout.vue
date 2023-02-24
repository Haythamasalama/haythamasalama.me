<script lang="ts" setup>
  const route = useRoute();

  defineProps<{
    notFoundText?: string;
  }>();


  const linkSlug = computed(() => {
    return route.path
      .split('/')
      .filter(item => item !== route.params.slug)
      .join('/');
  });
</script>

<template>
  <ContentDoc v-slot="{ doc }">
    <HeaderTitle :title="doc.title" />

    <HeaderInfo class="my-10" :post="doc" />

    <div class="text-white whitespace-pre-line mt-8">
      <ContentRenderer :value="doc" class="prose prose-md max-w-none mx-auto-prose prose-primary" />
    </div>

    <SubTitle class="mt-8">
      Related Articles
    </SubTitle>

    <ContentList :path="linkSlug">
      <template #default="{ list }">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-4">
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
  </ContentDoc>
</template>
