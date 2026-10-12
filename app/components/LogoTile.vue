<script setup lang="ts">
  import type { Mark } from '#shared/types/mark';
  import { logos } from '~/utils/logos';

  const { size = 36, mark, iconSize } = defineProps<{
    mark?: Mark;
    /** Tile edge in px. */
    size?: number;
    iconSize?: number;
  }>();

  const radius = computed(() => Math.round(size / 4));
  // An app icon in colour covers the whole tile, border included.
  const appIcon = computed(() => mark?.logo ? logos[mark.logo]?.color?.fill && logos[mark.logo]!.color : undefined);
  const glyph = computed(() => iconSize ?? (size <= 36 ? 18 : size <= 44 ? 20 : 22));
  // A product logo's own colour, if it has one (see brandStyle).
  const brand = computed(() => {
    const style = brandStyle(mark?.icon);

    return Object.keys(style).length ? style : undefined;
  });
</script>

<template>
  <span
    v-if="mark?.image"
    class="brand-hover block shrink-0 overflow-hidden"
    :style="{ width: `${size}px`, height: `${size}px`, borderRadius: `${radius}px` }"
  >
    <img
      :src="mark.image"
      alt=""
      :width="size"
      :height="size"
      loading="lazy"
      decoding="async"
      class="avatar-mono size-full object-cover"
    >
  </span>
  <span
    v-else
    class="brand-hover relative box-border flex shrink-0 items-center justify-center border border-edge bg-surface text-mark"
    :style="{ width: `${size}px`, height: `${size}px`, borderRadius: `${radius}px` }"
  >
    <BrandLogo
      v-if="mark?.logo"
      :name="mark.logo"
      :scale="size / 44"
      :mask-only="!!appIcon"
    />
    <img
      v-if="appIcon"
      :src="appIcon.src"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      class="brand-logo-color absolute -inset-px size-[calc(100%+2px)] max-w-none object-cover"
      :style="{ borderRadius: `${radius}px` }"
    >
    <Icon
      v-else-if="mark?.icon"
      :name="mark.icon"
      :class="brand && 'brand-icon'"
      :style="{ width: `${glyph}px`, height: `${glyph}px`, ...brand }"
    />
    <span v-else-if="mark?.text" class="font-mono text-[13px] font-medium text-soft">
      {{ mark.text }}
    </span>
    <slot v-else />
  </span>
</template>
