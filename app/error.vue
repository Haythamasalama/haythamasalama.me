<script setup lang="ts">
  import type { NuxtError } from '#app';

  const props = defineProps<{
    error: NuxtError;
  }>();

  const notFound = computed(() => props.error.statusCode === 404);

  useSeoMeta({
    title: notFound.value ? 'Page not found' : 'Something went wrong',
    robots: 'noindex'
  });
</script>

<template>
  <NuxtLayout>
    <section class="pt-16 pb-8 md:pt-[88px]">
      <p class="font-mono text-xs text-faint">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-3 text-[28px] leading-tight font-semibold tracking-[-0.02em] md:text-[30px]">
        {{ notFound ? 'This page took a different path.' : 'Something went wrong.' }}
      </h1>
      <p class="mt-4 text-[17px] leading-[1.7] text-soft">
        <template v-if="notFound">
          The link may be old, or the page moved when the site was rebuilt. Everything is still a click away.
        </template>
        <template v-else>
          Please try again in a moment.
        </template>
      </p>
      <div class="mt-4 flex flex-wrap gap-x-[22px]">
        <button type="button" class="go link-muted inline-flex min-h-11 cursor-pointer items-center text-sm" @click="clearError({ redirect: '/' })">
          Back home<span class="arrow" aria-hidden="true">→</span>
        </button>
        <GoLink to="/work">
          See my work
        </GoLink>
        <GoLink to="/articles">
          Read my writing
        </GoLink>
      </div>
    </section>
  </NuxtLayout>
</template>
