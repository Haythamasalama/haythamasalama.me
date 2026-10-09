<script lang="ts" setup>
  import interFont from '~/assets/fonts/Inter.woff2?url';

  const app = useAppConfig();
  const route = useRoute();

  const canonicalUrl = computed(() => `${app.url}${route.path === '/' ? '' : route.path}`);

  useHead({
    htmlAttrs: { lang: 'en' },
    bodyAttrs: { class: 'bg-gray-600' },
    title: () => route.meta?.title as string | undefined,
    titleTemplate: titleChunk => (titleChunk ? `${titleChunk} | Haytham Salama` : app.title),
    meta: [
      { name: 'keywords', content: app.keywords }
    ],
    link: [
      { rel: 'icon', type: 'image/jpeg', href: '/images/icon.jpg' },
      { rel: 'preload', as: 'font', type: 'font/woff2', href: interFont, crossorigin: '' },
      { rel: 'canonical', href: canonicalUrl }
    ]
  });

  useSeoMeta({
    robots: 'index, follow',
    description: app.description,
    author: app.author.name,
    ogSiteName: app.author.name,
    ogUrl: canonicalUrl,
    ogTitle: () => (route.meta?.title ? `${route.meta.title} | Haytham Salama` : app.title),
    ogDescription: app.description,
    ogType: 'website',
    ogImage: `${app.url}/images/opengraph-logo.jpg`,
    ogImageWidth: 500,
    ogImageHeight: 500,
    ogImageAlt: app.author.name,
    twitterCard: 'summary',
    twitterSite: '@haythamasalama',
    twitterCreator: '@haythamasalama'
  });
</script>

<template>
  <main class="flex flex-col container mx-auto sm:px-4 px-8 min-h-screen">
    <BaseHeader :menus="app.menus.header" />

    <section class="flex flex-col w-full mt-10 justify-start mb-8">
      <h1 v-if="route.meta?.title" class="title-heading-primary font-extrabold mb-12">
        {{ route.meta.title }}
      </h1>

      <div>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </section>

    <BaseFooter :menus="app.menus.footer" class="mt-auto" />
  </main>
</template>
