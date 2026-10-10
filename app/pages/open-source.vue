<script setup lang="ts">
  usePageSeo({
    title: 'Open source',
    description: 'Pull requests, issues and discussions Haytham A. Salama has contributed to open-source projects like Nuxt UI and Laravel, synced from GitHub.'
  });

  const profileUrl = 'https://github.com/Haythamasalama';

  const { live, activity, repos, maintained, discussions, created } = await useOpenSource();

  const withPullRequests = computed(() => repos.value.filter(repo => repo.pullRequests.length));

  const withIssues = computed(() => repos.value
    .filter(repo => repo.issues.length)
    .sort((a, b) => b.issues.length - a.issues.length || b.stars - a.stars));

  const stats = computed(() => activity.value
    ? [
      { icon: 'lucide:git-merge', value: activity.value.totals.pullRequests, label: 'merged pull requests' },
      { icon: 'lucide:book-marked', value: activity.value.totals.repositories, label: 'repositories' },
      { icon: 'lucide:circle-dot', value: activity.value.totals.issues, label: 'issues' }
    ]
    : []);
</script>

<template>
  <div>
    <PageHeader title="Open source">
      <p>
        Almost everything I ship stands on open source, so I try to give back: fixing the bugs I run into, sharpening
        components I use, and answering questions where I can.
      </p>
    </PageHeader>
    <p v-if="activity" class="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px] text-faint">
      <span v-for="stat in stats" :key="stat.label" class="inline-flex items-center gap-1.5">
        <Icon :name="stat.icon" class="size-3.5" />
        <span class="text-fg">{{ stat.value }}</span> {{ stat.label }}
      </span>
      <span class="inline-flex items-center gap-1.5">
        <Icon name="lucide:refresh-cw" class="size-3.5" />
        Synced from GitHub <time :datetime="activity.fetchedAt">{{ formatDay(activity.fetchedAt) }}</time>
      </span>
    </p>

    <p v-if="!live" class="mt-8 rounded-xl border border-dashed border-line px-5 py-4 text-[15px] text-soft">
      GitHub didn’t answer just now, so my pull requests and issues are missing here. They’re all on
      <NuxtLink :to="profileUrl" class="link-underline">my GitHub profile</NuxtLink>.
    </p>

    <section v-if="maintained.length" aria-labelledby="maintainer" class="pt-14">
      <SectionTitle id="maintainer" class="mb-4">
        Maintainer
      </SectionTitle>
      <article
        v-for="entry in maintained"
        :key="entry.id"
        class="flex items-start gap-4 rounded-[14px] border border-line p-5"
      >
        <img
          :src="entry.avatar"
          alt=""
          width="44"
          height="44"
          class="avatar-mono size-11 shrink-0 rounded-[11px]"
        >
        <div class="flex min-w-0 flex-auto flex-col gap-2">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3>
              <NuxtLink :to="entry.url" class="link font-mono text-base font-medium">
                {{ entry.repo }}
              </NuxtLink>
            </h3>
            <span class="font-mono text-xs text-faint">{{ entry.role }}</span>
          </div>
          <p class="text-[15px] leading-[1.65] text-muted">
            {{ entry.note }}
          </p>
          <dl v-if="entry.github" class="mt-1 flex flex-wrap gap-x-6 gap-y-2">
            <div v-if="entry.github.rank" class="flex flex-col">
              <dt class="font-mono text-[11px] tracking-wide text-faint uppercase">
                Contributor rank
              </dt>
              <dd class="text-gradient font-mono text-xl font-medium">
                #{{ entry.github.rank }}
              </dd>
            </div>
            <div v-if="entry.github.commits" class="flex flex-col">
              <dt class="font-mono text-[11px] tracking-wide text-faint uppercase">
                Commits
              </dt>
              <dd class="font-mono text-xl font-medium">
                {{ entry.github.commits }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="font-mono text-[11px] tracking-wide text-faint uppercase">
                Merged PRs
              </dt>
              <dd class="font-mono text-xl font-medium">
                {{ entry.github.pullRequests.length }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="font-mono text-[11px] tracking-wide text-faint uppercase">
                Stars
              </dt>
              <dd class="font-mono text-xl font-medium">
                {{ formatCount(entry.github.stars) }}
              </dd>
            </div>
          </dl>
          <div v-if="entry.links?.length" class="flex flex-wrap gap-x-5">
            <NuxtLink
              v-for="link in entry.links"
              :key="link.to"
              :to="link.to"
              class="link-muted inline-flex min-h-11 items-center text-sm"
            >
              {{ link.label }} ↗
            </NuxtLink>
          </div>
        </div>
      </article>
    </section>

    <section v-if="withPullRequests.length" aria-labelledby="pull-requests" class="pt-14">
      <div class="mb-1 flex items-baseline justify-between gap-4">
        <SectionTitle id="pull-requests">
          Merged pull requests
        </SectionTitle>
        <span class="font-mono text-xs text-faint">by repository</span>
      </div>
      <ol class="border-b border-line">
        <RepoActivity
          v-for="(repo, index) in withPullRequests"
          :key="repo.name"
          :repo="repo"
          :items="repo.pullRequests"
          :all-url="repo.pullRequestsUrl"
          :summary="`${repo.pullRequests.length} merged`"
          :position="index + 1"
        />
      </ol>
    </section>

    <section v-if="withIssues.length" aria-labelledby="issues" class="pt-14">
      <SectionTitle id="issues" class="mb-1">
        Issues
      </SectionTitle>
      <ul class="border-b border-line">
        <RepoActivity
          v-for="repo in withIssues"
          :key="repo.name"
          :repo="repo"
          :items="repo.issues"
          :all-url="repo.issuesUrl"
          :summary="plural(repo.issues.length, 'issue')"
        />
      </ul>
    </section>

    <section v-if="discussions.length || created.length" aria-labelledby="elsewhere" class="pt-14">
      <SectionTitle id="elsewhere" class="mb-1">
        Discussions &amp; projects I started
      </SectionTitle>
      <ul class="border-b border-line">
        <li
          v-for="entry in [...discussions, ...created]"
          :key="entry.id"
          class="flex items-center gap-3.5 border-t border-line"
        >
          <img
            :src="entry.avatar"
            alt=""
            width="32"
            height="32"
            loading="lazy"
            class="avatar-mono size-8 shrink-0 rounded-lg"
          >
          <span class="flex min-w-0 flex-auto flex-wrap items-center justify-between gap-x-4">
            <NuxtLink :to="entry.url" class="link inline-flex min-h-12 items-center font-mono text-sm">
              {{ entry.repo }}
            </NuxtLink>
            <span v-if="entry.links?.length" class="flex gap-3.5 font-mono text-[13px]">
              <NuxtLink
                v-for="link in entry.links"
                :key="link.to"
                :to="link.to"
                class="link-muted inline-flex min-h-11 items-center"
              >
                {{ link.label }}
              </NuxtLink>
            </span>
            <span v-else-if="entry.note" class="text-[13px] text-faint">{{ entry.note }}</span>
          </span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="start" class="pt-14">
      <SectionTitle id="start" class="mb-3">
        Getting started?
      </SectionTitle>
      <p class="text-[15px] leading-[1.7] text-muted">
        I wrote down what worked for me across six projects in 2023 — from good first issues to getting a pull request
        merged.
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
