<script lang="ts" setup>
  import type { MenuItem } from '@/types';

  defineProps<{
    menus: MenuItem[];
  }>();

  const isMenuOpen = ref(false);
</script>

<template>
  <header class="w-full flex flex-wrap items-center justify-between mx-auto py-4">
    <NuxtLink to="/" class="flex items-center" aria-label="Home">
      <img
        src="/images/logo.svg"
        class="w-[120px]"
        width="152"
        height="75"
        alt="Haytham A. Salama logo"
      >
    </NuxtLink>

    <div class="flex items-center lg:order-2">
      <SocialLinks class="hidden sm:flex gap-x-3 items-center" />

      <button
        type="button"
        class="transition-all duration-300 ease-in-out hover:-skew-y-6 hover:scale-150 inline-flex items-center ml-6 p-2 text-sm bg-gray-500 hover:text-gray-400 text-white rounded lg:hidden hover:shadow"
        aria-label="Toggle navigation menu"
        aria-controls="main-menu"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <IconMenu />
      </button>
    </div>

    <div
      id="main-menu"
      :class="{ hidden: !isMenuOpen }"
      class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
      @click="isMenuOpen = false"
    >
      <Navbar
        :menus="menus"
        aria-label="Main"
        class="flex flex-col p-4 lg:p-0 capitalize mt-4 text-gray-400 bg-gray-500 lg:bg-transparent shadow rounded lg:flex-row lg:space-x-5 lg:mt-0 lg:shadow-none"
      />
    </div>
  </header>
</template>
