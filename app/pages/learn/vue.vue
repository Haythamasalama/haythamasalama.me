<script setup lang="ts">
  const { data: path } = await useAsyncData('learn-vue', () => queryCollection('vuePath').first());

  if (!path.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  usePageSeo({
    title: 'Vue.js path',
    description: path.value.description,
    eyebrow: 'Guide',
    entity: {
      '@type': 'LearningResource',
      'name': 'Vue.js path',
      'description': path.value.description,
      'learningResourceType': 'Learning path',
      'teaches': 'Vue.js',
      'isAccessibleForFree': true,
      'author': { '@id': useSchemaIds().person },
      'sameAs': path.value.source
    }
  });

  /** A resource is a video when it lives on YouTube, the official docs otherwise. */
  const resource = (link: { label: string; to: string }) => /youtube\.com|youtu\.be/.test(link.to)
    ? { ...link, icon: 'simple-icons:youtube', kind: 'Video' }
    : { ...link, icon: 'lucide:book-open', kind: 'Docs' };

  /** Stages are numbered; the projects between them are not. */
  const steps = computed(() => {
    let stage = 0;

    return (path.value?.steps ?? []).map(step => ({
      ...step,
      topics: step.topics ?? [],
      links: (step.links ?? []).map(resource),
      id: slugify(step.title),
      number: step.project ? undefined : ++stage
    }));
  });

  const before = computed(() => (path.value?.before ?? []).map(item => ({
    ...item,
    topics: item.topics ?? [],
    links: (item.links ?? []).map(resource)
  })));

  const stageCount = computed(() => steps.value.filter(step => !step.project).length);
  const projectCount = computed(() => steps.value.length - stageCount.value);

  // Ticked topics live in this browser only (`localStorage`), keyed by stage and topic.
  const STORAGE_KEY = 'learn:vue';
  const done = ref(new Set<string>());
  const topicKey = (step: string, topic: string) => `${step}/${slugify(topic)}`;
  const allKeys = computed(() => steps.value.flatMap(step => step.topics.map(topic => topicKey(step.id, topic))));
  const progress = computed(() => allKeys.value.filter(key => done.value.has(key)).length);
  const doneIn = (step: { id: string; topics: string[] }) => step.topics.filter(topic => done.value.has(topicKey(step.id, topic))).length;

  onMounted(() => {
    try {
      done.value = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));
    }
    catch {
      // Private windows can block storage; the page still works without it.
    }
  });

  function save (next: Set<string>) {
    done.value = next;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    }
    catch {
      // As above: the ticks just aren't kept.
    }
  }

  function toggle (key: string) {
    const next = new Set(done.value);

    if (next.has(key)) next.delete(key);
    else next.add(key);

    save(next);
  }
</script>

<template>
  <div v-if="path">
    <header class="pt-16 md:pt-[72px]">
      <NuxtLink to="/articles#guides" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Blog
      </NuxtLink>
      <div class="mt-5 flex items-center gap-4">
        <LogoTile :mark="{ icon: 'simple-icons:vuedotjs' }" :size="52" />
        <h1 class="text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]">
          Vue.js path
        </h1>
      </div>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        {{ path.intro }}
      </p>
      <ul class="mt-6 flex flex-wrap items-center gap-2" aria-label="About this path">
        <li class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted">
          <Icon name="lucide:milestone" class="size-3.5 text-mark" aria-hidden="true" />
          {{ stageCount }} stages
        </li>
        <li class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted">
          <Icon name="lucide:hammer" class="size-3.5 text-mark" aria-hidden="true" />
          {{ projectCount }} projects
        </li>
        <li class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted">
          <Icon name="lucide:list-checks" class="size-3.5 text-mark" aria-hidden="true" />
          {{ allKeys.length }} topics
        </li>
        <li>
          <NuxtLink
            :to="path.source"
            class="inline-flex min-h-8 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-soft transition-colors hover:border-chip hover:text-fg"
          >
            <Icon name="simple-icons:github" class="size-3.5 text-mark" aria-hidden="true" />
            On GitHub
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Progress: stays in this browser. -->
      <div class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-line px-4 py-2.5">
        <Icon name="lucide:trophy" class="size-4 shrink-0 text-mark" aria-hidden="true" />
        <div
          class="h-1.5 min-w-[120px] flex-auto overflow-hidden rounded-full bg-surface"
          role="progressbar"
          aria-label="Topics done"
          :aria-valuenow="progress"
          aria-valuemin="0"
          :aria-valuemax="allKeys.length"
        >
          <div
            class="h-full rounded-full bg-fg transition-[width] duration-300 motion-reduce:transition-none"
            :style="{ width: `${allKeys.length ? (progress / allKeys.length) * 100 : 0}%` }"
          />
        </div>
        <span class="font-mono text-xs text-muted">{{ progress }} / {{ allKeys.length }} done</span>
        <button
          v-if="progress"
          type="button"
          class="link-muted inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[13px]"
          @click="save(new Set())"
        >
          <Icon name="lucide:rotate-ccw" class="size-3.5" aria-hidden="true" />
          Start over
        </button>
      </div>
    </header>

    <section aria-labelledby="before-you-start" class="pt-14">
      <SectionTitle id="before-you-start" class="mb-3">
        Before you start
      </SectionTitle>
      <ul class="grid gap-3 sm:grid-cols-3">
        <li
          v-for="item in before"
          :key="item.title"
          class="flex flex-col gap-2.5 rounded-xl border border-line p-4"
        >
          <span class="flex items-center gap-3">
            <LogoTile :mark="{ icon: item.icon }" :size="32" :icon-size="16" />
            <span class="text-[15px] font-medium">{{ item.title }}</span>
          </span>
          <span v-if="item.topics.length" class="text-[13px] leading-[1.55] text-muted">{{ item.topics.join(' · ') }}</span>
          <NuxtLink
            v-for="link in item.links"
            :key="link.to"
            :to="link.to"
            class="link-muted inline-flex items-start gap-2 text-[13px] leading-[1.5]"
          >
            <Icon :name="link.icon" class="mt-[3px] size-3.5 shrink-0" aria-hidden="true" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section aria-labelledby="the-path" class="pt-14 md:pt-[72px]">
      <SectionTitle id="the-path" class="mb-4">
        The path
      </SectionTitle>
      <ol class="flex flex-col gap-3">
        <li
          v-for="step in steps"
          :id="step.id"
          :key="step.id"
          class="scroll-mt-6 rounded-2xl border p-4 md:p-5"
          :class="step.project ? 'border-dashed border-chip' : 'border-line bg-raised'"
        >
          <div class="flex items-start gap-3.5">
            <LogoTile :mark="{ icon: step.icon }" :size="40" />
            <div class="flex min-w-0 flex-auto flex-col gap-0.5">
              <span class="flex items-center justify-between gap-3">
                <span class="eyebrow">{{ step.project ? 'Project' : `Stage ${step.number}` }}</span>
                <span
                  v-if="step.topics.length"
                  class="inline-flex items-center gap-1.5 font-mono text-[11.5px]"
                  :class="doneIn(step) === step.topics.length ? 'text-fg' : 'text-faint'"
                >
                  <Icon
                    v-if="doneIn(step) === step.topics.length"
                    name="lucide:circle-check"
                    class="size-3.5"
                    aria-hidden="true"
                  />
                  {{ doneIn(step) }}/{{ step.topics.length }}
                </span>
              </span>
              <h2 class="text-base font-semibold tracking-[-0.01em] md:text-[17px]">
                {{ step.title }}
              </h2>
              <p v-if="step.note" class="mt-0.5 text-sm leading-[1.6] text-muted">
                {{ step.note }}
              </p>
            </div>
          </div>

          <ul
            v-if="step.topics.length"
            class="mt-2 grid gap-x-6 sm:grid-cols-2 sm:pl-[54px]"
            :aria-label="`${step.title}: topics`"
          >
            <li v-for="topic in step.topics" :key="topic">
              <label class="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-soft">
                <input
                  type="checkbox"
                  class="peer sr-only"
                  :checked="done.has(topicKey(step.id, topic))"
                  @change="toggle(topicKey(step.id, topic))"
                >
                <span
                  class="flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-chip text-bg transition-colors peer-checked:border-fg peer-checked:bg-fg peer-focus-visible:ring-2 peer-focus-visible:ring-accent-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
                  aria-hidden="true"
                >
                  <Icon v-if="done.has(topicKey(step.id, topic))" name="lucide:check" class="size-3" />
                </span>
                <span :class="done.has(topicKey(step.id, topic)) && 'text-muted line-through decoration-faint'">{{ topic }}</span>
              </label>
            </li>
          </ul>

          <ul
            v-if="step.links.length"
            class="mt-3 flex flex-col border-t border-line pt-1 sm:ml-[54px]"
            :aria-label="`${step.title}: resources`"
          >
            <li v-for="link in step.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group flex min-h-11 items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-fg"
              >
                <Icon :name="link.icon" class="size-4 shrink-0 text-mark group-hover:text-fg" aria-hidden="true" />
                <span class="min-w-0 flex-auto">{{ link.label }}</span>
                <span class="font-mono text-[11px] text-faint">{{ link.kind }}</span>
                <Icon name="lucide:arrow-up-right" class="size-3.5 shrink-0" aria-hidden="true" />
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ol>
    </section>
  </div>
</template>
