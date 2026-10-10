<script setup lang="ts">
  const route = useRoute();

  // Most pages read best at 640px; the brand guide needs a little more room.
  const maxWidth = computed(() => route.meta.wide ? 'max-w-[760px]' : 'max-w-[640px]');
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
