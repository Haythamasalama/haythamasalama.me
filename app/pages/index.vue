<script setup lang="ts">
  import { skillGroups } from '#shared/skill-groups';

  const { site, socials } = useAppConfig();

  usePageSeo({
    title: site.name,
    description: site.description
  });

  const { data } = await useAsyncData('home', async () => {
    const [projects, pages, technologies, articles, uses] = await Promise.all([
      queryCollection('projects').all(),
      queryCollection('projectPages').select('path').all(),
      queryCollection('technologies').where('home', '=', true).order('order', 'ASC').all(),
      queryCollection('articles').order('date', 'DESC').limit(3).all(),
      queryCollection('uses').all()
    ]);

    const paths = new Set(pages.map(page => page.path));

    return {
      // Each links to its own page when it has one, otherwise to the list.
      work: projects
        .filter(project => project.highlight)
        .sort((a, b) => a.highlight!.order - b.highlight!.order)
        .map(project => ({ ...project, to: paths.has(`/${project.stem}`) ? `/${project.stem}` : '/projects' })),
      stack: technologies,
      articles,
      // Each links to its section on /uses, where the name and note are written out.
      desk: uses
        .flatMap(section => section.items.map(item => ({ ...item, to: `/uses#${slugify(section.title)}` })))
        .filter(item => item.desk)
        .sort((a, b) => a.desk! - b.desk!)
    };
  });

  // Live from GitHub; falls back to the maintained and created projects alone.
  const { highlights: openSource, summary: openSourceSummary, activity: openSourceActivity, reach: openSourceReach } = await useOpenSource();

  /** A few live numbers under the summary, when GitHub answered. */
  const openSourceStats = computed(() => [
    openSourceActivity.value && { value: `${openSourceActivity.value.totals.pullRequests}`, label: 'merged pull requests' },
    openSourceActivity.value && { value: `${openSourceActivity.value.totals.repositories}`, label: 'repositories' },
    openSourceReach.value && { value: formatCount(openSourceReach.value), label: 'stars on those projects' }
  ].filter(stat => !!stat));

  // The same groups as the About page, with a few tools from each.
  const stackRows = computed(() => skillGroups
    .map(group => ({ group, items: data.value?.stack.filter(tech => tech.group === group) ?? [] }))
    .filter(row => row.items.length));
</script>

<template>
  <div>
    <section aria-labelledby="intro" class="pt-16 md:pt-20">
      <div class="flex animate-rise items-center gap-4 [animation-delay:.05s]">
        <img
          class="photo size-[60px] shrink-0 rounded-full object-cover"
          src="/images/haytham.jpg"
          alt="Portrait of Haytham A. Salama"
          width="60"
          height="60"
          fetchpriority="high"
        >
        <div>
          <h1 id="intro" class="text-[28px] leading-tight font-semibold tracking-[-0.02em]">
            {{ site.name }}
          </h1>
          <p class="mt-1 font-mono text-[13px] text-faint">
            {{ site.role }}
          </p>
        </div>
      </div>

      <p class="mt-8 animate-rise text-[17px] leading-[1.7] text-soft [animation-delay:.15s]">
        I'm a
        <span class="text-gradient pr-0.5 font-serif text-[22px] italic">software engineer</span>
        who builds the systems behind logistics and fintech: the APIs, integrations and security that real operations
        depend on. I design them around the business with Domain-Driven Design, and I've been shipping software since
        2016.
      </p>
      <p class="mt-[18px] animate-rise text-[17px] leading-[1.7] text-soft [animation-delay:.25s]">
        AI is part of how I work every day. I plan, write and review code with agents like Claude Code and Cursor, and
        at WINCH I write the agents and skills our engineers code with.
      </p>
      <GoLink to="/about" class="mt-1 animate-rise [animation-delay:.3s]">
        More about me
      </GoLink>

      <p
        class="mt-4 flex w-fit animate-rise items-start gap-2.5 rounded-2xl border border-line py-2 pr-3.5 pl-3 text-sm leading-[1.55] text-muted [animation-delay:.35s] sm:items-center sm:gap-3 sm:rounded-full md:mt-3"
      >
        <span
          class="mt-[7px] inline-block size-2 shrink-0 animate-live rounded-full bg-linear-135 from-iris-500 to-azure-500 sm:mt-0"
          aria-hidden="true"
        />
        <span>
          <span class="text-fg">Now</span> · at
          <!-- Each logo sits on the text's baseline, and stays on the same line as its name. -->
          <span class="whitespace-nowrap"><span class="mr-1.5 inline-block align-[-1px] text-mark"><BrandLogo name="winch" :scale="0.6" /></span><NuxtLink to="https://winch.sa/" class="link-underline">WINCH</NuxtLink></span>,
          remote from Cairo, and building
          <span class="whitespace-nowrap"><span class="mr-1.5 inline-block align-[-1px] text-mark"><BrandLogo name="runarks" :scale="0.55" /></span><NuxtLink to="https://runarks.com/" class="link-underline">Runarks</NuxtLink></span>
          on the side
        </span>
      </p>

      <div class="mt-3.5 flex animate-rise flex-wrap gap-x-[22px] text-sm [animation-delay:.45s]">
        <NuxtLink
          v-for="social in socials"
          :key="social.label"
          :to="social.to"
          class="link-muted inline-flex min-h-11 items-center gap-2"
        >
          <Icon :name="social.icon" class="size-4 text-mark" />
          {{ social.label }}
        </NuxtLink>
      </div>
    </section>

    <section aria-labelledby="work" class="animate-rise pt-[72px] [animation-delay:.55s]">
      <SectionTitle id="work" class="mb-3">
        Selected work
      </SectionTitle>
      <div class="flex flex-col">
        <NuxtLink
          v-for="project in data?.work"
          :key="project.id"
          :to="project.to"
          class="-mx-3 flex items-start gap-3.5 rounded-[10px] p-3 transition-colors hover:bg-surface"
        >
          <LogoTile :mark="project.mark" :size="36" />
          <span class="flex min-w-0 flex-auto flex-col gap-1">
            <span class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span class="text-[15px] font-medium">{{ project.highlight!.title }}</span>
              <span class="font-mono text-xs text-faint">{{ project.highlight!.period }}</span>
            </span>
            <span class="text-sm leading-[1.55] text-muted">{{ project.highlight!.description }}</span>
          </span>
        </NuxtLink>
      </div>
      <GoLink to="/projects" class="mt-1">
        All projects
      </GoLink>
    </section>

    <section aria-labelledby="open-source" class="pt-16">
      <SectionTitle id="open-source" class="mb-3">
        Open source
      </SectionTitle>
      <p class="text-[15px] leading-[1.65] text-muted">
        {{ openSourceSummary || 'I like fixing the tools I depend on.' }}
      </p>
      <dl v-if="openSourceStats.length" class="mt-4 flex flex-wrap gap-x-8 gap-y-3">
        <div v-for="stat in openSourceStats" :key="stat.label" class="flex flex-col-reverse gap-0.5">
          <dt class="text-xs text-faint">
            {{ stat.label }}
          </dt>
          <dd class="font-mono text-lg font-medium">
            {{ stat.value }}
          </dd>
        </div>
      </dl>
      <div class="mt-3 flex flex-col">
        <NuxtLink
          v-for="item in openSource"
          :key="item.key"
          :to="item.url"
          class="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
        >
          <img
            v-if="!item.icon && item.avatar"
            :src="item.avatar"
            alt=""
            width="22"
            height="22"
            loading="lazy"
            class="avatar-mono size-[22px] shrink-0 rounded-md"
          >
          <span v-else class="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-line text-mark">
            <Icon :name="item.icon ?? 'lucide:git-pull-request'" class="size-3.5" />
          </span>
          <span class="flex min-w-0 flex-auto flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span class="font-mono text-sm">{{ item.name }}</span>
            <span class="text-[13px] text-faint">{{ item.note }}</span>
          </span>
        </NuxtLink>
      </div>
      <GoLink to="/open-source" class="mt-1">
        All contributions
      </GoLink>
    </section>

    <section aria-labelledby="skills" class="pt-16">
      <SectionTitle id="skills" class="mb-5">
        Skills &amp; stack
      </SectionTitle>
      <dl class="flex flex-col gap-3.5 text-[15px] leading-relaxed">
        <div v-for="row in stackRows" :key="row.group" class="flex flex-wrap gap-x-6 gap-y-1.5">
          <dt class="flex-[0_0_120px] font-mono text-xs leading-7 text-faint">
            {{ row.group }}
          </dt>
          <dd class="flex flex-[1_1_360px] flex-wrap gap-1.5">
            <TechChip
              v-for="tech in row.items"
              :key="tech.id"
              :label="tech.name"
              :icon="tech.icon"
            />
          </dd>
        </div>
      </dl>
      <GoLink to="/about#skills" class="mt-2">
        Skills in depth
      </GoLink>
    </section>

    <section aria-labelledby="blog" class="pt-16">
      <SectionTitle id="blog" class="mb-3">
        Blog
      </SectionTitle>
      <div class="flex flex-col">
        <NuxtLink
          v-for="article in data?.articles"
          :key="article.path"
          :to="article.path"
          class="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
        >
          <Icon :name="article.icon" class="size-4 shrink-0 text-mark" />
          <span class="flex min-w-0 flex-auto flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span class="text-[15px]">{{ article.title }}</span>
            <time :datetime="article.date" class="font-mono text-xs text-faint">{{ formatMonth(article.date) }}</time>
          </span>
        </NuxtLink>
      </div>
      <div class="mt-1 flex flex-wrap gap-x-[22px]">
        <GoLink to="/articles">
          All posts
        </GoLink>
        <GoLink to="/snippets">
          Code snippets
        </GoLink>
      </div>
    </section>

    <section aria-labelledby="desk" class="pt-16">
      <SectionTitle id="desk" class="mb-4">
        On my desk
      </SectionTitle>
      <ul aria-label="Daily tools" class="flex flex-wrap gap-2">
        <li v-for="(item, index) in data?.desk" :key="item.name">
          <NuxtLink :to="item.to" class="group/desk relative block rounded-[11px]">
            <LogoTile :mark="item.mark" :size="44" />
            <!-- A tooltip with the name, on hover and keyboard focus; the ends align to the edge so it never leaves the page. -->
            <span
              class="pointer-events-none absolute bottom-full z-10 mb-2 translate-y-1 rounded-md border border-line bg-raised px-2.5 py-1.5 text-xs whitespace-nowrap opacity-0 shadow-sm transition-[opacity,translate] group-hover/desk:translate-y-0 group-hover/desk:opacity-100 group-focus-visible/desk:translate-y-0 group-focus-visible/desk:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
              :class="index === 0 ? 'left-0' : index === data!.desk.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'"
            >
              <span class="text-fg">{{ item.name }}</span>
              <span class="text-faint"> · {{ item.note }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
      <div class="mt-2 flex flex-wrap gap-x-[22px]">
        <GoLink to="/uses">
          Everything I use
        </GoLink>
        <GoLink to="/tools">
          Tools I recommend
        </GoLink>
      </div>
    </section>
  </div>
</template>
