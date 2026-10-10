<script setup lang="ts">
  usePageSeo({
    title: 'Projects',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today.'
  });

  const { data } = await useAsyncData('projects', async () => {
    const projects = await queryCollection('projects').order('order', 'ASC').all();

    // Group projects by year, newest first.
    const years = [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);

    return {
      projectsByYear: years.map(year => ({ year, projects: projects.filter(project => project.year === year) }))
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
                <AnchorLink :target="slugify(project.title)">
                  {{ project.title }}
                </AnchorLink>
              </h4>
              <p v-if="project.context" class="-mt-1.5 font-mono text-xs text-faint">
                {{ project.context }}
              </p>
              <p class="text-[15px] leading-[1.65] text-muted">
                {{ project.description }}
              </p>
              <ul v-if="project.tags?.length" class="mt-1 flex flex-wrap gap-1.5" aria-label="Built with">
                <li
                  v-for="tag in project.tags"
                  :key="tag.label"
                  class="inline-flex items-center gap-1.5 rounded-full border border-line py-[3px] pr-[9px] font-mono text-[11.5px] leading-[18px] text-muted"
                  :class="tag.icon ? 'pl-[7px]' : 'pl-[9px]'"
                >
                  <Icon v-if="tag.icon" :name="tag.icon" class="size-3 text-mark" />
                  {{ tag.label }}
                </li>
              </ul>
              <div v-if="project.links?.length" class="flex flex-wrap gap-x-[18px]">
                <NuxtLink
                  v-for="link in project.links"
                  :key="link.to"
                  :to="link.to"
                  class="link-underline inline-flex min-h-9 items-center text-sm"
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
