<script setup lang="ts">
  /** Markdown from Nuxt Content in the site's reading style, for articles and project pages. */
  defineProps<{
    value: object;
  }>();
</script>

<template>
  <ContentRenderer
    :value="value"
    class="prose-site prose max-w-none text-[16px] leading-[1.75] prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-h2:text-xl prose-h3:text-lg prose-a:font-normal prose-a:underline-offset-4 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl prose-img:border prose-img:border-line"
  />
</template>
