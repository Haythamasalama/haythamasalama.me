<script setup lang="ts">
  const { as = 'h2' } = defineProps<{
    as?: 'h2' | 'h3';
  }>();
</script>

<template>
  <component :is="as" class="eyebrow mb-3">
    <slot />
  </component>
</template>
