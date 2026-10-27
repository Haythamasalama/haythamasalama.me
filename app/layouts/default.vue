<template>
  <div class="min-h-dvh">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
    >
      Skip to content
    </a>
    <!-- One 1040px column on every page: lists and grids use the full width, and
         paragraphs are capped at a readable measure in main.css. -->
    <div class="mx-auto max-w-[1040px] px-6">
      <AppHeader />
      <main id="main">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
