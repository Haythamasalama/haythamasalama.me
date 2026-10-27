<script setup lang="ts">
  import { patternGroups } from '#shared/pattern-groups';

  const { data: patterns } = await useAsyncData('patterns', () =>
    queryCollection('patterns')
      .select('path', 'title', 'group', 'summary', 'example', 'order')
      .order('order', 'ASC')
      .all()
  );

  const { site } = useAppConfig();

  usePageSeo({
    title: 'Design patterns',
    description: 'The classic design patterns in plain words: creational, structural and behavioral, each with when to use it, its pros and cons, and a small Java example.',
    schema: 'CollectionPage',
    eyebrow: 'Learn',
    entity: {
      '@type': 'ItemList',
      'itemListElement': (patterns.value ?? []).map((pattern, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': pattern.title,
        'url': `${site.url}${pattern.path}`
      }))
    }
  });

  const groups = computed(() => patternGroups
    .map(group => ({ ...group, patterns: (patterns.value ?? []).filter(pattern => pattern.group === group.name) }))
    .filter(group => group.patterns.length));
</script>

<template>
  <div>
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/learn" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Learn
      </NuxtLink>
      <h1 class="mt-5 text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]">
        Design patterns
      </h1>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        Proven answers to problems that keep coming back in code. Each pattern has the idea in plain words, when to use
        it, its trade-offs and a small Java example you can run.
      </p>
      <div class="mt-4 flex flex-wrap gap-x-5">
        <a
          v-for="group in groups"
          :key="group.name"
          :href="`#${group.id}`"
          class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
        >
          {{ group.name }}
          <span class="font-mono text-[11.5px] text-faint">{{ group.patterns.length }}</span>
        </a>
        <NuxtLink
          to="https://github.com/Haythamasalama/designPattern"
          class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
        >
          Code on GitHub
          <Icon name="lucide:arrow-up-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </header>

    <section
      v-for="group in groups"
      :key="group.name"
      :aria-labelledby="group.id"
      class="pt-14"
    >
      <SectionTitle :id="group.id" class="mb-1">
        {{ group.name }}
      </SectionTitle>
      <p class="mb-4 text-sm text-muted">
        {{ group.description }}
      </p>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li v-for="pattern in group.patterns" :key="pattern.path">
          <NuxtLink
            :to="pattern.path"
            class="group flex h-full flex-col gap-1.5 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
          >
            <span class="flex items-center justify-between gap-3">
              <span class="text-[15px] font-medium">{{ pattern.title }}</span>
              <span class="text-muted transition-colors group-hover:text-fg" aria-hidden="true">→</span>
            </span>
            <span class="text-[13px] leading-[1.55] text-muted">{{ pattern.summary }}</span>
            <span class="mt-auto pt-1 font-mono text-[11.5px] text-faint">{{ pattern.example }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
