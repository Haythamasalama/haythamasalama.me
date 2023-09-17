<script lang="ts" setup>
  import { technologyCatogories } from '@/types';

  const selectedTechnology = ref(technologyCatogories[0]);

  const { data: technologies } = await useAsyncData(
    'technologies',
    () => queryContent('technologies')
      .only(['category', 'name', 'icon', 'website', 'description'])
      .where({
        category: {
          $contains: [selectedTechnology.value]
        }
      })
      .sort({ order: 1 })
      .find(),
    {
      watch: [selectedTechnology]
    }
  );

  const { data: articles } = await useAsyncData(
    'articles',
    () => queryContent('articles')
      .only(['title', 'image', 'date', '_path'])
      .sort({ _path: -1, $numeric: true })
      .limit(3)
      .find()
  );
</script>

<template>
  <section class="flex flex-col lg:flex-row justify-center items-center w-full mb-4">
    <div>
      <img
        class="lg:mt-4 rounded-full w-[180px] h-[180px]"
        src="/images/profile.jpeg"
        alt="Haytham A. Salama"
      >
    </div>

    <div class="flex flex-col mt-4 lg:ml-10 lg:w-2/5 text-center">
      <h1 class="text-2xl md:text-4xl xl:text-5xl font-bold text-primary-gradient lg:text-left">
        Haytham A. Salama
      </h1>
      <p class="text-white text-xl mt-2 lg:text-left">
        Software Engineer
      </p>
      <p class="text-gray-100 mt-4 lg:text-justify">
        I'm a software engineer with over 5 years of experience as a Full-Stack Developer, specializing in analyzing and implementing software across various domains for enterprise applications.
        Additionally, I actively contribute to open-source frameworks such as Laravel, Vue.js, and Nuxt.js.
      </p>
      <RouterLink
        class="flex justify-center items-center lg:justify-start text-primary gap-x-0.5 my-6"
        to="/about"
      >
        About <IconArrowRight />
      </RouterLink>
    </div>
  </section>

  <div class="flex flex-col items-center w-full border-b-2 mt-2 py-10">
    <h3 class="title-heading-primary text-center mb-8">
      I Used To Build Great Application
    </h3>

    <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-flow-col gap-x-10 gap-y-4 text-gray-400 capitalize mb-8">
      <li
        v-for="(category, key) in technologyCatogories"
        :key="key"
      >
        <div
          class="hover:text-white transition-primary cursor-pointer text-center"
          :class="{ 'text-white rounded': selectedTechnology === category }"
          @click="selectedTechnology = category"
        >
          {{ category }}
        </div>
      </li>
    </ul>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card
        v-for="technology in technologies"
        :key="technology.name"
        target="_blank"
        :to="technology.website"
        :title="technology.name"
        :icon="{ path: technology.icon }"
        :description="technology.description"
      />
    </div>
  </div>

  <div class="flex flex-col items-center w-full mt-2 pt-10 pb-2">
    <h3 class="title-heading-primary text-center mb-8">
      Articles
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-4 w-full">
      <Card
        v-for="post in articles"
        :key="post._path"
        class="flex flex-col justify-start"
        :to="post._path"
        :title="post.title"
        :date="post.date"
      />
    </div>
  </div>
</template>
