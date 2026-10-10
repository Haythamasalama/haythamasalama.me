<script setup lang="ts">
  const view = defineModel<'grid' | 'list'>({ required: true });

  const options = [
    { value: 'grid', label: 'Grid view', icon: 'lucide:layout-grid' },
    { value: 'list', label: 'List view', icon: 'lucide:list' }
  ] as const;
</script>

<template>
  <div role="group" aria-label="Layout" class="inline-flex shrink-0 rounded-full border border-chip p-0.5">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="view === option.value"
      :aria-label="option.label"
      :title="option.label"
      class="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors"
      :class="view === option.value ? 'bg-surface text-fg' : 'text-muted hover:text-fg'"
      @click="view = option.value"
    >
      <Icon :name="option.icon" class="size-4" />
    </button>
  </div>
</template>
