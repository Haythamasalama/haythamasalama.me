<script setup lang="ts">
  import type { Mark } from '#shared/types/mark';

  /** One row in the Experience / Education lists. */
  const props = defineProps<{
    title: string;
    to?: string;
    period: string;
    subtitle: string;
    /** A quiet line under the subtitle, joined with dots; empty values are skipped. */
    meta?: (string | undefined)[];
    summary?: string;
    /** LinkedIn-style bullet points under the summary. */
    highlights?: string[];
    mark: Mark;
  }>();

  /** The site's address next to the name, so it's clear where the link goes. */
  const domain = computed(() => props.to?.startsWith('http') ? new URL(props.to).hostname.replace(/^www\./, '') : null);

  const metaLine = computed(() => props.meta?.filter(Boolean).join(' · '));
</script>

<template>
  <li class="flex items-start gap-4 py-4">
    <LogoTile :mark="mark" :size="44" />
    <span class="flex min-w-0 flex-auto flex-col gap-1">
      <span class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <NuxtLink v-if="to" :to="to" class="group inline-flex flex-wrap items-baseline gap-x-2">
          <span class="link-underline text-base font-medium">{{ title }}</span>
          <span v-if="domain" class="font-mono text-xs text-faint transition-colors group-hover:text-soft">{{ domain }} ↗</span>
        </NuxtLink>
        <span v-else class="text-base font-medium">{{ title }}</span>
        <span class="font-mono text-xs text-faint">{{ period }}</span>
      </span>
      <span class="text-sm text-soft">{{ subtitle }}</span>
      <span v-if="metaLine" class="font-mono text-xs text-faint">{{ metaLine }}</span>
      <span v-if="summary" class="text-sm leading-relaxed text-muted">{{ summary }}</span>
      <ul v-if="highlights?.length" class="mt-1.5 flex flex-col gap-1.5">
        <li
          v-for="highlight in highlights"
          :key="highlight"
          class="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0.5 before:size-1 before:rounded-full before:bg-chip"
        >
          {{ highlight }}
        </li>
      </ul>
    </span>
  </li>
</template>
