<script setup lang="ts">
  const { as = 'h2', id } = defineProps<{
    as?: 'h2' | 'h3';
    /** With an id, the title links to its own section (`/about#experience`). */
    id?: string;
  }>();
</script>

<template>
  <component :is="as" :id="id" class="eyebrow">
    <AnchorLink v-if="id" :target="id">
      <slot />
    </AnchorLink>
    <slot v-else />
  </component>
</template>
