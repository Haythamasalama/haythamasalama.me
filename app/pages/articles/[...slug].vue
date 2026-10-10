<script setup lang="ts">
  const route = useRoute();

  const { data: article } = await useAsyncData(`article:${route.path}`, () =>
    queryCollection('articles').path(route.path).first()
  );

  if (!article.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true });
  }

  const { data: more } = await useAsyncData(`article-more:${route.path}`, () =>
    queryCollection('articles')
      .where('path', '<>', route.path)
      .select('path', 'title', 'date', 'icon')
      .order('date', 'DESC')
      .limit(3)
      .all()
  );

  const { site } = useAppConfig();

  usePageSeo({
    title: article.value.title,
    description: article.value.description,
    type: 'article'
  });

  useSeoMeta({
    articlePublishedTime: article.value.date,
    articleAuthor: [site.name],
    articleSection: article.value.category
  });

  useHead({
    script: [{
      type: 'application/ld+json',
      // Escape "<" so article text can never close the script tag.
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': article.value.title,
        'description': article.value.description,
        'datePublished': article.value.date,
        'url': `${site.url}${route.path}`,
        'image': `${site.url}/og.png`,
        'author': { '@type': 'Person', 'name': site.name, 'url': site.url }
      }).replace(/</g, '\\u003c')
    }]
  });
</script>

<template>
  <article v-if="article" class="max-w-[720px]">
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/articles" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Blog
      </NuxtLink>
      <h1 class="mt-4 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[32px]">
        {{ article.title }}
      </h1>
      <p class="mt-4 flex flex-wrap gap-x-3.5 gap-y-1 font-mono text-xs text-faint">
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
        <span>{{ article.category }}</span>
        <span>{{ article.readingTime }}</span>
      </p>
    </header>

    <ContentRenderer
      :value="article"
      class="prose-site prose mt-10 max-w-none text-[16px] leading-[1.75] prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-h2:text-xl prose-h3:text-lg prose-a:font-normal prose-a:underline-offset-4 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl prose-img:border prose-img:border-line"
    />

    <footer v-if="more?.length" class="mt-16 border-t border-line pt-8">
      <SectionTitle class="mb-3">
        More writing
      </SectionTitle>
      <div class="flex flex-col">
        <NuxtLink
          v-for="item in more"
          :key="item.path"
          :to="item.path"
          class="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
        >
          <Icon :name="item.icon" class="size-4 shrink-0 text-mark" />
          <span class="flex min-w-0 flex-auto flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span class="text-[15px]">{{ item.title }}</span>
            <time :datetime="item.date" class="font-mono text-xs text-faint">{{ formatMonth(item.date) }}</time>
          </span>
        </NuxtLink>
      </div>
      <GoLink to="/snippets" class="mt-1">
        Code snippets
      </GoLink>
    </footer>
  </article>
</template>
