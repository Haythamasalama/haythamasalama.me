<script setup lang="ts">
  useSeoMeta({
    title: 'Work',
    description: 'Where Haytham A. Salama has worked and what he has shipped — from a physics app in high school to fintech platforms today.'
  });

  const { data } = await useAsyncData('work', async () => {
    const [experience, education, projects] = await Promise.all([
      queryCollection('experience').order('order', 'ASC').all(),
      queryCollection('education').order('order', 'ASC').all(),
      queryCollection('projects').order('order', 'ASC').all()
    ]);

    // Group projects by year, newest first.
    const years = [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);

    return {
      experience,
      education,
      projectsByYear: years.map(year => ({ year, projects: projects.filter(project => project.year === year) }))
    };
  });
</script>

<template>
  <div>
    <PageHeader title="Work">
      <p>Where I've worked and what I've shipped — from a physics app in high school to fintech platforms today.</p>
    </PageHeader>

    <section aria-labelledby="experience" class="pt-14">
      <SectionTitle id="experience" class="mb-2">
        Experience
      </SectionTitle>
      <ol class="flex flex-col border-b border-line">
        <TimelineItem
          v-for="job in data?.experience"
          :key="job.id"
          :title="job.company"
          :to="job.url"
          :period="`${job.start} — ${job.end}`"
          :subtitle="job.detail ? `${job.role} · ${job.detail}` : job.role"
          :summary="job.summary"
          :mark="job.mark"
        />
      </ol>
      <NuxtLink
        to="https://www.linkedin.com/in/haythamasalama/"
        class="link-muted mt-2 inline-flex min-h-11 items-center gap-2 text-sm"
      >
        <Icon name="brand:linkedin" class="size-[15px] text-mark" />
        Full résumé on LinkedIn ↗
      </NuxtLink>
    </section>

    <section aria-labelledby="education" class="pt-14">
      <SectionTitle id="education" class="mb-2">
        Education
      </SectionTitle>
      <ol class="flex flex-col border-b border-line">
        <TimelineItem
          v-for="school in data?.education"
          :key="school.id"
          :title="school.school"
          :period="school.period"
          :subtitle="school.degree"
          :mark="school.mark"
        />
      </ol>
    </section>

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
              <h4 class="text-base leading-8 font-medium">
                {{ project.title }}
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
