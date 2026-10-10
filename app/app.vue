<script setup lang="ts">
  const { site } = useAppConfig();
  const route = useRoute();

  const canonicalUrl = computed(() => `${site.url}${route.path === '/' ? '' : route.path}`);

  useHead({
    titleTemplate: title => title && title !== site.name ? `${title} — ${site.name}` : site.title,
    meta: [{ name: 'theme-color', content: '#0B0B0C' }],
    link: [{ rel: 'canonical', href: canonicalUrl }]
  });

  useSeoMeta({
    description: site.description,
    author: site.name,
    ogSiteName: site.name,
    ogUrl: canonicalUrl,
    ogType: 'website',
    ogImage: `${site.url}/og.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Haytham A. Salama — creative developer and full-stack engineer',
    twitterCard: 'summary_large_image',
    twitterImage: `${site.url}/og.png`,
    twitterSite: '@haythamasalama',
    twitterCreator: '@haythamasalama'
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
