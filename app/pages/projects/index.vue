<script setup lang="ts">
  usePageSeo({
    title: 'Projects',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today.'
  });

  const { data: projects } = await useAsyncData('projects', async () => {
    const [list, pages] = await Promise.all([
      queryCollection('projects').all(),
      queryCollection('projectPages').select('path').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    // Newest first; within a year, by the card's order. A project has a page when
    // content/projects holds a .md with its file name.
    return list
      .sort((a, b) => b.year - a.year || a.order - b.order)
      .map(project => ({ ...project, page: paths.has(`/${project.stem}`) ? `/${project.stem}` : undefined }));
  });
</script>

<template>
  <div>
    <PageHeader title="Projects">
      <p>What I've built and shipped, from a physics app in high school to fintech and logistics platforms today.</p>
    </PageHeader>

    <section aria-label="Projects" class="pt-12">
      <ul class="flex flex-col">
        <li v-for="project in projects" :key="project.id">
          <component
            :is="project.page ? resolveComponent('NuxtLink') : 'div'"
            :to="project.page"
            class="group -mx-3 flex items-start gap-3.5 rounded-[10px] p-3"
            :class="project.page && 'transition-colors hover:bg-surface'"
          >
            <LogoTile :mark="project.mark" :size="36" />
            <span class="flex min-w-0 flex-auto flex-col gap-1">
              <span class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <span class="text-[15px] font-medium">
                  {{ project.title }}
                  <span v-if="project.page" class="ml-1 inline-block text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-fg motion-reduce:transition-none" aria-hidden="true">→</span>
                </span>
                <span class="font-mono text-xs text-faint">{{ project.year }}</span>
              </span>
              <span class="text-sm leading-[1.55] text-muted">{{ project.description }}</span>
            </span>
          </component>
        </li>
      </ul>
    </section>
  </div>
</template>
