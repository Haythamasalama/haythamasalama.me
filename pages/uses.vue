<script setup>
  definePageMeta({
    title: 'Uses'
  });

  const { data: uses } = await useAsyncData('uses', () => queryContent('uses').sort({ order: 1 }).find());
</script>

<template>
  <section
    v-for="(use, key) in uses"
    :key="key"
    class="flex flex-col text-gray-100 capitalize"
  >
    <SubTitle>{{ use.title }}</SubTitle>

    <ul class="list-disc list-outside px-4 text-justify">
      <li
        v-for="(item, index) in use.items"
        :key="index"
        class="my-1"
      >
        {{ item.label }} {{ item.description ? ` :  ${item.description}` : '' }}

        <ul v-if="item.list" class="list-disc list-outside px-4 mt-1 text-justify">
          <li v-for="(listItem, indexItem) in item.list" :key="indexItem">
            {{ listItem }}
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
