<script setup lang="ts">
  const { name, hex, edge } = defineProps<{
    name: string;
    hex: string;
    role: string;
    /**
     * Inset hairline so a chip close to its background stays visible:
     * `always` for the dark neutrals, `light` for Paper on the light theme.
     */
    edge?: 'always' | 'light';
  }>();

  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy () {
    try {
      await navigator.clipboard.writeText(hex);
      copied.value = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied.value = false), 1600);
    }
    catch {
      // Clipboard access can be blocked (e.g. insecure context); fail quietly.
    }
  }

  onBeforeUnmount(() => clearTimeout(timer));

  const edgeClass = computed(() => {
    if (edge === 'always') return 'shadow-[inset_0_0_0_1px_#2A2A30]';
    if (edge === 'light') return 'light:shadow-[inset_0_0_0_1px_#E4E4E7]';

    return '';
  });
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer flex-col gap-2.5 rounded-[14px] border border-line p-2.5 text-left transition-colors hover:border-chip hover:bg-surface"
    :aria-label="copied ? `Copied ${name} ${hex}` : `Copy ${name} ${hex}`"
    @click="copy"
  >
    <span class="block h-[72px] rounded-[9px]" :class="edgeClass" :style="{ background: hex }" />
    <span class="flex flex-col gap-0.5 px-1 pb-1">
      <span class="text-sm font-medium">{{ name }}</span>
      <span v-if="copied" class="inline-flex items-center gap-1 font-mono text-xs">
        <span class="text-gradient">Copied</span>
        <Icon name="lucide:check" class="size-3 text-accent-2" />
      </span>
      <span v-else class="font-mono text-xs text-muted">{{ hex }}</span>
      <span class="text-xs leading-[1.4] text-faint">{{ role }}</span>
    </span>
    <span class="sr-only" aria-live="polite">{{ copied ? 'Copied to clipboard' : '' }}</span>
  </button>
</template>
