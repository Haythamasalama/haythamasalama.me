<script setup lang="ts">
  import { patternGroups } from '#shared/pattern-groups';

  const { data: patterns } = await useAsyncData('patterns', () =>
    queryCollection('patterns')
      .select('path', 'title', 'group', 'icon', 'summary', 'example', 'order')
      .order('order', 'ASC')
      .all()
  );

  const { site } = useAppConfig();

  usePageSeo({
    title: 'Design patterns',
    description: 'The classic design patterns in plain words: creational, structural and behavioral, each with when to use it, its pros and cons, and a small Java example.',
    schema: 'CollectionPage',
    eyebrow: 'Guide',
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
      <NuxtLink to="/articles#guides" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Blog
      </NuxtLink>
      <div class="mt-5 flex items-center gap-4">
        <LogoTile :mark="{ icon: 'lucide:blocks' }" :size="52" />
        <h1 class="text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]">
          Design patterns
        </h1>
      </div>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        Proven answers to problems that keep coming back in code. Each pattern has the idea in plain words, when to use
        it, its trade-offs and a small Java example you can run.
      </p>
      <ul class="mt-6 flex flex-wrap items-center gap-2" aria-label="Groups">
        <li v-for="group in groups" :key="group.name">
          <a
            :href="`#${group.id}`"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon :name="group.icon" class="size-3.5 text-mark" aria-hidden="true" />
            {{ group.name }}
            <span class="text-faint">{{ group.patterns.length }}</span>
          </a>
        </li>
        <li>
          <NuxtLink
            to="https://github.com/Haythamasalama/designPattern"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon name="simple-icons:github" class="size-3.5 text-mark" aria-hidden="true" />
            Java code
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </li>
      </ul>
    </header>

    <section
      v-for="group in groups"
      :key="group.name"
      :aria-labelledby="group.id"
      class="pt-14"
    >
      <div class="mb-4 flex items-start gap-3">
        <Icon :name="group.icon" class="mt-px size-4 shrink-0 text-mark" aria-hidden="true" />
        <div class="flex flex-col gap-1">
          <SectionTitle :id="group.id">
            {{ group.name }} <span class="text-faint">· {{ group.patterns.length }}</span>
          </SectionTitle>
          <p class="text-sm text-muted">
            {{ group.description }}
          </p>
        </div>
      </div>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li v-for="pattern in group.patterns" :key="pattern.path">
          <NuxtLink
            :to="pattern.path"
            class="group flex h-full items-start gap-3.5 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
          >
            <LogoTile :mark="{ icon: pattern.icon }" :size="36" />
            <span class="flex min-w-0 flex-auto flex-col gap-1">
              <span class="flex items-center justify-between gap-3">
                <span class="text-[15px] font-medium">{{ pattern.title }}</span>
                <span class="text-muted transition-colors group-hover:text-fg" aria-hidden="true">→</span>
              </span>
              <span class="text-[13px] leading-[1.55] text-muted">{{ pattern.summary }}</span>
              <span class="mt-1 inline-flex items-start gap-1.5 font-mono text-[11.5px] leading-[1.5] text-faint">
                <Icon name="lucide:lightbulb" class="mt-px size-3 shrink-0" aria-hidden="true" />
                {{ pattern.example }}
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
