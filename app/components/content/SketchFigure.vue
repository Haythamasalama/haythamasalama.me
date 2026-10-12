<script setup lang="ts">
  const props = defineProps<{
    /** File under app/assets/figures without the extension, e.g. "runarks/request-lifecycle". */
    name: string;
    /** What the figure shows, read out by screen readers. */
    alt: string;
  }>();

  // The SVG is drawn at build time from the .excalidraw file (modules/sketch-figures),
  // and every figure is its own chunk.
  const figures = import.meta.glob<string>('~/assets/figures/**/*.excalidraw', { import: 'default' });
  const load = Object.entries(figures).find(([path]) => path.endsWith(`/${props.name}.excalidraw`))?.[1];

  if (!load) {
    throw createError({ statusCode: 500, statusMessage: `Figure not found: ${props.name}` });
  }

  const svg = await load();
</script>

<template>
  <figure class="not-prose my-10">
    <!-- Narrow screens scroll the drawing sideways instead of shrinking its labels. -->
    <div
      class="sketch overflow-x-auto rounded-xl border border-line bg-raised px-3 py-4 md:px-6 md:py-6"
      role="img"
      :aria-label="alt"
      tabindex="0"
    >
      <!-- eslint-disable-next-line vue/no-v-html -- built from a file in this repo -->
      <div class="min-w-[600px]" v-html="svg" />
    </div>
    <figcaption v-if="$slots.default" class="mt-3 text-sm leading-normal text-muted">
      <slot mdc-unwrap="p" />
    </figcaption>
  </figure>
</template>
