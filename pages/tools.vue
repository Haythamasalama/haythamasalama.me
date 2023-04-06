<script lang="ts" setup>
  import { toolCatogories } from '@/types';

  definePageMeta({
    title: 'Tools'
  });

  const selectedCatogory = ref('');

  // TODO - Add search functionality and pagination

  const { data: tools } = await useAsyncData(
    'tools',
    () =>
      queryContent('tools')
        .only(['category', 'name', 'website', 'icon', 'description'])
        .where({
          category: {
            $contains: [selectedCatogory.value]
          }
        })
        .sort({ title: 1, category: -1 })
        .find(),
    {
      watch: [selectedCatogory]
    }
  );
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="flex flex-row sm:flex-col flex-wrap mb-4 gap-4 justify-between sm:justify-start sm:w-1/5">
      <div
        v-for="(category, key) in toolCatogories"
        :key="key"
        class="capitalize cursor-pointer hover:text-white transition-primary"
        :class="selectedCatogory === category ? 'text-white' : 'text-gray-400'"
        @click="selectedCatogory = category"
      >
        {{ category }}
      </div>
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-2 gap-4">
      <Card
        v-for="(tool, key) in tools"
        :key="key"
        class="h-full w-full"
        :to="tool.website"
        target="_blank"
        horizontal
        :title="tool.name"
        :description="tool.description"
        :icon="{ path: tool.icon, isText: true, class: 'object-cover' }"
      />
    </div>
  </div>
</template>
