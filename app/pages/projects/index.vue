<script setup lang="ts">
  usePageSeo({
    title: 'Projects',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today.'
  });

  const { data } = await useAsyncData('projects', async () => {
    const [projects, pages] = await Promise.all([
      queryCollection('projects').order('order', 'ASC').all(),
      queryCollection('projectPages').select('path').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    // Group projects by year, newest first.
    const years = [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);

    return {
      projectsByYear: years.map(year => ({
        year,
        projects: projects
          .filter(project => project.year === year)
          .map((project) => {
            // A project has a page when content/projects holds a .md with its file name.
            const path = `/${project.stem}`;

            return { ...project, page: paths.has(path) ? path : undefined };
          })
      }))
    };
  });
</script>

<template>
  <div>
    <PageHeader title="Projects">
      <p>What I've built and shipped, from a physics app in high school to fintech and logistics platforms today.</p>
    </PageHeader>

    <section aria-labelledby="projects" class="pt-14">
      <SectionTitle id="projects" class="mb-2">
        Products &amp; projects
      </SectionTitle>

      <div
        v-for="group in data?.projectsByYear"
        :key="group.year"
        class="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6"
      >
        <h3 class="flex-[0_0_56px] font-mono text-[13px] leading-8 text-faint">
          {{ group.year }}
        </h3>
        <div class="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
          <article v-for="project in group.projects" :key="project.id" class="flex gap-3.5">
            <LogoTile :mark="project.mark" :size="32" :icon-size="16" />
            <div class="flex min-w-0 flex-auto flex-col gap-1.5">
              <h4 :id="slugify(project.title)" class="text-base leading-8 font-medium">
                <NuxtLink v-if="project.page" :to="project.page" class="hover:underline hover:decoration-(--underline) hover:underline-offset-4">
                  {{ project.title }}
                </NuxtLink>
                <AnchorLink v-else :target="slugify(project.title)">
                  {{ project.title }}
                </AnchorLink>
              </h4>
              <p v-if="project.context" class="-mt-1.5 font-mono text-xs text-faint">
                {{ project.context }}
              </p>
              <p class="text-[15px] leading-[1.65] text-muted">
                {{ project.description }}
              </p>
              <div v-if="project.page || project.links.length" class="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1">
                <NuxtLink
                  v-if="project.page"
                  :to="project.page"
                  class="go inline-flex min-h-11 items-center rounded-full border border-chip px-4 text-sm text-fg transition-colors hover:bg-surface"
                >
                  About the project<span class="arrow" aria-hidden="true">→</span>
                </NuxtLink>
                <NuxtLink
                  v-for="link in project.links"
                  :key="link.to"
                  :to="link.to"
                  class="link-underline inline-flex min-h-11 items-center text-sm"
                >
                  {{ link.label }} ↗
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
