<script setup lang="ts">
  /**
   * The share image of a page (1200×630), drawn at build time by nuxt-og-image.
   * It follows public/og.png: Ink, the white signature, one Iris to Azure
   * hairline, Geist for the title and Geist Mono for the labels. Colours are
   * fixed here because share images have no theme.
   */
  const {
    title = 'Haytham A. Salama',
    description = 'Senior Software Engineer · SaaS, AI, FinTech & Logistics',
    eyebrow = 'haythamasalama.me'
  } = defineProps<{
    title?: string;
    description?: string;
    /** What the page is: "Project", "Article · Laravel", "Tools"… */
    eyebrow?: string;
  }>();
</script>

<template>
  <div
    class="flex h-full w-full flex-col"
    :style="{ backgroundColor: '#0B0B0C', fontFamily: 'Geist Variable' }"
  >
    <div
      class="h-[5px] w-full"
      :style="{ backgroundImage: 'linear-gradient(90deg, #7F7CF2, #4F9BFF)' }"
    />
    <div class="flex flex-1 flex-col justify-between px-[84px] pt-[64px] pb-[72px]">
      <div class="flex items-start justify-between">
        <span
          class="text-[24px] tracking-[0.08em] uppercase"
          :style="{ fontFamily: 'Geist Mono Variable', color: '#A1A1AA' }"
        >
          {{ eyebrow }}
        </span>
        <img
          src="/brand-kit/haytham-signature-white.svg"
          width="240"
          height="122"
          alt=""
        >
      </div>
      <div class="flex flex-col">
        <h1
          class="m-0 text-[64px] leading-[1.1] font-semibold tracking-[-0.02em]"
          :style="{ color: '#EDEDEF', lineClamp: 2, display: 'block', textOverflow: 'ellipsis' }"
        >
          {{ title }}
        </h1>
        <p
          class="m-0 mt-[24px] text-[28px] leading-[1.45]"
          :style="{ color: '#A1A1AA', lineClamp: 2, display: 'block', textOverflow: 'ellipsis' }"
        >
          {{ description }}
        </p>
        <span
          class="mt-[32px] text-[24px]"
          :style="{ fontFamily: 'Geist Mono Variable', color: '#71717A' }"
        >
          haythamasalama.me
        </span>
      </div>
    </div>
  </div>
</template>
