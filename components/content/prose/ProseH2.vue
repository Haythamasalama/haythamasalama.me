<script setup lang="ts">
  defineProps<{
    id: string;
  }>();
</script>

<template>
  <h2 :id="id">
    <NuxtLink :href="`#${id}`" class="group">
      <div class="-ms-12 p-1 rounded-md inline-flex opacity-0 group-hover:opacity-100 transition-opacity absolute bg-primary-gradient shadow">
        <IconHashtag class="w-4 h-4 text-white" />
      </div>

      <slot />
    </NuxtLink>
  </h2>
</template>
