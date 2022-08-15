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
  <footer class="w-full flex justify-center items-center py-4 border-t">
    <Nav :menus="menus" />
  </footer>
</template>
