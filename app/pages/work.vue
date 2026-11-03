<script setup lang="ts">
  const { data } = await useAsyncData('work', async () => {
    const [list, pages, appList, appPages] = await Promise.all([
      queryCollection('projects').all(),
      queryCollection('projectPages').select('path').all(),
      queryCollection('apps').order('order', 'ASC').all(),
      queryCollection('appPages').select('path').all()
    ]);
    const paths = new Set([...pages, ...appPages].map(page => page.path));

    // Newest first; within a year, by the card's order. A project or an app has a page
    // when content/projects or content/apps holds a .md with its file name.
    const projects = list
      .sort((a, b) => b.year - a.year || a.order - b.order)
      .map(project => ({
        ...project,
        anchor: slugify(project.title.split(' · ')[0]!),
        page: paths.has(`/${project.stem}`) ? `/${project.stem}` : undefined
      }));
    const apps = appList.map(app => ({
      ...app,
      anchor: slugify(app.name),
      page: paths.has(`/${app.stem}`) ? `/${app.stem}` : undefined
    }));

    return { projects, apps };
  });

  const { site } = useAppConfig();

  usePageSeo({
    title: 'Work',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today, plus free apps of his own.',
    schema: 'CollectionPage',
    entity: {
      '@type': 'ItemList',
      'itemListElement': [
        ...(data.value?.apps ?? []).map(app => ({ name: app.name, url: app.page ?? `/work#${app.anchor}` })),
        ...(data.value?.projects ?? []).map(project => ({ name: project.title, url: project.page ?? `/work#${project.anchor}` }))
      ].map((item, index) => ({ '@type': 'ListItem', 'position': index + 1, 'name': item.name, 'url': `${site.url}${item.url}` }))
    }
  });

  const projects = computed(() => data.value?.projects ?? []);
  const apps = computed(() => data.value?.apps ?? []);

  const caseStudies = computed(() => projects.value.filter(project => project.page));
  const earlier = computed(() => projects.value.filter(project => !project.page));

  /** What I'm building now: the newest project still running, at full width with a Now badge. */
  const spotlight = computed(() => caseStudies.value.find(project => project.context?.includes('now')));
</script>

<template>
  <div>
    <section aria-labelledby="title" class="pt-16 md:pt-[88px]">
      <p class="eyebrow">
        Work
      </p>
      <h1
        id="title"
        class="mt-4 max-w-[720px] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]"
      >
        Apps and systems I’ve <span class="text-gradient">built</span>.
      </h1>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        Free apps I build and maintain, then the fintech and logistics platforms I’ve worked on, each with what I did
        and how it is built.
      </p>
    </section>

    <section v-if="apps.length" aria-labelledby="apps" class="pt-14 md:pt-16">
      <SectionTitle id="apps" class="mb-4">
        Apps
      </SectionTitle>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li
          v-for="app in apps"
          :id="app.anchor"
          :key="app.id"
          class="scroll-mt-6"
        >
          <NuxtLink
            :to="app.page ?? app.repo ?? app.links?.[0]?.to"
            class="group flex h-full flex-col gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface md:p-5"
          >
            <span class="flex items-start gap-3">
              <LogoTile :mark="app.mark" :size="40" />
              <span class="flex min-w-0 flex-auto flex-col gap-1">
                <span class="flex items-baseline justify-between gap-3">
                  <span class="text-base leading-snug font-semibold">
                    {{ app.name }}<span v-if="!app.page" class="ml-1 font-normal text-muted" aria-hidden="true">↗</span>
                  </span>
                  <span class="shrink-0 font-mono text-xs text-faint">{{ app.since }}</span>
                </span>
                <span class="font-mono text-xs text-faint">{{ app.kind }}</span>
              </span>
            </span>
            <span class="text-sm leading-[1.6] text-muted">{{ app.description }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section aria-labelledby="projects" class="pt-14 md:pt-16">
      <SectionTitle id="projects" class="mb-4">
        Projects
      </SectionTitle>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li
          v-for="project in caseStudies"
          :id="project.anchor"
          :key="project.id"
          class="scroll-mt-6"
          :class="project === spotlight && 'sm:col-span-2'"
        >
          <NuxtLink
            :to="project.page"
            class="group flex h-full flex-col gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface md:p-5"
          >
            <span class="flex items-start gap-3">
              <LogoTile :mark="project.mark" :size="40" />
              <span class="flex min-w-0 flex-auto flex-col gap-1">
                <span class="flex items-baseline justify-between gap-3">
                  <span class="text-base leading-snug font-semibold">{{ project.title }}</span>
                  <span
                    v-if="project === spotlight"
                    class="border-gradient inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 font-mono text-[10px] font-medium tracking-[0.1em] uppercase"
                  >
                    <span class="size-1.5 animate-live rounded-full bg-linear-135 from-iris-500 to-azure-500" aria-hidden="true" />
                    Now
                  </span>
                  <span v-else class="shrink-0 font-mono text-xs text-faint">{{ project.year }}</span>
                </span>
                <span class="font-mono text-xs text-faint">{{ project.context }}</span>
              </span>
            </span>
            <span class="text-sm leading-[1.6] text-muted">{{ project.description }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section v-if="earlier.length" aria-labelledby="earlier" class="pt-14 md:pt-[72px]">
      <SectionTitle id="earlier" class="mb-2">
        Earlier &amp; smaller projects
      </SectionTitle>
      <ul class="flex flex-col">
        <li
          v-for="project in earlier"
          :id="project.anchor"
          :key="project.id"
          class="flex items-start gap-4 py-3"
        >
          <LogoTile :mark="project.mark" :size="32" :icon-size="16" />
          <div class="flex min-w-0 flex-auto flex-col gap-0.5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span class="text-[15px] font-medium">{{ project.title }}</span>
              <span class="font-mono text-[13px] text-faint">{{ project.year }}</span>
            </div>
            <span v-if="project.context" class="font-mono text-xs text-faint">{{ project.context }}</span>
            <p class="mt-1 text-sm leading-[1.6] text-muted">
              {{ project.description }}
            </p>
            <div v-if="project.links?.length" class="flex flex-wrap gap-x-5">
              <NuxtLink
                v-for="link in project.links"
                :key="link.to"
                :to="link.to"
                class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
              >
                {{ link.label }}
                <Icon name="lucide:arrow-up-right" class="size-3.5" />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
