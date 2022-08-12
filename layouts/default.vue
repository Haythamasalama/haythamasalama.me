<script setup>
const route = useRoute();

useHead({
  title: route.params.title,
  bodyAttrs: {
    class: "bg-gray-600",
  },
});
</script>

<template>
  <div class="px-12 m-auto">
    <!-- header -->
    <Header />
    <!-- page content -->
    <slot />
    <!-- footer -->
    <Footer />
  </div>
</template>