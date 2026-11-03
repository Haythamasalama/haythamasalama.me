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
      <ul class="flex flex-col divide-y divide-line border-y border-line">
        <li
          v-for="app in apps"
          :id="app.anchor"
          :key="app.id"
          class="scroll-mt-6"
        >
          <ItemRow
            :to="app.page ?? app.repo ?? app.links?.[0]?.to"
            :external="!app.page"
            :mark="app.mark"
            :title="app.name"
            :meta="app.kind"
          >
            {{ app.description }}
          </ItemRow>
        </li>
      </ul>
    </section>

    <section aria-labelledby="projects" class="pt-14">
      <SectionTitle id="projects" class="mb-4">
        Projects
      </SectionTitle>
      <ul class="flex flex-col divide-y divide-line border-y border-line">
        <li
          v-for="project in projects"
          :id="project.anchor"
          :key="project.id"
          class="scroll-mt-6"
        >
          <ItemRow
            :to="project.page"
            :mark="project.mark"
            :title="project.title"
            :meta="project.context"
          >
            {{ project.description }}
            <span v-if="!project.page && project.links?.length" class="flex flex-wrap gap-x-5">
              <NuxtLink
                v-for="link in project.links"
                :key="link.to"
                :to="link.to"
                class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
              >
                {{ link.label }}
                <Icon name="lucide:arrow-up-right" class="size-3.5" />
              </NuxtLink>
            </span>
          </ItemRow>
        </li>
      </ul>
    </section>
  </div>
</template>
