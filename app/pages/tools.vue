<script setup lang="ts">
  import { toolCategories, toolGroups } from '#shared/tool-categories';

  usePageSeo({
    title: 'Tools',
    description: 'Tools Haytham A. Salama recommends for AI, development, design, writing, productivity, media, documents and the browser.'
  });

  const { data: tools } = await useAsyncData('tools', () => queryCollection('tools').all());

  const route = useRoute();
  const router = useRouter();

  const ALL = 'All';
  const group = ref(ALL);
  const query = ref('');
  const view = ref<'grid' | 'list'>('grid');
  const searchInput = useTemplateRef<HTMLInputElement>('search');

  const groupOf = (category: string) => toolCategories.find(item => item.name === category)?.group;
  const groupLabel = (id?: string) => toolGroups.find(item => item.id === id)?.label ?? '';

  // Search name, description, category, group and kind together, so "pdf",
  // "icons" or "extension" all work.
  const matches = computed(() => {
    const words = query.value.toLowerCase().split(/\s+/).filter(Boolean);
    const list = tools.value ?? [];

    if (!words.length) {
      return list;
    }

    return list.filter((tool) => {
      const text = [tool.name, tool.description, tool.category, groupLabel(groupOf(tool.category)), tool.kind]
        .join(' ')
        .toLowerCase();

      return words.every(word => text.includes(word));
    });
  });

  const options = computed(() => [
    { label: ALL, count: matches.value.length },
    ...toolGroups.map(item => ({
      label: item.label,
      count: matches.value.filter(tool => groupOf(tool.category) === item.id).length,
      badge: 'isNew' in item && item.isNew ? 'New' : undefined
    }))
  ]);

  const selectedGroupId = computed(() => toolGroups.find(item => item.label === group.value)?.id);

  // One section per category, in the order of shared/tool-categories.ts.
  // Favourites come first inside a category, then A–Z.
  const sections = computed(() => toolCategories
    .filter(category => !selectedGroupId.value || category.group === selectedGroupId.value)
    .map(category => ({
      ...category,
      tools: matches.value
        .filter(tool => tool.category === category.name)
        .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
    }))
    .filter(section => section.tools.length));

  const visibleCount = computed(() => sections.value.reduce((total, section) => total + section.tools.length, 0));

  const summary = computed(() => {
    const toolCount = `${visibleCount.value} ${visibleCount.value === 1 ? 'tool' : 'tools'}`;
    const categoryCount = `${sections.value.length} ${sections.value.length === 1 ? 'category' : 'categories'}`;

    return query.value.trim() ? `${toolCount} matching “${query.value.trim()}”` : `${toolCount} in ${categoryCount}`;
  });

  function clearSearch () {
    query.value = '';
    group.value = ALL;
    searchInput.value?.focus();
  }

  // The page is prerendered, so restore the URL state and the saved layout
  // only after hydration.
  onMounted(() => {
    if (typeof route.query.q === 'string') {
      query.value = route.query.q;
    }

    if (typeof route.query.group === 'string' && toolGroups.some(item => item.id === route.query.group)) {
      group.value = groupLabel(route.query.group);
    }

    try {
      const saved = localStorage.getItem('tools-view');

      if (saved === 'grid' || saved === 'list') {
        view.value = saved;
      }
    }
    catch {
      // Storage can be unavailable (private mode); the grid is a fine default.
    }

    document.addEventListener('keydown', focusSearchOnSlash);
  });

  onBeforeUnmount(() => document.removeEventListener('keydown', focusSearchOnSlash));

  // Press "/" anywhere on the page to jump to the search box.
  function focusSearchOnSlash (event: KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    const typing = target?.closest('input, textarea, select, [contenteditable="true"]');

    if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey) {
      event.preventDefault();
      searchInput.value?.focus();
    }
  }

  watch([query, group], ([q, g]) => {
    const groupId = toolGroups.find(item => item.label === g)?.id;

    router.replace({ query: { ...(q.trim() ? { q: q.trim() } : {}), ...(groupId ? { group: groupId } : {}) } });
  });

  watch(view, (value) => {
    try {
      localStorage.setItem('tools-view', value);
    }
    catch {
      // Ignore: the choice just won't be remembered.
    }
  });
</script>

<template>
  <div>
    <PageHeader title="Tools">
      <p>
        Small, mostly free tools that save me time — sorted by what they help with. Search for something specific, or
        pick an area.
      </p>
      <p class="text-[15px] text-muted">
        Looking for my own setup instead? That lives on <NuxtLink to="/uses" class="link-underline">Uses</NuxtLink>.
      </p>
    </PageHeader>

    <section aria-label="Recommended tools" class="pt-10">
      <div class="relative">
        <label for="tool-search" class="sr-only">Search tools or categories</label>
        <Icon name="lucide:search" class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint" />
        <input
          id="tool-search"
          ref="search"
          v-model="query"
          type="search"
          autocomplete="off"
          spellcheck="false"
          placeholder="Search tools or categories…"
          class="h-11 w-full rounded-xl border border-line bg-transparent pr-12 pl-10 text-[15px] text-fg transition-colors placeholder:text-faint hover:border-chip focus:border-chip focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 [&::-webkit-search-cancel-button]:hidden"
        >
        <button
          v-if="query"
          type="button"
          class="absolute top-1/2 right-1.5 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-fg"
          aria-label="Clear search"
          @click="clearSearch"
        >
          <Icon name="lucide:x" class="size-4" />
        </button>
        <kbd
          v-else
          class="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-md border border-line px-1.5 font-mono text-[11px] leading-5 text-faint md:block"
          aria-hidden="true"
        >/</kbd>
      </div>

      <div class="mt-4 flex items-start justify-between gap-4">
        <FilterChips v-model="group" :options="options" label="Filter by area" />
        <ViewToggle v-model="view" class="mt-0.5" />
      </div>

      <p class="mt-5 font-mono text-xs text-faint" aria-live="polite">
        {{ summary }}
      </p>

      <div v-if="sections.length" class="flex flex-col">
        <section
          v-for="section in sections"
          :key="section.name"
          :aria-label="section.name"
          class="pt-8"
        >
          <header class="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <h2 class="text-[15px] font-medium">
              {{ section.name }}
            </h2>
            <p class="text-[13px] text-faint">
              {{ section.description }}
            </p>
          </header>

          <div
            v-if="view === 'grid'"
            class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <NuxtLink
              v-for="tool in section.tools"
              :key="tool.id"
              :to="tool.url"
              class="flex flex-col gap-3 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
            >
              <span class="flex items-start justify-between gap-3">
                <LogoTile :mark="{ icon: tool.icon }" :size="40" :icon-size="20" />
                <span class="pt-0.5 font-mono text-[11px] text-faint">{{ tool.kind }}</span>
              </span>
              <span class="flex flex-col gap-1">
                <span class="text-[15px] font-medium">{{ tool.name }}</span>
                <span class="text-sm leading-[1.55] text-muted">{{ tool.description }}</span>
              </span>
            </NuxtLink>
          </div>

          <ul v-else class="flex flex-col border-t border-line">
            <li v-for="tool in section.tools" :key="tool.id" class="border-b border-line">
              <NuxtLink
                :to="tool.url"
                class="-mx-3 flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
              >
                <LogoTile :mark="{ icon: tool.icon }" :size="32" :icon-size="16" />
                <span class="flex min-w-0 flex-auto flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
                  <span class="shrink-0 text-[15px] font-medium">{{ tool.name }}</span>
                  <span class="truncate text-sm text-muted">{{ tool.description }}</span>
                </span>
                <span class="hidden shrink-0 font-mono text-[11px] text-faint sm:block">{{ tool.kind }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>

      <div v-else class="mt-8 rounded-xl border border-dashed border-line px-6 py-10 text-center">
        <p class="mx-auto text-[15px] text-soft">
          Nothing matches “{{ query.trim() }}”{{ group !== ALL ? ` in ${group}` : '' }}.
        </p>
        <button type="button" class="link-underline mt-3 cursor-pointer text-sm" @click="clearSearch">
          Clear search and filters
        </button>
      </div>

      <p class="mt-10 max-w-none border-t border-line pt-5 text-sm leading-relaxed text-faint">
        Know one I'd love? Send it my way on <NuxtLink to="https://x.com/haythamasalama" class="link-underline">X</NuxtLink>.
      </p>
    </section>
  </div>
</template>
