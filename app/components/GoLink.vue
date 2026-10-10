<script setup lang="ts">
  const { external = false } = defineProps<{
    to: string;
    /** Show a ↗ instead of → for links that leave the site. */
    external?: boolean;
  }>();
</script>

<template>
  <NuxtLink :to="to" class="go link-muted inline-flex min-h-11 items-center text-sm">
    <slot />
    <span class="arrow" aria-hidden="true">{{ external ? '↗' : '→' }}</span>
  </NuxtLink>
</template>
