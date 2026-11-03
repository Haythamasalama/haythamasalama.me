<script setup lang="ts">
  import type { Mark } from '#shared/types/mark';

  const { external = false } = defineProps<{
    mark?: Mark;
    title: string;
    meta?: string;
    /** Without it the row is plain text, for an item with no page of its own. */
    to?: string;
    /** Show a ↗ instead of → for links that leave the site. */
    external?: boolean;
  }>();

  const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="group flex items-start gap-3.5 px-2 py-4"
    :class="to && 'transition-colors hover:bg-surface'"
  >
    <LogoTile :mark="mark" :size="36" />
    <span class="flex min-w-0 flex-auto flex-col gap-0.5">
      <span class="flex flex-wrap items-baseline gap-x-2">
        <span class="text-[15px] font-medium text-fg">{{ title }}</span>
        <span class="font-mono text-xs text-faint"><slot name="meta">{{ meta }}</slot></span>
      </span>
      <span class="text-sm leading-[1.55] text-muted"><slot /></span>
    </span>
    <span
      v-if="to"
      class="shrink-0 text-muted transition-colors group-hover:text-fg"
      aria-hidden="true"
    >{{ external ? '↗' : '→' }}</span>
  </component>
</template>
