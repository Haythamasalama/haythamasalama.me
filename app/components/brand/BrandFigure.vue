<script setup lang="ts">
  defineProps<{
    /** Lead-in, shown in the main text colour. */
    title: string;
    caption: string;
  }>();
</script>

<template>
  <figure class="flex flex-col gap-2.5">
    <slot />
    <figcaption class="text-sm leading-normal text-muted">
      <span class="text-fg">{{ title }}</span> {{ caption }}
    </figcaption>
  </figure>
</template>
