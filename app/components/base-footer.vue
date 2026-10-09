<script lang="ts" setup>
  defineProps<{
    menus: {
      name: string;
      path: string;
    }[];
  }>();
</script>

<template>
  <footer class="flex flex-col items-center text-gray-400 capitalize border-t-2 p-4">
    <Navbar :menus="menus" class="grid grid-flow-row md:w-auto md:grid-flow-col justify-center items-center text-gray-400 grid-cols-3 gap-5 w-full text-center" />

    <div class="flex gap-x-3 items-center my-6">
      <a href="https://twitter.com/haythamasalama" target="_blank">
        <IconTwitter class="fill-white hover:fill-primary" />
      </a>
      <a href="https://github.com/haythamasalama" target="_blank">
        <IconGithub class="fill-white hover:fill-primary" />
      </a>
      <a href="https://www.linkedin.com/in/haythamasalama" target="_blank">
        <IconLinkedin class="fill-white hover:fill-primary" />
      </a>
      <a href="https://www.medium.com/@haythamasalama" target="_blank">
        <IconMedium class="fill-white hover:fill-primary w-7 h-7" />
      </a>
    </div>

    <div class="flex text-center">
      <p>
        © 2022 - {{ new Date().getFullYear() }}  all rights reserved. made with <span class="text-red-500">&#10084;&#65039;</span> by Haytham Salama
      </p>
    </div>
  </footer>
</template>
