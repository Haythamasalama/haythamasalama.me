<script setup lang="ts">
  const { strong = false, size = 'sm' } = defineProps<{
    label: string;
    icon?: string;
    /** Brighter border and text, for the stack used every day. */
    strong?: boolean;
    size?: 'sm' | 'md';
  }>();
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border text-[13px] leading-[18px]"
    :class="[
      strong ? 'border-chip text-fg' : 'border-line text-soft',
      size === 'md' ? 'gap-[7px] py-[5px] pr-[11px] pl-[9px]' : 'gap-1.5 py-1 pr-2.5 pl-2'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="size-3.5 text-mark" />
    {{ label }}
  </span>
</template>
