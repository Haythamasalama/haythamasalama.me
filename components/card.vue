<script lang="ts" setup>
  const NuxtLink = resolveComponent('NuxtLink');

  const props = defineProps<Partial<{
    title: string;
    description: string;
    readMore: string;
    icon: Partial<{
      path: string;
      class: string;
      isText: boolean;
    }>;
    image: string;
    truncate: boolean;
    date: string;
    horizontal: boolean;
    to?: string;
  }>>();

  const textDescription = computed(() => props.truncate && props.description ? props.description.slice(0, 40) + '...' : props.description);
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
            class="w-[60px] h-[60px] rounded-md"
            :class="icon.class"
            :src="icon.path"
            :alt="title"
          >
          <div v-if="!icon.path && icon?.isText && title" class="text-2xl w-[60px] h-[60px] p-3 rounded-md shadow-md bg-gray-600 border text-white text-center capitalize">
            {{ title[0] }}{{ title[title.length - 1] }}
          </div>
        </div>

        <div class="flex flex-col items-start justify-center gap-y-1.5 break-words" :class="{ 'w-4/6 sm:w-full': !horizontal && icon?.path }">
          <div v-if="image" class="w-full">
            <img
              :src="image"
              :alt="title"
              class="h-[180px] w-full object-cover rounded-t"
            >
          </div>

          <h5 class="text-white capitalize w-full">
            {{ title }}
          </h5>

          <p v-if="description" class="text-gray-400 w-full">
            {{ textDescription }}

            <NuxtLink v-if="readMore" :to="readMore" class="text-primary">
              more
            </NuxtLink>
          </p>

          <p v-if="date" class="text-gray-400">
            {{ date }}
          </p>
        </div>
      </div>
    </slot>
  </Component>
</template>
