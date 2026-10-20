<script setup lang="ts">
  usePageSeo({
    title: 'Open source',
    description: 'Code Haytham A. Salama has shipped to open-source projects: on the Nuxt UI team, with pull requests to Laravel, Nuxt, Uptime Kuma and the Vue ecosystem, synced from GitHub.',
    schema: 'CollectionPage'
  });

  const profileUrl = 'https://github.com/Haythamasalama';

  const { live, activity, maintained, featured, projects, reach, issueRepos, discussions, created } = await useOpenSource();

  const spotlight = computed(() => maintained.value[0]);
  const rank = computed(() => spotlight.value?.github?.rank);

  const role = computed(() => rank.value
    ? `On the Nuxt UI team as its #${rank.value} contributor`
    : 'On the Nuxt UI team');

  /** Where each name under "Contributed to" leads on this page. */
  function anchorOf (entry: (typeof featured.value)[number]) {
    if (entry.kind === 'maintainer') {
      return 'spotlight';
    }

    return entry.kind === 'contributor' ? slugify(entry.repo) : 'elsewhere';
  }

  const stats = computed(() => [
    reach.value && { value: formatCount(reach.value), label: 'stars on projects I’ve contributed to' },
    activity.value && { value: `${activity.value.totals.pullRequests}`, label: 'merged pull requests' },
    activity.value && { value: `${activity.value.totals.repositories}`, label: 'repositories' },
    rank.value && { value: `#${rank.value}`, label: `all-time contributor to ${spotlight.value?.name}` }
  ].filter(stat => !!stat));

  const spotlightStats = computed(() => [
    rank.value && { label: 'All-time rank', value: `#${rank.value}` },
    spotlight.value?.github?.commits && { label: 'Contributions', value: `${spotlight.value.github.commits}` },
    ...spotlight.value?.stats ?? []
  ].filter(stat => !!stat));

  const latest = computed(() => spotlight.value?.github?.pullRequests.slice(0, 3) ?? []);

  /** Pull requests shown per project before "more on GitHub". */
  const PREVIEW = 3;
</script>

<template>
  <div>
    <section aria-labelledby="title" class="pt-16 md:pt-[88px]">
      <p class="eyebrow">
        Open source
      </p>
      <h1
        id="title"
        class="mt-4 max-w-[720px] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]"
      >
        Code I’ve <span class="text-gradient">shipped</span> to the projects other developers build on.
      </h1>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        {{ role }}, with pull requests to Laravel, Nuxt and Uptime Kuma.
      </p>

      <div v-if="featured.length" class="mt-8 flex flex-wrap items-center gap-2.5">
        <span class="eyebrow mr-1 w-full sm:w-auto">Contributed to</span>
        <NuxtLink
          v-for="entry in featured"
          :key="entry.id"
          :to="{ hash: `#${anchorOf(entry)}` }"
          class="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-edge py-1.5 pr-4 pl-1.5 text-sm transition-colors hover:bg-surface"
        >
          <img
            v-if="!entry.icon && entry.avatar"
            :src="entry.avatar"
            alt=""
            width="30"
            height="30"
            class="avatar-mono size-[30px] rounded-full"
          >
          <span v-else class="flex size-[30px] items-center justify-center rounded-full bg-line text-mark">
            <Icon :name="entry.icon ?? 'lucide:git-pull-request'" class="size-4" />
          </span>
          {{ entry.name ?? entry.repo }}
        </NuxtLink>
      </div>

      <dl v-if="stats.length" class="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse justify-end gap-1">
          <dt class="text-[13px] leading-snug text-faint">
            {{ stat.label }}
          </dt>
          <dd class="font-mono text-2xl font-medium md:text-[30px]">
            {{ stat.value }}
          </dd>
        </div>
      </dl>
      <p v-if="activity" class="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-faint">
        <Icon name="lucide:refresh-cw" class="size-3" />
        Synced from GitHub <time :datetime="activity.fetchedAt">{{ formatDay(activity.fetchedAt) }}</time>
      </p>
    </section>

    <p v-if="!live" class="mt-8 rounded-xl border border-dashed border-line px-5 py-4 text-[15px] text-soft">
      GitHub didn’t answer just now, so the latest numbers and pull request titles are missing here. They’re all on
      <NuxtLink :to="profileUrl" class="link-underline">my GitHub profile</NuxtLink>.
    </p>

    <section v-if="spotlight" aria-labelledby="spotlight" class="pt-14 md:pt-20">
      <SectionTitle id="spotlight" class="mb-4">
        Spotlight
      </SectionTitle>
      <article class="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-4 md:p-5">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <img
              v-if="spotlight.avatar"
              :src="spotlight.avatar"
              alt=""
              width="40"
              height="40"
              class="avatar-mono size-9 rounded-lg md:size-10 md:rounded-[10px]"
            >
            <div class="flex flex-col gap-0.5">
              <h3 class="text-base font-semibold tracking-[-0.01em] md:text-[17px]">
                <NuxtLink :to="spotlight.url" class="link">
                  {{ spotlight.name ?? spotlight.repo }}
                </NuxtLink>
              </h3>
              <span class="font-mono text-xs text-faint">{{ spotlight.repo }}</span>
            </div>
          </div>
          <span
            v-if="spotlight.badge"
            class="border-gradient inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-mono text-[10px] font-medium tracking-[0.1em] uppercase"
          >
            <span class="size-1.5 rounded-full bg-linear-135 from-iris-500 to-azure-500" aria-hidden="true" />
            {{ spotlight.badge }}
          </span>
        </div>

        <p v-if="spotlight.note" class="text-sm leading-[1.65] text-soft">
          {{ spotlight.note }}
        </p>

        <dl v-if="spotlightStats.length" class="grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-4">
          <div v-for="stat in spotlightStats" :key="stat.label" class="flex flex-col-reverse justify-end gap-0.5">
            <dt class="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">
              {{ stat.label }}
            </dt>
            <dd class="font-mono text-lg font-medium">
              {{ stat.value }}
            </dd>
          </div>
        </dl>

        <div v-if="latest.length" class="flex flex-col">
          <span class="mb-1 font-mono text-[11px] tracking-[0.06em] text-faint uppercase">Latest merged</span>
          <NuxtLink
            v-for="pr in latest"
            :key="pr.url"
            :to="pr.url"
            class="link-muted flex min-h-9 items-baseline gap-3 py-1 text-[13px]"
          >
            <Icon name="lucide:git-merge" class="relative top-0.5 size-3.5 shrink-0" />
            <span class="shrink-0 font-mono text-xs text-faint">#{{ pr.number }}</span>
            <span class="min-w-0 flex-auto">{{ pr.title }}</span>
            <time :datetime="pr.date" class="hidden shrink-0 font-mono text-xs text-faint sm:block">
              {{ formatMonth(pr.date) }}
            </time>
          </NuxtLink>
        </div>

        <div v-if="spotlight.links?.length" class="-mt-1 -mb-2 flex flex-wrap gap-x-5">
          <NuxtLink
            v-for="link in spotlight.links"
            :key="link.to"
            :to="link.to"
            class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px] first:text-fg"
          >
            {{ link.label }}
            <Icon name="lucide:arrow-up-right" class="size-3.5" />
          </NuxtLink>
        </div>
      </article>
    </section>

    <section v-if="projects.length" aria-labelledby="projects" class="pt-14 md:pt-20">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <SectionTitle id="projects">
          Projects I’ve contributed to
        </SectionTitle>
        <span v-if="live" class="font-mono text-xs text-faint">biggest project first</span>
      </div>
      <ol class="mt-3 flex flex-col">
        <li
          v-for="project in projects"
          :id="project.id"
          :key="project.id"
          class="flex items-start gap-4 py-3.5"
        >
          <LogoTile :mark="project.mark" :size="40" />
          <div class="flex min-w-0 flex-auto flex-col gap-0.5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span class="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <NuxtLink :to="project.url" class="link text-base font-semibold">
                  {{ project.name }}
                </NuxtLink>
                <span class="font-mono text-[13px] text-faint">{{ project.repo }}</span>
              </span>
              <span
                v-if="project.stars !== undefined"
                class="inline-flex items-center gap-1 font-mono text-[13px] text-faint"
                :title="`${project.stars} stars`"
              >
                <Icon name="lucide:star" class="size-3" />
                {{ formatCount(project.stars) }}
              </span>
            </div>
            <p v-if="project.description" class="text-sm text-muted">
              {{ project.description }}
            </p>
            <ul class="mt-1 flex flex-col">
              <li v-for="pr in project.pullRequests.slice(0, PREVIEW)" :key="pr.url">
                <NuxtLink :to="pr.url" class="link-muted flex min-h-9 items-baseline gap-2.5 py-1.5 text-sm">
                  <span class="shrink-0 font-mono text-xs text-faint">#{{ pr.number }}</span>
                  <span>{{ pr.title || 'Pull request' }}</span>
                  <span v-if="pr.state" class="shrink-0 font-mono text-[11px] text-faint">{{ pr.state }}</span>
                </NuxtLink>
              </li>
              <li v-if="project.pullRequests.length > PREVIEW">
                <NuxtLink :to="project.allUrl" class="link-muted inline-flex min-h-9 items-center font-mono text-xs">
                  +{{ project.pullRequests.length - PREVIEW }} more on GitHub ↗
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </section>

    <section v-if="issueRepos.length || discussions.length || created.length" aria-labelledby="elsewhere" class="pt-14 md:pt-[72px]">
      <SectionTitle id="elsewhere" class="mb-2">
        Issues, discussions &amp; projects I started
      </SectionTitle>
      <ul class="flex flex-col">
        <li
          v-for="repo in issueRepos"
          :key="repo.name"
          class="flex min-h-12 flex-col justify-center gap-0.5 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span class="inline-flex min-w-0 items-center gap-3">
            <Icon name="lucide:circle-dot" class="size-[15px] shrink-0 text-faint" />
            <NuxtLink :to="repo.url" class="link truncate font-mono text-sm">
              {{ repo.name }}
            </NuxtLink>
          </span>
          <span class="pl-[27px] font-mono text-[13px] text-faint sm:pl-0">
            {{ repo.issues.length === 1 ? 'issue' : 'issues' }}
            <template v-for="(issue, index) in repo.issues.slice(0, PREVIEW)" :key="issue.url">
              <template v-if="index">
                ·
              </template>
              <NuxtLink :to="issue.url" class="link-muted" :title="issue.title">#{{ issue.number }}</NuxtLink>
            </template>
            <template v-if="repo.issues.length > PREVIEW">
              · <NuxtLink :to="repo.issuesUrl" class="link-muted">+{{ repo.issues.length - PREVIEW }}</NuxtLink>
            </template>
          </span>
        </li>
        <li
          v-for="entry in discussions"
          :key="entry.id"
          class="flex min-h-12 flex-col justify-center gap-0.5 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span class="inline-flex items-center gap-3">
            <Icon name="lucide:message-square" class="size-[15px] shrink-0 text-faint" />
            <NuxtLink :to="entry.url" class="link font-mono text-sm">
              {{ entry.name ?? entry.repo }}
            </NuxtLink>
          </span>
          <span class="pl-[27px] font-mono text-[13px] text-faint sm:pl-0">
            {{ entry.links?.length === 1 ? 'discussion' : 'discussions' }}
            <template v-for="(link, index) in entry.links" :key="link.to">
              <template v-if="index">
                ·
              </template>
              <NuxtLink :to="link.to" class="link-muted">{{ link.label }}</NuxtLink>
            </template>
          </span>
        </li>
        <li
          v-for="entry in created"
          :key="entry.id"
          class="flex min-h-12 flex-col justify-center gap-0.5 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span class="inline-flex items-center gap-3">
            <Icon name="lucide:plus" class="size-[15px] shrink-0 text-faint" />
            <NuxtLink :to="entry.url" class="link font-mono text-sm">
              {{ entry.name ?? entry.repo }}
            </NuxtLink>
          </span>
          <span class="pl-[27px] text-[13px] text-faint sm:pl-0">{{ ['Started', entry.description].filter(Boolean).join(' · ') }}</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="start" class="pt-14 md:pt-[72px]">
      <SectionTitle id="start" class="mb-3">
        Getting started?
      </SectionTitle>
      <p class="text-[15px] leading-[1.7] text-muted">
        What worked for me, from a first issue to a merged pull request.
      </p>
      <div class="mt-2 flex flex-wrap gap-x-[22px]">
        <GoLink to="/articles/software-engineering/how_to_contribute_to_open_source_projects">
          How to contribute to open source
        </GoLink>
        <NuxtLink :to="profileUrl" class="link-muted inline-flex min-h-11 items-center gap-2 text-sm">
          <Icon name="simple-icons:github" class="size-4 text-mark" />
          Follow me on GitHub ↗
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
