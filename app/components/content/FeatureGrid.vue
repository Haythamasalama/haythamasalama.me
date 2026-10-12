<script setup lang="ts">
  /** What a product offers, two to a row: an icon, a short title and one sentence each. */
  defineProps<{
    items: { icon: string; title: string; text: string }[];
  }>();
</script>

<template>
  <ul class="not-prose my-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
    <li v-for="item in items" :key="item.title" class="flex gap-3.5">
      <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-edge bg-surface">
        <Icon :name="item.icon" class="size-4 text-mark" />
      </span>
      <span class="flex flex-col gap-1">
        <span class="text-[15px] font-medium text-fg">{{ item.title }}</span>
        <span class="text-sm leading-[1.6] text-muted">{{ item.text }}</span>
      </span>
    </li>
  </ul>
</template>
