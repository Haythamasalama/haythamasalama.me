<script setup lang="ts">
  defineProps<{
    options: { label: string; count: number; badge?: string }[];
    label: string;
  }>();

  const selected = defineModel<string>({ required: true });
</script>

<template>
  <div role="group" :aria-label="label" class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option.label"
      type="button"
      :aria-pressed="selected === option.label"
      class="inline-flex min-h-9 cursor-pointer items-center rounded-full px-3.5 text-[13px] transition-colors"
      :class="selected === option.label
        ? 'border-gradient text-fg [--bg:var(--surface)]'
        : 'border border-chip text-muted hover:text-fg'"
      @click="selected = option.label"
    >
      {{ option.label }}
      <span class="ml-1.5 font-mono text-[11.5px] opacity-65">{{ option.count }}</span>
      <span
        v-if="option.badge"
        class="ml-2 rounded-[5px] border-gradient px-1.5 font-mono text-[9.5px] leading-4 tracking-[0.1em] uppercase"
      >
        <span class="text-gradient">{{ option.badge }}</span>
      </span>
    </button>
  </div>
</template>
