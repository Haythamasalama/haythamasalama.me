<script setup lang="ts">
  /** Numbers in one bordered strip (About, Home, Open source): each value with its label under it. */
  const { stats, size = 'md' } = defineProps<{
    stats: { value: string; label: string }[];
    size?: 'md' | 'lg';
  }>();

  // The columns follow the count, so the strip never shows an empty cell.
  const columns = computed(() => stats.length >= 4
    ? 'grid-cols-2 md:grid-cols-4'
    : ['grid-cols-1', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3'][stats.length]);
</script>

<template>
  <dl class="grid gap-px overflow-hidden rounded-xl border border-line bg-line" :class="columns">
    <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-0.5 bg-bg px-4 py-3.5">
      <dt class="order-last text-[13px] leading-snug text-faint">
        {{ stat.label }}
      </dt>
      <dd class="font-mono font-medium" :class="size === 'lg' ? 'text-2xl md:text-[28px]' : 'text-xl'">
        {{ stat.value }}
      </dd>
    </div>
  </dl>
</template>
