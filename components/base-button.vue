<script lang="ts" setup>
  const NuxtLink = resolveComponent('NuxtLink');

  defineProps<Partial<{
    title: string;
    more?: boolean;
    to?: string;
  }>>();
</script>

<template>
  <Component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    class="btn group"
  >
    <slot>
      <span v-if="more" class="flex gap-x-0.5">
        More <IconArrowRight />
      </span>
      <span v-else>{{ title }}</span>
    </slot>
  </Component>
</template>
