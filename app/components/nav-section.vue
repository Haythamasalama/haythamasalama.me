<script lang="ts" setup>
  defineProps<{
    menus?: {
      title: string;
      _path?: string;
    }[];
  }>();
</script>

<template>
  <ul class="grid grid-flow-row md:grid-flow-col justify-start gap-4 w-full text-gray-400 capitalize mb-8">
    <li v-for="(menu, key) in menus" :key="key">
      <NuxtLink
        :to="menu?._path"
        class="hover:border-b-4 hover:border-primary hover:text-white transition-primary cursor-pointer"
        active-class="border-b-4 border-primary text-white"
      >
        {{ menu.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
