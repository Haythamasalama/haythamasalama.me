<script lang="ts" setup>
  const NuxtLink = resolveComponent('NuxtLink');

  const props = withDefaults(defineProps<Partial<{
    title?: string;
    description?: string;
    readMore?: string;
    icon?: Partial<{
      path: string;
      class: string;
      isText: boolean;
    }>;
    image: string;
    truncate?: boolean;
    capitalize?: boolean;
    date: string;
    horizontal?: boolean;
    to?: string;
  }>>(), {
    capitalize: true,
    truncate: true,
    horizontal: false,
    to: ''
  });

  const maxDescriptionLength = 40;

  const textDescription = computed(() => {
    if (!props.truncate || !props.description || props.description.length <= maxDescriptionLength) {
      return props.description;
    }

    return `${props.description.slice(0, maxDescriptionLength)}...`;
  });
</script>

<template>
  <Component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="flex bg-gray-500 shadow rounded-md px-6 py-4"
    :class="{ 'items-center': !horizontal }"
  >
    <slot>
      <div class="flex w-full" :class="{ 'flex-row items-center': !horizontal, 'flex-col': horizontal }">
        <div v-if="icon?.path || icon?.isText" class="w-2/6" :class="{ 'mb-4': horizontal }">
          <img
            v-if="icon.path"
            class="w-[50px] h-[50px] rounded-md"
            :class="icon.class"
            :src="icon.path"
            :alt="title"
            width="50"
            height="50"
            loading="lazy"
            decoding="async"
          >
          <div
            v-if="!icon.path && icon?.isText && title"
            class="text-2xl p-3 rounded-md shadow-md bg-gray-600 border text-white text-center"
            :class="{
              capitalize: capitalize
            }"
          >
            {{ title[0] }}{{ title[title.length - 1] }}
          </div>
        </div>

        <div class="flex flex-col items-start justify-center gap-y-1.5 break-words" :class="{ 'w-4/6 sm:w-full': !horizontal && icon?.path }">
          <div v-if="image" class="w-full">
            <img
              :src="image"
              :alt="title"
              class="h-[180px] w-full object-cover rounded-t"
              loading="lazy"
              decoding="async"
            >
          </div>

          <h5
            class="text-white w-full"
            :class="{
              capitalize: capitalize
            }"
          >
            {{ title }}
          </h5>

          <slot name="description">
            <p v-if="description" class="text-gray-400 w-full">
              {{ textDescription }}

              <!-- The whole card is already a link, so avoid nesting <a> elements. -->
              <span v-if="readMore && to" class="text-primary">more</span>
              <NuxtLink v-else-if="readMore" :to="readMore" class="text-primary">
                more
              </NuxtLink>
            </p>
          </slot>

          <p v-if="date" class="text-gray-400">
            {{ date }}
          </p>
        </div>
      </div>
    </slot>
  </Component>
</template>
