<script setup lang="ts">
  const route = useRoute();

  // Lists and grids use the full width; paragraphs are capped at a readable
  // measure in main.css. The brand guide gets a little more room.
  const maxWidth = computed(() => route.meta.wide ? 'max-w-[1040px]' : 'max-w-[880px]');
</script>

<template>
  <div class="min-h-dvh">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
    >
      Skip to content
    </a>
    <div class="mx-auto px-6" :class="maxWidth">
      <AppHeader />
      <main id="main">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
