<script setup>
const route = useRoute();

useHead({
  titleTemplate: `Haytham Salama | ${route.meta.title ?? "Software Engineer"}`,
  bodyAttrs: {
    class: "bg-gray-600",
  },
});
</script>

<template>
  <div class="flex flex-col justify-between h-screen px-14">
    <!-- header -->
    <Header />
    <!-- page content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- footer -->
    <Footer />
  </div>
</template>
