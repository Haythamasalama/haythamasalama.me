<script setup lang="ts">
  const { site, socials } = useAppConfig();
  const route = useRoute();
  const ids = useSchemaIds();

  const canonicalUrl = computed(() => `${site.url}${route.path === '/' ? '' : route.path}`);

  useHead({
    titleTemplate: title => title && title !== site.name ? `${title} · ${site.name}` : site.title,
    meta: [{ name: 'theme-color', content: '#0B0B0C' }],
    link: [{ rel: 'canonical', href: canonicalUrl }],
    // Who the site is by, for search engines and agents; each page adds its own node (usePageSeo).
    script: [{
      key: 'ld-site',
      type: 'application/ld+json',
      innerHTML: jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': ids.website,
            'url': site.url,
            'name': site.name,
            'description': site.description,
            'inLanguage': 'en',
            'publisher': { '@id': ids.person }
          },
          {
            '@type': 'Person',
            '@id': ids.person,
            'name': site.name,
            'url': site.url,
            'image': `${site.url}/images/haytham.jpg`,
            'jobTitle': site.role.split(' · ')[0],
            'description': site.description,
            'email': socials.find(social => social.to.startsWith('mailto:'))?.to.slice('mailto:'.length),
            'sameAs': socials.filter(social => social.to.startsWith('https:')).map(social => social.to)
          }
        ]
      })
    }]
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
    ogImageAlt: 'Haytham A. Salama · software engineer for SaaS, AI, fintech and logistics',
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
