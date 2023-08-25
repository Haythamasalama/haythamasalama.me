<script lang="ts" setup>
  defineProps<{
    menus: {
      name: string;
      path: string;
    }[];
  }>();

  const showMenu = ref(true);
</script>

<template>
  <header class="w-full flex flex-wrap items-center justify-between mx-auto py-4">
    <NuxtLink to="/" class="flex items-center">
      <img src="/images/logo.svg" class="w-[120px]" alt="logo">
    </NuxtLink>

    <div class="flex items-center lg:order-2">
      <div class="hidden sm:flex gap-x-3 items-center">
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
        <a href="https://www.instagram.com/haythamasalama" target="_blank">
          <IconInstagram class="fill-white hover:fill-primary" />
        </a>
        <a href="https://www.youtube.com/@haythamasalama" target="_blank">
          <IconYoutube class="fill-white hover:fill-primary" />
        </a>
      </div>

      <button
        type="button"
        class="transition-all duration-300 ease-in-out hover:-skew-y-6 hover:scale-150 inline-flex items-center ml-6 p-2 text-sm bg-gray-500 hover:text-gray-400 text-white rounded lg:hidden hover:shadow"
        @click="showMenu = !showMenu"
      >
        <IconMenu />
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div
        :class="{ hidden: showMenu }"
        class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
        @click="showMenu = true"
      >
        <Navbar
          :menus="menus"
          class="flex flex-col p-4 lg:p-0 capitalize mt-4 text-gray-400 bg-gray-500 lg:bg-transparent shadow rounded lg:flex-row lg:space-x-5 lg:mt-0 lg:shadow-none"
          @click="showMenu = true"
        />
      </div>
    </Transition>
  </header>
</template>
