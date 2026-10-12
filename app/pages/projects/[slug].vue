<script setup lang="ts">
  const route = useRoute();
  const path = route.path.replace(/\/$/, '');

  // The page body comes from content/projects/<slug>.md, the title, period and
  // tags from the card with the same file name (content/projects/<slug>.yml).
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
      .map(project => ({ path: `/${project.stem}`, title: project.title, mark: project.mark, year: project.year }));
  });

  usePageSeo({
    title: data.value.project.title,
    description: data.value.page.description,
    type: 'article'
  });
</script>

<template>
  <article v-if="data">
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/projects" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Projects
      </NuxtLink>
      <div class="mt-4 flex items-start gap-4">
        <LogoTile :mark="data.project.mark" :size="44" class="mt-0.5" />
        <div class="min-w-0">
          <h1 class="text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[32px]">
            {{ data.project.title }}
          </h1>
          <p v-if="data.project.context" class="mt-2 font-mono text-xs text-faint">
            {{ data.project.context }}
          </p>
        </div>
      </div>
      <p class="mt-6 text-[17px] leading-[1.7] text-soft">
        {{ data.project.description }}
      </p>
      <div v-if="data.project.links.length" class="mt-3 flex flex-wrap gap-x-[18px]">
        <NuxtLink
          v-for="link in data.project.links"
          :key="link.to"
          :to="link.to"
          class="link-underline inline-flex min-h-11 items-center text-sm"
        >
          {{ link.label }} ↗
        </NuxtLink>
      </div>
    </header>

    <ProseBody :value="data.page" class="mt-12" />

    <footer v-if="more?.length" class="mt-16 border-t border-line pt-8">
      <SectionTitle class="mb-3">
        More projects
      </SectionTitle>
      <div class="flex flex-col">
        <NuxtLink
          v-for="item in more"
          :key="item.path"
          :to="item.path"
          class="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
        >
          <LogoTile :mark="item.mark" :size="28" :icon-size="14" />
          <span class="flex min-w-0 flex-auto flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span class="text-[15px]">{{ item.title }}</span>
            <span class="font-mono text-xs text-faint">{{ item.year }}</span>
          </span>
        </NuxtLink>
      </div>
      <GoLink to="/projects" class="mt-1">
        All projects
      </GoLink>
    </footer>
  </article>
</template>
