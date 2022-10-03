<script lang="ts" setup>
  defineProps<{
    menus: {
      name: string;
      path: string;
    }[];
  }>();
</script>

<template>
  <nav>
    <NuxtLink
      v-for="(menu, key) in menus"
      :key="key"
      :to="menu.path"
      class="hover:text-white font-medium transition-primary mb-1 lg:mb-0"
      active-class="text-white"
    >
      {{ menu.name }}
    </NuxtLink>
  </nav>
</template>
