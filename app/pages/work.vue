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
      .map((project) => {
        const labels = projectLabels(project);

        return {
          ...project,
          ...labels,
          anchor: slugify(labels.name),
          page: paths.has(`/${project.stem}`) ? `/${project.stem}` : undefined
        };
      });
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

  const apps = computed(() => data.value?.apps ?? []);
  const caseStudies = computed(() => data.value?.projects.filter(project => project.page) ?? []);
  const earlier = computed(() => data.value?.projects.filter(project => !project.page) ?? []);
</script>

<template>
  <div>
    <PageHeader title="Work">
      <p>Free apps I build and maintain, and the systems I’ve built for the teams that run on them.</p>
    </PageHeader>

    <section v-if="apps.length" aria-labelledby="apps" class="pt-12">
      <SectionTitle id="apps" class="mb-4">
        Apps
      </SectionTitle>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="app in apps"
          :id="app.anchor"
          :key="app.id"
          class="scroll-mt-6"
        >
          <ContentCard
            :to="(app.page ?? app.repo ?? app.links?.[0]?.to)!"
            :external="!app.page"
            :mark="app.mark"
            :title="app.name"
            :meta="app.kind"
          />
        </li>
      </ul>
    </section>

    <section aria-labelledby="projects" class="pt-14">
      <SectionTitle id="projects" class="mb-4">
        Projects
      </SectionTitle>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="project in caseStudies"
          :id="project.anchor"
          :key="project.id"
          class="scroll-mt-6"
        >
          <ContentCard
            :to="project.page!"
            :mark="project.mark"
            :title="project.name"
            :meta="project.summary"
          />
        </li>
        <li
          v-for="project in earlier"
          :id="project.anchor"
          :key="project.id"
          class="scroll-mt-6 sm:col-span-2 lg:col-span-3"
        >
          <div class="flex flex-col gap-1 rounded-2xl border border-line p-4 pb-2 md:p-5 md:pb-3">
            <div class="flex items-start gap-3">
              <LogoTile :mark="project.mark" :size="40" />
              <div class="flex min-w-0 flex-col gap-0.5">
                <span class="text-[15px] leading-snug font-medium text-fg">{{ project.name }}</span>
                <span class="font-mono text-xs text-faint">{{ project.summary }}</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-x-5 sm:pl-[52px]">
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
