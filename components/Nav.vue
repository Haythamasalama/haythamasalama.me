<script setup lang="ts">
const route = useRoute();

interface MenusProps {
  menus: Array<{
    name: string;
    path: string;
  }>;
}

const props = defineProps<MenusProps>();

const activeStyleMenu = (pathMenu: string) => {
  return route.path === pathMenu
    ? "text-white"
    : "text-gray-400 hover:text-white transition-all duration-300 ease-in-out";
};
</script>

<template>
  <nav class="flex justify-center items-center">
    <NuxtLink
      v-for="(menu, key) in props.menus"
      :class="`text-white px-4 ${activeStyleMenu(menu.path)}`"
      :to="menu.path"
      :key="key"
    >
      {{ menu.name }}
    </NuxtLink>
  </nav>
</template>
