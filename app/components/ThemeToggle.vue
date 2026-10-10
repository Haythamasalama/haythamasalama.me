<script setup lang="ts">
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value !== 'light');
  const label = computed(() => isDark.value ? 'Switch to light theme' : 'Switch to dark theme');

  function toggle() {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  }
</script>

<template>
  <button
    type="button"
    class="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-accent-2"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <ClientOnly>
      <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-[18px]" />
      <template #fallback>
        <Icon name="lucide:sun" class="size-[18px]" />
      </template>
    </ClientOnly>
  </button>
</template>
