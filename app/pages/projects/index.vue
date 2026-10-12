<script setup lang="ts">
  usePageSeo({
    title: 'Projects',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today.'
  });

  const { data } = await useAsyncData('projects', async () => {
    const [projects, pages] = await Promise.all([
      queryCollection('projects').all(),
      queryCollection('projectPages').select('path').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    // Newest first; within a year, by the card's order.
    const sorted = projects
      .sort((a, b) => b.year - a.year || a.order - b.order)
      // A project has a page when content/projects holds a .md with its file name.
      .map(project => ({ ...project, page: paths.has(`/${project.stem}`) ? `/${project.stem}` : undefined }));

    return {
      caseStudies: sorted.filter(project => project.page),
      others: sorted.filter(project => !project.page)
    };
  });
</script>

<template>
  <div>
    <PageHeader title="Projects">
      <p>What I've built and shipped, from a physics app in high school to fintech and logistics platforms today.</p>
    </PageHeader>

    <section aria-labelledby="case-studies" class="pt-14">
      <SectionTitle id="case-studies" class="mb-5">
        Case studies
      </SectionTitle>
      <ul class="grid gap-4 md:grid-cols-2">
        <li
          v-for="project in data?.caseStudies"
          :key="project.id"
          class="brand-hover group/card relative flex flex-col rounded-2xl border border-line p-5 transition-colors hover:border-chip hover:bg-surface"
        >
          <div class="flex items-start justify-between gap-4">
            <LogoTile :mark="project.mark" :size="40" />
            <span class="font-mono text-xs leading-6 text-faint">{{ project.year }}</span>
          </div>
          <h3 :id="slugify(project.title)" class="mt-4 text-[17px] leading-snug font-medium text-balance">
            <!-- The title's link covers the whole card; the website link sits above it. -->
            <NuxtLink :to="project.page" class="after:absolute after:inset-0 after:rounded-2xl">
              {{ project.title }}
            </NuxtLink>
          </h3>
          <p v-if="project.context" class="mt-1.5 font-mono text-xs text-faint">
            {{ project.context }}
          </p>
          <p class="mt-3 flex-auto text-sm leading-[1.6] text-muted">
            {{ project.description }}
          </p>
          <div class="mt-4 flex flex-wrap items-center gap-x-5">
            <span class="go inline-flex min-h-11 items-center text-[13px] text-soft group-hover/card:text-fg">
              About the project<span class="arrow" aria-hidden="true">→</span>
            </span>
            <NuxtLink
              v-for="link in project.links"
              :key="link.to"
              :to="link.to"
              class="link-underline relative z-10 inline-flex min-h-11 items-center text-[13px]"
            >
              {{ link.label }} ↗
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="data?.others.length" aria-labelledby="more-projects" class="pt-16">
      <SectionTitle id="more-projects" class="mb-2">
        More projects
      </SectionTitle>
      <ul class="flex flex-col">
        <li
          v-for="project in data.others"
          :key="project.id"
          class="flex gap-3.5 border-t border-line py-5 first:border-t-0"
        >
          <LogoTile :mark="project.mark" :size="32" :icon-size="16" />
          <div class="flex min-w-0 flex-auto flex-col gap-1">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <h3 :id="slugify(project.title)" class="text-[15px] font-medium">
                <AnchorLink :target="slugify(project.title)">
                  {{ project.title }}
                </AnchorLink>
              </h3>
              <span class="font-mono text-xs text-faint">{{ project.context }}</span>
            </div>
            <p class="text-sm leading-[1.6] text-muted">
              {{ project.description }}
            </p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
