<script setup lang="ts">
  defineProps<{
    id: string;
  }>();
</script>

<template>
  <h3 :id="id">
    <NuxtLink :href="`#${id}`" class="group">
      <div class="-ms-10 mt-1 p-1 rounded inline-flex opacity-0 group-hover:opacity-100 transition-opacity absolute bg-primary-gradient shadow">
        <IconHashtag class="w-4 h-4 text-white" />
      </div>

      <slot />
    </NuxtLink>
  </h3>
</template>
