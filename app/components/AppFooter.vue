<script setup lang="ts">
  const { site, socials } = useAppConfig();

  const year = new Date().getFullYear();
</script>

<template>
  <footer class="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-7 pb-10">
    <div class="flex items-center gap-3.5">
      <NuxtLink to="/" class="signature-link inline-flex min-h-11 items-center" aria-label="Home">
        <SignatureMark :width="56" :animated="false" />
      </NuxtLink>
      <p class="text-[13px] leading-normal text-faint">
        Designed &amp; built by {{ site.name }} · <span class="whitespace-nowrap">© {{ site.since }}–{{ year }}</span> · <NuxtLink to="/brand" class="link-muted">
          Brand guidelines
        </NuxtLink>
      </p>
    </div>

    <div class="-mr-3 flex items-center">
      <NuxtLink
        v-for="social in socials"
        :key="social.label"
        :to="social.to"
        :aria-label="social.label"
        class="inline-flex size-11 items-center justify-center rounded-lg text-mark transition-colors hover:bg-surface hover:text-fg"
        external
      >
        <Icon :name="social.icon" :style="{ width: `${social.size}px`, height: `${social.size}px` }" />
      </NuxtLink>
      <span class="mx-1.5 h-5 w-px bg-line" aria-hidden="true" />
      <ThemeToggle />
    </div>
  </footer>
</template>
