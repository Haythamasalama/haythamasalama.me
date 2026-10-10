<script setup lang="ts">
  const { site } = useAppConfig();

  useHead({
    titleTemplate: title => title && title !== site.name ? `${title} — ${site.name}` : site.title,
    meta: [{ name: 'theme-color', content: '#0B0B0C' }]
  });

  useSeoMeta({
    description: site.description,
    ogSiteName: site.name,
    ogType: 'website',
    ogImage: '/og.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Haytham A. Salama — creative developer and full-stack engineer',
    twitterCard: 'summary_large_image',
    twitterSite: '@haythamasalama',
    twitterCreator: '@haythamasalama'
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
