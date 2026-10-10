<script setup lang="ts">
  const colorMode = useColorMode();

  // The server can't know a saved preference, so render the default (dark)
  // label first and switch once mounted — this avoids a hydration mismatch.
  const mounted = ref(false);

  onMounted(() => {
    mounted.value = true;
  });

  const isDark = computed(() => !mounted.value || colorMode.value !== 'light');
  const label = computed(() => isDark.value ? 'Switch to light theme' : 'Switch to dark theme');

  function toggle () {
    colorMode.preference = isDark.value ? 'light' : 'dark';
  }
</script>

<template>
  <button
    type="button"
    class="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-[18px]" />
  </button>
</template>
