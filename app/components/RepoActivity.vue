<script setup lang="ts">
  /** One repository on /open-source: its latest pull requests or issues, with the rest a click away on GitHub. */
  const { repo, items, allUrl, summary, position, preview = 3 } = defineProps<{
    repo: OpenSourceRepo;
    items: OpenSourceItem[];
    /** All of them on github.com. */
    allUrl: string;
    /** Right-hand count, e.g. "26 merged". */
    summary: string;
    /** Place in the list, shown like a leaderboard. */
    position?: number;
    preview?: number;
  }>();
</script>

<template>
  <li class="border-t border-line py-3.5">
    <div class="flex items-center gap-3.5">
      <span
        v-if="position"
        class="hidden w-5 shrink-0 font-mono text-xs text-faint tabular-nums sm:block"
        aria-hidden="true"
      >{{ String(position).padStart(2, '0') }}</span>
      <img
        :src="repo.avatar"
        alt=""
        width="32"
        height="32"
        loading="lazy"
        class="avatar-mono size-8 shrink-0 rounded-lg"
      >
      <span class="flex min-w-0 flex-auto flex-wrap items-center justify-between gap-x-4">
        <span class="flex min-w-0 items-center gap-2.5">
          <NuxtLink :to="repo.url" class="link inline-flex min-h-11 items-center truncate font-mono text-sm">
            {{ repo.name }}
          </NuxtLink>
          <span class="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-faint" :title="`${repo.stars} stars`">
            <Icon name="lucide:star" class="size-3" />
            {{ formatCount(repo.stars) }}
          </span>
        </span>
        <span class="flex items-center gap-2 font-mono text-[13px] text-faint">
          <span v-if="position && repo.rank" class="text-soft">#{{ repo.rank }} contributor</span>
          <span v-if="position && repo.rank" aria-hidden="true">·</span>
          <span>{{ summary }}</span>
        </span>
      </span>
    </div>

    <!-- Indented to line up with the repository name. -->
    <ul class="flex flex-col pb-1 pl-[2.875rem]" :class="{ 'sm:pl-20': position }">
      <li v-for="item in items.slice(0, preview)" :key="item.url">
        <NuxtLink :to="item.url" class="link-muted flex min-h-9 items-baseline gap-2.5 py-1 text-sm">
          <span class="shrink-0 font-mono text-xs text-faint">#{{ item.number }}</span>
          <span class="truncate">{{ item.title }}</span>
        </NuxtLink>
      </li>
      <li v-if="items.length > preview">
        <NuxtLink :to="allUrl" class="link-muted inline-flex min-h-9 items-center font-mono text-xs">
          +{{ items.length - preview }} more on GitHub ↗
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>
