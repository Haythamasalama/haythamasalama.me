<script setup lang="ts">
  import { logos } from '~/utils/logos';

  /**
   * A one-colour company or school logo. The file is used as a mask, so the
   * logo takes the current text colour and works in both themes.
   */
  const { name, scale = 1, decorative = true } = defineProps<{
    name: string;
    /** 1 = the size it has inside a 44px tile. */
    scale?: number;
    decorative?: boolean;
  }>();

  const logo = computed(() => logos[name]);
</script>

<template>
  <span
    v-if="logo"
    class="block shrink-0 bg-current"
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
</template>
