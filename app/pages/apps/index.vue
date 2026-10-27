<script setup lang="ts">
  const { data } = await useAsyncData('apps', async () => {
    const [list, pages] = await Promise.all([
      queryCollection('apps').order('order', 'ASC').all(),
      queryCollection('appPages').select('path').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    // An app has its own page when content/apps holds a .md with its file name.
    return list.map(app => ({
      ...app,
      anchor: slugify(app.name),
      page: paths.has(`/${app.stem}`) ? `/${app.stem}` : undefined
    }));
  });

  const { site } = useAppConfig();
  const apps = computed(() => data.value ?? []);

  usePageSeo({
    title: 'Apps',
    description: 'Free, open-source apps by Haytham A. Salama: EasyShoot for screenshots on the Mac, a dashboard for WhatsApp Business templates, and more.',
    schema: 'CollectionPage',
    entity: {
      '@type': 'ItemList',
      'itemListElement': apps.value.map((app, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': app.name,
        'url': `${site.url}${app.page ?? `/apps#${app.anchor}`}`
      }))
    }
  });
</script>

<template>
  <div>
    <section aria-labelledby="title" class="pt-16 md:pt-[88px]">
      <p class="eyebrow">
        Apps
      </p>
      <h1
        id="title"
        class="mt-4 max-w-[720px] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]"
      >
        Free apps I <span class="text-gradient">build</span> and maintain.
      </h1>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        Small products of my own, free and open source. Use them, read the code, or help make them better.
      </p>
    </section>

    <section aria-labelledby="all-apps" class="pt-14 md:pt-20">
      <SectionTitle id="all-apps" class="mb-4">
        All apps
      </SectionTitle>
      <ul class="flex flex-col gap-3">
        <li
          v-for="app in apps"
          :id="app.anchor"
          :key="app.id"
          class="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-4 md:p-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <LogoTile :mark="app.mark" :size="44" />
              <div class="flex min-w-0 flex-col gap-0.5">
                <h2 class="text-base font-semibold tracking-[-0.01em] md:text-[17px]">
                  <NuxtLink v-if="app.page" :to="app.page" class="link">
                    {{ app.name }}
                  </NuxtLink>
                  <span v-else>{{ app.name }}</span>
                </h2>
                <span class="font-mono text-xs text-faint">{{ app.kind }}</span>
              </div>
            </div>
            <span class="font-mono text-xs text-faint">Since {{ app.since }}</span>
          </div>
          <p class="text-sm leading-[1.65] text-soft">
            {{ app.description }}
          </p>
          <ul class="flex flex-wrap gap-2" aria-label="Runs on">
            <li
              v-for="platform in app.platforms"
              :key="platform"
              class="inline-flex min-h-7 items-center rounded-full border border-line px-2.5 font-mono text-[11.5px] text-muted"
            >
              {{ platform }}
            </li>
            <li
              v-if="app.license"
              class="inline-flex min-h-7 items-center rounded-full border border-line px-2.5 font-mono text-[11.5px] text-muted"
            >
              {{ app.license }} licence
            </li>
          </ul>
          <div class="-mt-1 -mb-2 flex flex-wrap gap-x-5">
            <GoLink v-if="app.page" :to="app.page" class="text-[13px] text-fg">
              About the app
            </GoLink>
            <NuxtLink
              v-for="link in [...app.links ?? [], { label: 'Source on GitHub', to: app.repo }]"
              :key="link.to"
              :to="link.to"
              class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
            >
              {{ link.label }}
              <Icon name="lucide:arrow-up-right" class="size-3.5" />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
