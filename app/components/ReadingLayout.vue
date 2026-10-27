<script setup lang="ts">
  /**
   * A Markdown page in the reading style, with its sections listed beside the
   * text on wide screens and the one being read marked. Used by project, app and
   * design pattern pages, inside a `wide` page.
   */
  const { value } = defineProps<{
    value: { body?: { toc?: { links?: { id: string; text: string; depth: number }[] } } };
  }>();

  const sections = computed(() => (value.body?.toc?.links ?? [])
    .filter(link => link.depth === 2)
    .map(link => ({ id: link.id, text: link.text })));

  // Highlight the section being read: the last heading that has scrolled past the top third.
  const active = ref(sections.value[0]?.id);

  onMounted(() => {
    const headings = sections.value
      .map(section => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => !!heading);

    const update = () => {
      const line = window.innerHeight / 3;
      const passed = headings.filter(heading => heading.getBoundingClientRect().top <= line);

      active.value = (passed.at(-1) ?? headings[0])?.id;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    onBeforeUnmount(() => window.removeEventListener('scroll', update));
  });
</script>

<template>
  <div class="mt-12 border-t border-line pt-4 lg:grid lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-14">
    <nav v-if="sections.length" aria-label="On this page" class="hidden lg:block">
      <div class="sticky top-10 pt-8">
        <p class="eyebrow mb-3">
          On this page
        </p>
        <ul class="flex flex-col border-l border-line">
          <li v-for="section in sections" :key="section.id">
            <a
              :href="`#${section.id}`"
              class="-ml-px flex min-h-9 items-center border-l py-1 pl-3.5 text-[13px] transition-colors"
              :class="active === section.id ? 'border-fg text-fg' : 'border-transparent text-muted hover:text-fg'"
              :aria-current="active === section.id ? 'location' : undefined"
            >
              {{ section.text }}
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <ProseBody :value="value" class="project-body min-w-0" />
  </div>
</template>
