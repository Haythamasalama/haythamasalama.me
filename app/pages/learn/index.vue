<script setup lang="ts">
  const { data } = await useAsyncData('learn', async () => {
    const [path, patterns, articles] = await Promise.all([
      queryCollection('vuePath').first(),
      queryCollection('patterns').select('group').all(),
      queryCollection('articles').select('path', 'title', 'description', 'date').order('date', 'DESC').limit(3).all()
    ]);

    return {
      stages: path?.steps.filter(step => !step.project).length ?? 0,
      patterns: patterns.length,
      groups: new Set(patterns.map(pattern => pattern.group)).size,
      articles
    };
  });

  usePageSeo({
    title: 'Learn',
    description: 'Learning material by Haytham A. Salama: a step-by-step path to Vue.js, design patterns explained with Java examples, and practical articles.',
    schema: 'CollectionPage'
  });

  const tracks = computed(() => [
    {
      to: '/learn/vue',
      icon: 'lucide:route',
      title: 'Vue.js path',
      text: 'What to know first, then Vue one stage at a time, from your first component to Vue Router and Pinia.',
      meta: `${data.value?.stages} stages · 2 projects`
    },
    {
      to: '/learn/design-patterns',
      icon: 'lucide:blocks',
      title: 'Design patterns',
      text: 'The classic patterns in plain words: the idea, when to use it, its trade-offs and a small Java example.',
      meta: `${data.value?.patterns} patterns · ${data.value?.groups} groups`
    }
  ]);
</script>

<template>
  <div>
    <PageHeader title="Learn">
      <p>Guides from my GitHub, rewritten as pages you can follow: a path to Vue.js and the classic design patterns.</p>
    </PageHeader>

    <section aria-labelledby="paths" class="pt-12">
      <SectionTitle id="paths" class="mb-4">
        Paths
      </SectionTitle>
      <div class="grid gap-3 sm:grid-cols-2">
        <NuxtLink
          v-for="track in tracks"
          :key="track.to"
          :to="track.to"
          class="group flex flex-col gap-3 rounded-2xl border border-line bg-raised p-5 transition-colors hover:border-chip"
        >
          <LogoTile :mark="{ icon: track.icon }" :size="40" />
          <span class="text-[17px] font-semibold tracking-[-0.01em]">{{ track.title }}</span>
          <span class="text-sm leading-[1.6] text-muted">{{ track.text }}</span>
          <span class="mt-auto flex items-center justify-between pt-1 font-mono text-xs text-faint">
            {{ track.meta }}
            <span class="text-muted transition-colors group-hover:text-fg" aria-hidden="true">→</span>
          </span>
        </NuxtLink>
      </div>
    </section>

    <section v-if="data?.articles.length" aria-labelledby="writing" class="pt-14 md:pt-[72px]">
      <SectionTitle id="writing" class="mb-2">
        From the blog
      </SectionTitle>
      <ul class="flex flex-col">
        <li v-for="article in data.articles" :key="article.path" class="py-3">
          <NuxtLink :to="article.path" class="link text-[15px] font-medium">
            {{ article.title }}
          </NuxtLink>
          <p class="mt-1 text-sm leading-[1.6] text-muted">
            {{ article.description }}
          </p>
        </li>
      </ul>
      <GoLink to="/articles" class="mt-1">
        All articles
      </GoLink>
    </section>
  </div>
</template>
