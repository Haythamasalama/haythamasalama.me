<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold text-primary-gradient capitalize">
      {{ title }}
    </h1>
  </div>
</template>
