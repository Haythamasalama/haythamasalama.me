<script setup lang="ts">
  useSeoMeta({
    title: 'Open source',
    description: 'Pull requests, issues and discussions Haytham A. Salama has contributed to open-source projects like Nuxt UI and Laravel.'
  });

  const { data: contributions } = await useAsyncData('open-source', () =>
    queryCollection('contributions').order('order', 'ASC').all()
  );

  const groups = [
    { kind: 'pull-request', title: 'Pull requests', icon: 'lucide:git-pull-request' },
    { kind: 'issue', title: 'Issues', icon: 'lucide:circle-dot' },
    { kind: 'discussion', title: 'Discussions', icon: 'lucide:messages-square' },
    { kind: 'created', title: 'Created', icon: 'lucide:folder-plus' }
  ] as const;

  const highlight = computed(() => contributions.value?.find(item => item.kind === 'maintainer'));

  const lists = computed(() => groups.map(group => ({
    ...group,
    items: contributions.value?.filter(item => item.kind === group.kind) ?? []
  })));

  const countLinks = (kind: string) => (contributions.value ?? [])
    .filter(item => item.kind === kind)
    .reduce((total, item) => total + (item.links?.length ?? 0), 0);

  const stats = computed(() => [
    { icon: 'lucide:book-marked', value: contributions.value?.length ?? 0, label: 'repositories' },
    { icon: 'lucide:git-pull-request', value: countLinks('pull-request'), label: 'pull requests' },
    { icon: 'lucide:circle-dot', value: countLinks('issue'), label: 'issues' },
    { icon: 'lucide:messages-square', value: countLinks('discussion'), label: 'discussions' }
  ]);
</script>

<template>
  <div>
    <PageHeader title="Open source">
      <p>
        Almost everything I ship stands on open source, so I try to give back: fixing the bugs I run into, sharpening
        components I use, and answering questions where I can.
      </p>
    </PageHeader>
    <p class="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px] text-faint">
      <span v-for="stat in stats" :key="stat.label" class="inline-flex items-center gap-1.5">
        <Icon :name="stat.icon" class="size-3.5" />
        <span class="text-fg">{{ stat.value }}</span> {{ stat.label }}
      </span>
    </p>

    <section v-if="highlight" aria-labelledby="highlight" class="pt-14">
      <SectionTitle id="highlight" class="mb-4">
        Highlight
      </SectionTitle>
      <NuxtLink
        :to="highlight.links?.[0]?.to ?? highlight.url"
        class="group flex items-start gap-4 rounded-[14px] border border-line p-5 transition-colors hover:border-gradient hover:[--bg:var(--raised)]"
      >
        <img
          :src="highlight.avatar"
          alt=""
          width="44"
          height="44"
          class="size-11 shrink-0 rounded-[11px]"
        >
        <span class="flex min-w-0 flex-auto flex-col gap-2">
          <span class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span class="font-mono text-base font-medium">{{ highlight.repo }}</span>
            <span class="font-mono text-xs text-faint">{{ highlight.role }}</span>
          </span>
          <span class="text-[15px] leading-[1.65] text-muted">{{ highlight.note }}</span>
          <span class="text-sm text-soft group-hover:text-accent">{{ highlight.links?.[0]?.label ?? 'View on GitHub' }} ↗</span>
        </span>
      </NuxtLink>
    </section>

    <section aria-labelledby="contributions" class="pt-14">
      <SectionTitle id="contributions" class="mb-1">
        Contributions
      </SectionTitle>

      <template v-for="(list, index) in lists" :key="list.kind">
        <h3
          v-if="list.items.length"
          class="mb-1.5 flex items-center gap-2.5 text-[15px] font-medium"
          :class="index === 0 ? 'mt-6' : 'mt-8'"
        >
          <Icon :name="list.icon" class="size-4 text-muted" />
          {{ list.title }}
        </h3>
        <ul v-if="list.items.length" class="border-b border-line">
          <li v-for="item in list.items" :key="item.id" class="flex items-center gap-3 border-t border-line">
            <img
              :src="item.avatar"
              alt=""
              width="26"
              height="26"
              loading="lazy"
              class="size-[26px] shrink-0 rounded-[7px]"
            >
            <span class="flex min-w-0 flex-auto flex-wrap items-center justify-between gap-x-4">
              <NuxtLink :to="item.url" class="link inline-flex min-h-12 items-center font-mono text-sm">
                {{ item.repo }}
              </NuxtLink>
              <span v-if="item.links?.length" class="flex gap-3.5 font-mono text-[13px]">
                <NuxtLink
                  v-for="link in item.links"
                  :key="link.to"
                  :to="link.to"
                  class="link-muted inline-flex min-h-11 items-center"
                >
                  {{ link.label }}
                </NuxtLink>
              </span>
              <span v-else-if="item.note" class="text-[13px] text-faint">{{ item.note }}</span>
            </span>
          </li>
        </ul>
      </template>
    </section>

    <section aria-labelledby="start" class="pt-14">
      <SectionTitle id="start" class="mb-3">
        Getting started?
      </SectionTitle>
      <p class="text-[15px] leading-[1.7] text-muted">
        I wrote down what worked for me across six projects in 2023 — from good first issues to getting a pull request
        merged.
      </p>
      <div class="mt-2 flex flex-wrap gap-x-[22px]">
        <GoLink to="/articles/software-engineering/how_to_contribute_to_open_source_projects">
          How to contribute to open source
        </GoLink>
        <NuxtLink to="https://github.com/haythamasalama" class="link-muted inline-flex min-h-11 items-center gap-2 text-sm">
          <Icon name="simple-icons:github" class="size-4 text-mark" />
          Follow me on GitHub ↗
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
