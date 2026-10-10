<script setup lang="ts">
  defineProps<{
    /** Optional link for "read more". */
    to?: string;
  }>();
</script>

<template>
  <aside class="not-prose my-8 flex gap-3 rounded-xl border border-line bg-raised px-4 py-3.5 text-[15px] leading-relaxed text-soft">
    <Icon name="lucide:info" class="mt-1 size-4 shrink-0 text-accent-2" />
    <div>
      <slot />
      <NuxtLink v-if="to" :to="to" class="link-underline ml-1">
        Read more ↗
      </NuxtLink>
    </div>
  </aside>
</template>
