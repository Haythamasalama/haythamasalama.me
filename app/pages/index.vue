<script setup lang="ts">
  import { skillGroups } from '#shared/skill-groups';

  const { site, socials } = useAppConfig();

  usePageSeo({
    title: site.name,
    description: site.description
  });

  const { data } = await useAsyncData('home', async () => {
    const [projects, technologies, articles, uses] = await Promise.all([
      queryCollection('projects').all(),
      queryCollection('technologies').where('home', '=', true).order('order', 'ASC').all(),
      queryCollection('articles').order('date', 'DESC').limit(3).all(),
      queryCollection('uses').all()
    ]);

    return {
      work: projects
        .filter(project => project.highlight)
        .sort((a, b) => a.highlight!.order - b.highlight!.order),
      stack: technologies,
      articles,
      desk: uses
        .flatMap(section => section.items)
        .filter(item => item.desk)
        .sort((a, b) => a.desk! - b.desk!)
    };
  });

  // Live from GitHub; falls back to the maintained and created projects alone.
  const { highlights: openSource } = await useOpenSource();

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

      <p
        class="mt-6 flex animate-rise items-start gap-2.5 text-sm leading-[1.55] text-muted [animation-delay:.35s] md:mt-7 md:inline-flex md:items-center md:gap-3 md:rounded-full md:border md:border-line md:py-2 md:pr-3.5 md:pl-3"
      >
        <span
          class="mt-[7px] inline-block size-2 shrink-0 animate-live rounded-full bg-linear-135 from-iris-500 to-azure-500 md:mt-0"
          aria-hidden="true"
        />
        <span>
          <span class="text-fg">Now</span> — at
          <NuxtLink to="https://winch.sa/" class="link-underline">WINCH</NuxtLink>, remote from Cairo, and building
          <NuxtLink to="https://runarks.com/" class="link-underline">Runarks</NuxtLink> on the side
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
          to="/projects"
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
      <p class="mb-3 text-[15px] leading-[1.65] text-muted">
        I like fixing the tools I depend on.
      </p>
      <div class="flex flex-col">
        <NuxtLink
          v-for="item in openSource"
          :key="item.key"
          :to="item.url"
          class="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
        >
          <img
            :src="item.avatar"
            alt=""
            width="22"
            height="22"
            loading="lazy"
            class="avatar-mono size-[22px] shrink-0 rounded-md"
          >
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

    <section aria-labelledby="vision" class="pt-16">
      <SectionTitle id="vision" class="mb-4">
        Where I'm headed
      </SectionTitle>
      <p class="text-[17px] leading-[1.7] text-soft">
        For years I've built platforms that move money and deliveries. My next step is
        <span class="text-fg">a master's degree in artificial intelligence</span>, to build systems that learn from the
        data these platforms already hold. Along the way, I'll keep giving back to the open-source tools I build on.
      </p>
      <GoLink to="/about" class="mt-2">
        My story
      </GoLink>
    </section>

    <section aria-labelledby="desk" class="pt-16">
      <SectionTitle id="desk" class="mb-4">
        On my desk
      </SectionTitle>
      <ul aria-label="Daily tools" class="flex flex-wrap gap-2">
        <li v-for="item in data?.desk" :key="item.name" :title="item.name">
          <LogoTile :mark="item.mark" :size="44" />
          <span class="sr-only">{{ item.name }}</span>
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
