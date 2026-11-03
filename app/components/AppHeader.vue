<script setup lang="ts">
  const { nav, more, contact } = useAppConfig();
  const route = useRoute();

  const menuOpen = ref(false);
  const moreOpen = ref(false);
  const moreRoot = useTemplateRef<HTMLElement>('moreRoot');
  const moreButton = useTemplateRef<HTMLButtonElement>('moreButton');

  // The server never sees the hash, so it only counts after hydration.
  const hash = ref('');

  watch(() => route.hash, (value) => {
    hash.value = value;
  });

  /**
   * The one current link. An exact address wins, so /work#apps marks Apps and not Work; otherwise
   * a link is current on its own page, the pages below it, and the sections it `includes`.
   */
  const current = computed(() => {
    const links: { to: string; includes?: string[] }[] = [...nav, ...more];

    return links.find(item => item.to === route.path + hash.value)
      ?? links.find(item => [item.to, ...item.includes ?? []].some(base => route.path === base || route.path.startsWith(`${base}/`)));
  });
  const isCurrent = (item: { to: string }) => current.value?.to === item.to;

  // Close the menus whenever the page changes.
  watch(() => route.path, () => {
    menuOpen.value = false;
    moreOpen.value = false;
  });

  function closeOnEscape (event: KeyboardEvent) {
    if (event.key !== 'Escape') return;

    menuOpen.value = false;
    if (moreOpen.value) {
      moreOpen.value = false;
      moreButton.value?.focus();
    }
  }

  function closeMoreOutside (event: Event) {
    if (!moreRoot.value?.contains(event.target as Node)) {
      moreOpen.value = false;
    }
  }

  // The mobile menu covers the page, so the page behind it must not scroll.
  watch(menuOpen, (open) => {
    document.documentElement.classList.toggle('overflow-hidden', open);
  });

  onMounted(() => {
    hash.value = route.hash;
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeMoreOutside);
    document.addEventListener('focusin', closeMoreOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.removeEventListener('pointerdown', closeMoreOutside);
    document.removeEventListener('focusin', closeMoreOutside);
    document.documentElement.classList.remove('overflow-hidden');
  });
</script>

<template>
  <header>
    <div class="relative z-50 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-4 md:pt-7">
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
        aria-label="Primary"
        class="hidden flex-wrap items-center gap-x-5 text-sm md:flex"
      >
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="link-muted inline-flex min-h-11 items-center"
          :class="isCurrent(item) && '!text-fg'"
          :aria-current="isCurrent(item) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>

        <div ref="moreRoot" class="relative">
          <button
            ref="moreButton"
            type="button"
            class="link-muted inline-flex min-h-11 cursor-pointer items-center gap-1"
            :class="(moreOpen || more.some(isCurrent)) && '!text-fg'"
            :aria-expanded="moreOpen"
            aria-controls="more-menu"
            @click="moreOpen = !moreOpen"
          >
            More
            <Icon
              name="lucide:chevron-down"
              class="size-3.5 transition-[rotate] duration-200 motion-reduce:transition-none"
              :class="moreOpen && 'rotate-180'"
            />
          </button>

          <Transition
            enter-active-class="transition-[opacity,translate] duration-150 motion-reduce:transition-none"
            enter-from-class="-translate-y-1 opacity-0"
            leave-active-class="transition-opacity duration-100 motion-reduce:transition-none"
            leave-to-class="opacity-0"
          >
            <ul
              v-if="moreOpen"
              id="more-menu"
              class="absolute top-full right-0 min-w-36 rounded-xl border border-line bg-raised p-1.5"
            >
              <li v-for="item in more" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="link-muted flex min-h-11 items-center rounded-lg px-3 transition-colors hover:bg-surface"
                  :class="isCurrent(item) && '!text-fg'"
                  :aria-current="isCurrent(item) ? 'page' : undefined"
                  @click="moreOpen = false"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </Transition>
        </div>

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
          <!-- Two lines that turn into a cross when the menu opens. -->
          <span class="relative block h-3 w-[18px]" aria-hidden="true">
            <span
              class="absolute top-0.5 left-0 h-[1.5px] w-full rounded-full bg-current transition-[translate,rotate] duration-300 motion-reduce:transition-none"
              :class="menuOpen && 'translate-y-[3.25px] rotate-45'"
            />
            <span
              class="absolute right-0 bottom-0.5 h-[1.5px] rounded-full bg-current transition-[translate,rotate,width] duration-300 motion-reduce:transition-none"
              :class="menuOpen ? 'w-full -translate-y-[3.25px] -rotate-45' : 'w-[11px]'"
            />
          </span>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-opacity duration-200 motion-reduce:transition-none"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150 motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <div v-if="menuOpen" class="fixed inset-0 z-40 overflow-y-auto bg-bg md:hidden">
        <nav
          id="mobile-menu"
          aria-label="Primary"
          class="mx-auto flex max-w-[880px] flex-col px-6 pt-20 pb-10 text-base tracking-[-0.01em]"
        >
          <NuxtLink
            v-for="(item, index) in nav"
            :key="item.to"
            :to="item.to"
            class="menu-item link-muted flex min-h-11 items-center"
            :class="isCurrent(item) && '!text-fg'"
            :aria-current="isCurrent(item) ? 'page' : undefined"
            :style="{ '--i': index }"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <p class="menu-item eyebrow mt-6 flex min-h-11 items-center" :style="{ '--i': nav.length }">
            More
          </p>
          <NuxtLink
            v-for="(item, index) in more"
            :key="item.to"
            :to="item.to"
            class="menu-item link-muted flex min-h-11 items-center"
            :class="isCurrent(item) && '!text-fg'"
            :aria-current="isCurrent(item) ? 'page' : undefined"
            :style="{ '--i': nav.length + 1 + index }"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <NuxtLink
            :to="contact.to"
            class="menu-item mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-chip text-sm text-fg transition-colors hover:bg-surface"
            :style="{ '--i': nav.length + more.length + 1 }"
            @click="menuOpen = false"
          >
            <Icon name="lucide:mail" class="size-4" />
            {{ contact.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>
