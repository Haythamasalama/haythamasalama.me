<script lang="ts" setup>
  import type { Experience } from '@/types';

  defineProps<Experience>();
</script>

<template>
  <div class="flex flex-col mt-6 border-2 p-6 rounded-md  hover:rounded-xl hover:ring-2 transition-primary">
    <div class="mb-2">
      <h4 class="text-primary-gradient font-bold text-lg">
        <span class="capitalize">{{ title }}</span> <a v-if="company?.url && company?.name" :href="company?.url" target="_blank">  at {{ company.name }}</a>
      </h4>
    </div>

    <div class="text-sm">
      {{ startDate }} - {{ endDate }}
    </div>

    <div class="capitalize text-sm">
      <span>
        {{ employmentType }}
      </span>
      <span v-if="location?.name">
        - {{ location.name }}
      </span>
      <span v-if="location?.type">
        ({{ location.type }})
      </span>
    </div>

    <div class="mt-4">
      <ul class="list-disc list-outside px-4 text-justify">
        <li v-for="(description, key) in descriptions" :key="key" class="mb-2">
          {{ description }}
        </li>
      </ul>
    </div>
  </div>
</template>
