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
        Designed &amp; built by {{ site.name }}<br>
        © {{ site.since }}–{{ year }} · <NuxtLink to="/brand" class="link-muted">
          Brand guidelines
        </NuxtLink>
      </p>
    </div>

    <div class="-mr-3 flex">
      <NuxtLink
        v-for="social in socials"
        :key="social.label"
        :to="social.to"
        :aria-label="social.label"
        class="inline-flex size-11 items-center justify-center rounded-lg text-mark transition-colors hover:bg-surface hover:text-accent"
        external
      >
        <Icon :name="social.icon" :style="{ width: `${social.size}px`, height: `${social.size}px` }" />
      </NuxtLink>
    </div>
  </footer>
</template>
