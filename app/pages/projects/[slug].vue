<script setup lang="ts">
  definePageMeta({ wide: true });

  const route = useRoute();
  const path = route.path.replace(/\/$/, '');

  // The page body comes from content/projects/<slug>.md, the title, period and
  // links from the card with the same file name (content/projects/<slug>.yml).
  const { data } = await useAsyncData(`project:${path}`, async () => {
    const [page, project] = await Promise.all([
      queryCollection('projectPages').path(path).first(),
      queryCollection('projects').where('stem', '=', path.slice(1)).first()
    ]);

    return page && project ? { page, project } : null;
  });

  if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true });
  }

  const { data: more } = await useAsyncData(`project-more:${path}`, async () => {
    const [pages, projects] = await Promise.all([
      queryCollection('projectPages').where('path', '<>', path).select('path').all(),
      queryCollection('projects').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    return projects
      .filter(project => paths.has(`/${project.stem}`))
      .sort((a, b) => b.year - a.year || a.order - b.order)
      .slice(0, 3)
      .map(project => ({ path: `/${project.stem}`, title: project.title, description: project.description, mark: project.mark, year: project.year }));
  });

  usePageSeo({
    title: data.value.project.title,
    description: data.value.page.description,
    type: 'article',
    entity: {
      '@type': 'CreativeWork',
      'name': data.value.project.title,
      'description': data.value.project.description,
      'dateCreated': String(data.value.project.year),
      'creator': { '@id': useSchemaIds().person },
      ...data.value.project.links?.length ? { sameAs: data.value.project.links.map(link => link.to) } : {}
    }
  });

  /** The card's context ("Faris Petrol · May 2021 – Dec 2022") as facts with an icon each. */
  const facts = computed(() => (data.value?.project.context ?? '')
    .split(' · ')
    .filter(Boolean)
    .map(text => ({ text, icon: /\d|now/.test(text) ? 'lucide:calendar' : 'lucide:briefcase-business' })));

  /** The page's sections, for the list beside the text on wide screens. */
  const sections = computed(() => (data.value?.page.body?.toc?.links ?? [])
    .filter(link => link.depth === 2)
    .map(link => ({ id: link.id, text: link.text })));

  // Highlight the section being read: the last heading that has scrolled past the top third.
  const active = ref(sections.value[0]?.id);

  onMounted(() => {
    const headings = sections.value
      .map(section => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => !!heading);

    const update = () => {
      const line = window.innerHeight / 3;
      const passed = headings.filter(heading => heading.getBoundingClientRect().top <= line);

      active.value = (passed.at(-1) ?? headings[0])?.id;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    onBeforeUnmount(() => window.removeEventListener('scroll', update));
  });
</script>

<template>
  <article v-if="data">
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/projects" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Projects
      </NuxtLink>
      <div class="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <LogoTile :mark="data.project.mark" :size="52" />
        <h1 class="min-w-0 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[36px]">
          {{ data.project.title }}
        </h1>
      </div>
      <p class="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-soft md:text-lg">
        {{ data.project.description }}
      </p>
      <ul class="mt-6 flex flex-wrap items-center gap-2" aria-label="About this project">
        <li
          v-for="fact in facts"
          :key="fact.text"
          class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted"
        >
          <Icon :name="fact.icon" class="size-3.5 text-mark" aria-hidden="true" />
          {{ fact.text }}
        </li>
        <li v-for="link in data.project.links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon name="lucide:globe" class="size-3.5 text-mark" aria-hidden="true" />
            {{ link.label }}
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </li>
      </ul>
    </header>

    <div class="mt-12 border-t border-line pt-4 lg:grid lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-14">
      <!-- On wide screens, the sections stay beside the text and mark the one being read. -->
      <nav v-if="sections.length" aria-label="On this page" class="hidden lg:block">
        <div class="sticky top-10 pt-8">
          <p class="eyebrow mb-3">
            On this page
          </p>
          <ul class="flex flex-col border-l border-line">
            <li v-for="section in sections" :key="section.id">
              <a
                :href="`#${section.id}`"
                class="-ml-px flex min-h-9 items-center border-l py-1 pl-3.5 text-[13px] transition-colors"
                :class="active === section.id ? 'border-fg text-fg' : 'border-transparent text-muted hover:text-fg'"
                :aria-current="active === section.id ? 'location' : undefined"
              >
                {{ section.text }}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ProseBody :value="data.page" class="project-body min-w-0" />
    </div>

    <footer v-if="more?.length" class="mt-20 border-t border-line pt-10">
      <SectionTitle class="mb-5">
        More projects
      </SectionTitle>
      <div class="grid gap-3 sm:grid-cols-3">
        <NuxtLink
          v-for="item in more"
          :key="item.path"
          :to="item.path"
          class="flex flex-col gap-3 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
        >
          <span class="flex items-center justify-between">
            <LogoTile :mark="item.mark" :size="32" :icon-size="16" />
            <span class="font-mono text-xs text-faint">{{ item.year }}</span>
          </span>
          <span class="text-[15px] leading-snug font-medium">{{ item.title }}</span>
          <span class="line-clamp-3 text-[13px] leading-[1.55] text-muted">{{ item.description }}</span>
        </NuxtLink>
      </div>
      <GoLink to="/projects" class="mt-2">
        All projects
      </GoLink>
    </footer>
  </article>
</template>
