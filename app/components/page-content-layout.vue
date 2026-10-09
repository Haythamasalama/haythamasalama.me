<script lang="ts" setup>
  import type { ArticlesCollectionItem, ProjectsCollectionItem } from '@nuxt/content';

  const props = defineProps<{
    collection: 'articles' | 'projects';
  }>();

  const route = useRoute();
  const app = useAppConfig();

  const { data: doc } = await useAsyncData(
    () => `page-${route.path}`,
    () => queryCollection(props.collection).path(route.path).first()
  );

  const { data: relatedContent } = await useAsyncData(
    () => `related-${route.path}`,
    () => queryCollection(props.collection)
      .where('path', '<>', route.path)
      .limit(6)
      .all()
  );

  const relatedTitle = computed(() => (props.collection === 'projects' ? 'Related Projects' : 'Related Articles'));

  type PageItem = ArticlesCollectionItem | ProjectsCollectionItem;

  const isArticle = (item: PageItem): item is ArticlesCollectionItem => item.path.startsWith('/articles/');

  const displayDate = (item: PageItem) => (isArticle(item) ? item.date : `${item.startAt} - ${item.endAt}`);

  const page = doc.value;

  if (page) {
    const { title, description } = page;
    const article = isArticle(page) ? page : undefined;

    useSeoMeta({
      title,
      description,
      ogTitle: `${title} | Haytham Salama`,
      ogDescription: description,
      ogType: article ? 'article' : 'website',
      articlePublishedTime: article?.date
    });

    if (article) {
      useHead({
        script: [{
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': title,
            'description': description,
            'datePublished': article.date,
            'url': `${app.url}${route.path}`,
            'author': { '@type': 'Person', 'name': app.author.name, 'url': app.url }
          }).replace(/</g, '\\u003c')
        }]
      });
    }
  }
  else {
    // Keep the friendly "not found" card, but tell crawlers the page does not exist.
    const event = useRequestEvent();

    if (event) {
      setResponseStatus(event, 404);
    }

    useSeoMeta({ robots: 'noindex' });
  }
</script>

<template>
  <div v-if="doc">
    <HeaderTitle :title="doc.title" />

    <HeaderInfo class="my-10" :post="isArticle(doc) ? doc : {}" />

    <div class="text-white whitespace-pre-line mt-8">
      <ContentRenderer :value="doc" class="prose max-w-none prose-primary" />
    </div>

    <SubTitle class="mt-8">
      {{ relatedTitle }}
    </SubTitle>

    <div v-if="relatedContent && relatedContent.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-4">
      <Card
        v-for="content in relatedContent"
        :key="content.path"
        :to="content.path"
        class="h-full"
        :title="content.title"
        :date="displayDate(content)"
      />
    </div>
    <div v-else>
      <Card title="No related content found" />
    </div>
  </div>
  <div v-else>
    <Card title="Content not found" />
  </div>
</template>
