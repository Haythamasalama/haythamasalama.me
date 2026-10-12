<script setup lang="ts">
  import { logos } from '~/utils/logos';

  usePageSeo({
    title: 'Projects',
    description: 'What Haytham A. Salama has built and shipped, from a physics app in high school to fintech and logistics platforms today.'
  });

  const { data } = await useAsyncData('projects', async () => {
    const [list, pages] = await Promise.all([
      queryCollection('projects').all(),
      queryCollection('projectPages').select('path').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    // Newest first; within a year, by the card's order. A project has a page when
    // content/projects holds a .md with its file name.
    return list
      .sort((a, b) => b.year - a.year || a.order - b.order)
      .map(project => ({
        ...project,
        anchor: slugify(project.title.split(' · ')[0]!),
        page: paths.has(`/${project.stem}`) ? `/${project.stem}` : undefined
      }));
  });

  const projects = computed(() => data.value ?? []);
  const caseStudies = computed(() => projects.value.filter(project => project.page));
  const earlier = computed(() => projects.value.filter(project => !project.page));

  /** What I'm building now: the newest project still running, shown on its own. */
  const spotlight = computed(() => caseStudies.value.find(project => project.context?.includes('now')));
  const listed = computed(() => caseStudies.value.filter(project => project !== spotlight.value));

  /**
   * One chip per company or product with a logo, linking to its first project below. A card whose
   * context starts with a company that has a logo ("Faris Petrol · …") counts under that company.
   */
  const builtAt = computed(() => {
    const chips = new Map<string, { anchor: string; mark: typeof caseStudies.value[number]['mark']; name: string }>();

    for (const project of caseStudies.value) {
      const company = project.context?.split(' · ')[0];
      const logo = company && Object.entries(logos).find(([, asset]) => asset.name.startsWith(company));
      const chip = logo
        ? { name: company, mark: { logo: logo[0] } }
        : project.mark.logo ? { name: project.title.split(' · ')[0]!, mark: project.mark } : undefined;

      if (chip && !chips.has(chip.name)) chips.set(chip.name, { ...chip, anchor: project.anchor });
    }

    return [...chips.values()];
  });
</script>

<template>
  <div>
    <section aria-labelledby="title" class="pt-16 md:pt-[88px]">
      <p class="eyebrow">
        Projects
      </p>
      <h1
        id="title"
        class="mt-4 max-w-[720px] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]"
      >
        Systems I’ve <span class="text-gradient">built</span> for the teams that run on them.
      </h1>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        From a physics app in high school to the fintech and logistics platforms I work on today, each with what I did
        and how it is built.
      </p>

      <div v-if="builtAt.length" class="mt-8 flex flex-wrap items-center gap-2.5">
        <span class="eyebrow mr-1 w-full sm:w-auto">Built at</span>
        <NuxtLink
          v-for="item in builtAt"
          :key="item.anchor"
          :to="{ hash: `#${item.anchor}` }"
          class="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-edge py-1.5 pr-4 pl-1.5 text-sm transition-colors hover:bg-surface"
        >
          <LogoTile :mark="item.mark" :size="30" />
          {{ item.name }}
        </NuxtLink>
      </div>
    </section>

    <section v-if="spotlight" aria-labelledby="spotlight" class="pt-14 md:pt-20">
      <SectionTitle id="spotlight" class="mb-4">
        Building now
      </SectionTitle>
      <article
        :id="spotlight.anchor"
        class="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-4 md:p-5"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <LogoTile :mark="spotlight.mark" :size="40" />
            <div class="flex flex-col gap-0.5">
              <h2 class="text-base font-semibold tracking-[-0.01em] md:text-[17px]">
                <NuxtLink :to="spotlight.page" class="link">
                  {{ spotlight.title }}
                </NuxtLink>
              </h2>
              <span class="font-mono text-xs text-faint">{{ spotlight.context }}</span>
            </div>
          </div>
          <span
            class="border-gradient inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-mono text-[10px] font-medium tracking-[0.1em] uppercase"
          >
            <span class="size-1.5 animate-live rounded-full bg-linear-135 from-iris-500 to-azure-500" aria-hidden="true" />
            Now
          </span>
        </div>
        <p class="text-sm leading-[1.65] text-soft">
          {{ spotlight.description }}
        </p>
        <div class="-mt-1 -mb-2 flex flex-wrap gap-x-5">
          <GoLink :to="spotlight.page!" class="text-[13px] text-fg">
            About the project
          </GoLink>
          <NuxtLink
            v-for="link in spotlight.links"
            :key="link.to"
            :to="link.to"
            class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
          >
            {{ link.label }}
            <Icon name="lucide:arrow-up-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </article>
    </section>

    <section aria-labelledby="case-studies" class="pt-14 md:pt-20">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <SectionTitle id="case-studies">
          Case studies
        </SectionTitle>
        <span class="font-mono text-xs text-faint">newest first</span>
      </div>
      <ol class="mt-3 flex flex-col">
        <li
          v-for="project in listed"
          :id="project.anchor"
          :key="project.id"
          class="flex items-start gap-4 py-3.5"
        >
          <LogoTile :mark="project.mark" :size="40" />
          <div class="flex min-w-0 flex-auto flex-col gap-0.5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <NuxtLink :to="project.page" class="link text-base font-semibold">
                {{ project.title }}
              </NuxtLink>
              <span class="font-mono text-[13px] text-faint">{{ project.year }}</span>
            </div>
            <span class="font-mono text-xs text-faint">{{ project.context }}</span>
            <p class="mt-1 text-sm leading-[1.6] text-muted">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-x-5">
              <GoLink :to="project.page!" class="text-[13px]">
                About the project
              </GoLink>
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
      </ol>
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
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
