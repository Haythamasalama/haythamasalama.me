<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="d-flex">
    <h2 class="text-4xl font-bold text-primary-gradient capitalize">
      {{ title }}
    </h2>
  </div>
</template>
