<script setup lang="ts">
  /** Code blocks in Markdown: a header with the file name, language and a copy button. */
  const { code = '', language = null, filename = null } = defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
    class?: string | null;
  }>();

  const languageLabels: Record<string, string> = {
    bash: 'bash',
    dotenv: 'dotenv',
    js: 'JavaScript',
    javascript: 'JavaScript',
    json: 'JSON',
    php: 'PHP',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    vue: 'Vue',
    yaml: 'YAML'
  };

  // Plain-text fences have nothing worth labelling.
  const languageLabel = computed(() => language && language !== 'text' ? (languageLabels[language] ?? language) : '');
</script>

<template>
  <div class="code-block not-prose my-6 overflow-hidden rounded-xl border border-line bg-raised">
    <div class="flex min-h-11 items-center justify-between gap-3 pr-1.5 pl-4">
      <span class="flex min-w-0 items-center gap-3 font-mono text-xs">
        <span v-if="filename" class="truncate text-soft">{{ filename }}</span>
        <span v-if="languageLabel" class="text-faint">{{ languageLabel }}</span>
      </span>
      <CopyButton :text="code.replace(/\n+$/, '')" :label="filename ?? 'code'" />
    </div>
    <pre class="overflow-x-auto border-t border-line/60 px-[18px] py-4 font-mono text-[13px] leading-[1.7] [tab-size:2]" :class="$props.class"><slot /></pre>
  </div>
</template>

<style>
  .shiki span.line {
    display: inline;
  }
</style>
