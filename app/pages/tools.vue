<script lang="ts" setup>
  import { toolCategories, toolCategoryLabels } from '@/types';

  definePageMeta({
    title: 'Tools'
  });

  const selectedCategory = ref('');

  // Clicking the active category again clears the filter.
  const toggleCategory = (category: string) => {
    selectedCategory.value = selectedCategory.value === category ? '' : category;
  };

  // TODO - Add search functionality and pagination

  const { data: tools } = await useAsyncData(
    'tools',
    () => {
      const query = queryCollection('tools');

      if (selectedCategory.value) {
        query.where('category', '=', selectedCategory.value);
      }

      return query
        .order('name', 'ASC')
        .order('category', 'DESC')
        .all();
    },
    {
      watch: [selectedCategory]
    }
  );
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="flex flex-row sm:flex-col flex-wrap mb-4 gap-4 justify-between sm:justify-start sm:w-1/5">
      <button
        v-for="category in toolCategories"
        :key="category"
        type="button"
        class="capitalize cursor-pointer hover:text-white transition-primary text-left"
        :class="selectedCategory === category ? 'text-white' : 'text-gray-400'"
        :aria-pressed="selectedCategory === category"
        @click="toggleCategory(category)"
      >
        {{ toolCategoryLabels[category] ?? category }}
      </button>
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-2 gap-4">
      <Card
        v-for="tool in tools"
        :key="tool.id"
        class="h-full w-full"
        :to="tool.website"
        target="_blank"
        horizontal
        :capitalize="false"
        :title="tool.name"
        :description="tool.description"
        :icon="{ path: tool.icon, isText: true, class: 'object-cover' }"
      />
    </div>
  </div>
</template>
