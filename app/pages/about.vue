<script setup lang="ts">
  const { site, socials } = useAppConfig();

  usePageSeo({
    title: 'About',
    description: 'Haytham A. Salama — senior full-stack engineer at WINCH. Experience, products, open source, skills and where his work with AI agents is going.'
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

  /** Whole years since the first full-time engineering job. */
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

  const groupOrder = ['AI & agents', 'Main stack', 'Back end', 'Front end', 'Testing', 'Deployment', 'Languages', 'Hardware'] as const;

  const skills = computed(() => groupOrder
    .map(group => ({ group, items: data.value?.technologies.filter(tech => tech.group === group) ?? [] }))
    .filter(row => row.items.length));

  // Step numbers fade from Iris to Azure down the list.
  const principles = [
    { title: 'Model the domain first', icon: 'lucide:boxes', color: '#7F7CF2', text: 'Software that mirrors the business stays easy to change. Anything that moves money or enforces rules gets Domain-Driven Design.' },
    { title: 'Tests are the spec', icon: 'lucide:flask-conical', color: '#6E89F0', text: 'For card charging and workshop systems I wrote the tests first, so behaviour was agreed before any code existed.' },
    { title: 'Speed is a feature', icon: 'lucide:zap', color: '#618EF8', text: 'Database redesigns, queues and rate limits are product work, not chores — users feel every one of them.' },
    { title: 'Lead across the stack', icon: 'lucide:users', color: '#4F9BFF', text: 'I\'m at my best between front-end, back-end and mobile teams, turning one plan into software that ships.' }
  ];
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

    <section aria-labelledby="pinned" class="pt-14">
      <SectionTitle id="pinned" class="mb-4">
        Pinned
      </SectionTitle>
      <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <li v-for="item in profile.pinned" :key="item.title">
          <NuxtLink
            :to="item.url"
            class="flex h-full flex-col gap-3 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
          >
            <span class="flex items-start justify-between gap-3">
              <LogoTile :mark="item.mark" :size="40" :icon-size="20" />
              <span class="flex items-center gap-2 pt-0.5 font-mono text-[11px] text-faint">
                <span
                  v-if="item.status"
                  class="rounded-[5px] border-gradient px-1.5 text-[9.5px] leading-4 tracking-[0.1em] uppercase"
                >
                  <span class="text-gradient">{{ item.status }}</span>
                </span>
                {{ item.label }}
              </span>
            </span>
            <span class="flex flex-col gap-1">
              <span class="text-[15px] font-medium">{{ item.title }}</span>
              <span class="text-sm leading-[1.55] text-muted">{{ item.description }}</span>
            </span>
            <span
              v-if="item.repo && findRepo(item.repo)"
              class="mt-auto flex flex-wrap gap-x-3 font-mono text-xs text-faint"
            >
              <span v-if="findRepo(item.repo)?.rank" class="text-soft">#{{ findRepo(item.repo)?.rank }} contributor</span>
              <span>{{ plural(findRepo(item.repo)?.pullRequests.length ?? 0, 'merged PR') }}</span>
              <span class="inline-flex items-center gap-1">
                <Icon name="lucide:star" class="size-3" />
                {{ formatCount(findRepo(item.repo)?.stars ?? 0) }}
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>
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
          :subtitle="job.detail ? `${job.role} · ${job.detail}` : job.role"
          :summary="job.summary"
          :highlights="job.highlights"
          :mark="job.mark"
        />
      </ol>
      <GoLink to="/work" class="mt-1">
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

    <section aria-labelledby="how" class="pt-14">
      <SectionTitle id="how" class="mb-2">
        How I work
      </SectionTitle>
      <ol class="border-b border-line">
        <li
          v-for="(principle, index) in principles"
          :key="principle.title"
          class="flex items-start gap-4 border-t border-line py-[18px]"
        >
          <LogoTile
            :mark="{ icon: principle.icon }"
            :size="40"
            :icon-size="20"
          />
          <span class="flex flex-col gap-1">
            <span class="flex items-baseline gap-2.5">
              <span class="font-mono text-xs" :style="{ color: principle.color }">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="text-base font-medium">{{ principle.title }}</span>
            </span>
            <span class="text-[15px] leading-[1.65] text-muted">{{ principle.text }}</span>
          </span>
        </li>
      </ol>
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
