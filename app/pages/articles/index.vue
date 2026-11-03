<script setup lang="ts">
  const { data: articles } = await useAsyncData('articles', () =>
    queryCollection('articles')
      .select('path', 'title', 'description', 'date', 'category', 'icon', 'readingTime')
      .order('date', 'DESC')
      .all()
  );

  // The two guides under /learn, listed above the articles with their size.
  const { data: guideCounts } = await useAsyncData('guides', async () => {
    const [path, patterns] = await Promise.all([
      queryCollection('vuePath').first(),
      queryCollection('patterns').select('group').all()
    ]);

    return { stages: path?.steps.filter(step => !step.project).length ?? 0, patterns: patterns.length };
  });

  const guides = computed(() => [
    {
      to: '/learn/vue',
      icon: 'lucide:route',
      title: 'Vue.js path',
      text: 'What to know first, then Vue one stage at a time, from your first component to Vue Router and Pinia.',
      meta: `${guideCounts.value?.stages} stages · 2 projects`
    },
    {
      to: '/learn/design-patterns',
      icon: 'lucide:blocks',
      title: 'Design patterns',
      text: 'The classic patterns in plain words: the idea, when to use it, its trade-offs and a small Java example.',
      meta: `${guideCounts.value?.patterns} patterns with Java code`
    }
  ]);

  const { site } = useAppConfig();

  usePageSeo({
    title: 'Blog',
    description: 'Short, practical notes on Laravel, Vue and shipping software by Haytham A. Salama, plus guides to Vue.js and design patterns.',
    schema: 'CollectionPage',
    entity: {
      '@type': 'ItemList',
      'itemListElement': (articles.value ?? []).map((article, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': article.title,
        'url': `${site.url}${article.path}`
      }))
    }
  });

  const years = computed(() => {
    const list = articles.value ?? [];
    const unique = [...new Set(list.map(article => yearOf(article.date)))];

    return unique.map(year => ({ year, articles: list.filter(article => yearOf(article.date) === year) }));
  });
</script>

<template>
  <div>
    <PageHeader title="Blog">
      <p>Short, practical notes on Laravel, Vue and shipping software, mostly the things I wish I'd found sooner, and two longer guides.</p>
    </PageHeader>

    <section aria-labelledby="guides" class="pt-12">
      <SectionTitle id="guides" class="mb-4">
        Guides
      </SectionTitle>
      <div class="grid gap-3 sm:grid-cols-2">
        <ContentCard
          v-for="guide in guides"
          :key="guide.to"
          :to="guide.to"
          :mark="{ icon: guide.icon }"
          :title="guide.title"
          :meta="guide.meta"
        >
          {{ guide.text }}
        </ContentCard>
      </div>
    </section>

    <section
      v-for="group in years"
      :key="group.year"
      :aria-labelledby="`y${group.year}`"
      class="pt-14"
    >
      <h2 :id="`y${group.year}`" class="mb-2 font-mono text-xs font-medium tracking-[0.08em] text-faint">
        <AnchorLink :target="`y${group.year}`">
          {{ group.year }}
        </AnchorLink>
      </h2>
      <ul class="flex flex-col divide-y divide-line border-y border-line">
        <li v-for="article in group.articles" :key="article.path">
          <ItemRow :to="article.path" :mark="{ icon: article.icon }" :title="article.title">
            <template #meta>
              <time :datetime="article.date">{{ formatDay(article.date) }}</time> · {{ article.category }} · {{ article.readingTime }}
            </template>
            {{ article.description }}
          </ItemRow>
        </li>
      </ul>
    </section>

    <section class="pt-10">
      <p class="flex max-w-none items-center gap-2.5 text-[15px] leading-[1.7] text-muted">
        <Icon name="simple-icons:medium" class="size-4 shrink-0 text-mark" />
        <span>
          I also write on <NuxtLink to="https://medium.com/@haythamasalama" class="link-underline">Medium ↗</NuxtLink>,
          and keep reusable code on <NuxtLink to="/snippets" class="link-underline">Snippets</NuxtLink>.
        </span>
      </p>
    </section>
  </div>
</template>
