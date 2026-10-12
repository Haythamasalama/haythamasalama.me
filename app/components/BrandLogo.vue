<script setup lang="ts">
  import { logos } from '~/utils/logos';

  /**
   * A company or school logo. By default it is a one-colour mask that takes the current text colour,
   * so it works in both themes; when the logo has a colour original, that shows instead in light
   * mode and on hover in dark mode (see `.brand-logo-*` in main.css).
   */
  const { name, scale = 1, decorative = true, maskOnly = false } = defineProps<{
    name: string;
    /** 1 = the size it has inside a 44px tile. */
    scale?: number;
    decorative?: boolean;
    /** Leave the colour version to the caller (LogoTile draws app icons across the whole tile). */
    maskOnly?: boolean;
  }>();

  const logo = computed(() => logos[name]);
  // An app icon outside its tile (inline in text) takes the size of the one-colour mark.
  const colorSize = computed(() => {
    const color = logo.value?.color;

    if (!color) return { width: 0, height: 0 };
    if (!color.fill) return { width: Math.round(color.width * scale), height: Math.round(color.height * scale) };

    const edge = Math.round(Math.max(logo.value!.width, logo.value!.height) * scale);

    return { width: edge, height: edge };
  });
</script>

<template>
  <template v-if="logo">
    <span
      class="block shrink-0 bg-current"
      :class="logo.color && 'brand-logo-mask'"
      :role="decorative ? undefined : 'img'"
      :aria-label="decorative ? undefined : logo.name"
      :aria-hidden="decorative ? 'true' : undefined"
      :style="{
        width: `${Math.round(logo.width * scale)}px`,
        height: `${Math.round(logo.height * scale)}px`,
        maskImage: `url(${logo.src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center'
      }"
    />
    <img
      v-if="logo.color && !maskOnly"
      :src="logo.color.src"
      :alt="decorative ? '' : logo.name"
      :aria-hidden="decorative ? 'true' : undefined"
      :width="colorSize.width"
      :height="colorSize.height"
      loading="lazy"
      decoding="async"
      class="brand-logo-color shrink-0 object-contain"
      :style="logo.color.fill ? { borderRadius: `${Math.round(colorSize.width / 4)}px` } : undefined"
    >
  </template>
</template>
