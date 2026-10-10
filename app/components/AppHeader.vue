<script setup lang="ts">
  const { nav, contact } = useAppConfig();
  const route = useRoute();

  const menuOpen = ref(false);
  const openGroup = ref<string | null>(null);
  const navRoot = useTemplateRef<HTMLElement>('navRoot');

  /** A group is "current" when the page is one of its children. */
  const isCurrentGroup = (item: (typeof nav)[number]) =>
    !!item.children?.some(child => route.path.startsWith(child.to));

  function toggleGroup (label: string) {
    openGroup.value = openGroup.value === label ? null : label;
  }

  // Close menus whenever the page changes.
  watch(() => route.path, () => {
    menuOpen.value = false;
    openGroup.value = null;
  });

  function closeOnOutside (event: MouseEvent) {
    if (openGroup.value && !navRoot.value?.contains(event.target as Node)) {
      openGroup.value = null;
    }
  }

  function closeOnEscape (event: KeyboardEvent) {
    if (event.key === 'Escape') {
      openGroup.value = null;
    }
  }

  onMounted(() => {
    document.addEventListener('click', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', closeOnOutside);
    document.removeEventListener('keydown', closeOnEscape);
  });
</script>

<template>
  <header>
    <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-4 md:pt-7">
      <NuxtLink
        to="/"
        class="signature-link inline-flex min-h-11 items-center"
        aria-label="Haytham A. Salama, home"
      >
        <!-- Keyed by page, so the signature draws itself again on every page. -->
        <SignatureMark :key="`m${route.path}`" class="md:hidden" :width="72" />
        <SignatureMark :key="`d${route.path}`" class="hidden md:block" :width="80" />
      </NuxtLink>

      <nav
        ref="navRoot"
        aria-label="Primary"
        class="hidden flex-wrap items-center gap-x-4 text-sm md:flex"
      >
        <template v-for="item in nav" :key="item.label">
          <div v-if="item.children" class="relative">
            <button
              type="button"
              class="link-muted inline-flex min-h-11 cursor-pointer items-center gap-1"
              :class="isCurrentGroup(item) && '!text-fg'"
              :aria-expanded="openGroup === item.label"
              :aria-controls="`menu-${item.label}`"
              @click="toggleGroup(item.label)"
            >
              {{ item.label }}
              <Icon
                name="lucide:chevron-down"
                class="size-3.5 transition-transform"
                :class="openGroup === item.label && 'rotate-180'"
              />
            </button>
            <ul
              v-show="openGroup === item.label"
              :id="`menu-${item.label}`"
              class="absolute top-full right-0 z-20 mt-1 w-64 rounded-xl border border-line bg-bg p-1.5 shadow-lg"
            >
              <li v-for="child in item.children" :key="child.to">
                <NuxtLink
                  :to="child.to"
                  class="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
                  active-class="bg-surface"
                >
                  <span class="text-fg">{{ child.label }}</span>
                  <span class="text-[13px] text-faint">{{ child.description }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <NuxtLink
            v-else
            :to="item.to"
            class="link-muted inline-flex min-h-11 items-center"
            active-class="!text-fg"
          >
            {{ item.label }}
          </NuxtLink>
        </template>

        <NuxtLink
          :to="contact.to"
          class="inline-flex min-h-9 items-center rounded-full border border-chip px-3.5 text-fg transition-colors hover:bg-surface"
        >
          {{ contact.label }}
        </NuxtLink>
      </nav>

      <div class="-mr-2.5 flex items-center gap-1 md:hidden">
        <button
          type="button"
          class="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-soft transition-colors hover:bg-surface hover:text-fg"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:equal'" class="size-5" />
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      id="mobile-menu"
      aria-label="Primary"
      class="mt-2 flex flex-col border-y border-line py-2 text-[22px] font-medium tracking-[-0.01em] md:hidden"
    >
      <template v-for="item in nav" :key="item.label">
        <template v-if="item.children">
          <span class="eyebrow mt-4 mb-1">{{ item.label }}</span>
          <NuxtLink
            v-for="child in item.children"
            :key="child.to"
            :to="child.to"
            class="link flex min-h-13 items-center"
            active-class="text-gradient"
          >
            {{ child.label }}
          </NuxtLink>
        </template>
        <NuxtLink
          v-else
          :to="item.to"
          class="link flex min-h-13 items-center"
          active-class="text-gradient"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
      <NuxtLink :to="contact.to" class="link mt-2 flex min-h-13 items-center border-t border-line pt-2">
        {{ contact.label }} →
      </NuxtLink>
    </nav>
  </header>
</template>
