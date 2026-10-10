<script setup lang="ts">
  const { nav } = useAppConfig();
  const route = useRoute();

  const menuOpen = ref(false);

  // Close the phone menu whenever the page changes.
  watch(() => route.path, () => {
    menuOpen.value = false;
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
        <SignatureMark class="md:hidden" :width="72" />
        <SignatureMark class="hidden md:block" :width="80" />
      </NuxtLink>

      <nav aria-label="Primary" class="hidden flex-wrap items-center gap-x-4 text-sm md:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="link-muted inline-flex min-h-11 items-center"
          active-class="!text-fg"
        >
          {{ item.label }}
        </NuxtLink>
        <ThemeToggle class="-mr-3" />
      </nav>

      <div class="-mr-2.5 flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-soft transition-colors hover:bg-surface hover:text-accent-2"
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
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="link flex min-h-13 items-center"
        active-class="text-gradient"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
