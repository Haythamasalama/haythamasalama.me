<script setup lang="ts">
  const { site, socials } = useAppConfig();

  usePageSeo({
    title: 'About',
    description: 'Haytham A. Salama — senior software engineer at WINCH. Experience, products, open source, skills and where his work with AI agents is going.'
  });

  const { data } = await useAsyncData('about', async () => {
    const [profile, experience, education, technologies] = await Promise.all([
      queryCollection('profile').first(),
      queryCollection('experience').order('order', 'ASC').all(),
      queryCollection('education').order('order', 'ASC').all(),
      queryCollection('technologies').order('order', 'ASC').all()
    ]);

    return { profile, experience, education, technologies };
  });

  // Live from GitHub; the page still renders (as a 503) when GitHub is down.
  const { activity, repos, findRepo } = await useOpenSource();

  const profile = computed(() => data.value?.profile);

  /** Whole years since the first paid engineering work. */
  const yearsShipping = computed(() => {
    const [year = 0, month = 1] = (profile.value?.careerStart ?? '').split('-').map(Number);
    const now = new Date();

    return Math.floor((now.getUTCFullYear() * 12 + now.getUTCMonth() - (year * 12 + month - 1)) / 12);
  });

  const stats = computed(() => {
    const nuxtUi = findRepo('nuxt/ui');

    return [
      { value: `${yearsShipping.value}`, label: 'years shipping' },
      activity.value && { value: `${activity.value.totals.pullRequests}`, label: 'merged open-source PRs' },
      activity.value && { value: `${activity.value.totals.repositories}`, label: 'repositories contributed to' },
      nuxtUi?.rank && { value: `#${nuxtUi.rank}`, label: 'contributor to Nuxt UI' }
    ].filter(stat => !!stat);
  });

  const topRepos = computed(() => repos.value.filter(repo => repo.pullRequests.length).slice(0, 4));

  const groupOrder = ['AI & agents', 'Languages', 'Back end', 'Front end', 'Data', 'DevOps', 'IoT'] as const;

  const skills = computed(() => groupOrder
    .map(group => ({ group, items: data.value?.technologies.filter(tech => tech.group === group) ?? [] }))
    .filter(row => row.items.length));
</script>

<template>
  <div v-if="profile">
    <section aria-labelledby="name" class="pt-16 md:pt-20">
      <div class="flex flex-wrap items-center gap-x-7 gap-y-6">
        <img
          class="photo size-28 shrink-0 rounded-[28px] object-cover"
          src="/images/haytham.jpg"
          alt="Portrait of Haytham A. Salama"
          width="112"
          height="112"
          fetchpriority="high"
        >
        <div class="min-w-0 flex-[1_1_320px]">
          <h1 id="name" class="text-[28px] leading-tight font-semibold tracking-[-0.02em] md:text-[30px]">
            {{ site.name }}
          </h1>
          <p class="mt-1.5 text-[17px] text-soft">
            {{ profile.headline }}
          </p>
          <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-faint">
            <span class="inline-flex items-center gap-1.5">
              <Icon name="lucide:map-pin" class="size-3.5" />
              {{ profile.location }}
            </span>
            <span>{{ profile.focus }}</span>
          </p>
        </div>
      </div>

      <dl class="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-0.5 bg-bg px-4 py-3.5">
          <dt class="order-last text-[13px] leading-snug text-faint">
            {{ stat.label }}
          </dt>
          <dd class="font-mono text-xl font-medium">
            {{ stat.value }}
          </dd>
        </div>
      </dl>

      <div class="mt-3 flex flex-wrap gap-x-[22px] text-sm">
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

    <section aria-labelledby="about" class="pt-12">
      <SectionTitle id="about" class="mb-4">
        About
      </SectionTitle>
      <div class="flex flex-col gap-4 text-[16px] leading-[1.75] text-soft">
        <p v-for="paragraph in profile.about" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </section>

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
          :subtitle="job.role"
          :meta="[job.type, job.location, job.workplace]"
          :summary="job.summary"
          :highlights="job.highlights"
          :mark="job.mark"
        />
      </ol>
      <GoLink to="/projects" class="mt-1">
        Projects in detail
      </GoLink>
    </section>

    <section aria-labelledby="open-source" class="pt-14">
      <SectionTitle id="open-source" class="mb-2">
        Open source
      </SectionTitle>
      <ul v-if="topRepos.length" class="border-b border-line">
        <li v-for="repo in topRepos" :key="repo.name" class="flex items-center gap-3 border-t border-line">
          <img
            :src="repo.avatar"
            alt=""
            width="26"
            height="26"
            loading="lazy"
            class="avatar-mono size-[26px] shrink-0 rounded-[7px]"
          >
          <span class="flex min-w-0 flex-auto flex-wrap items-center justify-between gap-x-4">
            <NuxtLink :to="repo.url" class="link inline-flex min-h-12 items-center font-mono text-sm">
              {{ repo.name }}
            </NuxtLink>
            <span class="font-mono text-[13px] text-faint">
              <template v-if="repo.rank">#{{ repo.rank }} contributor · </template>
              {{ plural(repo.pullRequests.length, 'merged PR') }}
            </span>
          </span>
        </li>
      </ul>
      <div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span class="font-mono text-xs text-faint">Organizations</span>
        <ul class="flex gap-2">
          <li v-for="org in profile.organizations" :key="org.name">
            <NuxtLink :to="org.url" :title="org.name" class="block rounded-lg">
              <img
                :src="org.image"
                :alt="org.name"
                width="32"
                height="32"
                loading="lazy"
                class="avatar-mono size-8 rounded-lg border border-line"
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
      <GoLink to="/open-source" class="mt-2">
        All contributions
      </GoLink>
    </section>

    <section aria-labelledby="skills" class="pt-14">
      <SectionTitle id="skills" class="mb-5">
        Skills
      </SectionTitle>
      <dl class="flex flex-col gap-[18px]">
        <div v-for="row in skills" :key="row.group" class="flex flex-wrap gap-x-6 gap-y-2">
          <dt class="flex-[0_0_112px] font-mono text-xs leading-[30px] text-faint">
            {{ row.group }}
          </dt>
          <dd class="flex flex-[1_1_400px] flex-wrap gap-1.5">
            <TechChip
              v-for="tech in row.items"
              :key="tech.id"
              :label="tech.name"
              :icon="tech.icon"
              size="md"
            />
          </dd>
        </div>
      </dl>
    </section>

    <section aria-labelledby="education" class="pt-14">
      <SectionTitle id="education" class="mb-2">
        Education &amp; awards
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
        <TimelineItem
          v-for="award in profile.awards"
          :key="award.title"
          :title="award.title"
          :period="award.year"
          :subtitle="award.issuer"
          :summary="award.note"
          :mark="{ icon: 'lucide:award' }"
        />
      </ol>
    </section>

    <section aria-labelledby="vision" class="pt-14">
      <SectionTitle id="vision" class="mb-5">
        Vision
      </SectionTitle>
      <p class="font-serif text-[32px] leading-[1.25] tracking-[-0.005em] text-fg italic">
        {{ profile.vision.line }}
      </p>
      <p class="mt-5 text-[17px] leading-[1.7] text-soft">
        {{ profile.vision.text }}
      </p>
    </section>

    <section aria-labelledby="hello" class="pt-14">
      <SectionTitle id="hello" class="mb-3">
        Say hello
      </SectionTitle>
      <p class="text-[15px] leading-[1.7] text-muted">
        The quickest way to reach me is a message on LinkedIn or X.
      </p>
      <div class="mt-2 flex flex-wrap gap-x-[22px] text-sm">
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
  </div>
</template>
