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
  <footer class="w-full flex justify-center items-center py-2">
    <nav>
      <ul class="flex justify-between">
        <li class="text-white mx-2" v-for="(menu, key) in menus" :key="key">
          {{ menu.name }}
        </li>
      </ul>
    </nav>
  </footer>
</template>