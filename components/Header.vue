<script setup lang="ts">
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
  <header class="flex justify-between items-center py-7">
    <!-- logo -->
    <div>
      <img src="@/assets/images/logo.svg" />
    </div>
    <!-- menus -->
    <Nav :menus="menus" />
    <!-- icons -->
    <div class="flex items-center">
      <a href="">
        <IconsTwitter />
      </a>
      <a href="">
        <IconsGithub />
      </a>
      <a href="">
        <IconsLinkedin />
      </a>
      <a href="">
        <IconsYoutube />
      </a>
      <a href="">
        <IconsInstagram />
      </a>
      <a href="">
        <IconsFacebook />
      </a>
    </div>
  </header>
</template>
