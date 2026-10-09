<script lang="ts" setup>
  import type { MenuItem } from '@/types';

  defineProps<{
    menus: MenuItem[];
  }>();
</script>

<template>
  <nav>
    <NuxtLink
      v-for="menu in menus"
      :key="menu.path"
      :to="menu.path"
      class="hover:text-white font-medium transition-primary mb-1 lg:mb-0"
      active-class="text-white"
    >
      {{ menu.name }}
    </NuxtLink>
  </nav>
</template>
