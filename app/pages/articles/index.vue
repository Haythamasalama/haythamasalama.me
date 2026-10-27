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
        <NuxtLink
          v-for="guide in guides"
          :key="guide.to"
          :to="guide.to"
          class="group flex flex-col gap-3 rounded-2xl border border-line bg-raised p-5 transition-colors hover:border-chip"
        >
          <LogoTile :mark="{ icon: guide.icon }" :size="40" />
          <span class="text-[17px] font-semibold tracking-[-0.01em]">{{ guide.title }}</span>
          <span class="text-sm leading-[1.6] text-muted">{{ guide.text }}</span>
          <span class="mt-auto flex items-center justify-between pt-1 font-mono text-xs text-faint">
            {{ guide.meta }}
            <span class="text-muted transition-colors group-hover:text-fg" aria-hidden="true">→</span>
          </span>
        </NuxtLink>
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
      <div class="flex flex-col">
        <NuxtLink
          v-for="article in group.articles"
          :key="article.path"
          :to="article.path"
          class="-mx-3 flex items-start gap-3.5 rounded-[10px] px-3 py-3.5 transition-colors hover:bg-surface"
        >
          <LogoTile :mark="{ icon: article.icon }" :size="36" />
          <span class="flex min-w-0 flex-auto flex-col gap-1.5">
            <span class="text-base leading-[1.45] font-medium">{{ article.title }}</span>
            <span class="text-sm leading-relaxed text-muted">{{ article.description }}</span>
            <span class="flex flex-wrap gap-x-3.5 gap-y-1 font-mono text-xs text-faint">
              <time :datetime="article.date">{{ formatDay(article.date) }}</time>
              <span>{{ article.category }}</span>
              <span>{{ article.readingTime }}</span>
            </span>
          </span>
        </NuxtLink>
      </div>
    </section>

    <section class="pt-10">
      <p class="flex max-w-none items-center gap-2.5 border-t border-line pt-6 text-[15px] leading-[1.7] text-muted">
        <Icon name="simple-icons:medium" class="size-4 shrink-0 text-mark" />
        <span>
          I also write on <NuxtLink to="https://medium.com/@haythamasalama" class="link-underline">Medium ↗</NuxtLink>,
          and keep reusable code on <NuxtLink to="/snippets" class="link-underline">Snippets</NuxtLink>.
        </span>
      </p>
    </section>
  </div>
</template>
