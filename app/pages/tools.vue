<script setup lang="ts">
  usePageSeo({
    title: 'Tools',
    description: 'Small, mostly free tools Haytham A. Salama recommends for code, design, focus and writing.'
  });

  const categoryOrder = ['Code', 'Design', 'Focus', 'Writing', 'Files', 'Media', 'Browser'];

  // Group by category, then A–Z (case-insensitive, so "iLovePDF" sits with the I's).
  const { data: tools } = await useAsyncData('tools', async () => {
    const list = await queryCollection('tools').all();

    return list.sort((a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  });

  const showEverything = ref(false);
  const category = ref('All');

  const pool = computed(() => (tools.value ?? []).filter(tool => showEverything.value || tool.featured));

  const options = computed(() => [
    { label: 'All', count: pool.value.length },
    ...categoryOrder
      .map(label => ({ label, count: pool.value.filter(tool => tool.category === label).length }))
      .filter(option => option.count > 0)
  ]);

  const visible = computed(() => pool.value.filter(tool => category.value === 'All' || tool.category === category.value));

  const summary = computed(() => category.value === 'All'
    ? `${visible.value.length} tools`
    : `${visible.value.length} tools for ${category.value.toLowerCase()}`);

  // A category can disappear when switching back to the short list.
  watch(options, (list) => {
    if (!list.some(option => option.label === category.value)) {
      category.value = 'All';
    }
  });
</script>

<template>
  <div>
    <PageHeader title="Tools">
      <p>
        Small, mostly free tools that save me time — for code, design, focus and writing. Every job needs a different
        one, so pick a category.
      </p>
      <p class="text-[15px] text-muted">
        Looking for my own setup instead? That lives on <NuxtLink to="/uses" class="link-underline">Uses</NuxtLink>.
      </p>
    </PageHeader>

    <section aria-label="Recommended tools" class="pt-10">
      <FilterChips v-model="category" :options="options" label="Filter by category" />

      <p class="mt-5 font-mono text-xs text-faint" aria-live="polite">
        {{ summary }}
      </p>

      <div class="mt-3 grid grid-cols-[repeat(auto-fill,minmax(min(100%,272px),1fr))] gap-3">
        <NuxtLink
          v-for="tool in visible"
          :key="tool.id"
          :to="tool.url"
          class="flex items-start gap-3.5 rounded-xl border border-line p-4 transition-colors hover:bg-surface"
        >
          <LogoTile :mark="{ icon: tool.icon }" :size="40" :icon-size="20" />
          <span class="flex min-w-0 flex-auto flex-col gap-1">
            <span class="flex items-baseline justify-between gap-2">
              <span class="text-[15px] font-medium">{{ tool.name }}</span>
              <span class="shrink-0 font-mono text-[11px] text-faint">{{ tool.kind }}</span>
            </span>
            <span class="text-sm leading-[1.55] text-muted">{{ tool.description }}</span>
          </span>
        </NuxtLink>
      </div>

      <p class="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-faint">
        <template v-if="!showEverything">
          Picked from the {{ tools?.length }} tools I keep bookmarked —
          <button type="button" class="link-underline cursor-pointer" @click="showEverything = true">
            show them all
          </button>.
        </template>
        <template v-else>
          Showing all {{ tools?.length }} bookmarks —
          <button type="button" class="link-underline cursor-pointer" @click="showEverything = false">
            back to my picks
          </button>.
        </template>
        Know one I'd love? Send it my way on <NuxtLink to="https://x.com/haythamasalama" class="link-underline">X</NuxtLink>.
      </p>
    </section>
  </div>
</template>
