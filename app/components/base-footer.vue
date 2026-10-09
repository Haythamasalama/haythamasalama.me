<script lang="ts" setup>
  import type { MenuItem } from '@/types';

  defineProps<{
    menus: MenuItem[];
  }>();
</script>

<template>
  <footer class="flex flex-col items-center text-gray-400 capitalize border-t-2 p-4">
    <Navbar :menus="menus" aria-label="Footer" class="grid grid-flow-row md:w-auto md:grid-flow-col justify-center items-center text-gray-400 grid-cols-3 gap-5 w-full text-center" />

    <SocialLinks class="flex gap-x-3 items-center my-6" />

    <div class="flex text-center">
      <p>
        © 2022 - {{ new Date().getFullYear() }}  all rights reserved. made with <span class="text-red-500">&#10084;&#65039;</span> by Haytham Salama
      </p>
    </div>
  </footer>
</template>
