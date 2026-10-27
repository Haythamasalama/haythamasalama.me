<script setup lang="ts">
  const route = useRoute();
  const path = route.path.replace(/\/$/, '');

  // The page body comes from content/apps/<slug>.md, the name and links from
  // the card with the same file name (content/apps/<slug>.yml).
  const { data } = await useAsyncData(`app:${path}`, async () => {
    const [page, app] = await Promise.all([
      queryCollection('appPages').path(path).first(),
      queryCollection('apps').where('stem', '=', path.slice(1)).first()
    ]);

    return page && app ? { page, app } : null;
  });

  if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'App not found', fatal: true });
  }

  const { data: more } = await useAsyncData(`app-more:${path}`, async () => {
    const [pages, apps] = await Promise.all([
      queryCollection('appPages').select('path').all(),
      queryCollection('apps').where('stem', '<>', path.slice(1)).order('order', 'ASC').all()
    ]);
    const paths = new Set(pages.map(page => page.path));

    return apps.slice(0, 3).map(app => ({
      to: paths.has(`/${app.stem}`) ? `/${app.stem}` : `/work#${slugify(app.name)}`,
      name: app.name,
      kind: app.kind,
      description: app.description,
      mark: app.mark
    }));
  });

  const app = computed(() => data.value!.app);

  usePageSeo({
    title: `${app.value.name} · ${app.value.kind}`,
    description: data.value.page.description,
    type: 'article',
    eyebrow: 'App',
    entity: {
      '@type': 'SoftwareApplication',
      'name': app.value.name,
      'description': app.value.description,
      'operatingSystem': (app.value.platforms ?? []).join(', '),
      'isAccessibleForFree': true,
      'creator': { '@id': useSchemaIds().person },
      'sameAs': [app.value.repo, ...(app.value.links ?? []).map(link => link.to)]
    }
  });

  const facts = computed(() => [
    ...(app.value.platforms ?? []).map(text => ({ text, icon: 'lucide:monitor' })),
    { text: `Since ${app.value.since}`, icon: 'lucide:calendar' },
    ...app.value.license ? [{ text: `${app.value.license} licence`, icon: 'lucide:scale' }] : []
  ]);

  const links = computed(() => [
    ...(app.value.links ?? []).map(link => ({ ...link, icon: link.label === 'Download' ? 'lucide:download' : 'lucide:globe' })),
    { label: 'GitHub', to: app.value.repo, icon: 'simple-icons:github' }
  ]);
</script>

<template>
  <article v-if="data">
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/work#apps" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Work
      </NuxtLink>
      <div class="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <LogoTile :mark="app.mark" :size="52" />
        <div class="flex min-w-0 flex-col gap-1">
          <h1 class="text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[36px]">
            {{ app.name }}
          </h1>
          <span class="font-mono text-[13px] text-faint">{{ app.kind }}</span>
        </div>
      </div>
      <p class="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-soft md:text-lg">
        {{ app.description }}
      </p>
      <ul class="mt-6 flex flex-wrap items-center gap-2" aria-label="About this app">
        <li
          v-for="fact in facts"
          :key="fact.text"
          class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted"
        >
          <Icon :name="fact.icon" class="size-3.5 text-mark" aria-hidden="true" />
          {{ fact.text }}
        </li>
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon :name="link.icon" class="size-3.5 text-mark" aria-hidden="true" />
            {{ link.label }}
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </li>
      </ul>
    </header>

    <ReadingLayout :value="data.page" />

    <footer v-if="more?.length" class="mt-20 border-t border-line pt-10">
      <SectionTitle class="mb-5">
        More apps
      </SectionTitle>
      <div class="grid gap-3 sm:grid-cols-3">
        <NuxtLink
          v-for="item in more"
          :key="item.to"
          :to="item.to"
          class="flex flex-col gap-3 rounded-xl border border-line p-4 transition-colors hover:border-chip hover:bg-surface"
        >
          <LogoTile :mark="item.mark" :size="32" :icon-size="16" />
          <span class="flex flex-col gap-0.5">
            <span class="text-[15px] leading-snug font-medium">{{ item.name }}</span>
            <span class="font-mono text-xs text-faint">{{ item.kind }}</span>
          </span>
          <span class="line-clamp-3 text-[13px] leading-[1.55] text-muted">{{ item.description }}</span>
        </NuxtLink>
      </div>
      <GoLink to="/work#apps" class="mt-2">
        All apps
      </GoLink>
    </footer>
  </article>
</template>
