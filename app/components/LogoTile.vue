<script setup lang="ts">
  import type { Mark } from '#shared/types/mark';

  const { size = 36, mark, iconSize } = defineProps<{
    mark?: Mark;
    /** Tile edge in px. */
    size?: number;
    iconSize?: number;
  }>();

  const radius = computed(() => Math.round(size / 4));
  const glyph = computed(() => iconSize ?? (size <= 36 ? 18 : size <= 44 ? 20 : 22));
</script>

<template>
  <span
    v-if="mark?.image"
    class="block shrink-0 overflow-hidden"
    :style="{ width: `${size}px`, height: `${size}px`, borderRadius: `${radius}px` }"
  >
    <img
      :src="mark.image"
      alt=""
      :width="size"
      :height="size"
      loading="lazy"
      decoding="async"
      class="size-full object-cover"
    >
  </span>
  <span
    v-else
    class="box-border flex shrink-0 items-center justify-center border border-edge bg-surface text-mark"
    :style="{ width: `${size}px`, height: `${size}px`, borderRadius: `${radius}px` }"
  >
    <BrandLogo v-if="mark?.logo" :name="mark.logo" :scale="size / 44" />
    <Icon
      v-else-if="mark?.icon"
      :name="mark.icon"
      :style="{ width: `${glyph}px`, height: `${glyph}px` }"
    />
    <span v-else-if="mark?.text" class="font-mono text-[13px] font-medium text-soft">
      {{ mark.text }}
    </span>
    <slot v-else />
  </span>
</template>
