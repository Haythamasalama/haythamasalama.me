<script setup lang="ts">
  /** Turns a heading's text into a link to the heading, so the section can be shared as `/page#id`. */
  defineProps<{
    target: string;
  }>();
</script>

<template>
  <NuxtLink :to="{ hash: `#${target}` }" class="group/anchor inline-flex items-baseline gap-1.5 text-inherit transition-colors hover:text-fg">
    <slot />
    <span
      class="text-faint opacity-0 transition-opacity group-hover/anchor:opacity-100 group-focus-visible/anchor:opacity-100"
      aria-hidden="true"
    >#</span>
  </NuxtLink>
</template>
