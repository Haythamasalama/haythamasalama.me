<script setup lang="ts">
  /**
   * A product screenshot. By default it comes in both themes and the one
   * matching the site's theme is shown (lazy loading keeps the other from
   * downloading); `single` takes one image as it is.
   */
  const { single = false, bare = false } = defineProps<{
    /** Themed: path without the suffix ("/projects/runarks/activity-log" for -dark.webp and -light.webp). Single: the full path. */
    src: string;
    alt: string;
    width: number;
    height: number;
    single?: boolean;
    /** No card around the image, for transparent mockups that sit on the page itself. */
    bare?: boolean;
  }>();
</script>

<template>
  <figure class="not-prose my-10">
    <div :class="!bare && 'overflow-hidden rounded-xl border border-line bg-raised'">
      <img
        v-if="single"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        loading="lazy"
        decoding="async"
        class="block h-auto w-full"
      >
      <template v-else>
        <img
          :src="`${src}-dark.webp`"
          :alt="alt"
          :width="width"
          :height="height"
          loading="lazy"
          decoding="async"
          class="block h-auto w-full light:hidden"
        >
        <img
          :src="`${src}-light.webp`"
          :alt="alt"
          :width="width"
          :height="height"
          loading="lazy"
          decoding="async"
          class="hidden h-auto w-full light:block"
        >
      </template>
    </div>
    <figcaption v-if="$slots.default" class="mt-3 text-sm leading-normal text-muted">
      <slot mdc-unwrap="p" />
    </figcaption>
  </figure>
</template>
