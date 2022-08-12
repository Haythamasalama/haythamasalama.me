<script setup>
const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Vidoes",
    path: "/vidoes",
  },
  {
    name: "Tools",
    path: "/tools",
  },
  {
    name: "Resources",
    path: "/resources",
  },
  {
    name: "Uses",
    path: "/uses",
  },
];
</script>

<template>
  <header class="w-full flex justify-between items-center py-2">
    <!-- logo -->
    <div>
      <img src="@/assets/images/logo.svg" />
    </div>
    <!-- menus -->
    <nav>
      <ul class="flex justify-between">
        <li class="text-white mx-2" v-for="(menu, key) in menus" :key="key">
          {{ menu.name }}
        </li>
      </ul>
    </nav>
    <!-- icons -->
    <div>
      <img src="@/assets/images/logo.svg" />
    </div>
  </header>
</template>