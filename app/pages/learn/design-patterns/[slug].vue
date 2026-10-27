<script setup lang="ts">
  import { patternGroups } from '#shared/pattern-groups';

  definePageMeta({ wide: true });

  const route = useRoute();
  const path = route.path.replace(/\/$/, '');

  const { data: pattern } = await useAsyncData(`pattern:${path}`, () => queryCollection('patterns').path(path).first());

  if (!pattern.value) {
    throw createError({ statusCode: 404, statusMessage: 'Pattern not found', fatal: true });
  }

  // The other patterns of the same group, for "More … patterns" and the next one to read.
  const { data: siblings } = await useAsyncData(`pattern-group:${path}`, () =>
    queryCollection('patterns')
      .where('group', '=', pattern.value!.group)
      .select('path', 'title', 'summary', 'order')
      .order('order', 'ASC')
      .all()
  );

  usePageSeo({
    title: `${pattern.value.title} pattern`,
    description: pattern.value.description,
    type: 'article',
    eyebrow: `Design pattern · ${pattern.value.group}`,
    entity: {
      '@type': 'LearningResource',
      'name': `${pattern.value.title} pattern`,
      'description': pattern.value.description,
      'learningResourceType': 'Tutorial',
      'teaches': `The ${pattern.value.title} design pattern`,
      'programmingLanguage': 'Java',
      'isAccessibleForFree': true,
      'author': { '@id': useSchemaIds().person },
      'sameAs': pattern.value.source
    }
  });

  const group = computed(() => patternGroups.find(item => item.name === pattern.value?.group));
  const others = computed(() => (siblings.value ?? []).filter(item => item.path !== path));
  const next = computed(() => {
    const list = siblings.value ?? [];
    const index = list.findIndex(item => item.path === path);

    return list[index + 1];
  });
</script>

<template>
  <article v-if="pattern">
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/learn/design-patterns" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Design patterns
      </NuxtLink>
      <h1 class="mt-5 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[36px]">
        {{ pattern.title }}
      </h1>
      <p class="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-soft md:text-lg">
        {{ pattern.summary }}
      </p>
      <ul class="mt-6 flex flex-wrap items-center gap-2" aria-label="About this pattern">
        <li>
          <NuxtLink
            :to="`/learn/design-patterns#${group?.id}`"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon name="lucide:blocks" class="size-3.5 text-mark" aria-hidden="true" />
            {{ pattern.group }}
          </NuxtLink>
        </li>
        <li class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted">
          <Icon name="lucide:lightbulb" class="size-3.5 text-mark" aria-hidden="true" />
          {{ pattern.example }}
        </li>
        <li>
          <NuxtLink
            :to="pattern.source"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon name="simple-icons:github" class="size-3.5 text-mark" aria-hidden="true" />
            Java code
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </li>
      </ul>
    </header>

    <ReadingLayout :value="pattern" />

    <footer class="mt-20 border-t border-line pt-10">
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="group mb-10 flex flex-col gap-1 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
      >
        <span class="eyebrow">Next</span>
        <span class="flex items-center justify-between gap-3 text-[17px] font-medium">
          {{ next.title }}
          <span class="text-muted transition-colors group-hover:text-fg" aria-hidden="true">→</span>
        </span>
        <span class="text-[13px] leading-[1.55] text-muted">{{ next.summary }}</span>
      </NuxtLink>
      <SectionTitle class="mb-2">
        More {{ pattern.group.toLowerCase() }} patterns
      </SectionTitle>
      <ul class="flex flex-wrap gap-x-5">
        <li v-for="item in others" :key="item.path">
          <NuxtLink :to="item.path" class="link-muted inline-flex min-h-11 items-center text-sm">
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
      <GoLink to="/learn/design-patterns" class="mt-2">
        All design patterns
      </GoLink>
    </footer>
  </article>
</template>
