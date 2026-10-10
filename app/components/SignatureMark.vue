<script setup lang="ts">
  import { SIGNATURE_VIEWBOX, signatureStrokes } from '~/utils/signature';

  const { width = 80, animated = true } = defineProps<{
    width?: number;
    /** Draw the signature stroke by stroke on first paint. */
    animated?: boolean;
  }>();

  // The artwork is 156 × 79 units, so keep that ratio at any size.
  const height = computed(() => Math.round(width * 79 / 156));

  // Each instance needs its own gradient id, or hover breaks when two are on a page.
  const gradientId = useId();

  // Remember that it has been drawn, so other pages in this visit skip the animation.
  onMounted(() => {
    if (animated) {
      try {
        sessionStorage.setItem('signature-drawn', '1');
      }
      catch {
        // Storage can be blocked; the signature then just draws again.
      }
    }
  });
</script>

<template>
  <svg
    class="signature"
    :width="width"
    :height="height"
    :viewBox="SIGNATURE_VIEWBOX"
    fill="none"
    stroke-width="3.2"
    stroke-miterlimit="2.6131"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    :style="{ '--signature-gradient': `url(#${gradientId})` }"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="152"
        y2="75"
      >
        <stop offset="0" stop-color="#7F7CF2" />
        <stop offset=".5" stop-color="#6C8CF9" />
        <stop offset="1" stop-color="#4F9BFF" />
      </linearGradient>
    </defs>
    <path
      v-for="(stroke, index) in signatureStrokes"
      :key="index"
      :d="stroke.d"
      :style="animated
        ? {
          strokeDasharray: stroke.length,
          strokeDashoffset: stroke.length,
          animationDuration: `${stroke.duration}s`,
          animationDelay: `${stroke.delay}s`
        }
        : { animation: 'none' }"
    />
  </svg>
</template>
