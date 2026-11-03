<script setup lang="ts">
  import type { Mark } from '#shared/types/mark';

  const { external = false } = defineProps<{
    to: string;
    mark?: Mark;
    title: string;
    meta?: string;
    /** Show a ↗ instead of → for links that leave the site. */
    external?: boolean;
  }>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex h-full flex-col gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface md:p-5"
  >
    <span class="flex gap-3" :class="meta ? 'items-start' : 'items-center'">
      <LogoTile :mark="mark" :size="40" />
      <span class="flex min-w-0 flex-auto flex-col gap-0.5">
        <span class="flex justify-between gap-3" :class="meta ? 'items-baseline' : 'items-center'">
          <span class="text-[15px] leading-snug font-medium text-fg">{{ title }}</span>
          <span
            class="shrink-0 text-muted transition-colors group-hover:text-fg"
            aria-hidden="true"
          >{{ external ? '↗' : '→' }}</span>
        </span>
        <span v-if="meta" class="font-mono text-xs text-faint">{{ meta }}</span>
      </span>
    </span>
    <span v-if="$slots.default" class="text-sm leading-[1.6] text-muted"><slot /></span>
  </NuxtLink>
</template>
