<script lang="ts" setup>
  import { technologyCategories } from '@/types';

  const selectedTechnology = ref(technologyCategories[0]);

  const { data: technologies } = await useAsyncData(
    'home-technologies',
    () => queryCollection('technologies')
      .where('category', 'LIKE', `%${selectedTechnology.value}%`)
      .all(),
    {
      watch: [selectedTechnology]
    }
  );

  const { data: articles } = await useAsyncData(
    'home-latest-articles',
    () => queryCollection('articles')
      .order('date', 'DESC')
      .limit(3)
      .all()
  );
</script>

<template>
  <section class="flex flex-col lg:flex-row justify-center items-center w-full mb-4">
    <div>
      <img
        class="lg:mt-4 rounded-full w-[180px] h-[180px]"
        src="https://avatars.githubusercontent.com/u/37311945?v=4"
        alt="Haytham A. Salama"
        width="180"
        height="180"
        fetchpriority="high"
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
        Full-stack software engineer with 5+ years of experience building scalable logistics and fintech platforms. Specialized in Domain-Driven Design (DDD) and modern stacks (Laravel, Vue.js, Nuxt.js, TypeScript). Experienced in leading cross-functional teams and delivering high-performance systems. Passionate about open-source contributions and applying clean architecture to complex business challenges.
      </p>
      <NuxtLink
        class="flex justify-center items-center lg:justify-start text-primary gap-x-0.5 my-6"
        to="/about"
      >
        About <IconArrowRight />
      </NuxtLink>
    </div>
  </section>

  <div class="flex flex-col items-center w-full border-b-2 mt-2 py-10">
    <h3 class="title-heading-primary text-center mb-8">
      What I Use To Build Great Applications
    </h3>

    <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-flow-col gap-x-10 gap-y-4 text-gray-400 capitalize mb-8">
      <li
        v-for="category in technologyCategories"
        :key="category"
      >
        <button
          type="button"
          class="hover:text-white transition-primary cursor-pointer text-center capitalize w-full"
          :class="{ 'text-white rounded': selectedTechnology === category }"
          :aria-pressed="selectedTechnology === category"
          @click="selectedTechnology = category"
        >
          {{ category }}
        </button>
      </li>
    </ul>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card
        v-for="technology in technologies"
        :key="technology.name"
        target="_blank"
        :to="technology.website"
        :capitalize="false"
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
        :key="post.path"
        class="flex flex-col justify-start"
        :to="post.path"
        :title="post.title"
        :date="post.date"
      />
    </div>
  </div>
</template>
