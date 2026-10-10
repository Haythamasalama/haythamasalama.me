<script setup lang="ts">
  usePageSeo({
    title: 'Snippets',
    description: 'Small pieces of config and code Haytham A. Salama reaches for again and again — Laravel, Prettier, Husky and more.'
  });

  const { data: snippets } = await useAsyncData('snippets', () =>
    queryCollection('snippets').order('order', 'ASC').all()
  );

  const category = ref('All');

  const options = computed(() => {
    const list = snippets.value ?? [];
    const categories = [...new Set(list.map(snippet => snippet.category))];

    return [
      { label: 'All', count: list.length },
      ...categories.map(label => ({ label, count: list.filter(snippet => snippet.category === label).length }))
    ];
  });

  const visible = computed(() => (snippets.value ?? [])
    .filter(snippet => category.value === 'All' || snippet.category === category.value));
</script>

<template>
  <div>
    <PageHeader title="Snippets">
      <p>Small pieces of config and code I reach for again and again. Copy, paste, ship.</p>
    </PageHeader>

    <section aria-label="Code snippets" class="pt-10">
      <FilterChips v-model="category" :options="options" label="Filter snippets" />

      <div class="mt-6 flex flex-col gap-5">
        <article
          v-for="snippet in visible"
          :key="snippet.path"
          class="overflow-hidden rounded-[14px] border border-line"
        >
          <div class="flex items-start gap-3.5 p-4">
            <LogoTile :mark="{ icon: snippet.icon }" :size="36" />
            <div class="flex min-w-0 flex-auto flex-col gap-1">
              <h2 class="text-base leading-snug font-medium">
                {{ snippet.title }}
              </h2>
              <p class="text-sm leading-[1.55] text-muted">
                {{ snippet.description }}
              </p>
            </div>
          </div>
          <ContentRenderer
            :value="snippet"
            class="[&_.code-block]:m-0 [&_.code-block]:rounded-none [&_.code-block]:border-x-0 [&_.code-block]:border-b-0"
          />
          <p v-if="snippet.article" class="border-t border-line px-4 py-2.5 text-[13px] text-faint">
            From <NuxtLink :to="snippet.article.to" class="link-underline">
              {{ snippet.article.label }}
            </NuxtLink>
          </p>
        </article>
      </div>

      <div class="mt-6 flex flex-wrap gap-x-[22px]">
        <NuxtLink
          to="https://gist.github.com/haythamasalama"
          class="go link-muted inline-flex min-h-11 items-center gap-2 text-sm"
        >
          <Icon name="simple-icons:github" class="size-4 text-mark" />
          <span>More on GitHub Gists<span class="arrow" aria-hidden="true">↗</span></span>
        </NuxtLink>
        <GoLink to="/articles">
          Read the full posts
        </GoLink>
      </div>
    </section>
  </div>
</template>
