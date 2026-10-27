<script setup lang="ts">
  const { data: path } = await useAsyncData('learn-vue', () => queryCollection('vuePath').first());

  if (!path.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  usePageSeo({
    title: 'Vue.js path',
    description: path.value.description,
    eyebrow: 'Learn',
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

  /** Stages are numbered; the projects between them are not. */
  const steps = computed(() => {
    let stage = 0;

    return (path.value?.steps ?? []).map(step => ({
      ...step,
      topics: step.topics ?? [],
      links: step.links ?? [],
      id: slugify(step.title),
      number: step.project ? undefined : ++stage
    }));
  });

  const before = computed(() => (path.value?.before ?? []).map(item => ({ ...item, topics: item.topics ?? [], links: item.links ?? [] })));

  // Ticked topics live in this browser only (`localStorage`), keyed by stage and topic.
  const STORAGE_KEY = 'learn:vue';
  const done = ref(new Set<string>());
  const topicKey = (step: string, topic: string) => `${step}/${slugify(topic)}`;
  const allKeys = computed(() => steps.value.flatMap(step => step.topics.map(topic => topicKey(step.id, topic))));
  const progress = computed(() => allKeys.value.filter(key => done.value.has(key)).length);

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
      <NuxtLink to="/learn" class="go link-muted -ml-0.5 inline-flex min-h-11 items-center text-sm">
        <span class="mr-1.5" aria-hidden="true">←</span> Learn
      </NuxtLink>
      <h1 class="mt-5 text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[46px] md:leading-[1.06]">
        Vue.js path
      </h1>
      <p class="mt-5 text-base leading-[1.7] text-soft md:text-[17px]">
        {{ path.intro }}
      </p>
      <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <div class="flex min-w-[220px] flex-auto items-center gap-3 sm:flex-none">
          <div
            class="h-1.5 w-40 overflow-hidden rounded-full bg-surface"
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
          <span class="font-mono text-xs text-muted">{{ progress }} of {{ allKeys.length }} topics</span>
        </div>
        <button
          v-if="progress"
          type="button"
          class="link-muted inline-flex min-h-11 cursor-pointer items-center text-[13px]"
          @click="save(new Set())"
        >
          Start over
        </button>
        <NuxtLink
          :to="path.source"
          class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
        >
          On GitHub
          <Icon name="lucide:arrow-up-right" class="size-3.5" />
        </NuxtLink>
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
          class="flex flex-col gap-2 rounded-xl border border-line p-4"
        >
          <span class="text-[15px] font-medium">{{ item.title }}</span>
          <span v-if="item.topics.length" class="text-[13px] leading-[1.55] text-muted">{{ item.topics.join(' · ') }}</span>
          <NuxtLink
            v-for="link in item.links"
            :key="link.to"
            :to="link.to"
            class="link-muted inline-flex items-start gap-1.5 text-[13px] leading-[1.5]"
          >
            {{ link.label }}
            <Icon name="lucide:arrow-up-right" class="mt-0.5 size-3.5 shrink-0" />
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section aria-labelledby="the-path" class="pt-14 md:pt-[72px]">
      <SectionTitle id="the-path" class="mb-4">
        The path
      </SectionTitle>
      <ol class="flex flex-col">
        <li
          v-for="(step, index) in steps"
          :id="step.id"
          :key="step.id"
          class="relative flex gap-4 pb-8 last:pb-0"
        >
          <!-- The line that joins one stage to the next. -->
          <span
            v-if="index < steps.length - 1"
            class="absolute top-10 bottom-0 left-[17px] w-px bg-line"
            aria-hidden="true"
          />
          <span
            class="flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-[13px]"
            :class="step.project ? 'border-chip bg-surface text-fg' : 'border-edge bg-bg text-soft'"
            aria-hidden="true"
          >
            <Icon v-if="step.project" name="lucide:hammer" class="size-4" />
            <template v-else>{{ step.number }}</template>
          </span>
          <div class="flex min-w-0 flex-auto flex-col gap-2 pt-1.5">
            <h2 class="text-base font-semibold tracking-[-0.01em] md:text-[17px]">
              <span v-if="step.number" class="sr-only">Stage {{ step.number }}: </span>{{ step.title }}
            </h2>
            <p v-if="step.note" class="text-sm leading-[1.6] text-muted">
              {{ step.note }}
            </p>
            <ul v-if="step.topics.length" class="flex flex-col" :aria-label="`${step.title}: topics`">
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
            <ul v-if="step.links.length" class="flex flex-wrap gap-x-5" :aria-label="`${step.title}: resources`">
              <li v-for="link in step.links" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="link-muted inline-flex min-h-11 items-center gap-1.5 text-[13px]"
                >
                  {{ link.label }}
                  <Icon name="lucide:arrow-up-right" class="size-3.5 shrink-0" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>
