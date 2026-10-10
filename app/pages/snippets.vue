<script setup lang="ts">
  usePageSeo({
    title: 'Snippets',
    description: 'Small pieces of config and code Haytham A. Salama reaches for again and again, straight from his GitHub Gists.'
  });

  const gistsUrl = 'https://gist.github.com/Haythamasalama';

  const { data: snippets, error } = await useFetch<Snippet[]>('/api/snippets', {
    key: 'snippets',
    default: () => []
  });

  // Vercel keeps serving the last good copy when a regeneration fails, so a
  // GitHub outage is never cached as the page.
  if (import.meta.server && error.value) {
    setResponseStatus(useRequestEvent()!, 503);
  }

  const ALL = 'All';
  const kind = ref(ALL);

  const options = computed(() => {
    const counts = new Map<string, number>();

    for (const snippet of snippets.value) {
      counts.set(snippet.kind, (counts.get(snippet.kind) ?? 0) + 1);
    }

    return [
      { label: ALL, count: snippets.value.length },
      ...[...counts].sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }))
    ];
  });

  const visible = computed(() => snippets.value.filter(snippet => kind.value === ALL || snippet.kind === kind.value));

  // Long gists start collapsed so the page stays scannable.
  const expanded = ref(new Set<string>());

  function toggle (id: string) {
    if (expanded.value.has(id)) {
      expanded.value.delete(id);
    }
    else {
      expanded.value.add(id);
    }
  }

  const isCollapsed = (snippet: Snippet) => snippet.long && !expanded.value.has(snippet.id);
</script>

<template>
  <div>
    <PageHeader title="Snippets">
      <p>Small pieces of config and code I reach for again and again. Copy, paste, ship.</p>
      <p class="text-[15px] text-muted">
        Pulled live from my <NuxtLink :to="gistsUrl" class="link-underline">GitHub Gists</NuxtLink>, so new ones show up here
        on their own.
      </p>
    </PageHeader>

    <section aria-label="Code snippets" class="pt-10">
      <FilterChips
        v-if="options.length > 2"
        v-model="kind"
        :options="options"
        label="Filter snippets"
      />

      <div v-if="visible.length" class="mt-6 flex flex-col gap-5">
        <article
          v-for="snippet in visible"
          :key="snippet.id"
          class="overflow-hidden rounded-[14px] border border-line"
        >
          <header class="flex items-start gap-3.5 p-4">
            <LogoTile :mark="{ icon: snippet.icon }" :size="36" />
            <div class="flex min-w-0 flex-auto flex-col gap-1">
              <h2 :id="slugify(snippet.title)" class="text-base leading-snug font-medium">
                <AnchorLink :target="slugify(snippet.title)">
                  {{ snippet.title }}
                </AnchorLink>
              </h2>
              <p class="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs text-faint">
                <span v-for="file in snippet.files" :key="file">{{ file }}</span>
                <span>Updated <time :datetime="snippet.updatedAt">{{ formatDate(snippet.updatedAt) }}</time></span>
              </p>
            </div>
            <NuxtLink
              :to="snippet.url"
              class="-mt-1 -mr-1 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
              :aria-label="`${snippet.title} on GitHub`"
              :title="'View on GitHub'"
            >
              <Icon name="lucide:arrow-up-right" class="size-4" />
            </NuxtLink>
          </header>

          <div
            :id="`gist-${snippet.id}`"
            class="relative"
            :class="isCollapsed(snippet) && 'max-h-[26rem] overflow-hidden'"
          >
            <ContentRenderer
              :value="snippet"
              :class="snippet.prose
                ? 'prose-site prose max-w-none border-t border-line px-4 pt-1 pb-2 text-[15px] leading-[1.7] prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-h3:text-[17px] prose-h4:text-[15px] prose-a:font-normal prose-a:underline-offset-4 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none [&_.code-block]:my-4'
                : '[&_.code-block]:m-0 [&_.code-block]:rounded-none [&_.code-block]:border-x-0 [&_.code-block]:border-b-0'"
            />
            <div
              v-if="isCollapsed(snippet)"
              class="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t to-transparent"
              :class="snippet.prose ? 'from-bg' : 'from-raised'"
            />
          </div>

          <button
            v-if="snippet.long"
            type="button"
            class="flex min-h-11 w-full cursor-pointer items-center justify-center gap-1.5 border-t border-line text-[13px] text-muted transition-colors hover:bg-surface hover:text-fg"
            :aria-expanded="!isCollapsed(snippet)"
            :aria-controls="`gist-${snippet.id}`"
            @click="toggle(snippet.id)"
          >
            {{ isCollapsed(snippet) ? 'Show all' : 'Show less' }}
            <Icon
              name="lucide:chevron-down"
              class="size-3.5 transition-transform"
              :class="!isCollapsed(snippet) && 'rotate-180'"
            />
          </button>
        </article>
      </div>

      <div v-else class="mt-6 rounded-xl border border-dashed border-line px-6 py-10 text-center">
        <p class="mx-auto text-[15px] text-soft">
          {{ error ? 'GitHub isn’t answering right now, so the snippets can’t load.' : 'No public gists yet.' }}
        </p>
        <NuxtLink :to="gistsUrl" class="link-underline mt-3 inline-block text-sm">
          Open them on GitHub
        </NuxtLink>
      </div>

      <div class="mt-6 flex flex-wrap gap-x-[22px]">
        <NuxtLink :to="gistsUrl" class="go link-muted inline-flex min-h-11 items-center gap-2 text-sm">
          <Icon name="simple-icons:github" class="size-4 text-mark" />
          <span>All gists on GitHub<span class="arrow" aria-hidden="true">↗</span></span>
        </NuxtLink>
        <GoLink to="/articles">
          Read the full posts
        </GoLink>
      </div>
    </section>
  </div>
</template>
