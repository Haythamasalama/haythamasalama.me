<script lang="ts" setup>
  definePageMeta({
    title: 'Projects'
  });

  const { data: projects } = await useAsyncData('projects', () =>
    queryCollection('projects')
      .order('path', 'DESC')
      .all()
  );

  const { data: contributions } = await useAsyncData('contributions', () =>
    queryCollection('contributions')
      .order('title', 'ASC')
      .all()
  );
</script>

<template>
  <section class="mb-4">
    <SubTitle> Open Source </SubTitle>

    <p class="text-gray-400 mt-4">
      I am a big fan of open source software and I try to contribute to it as much as I can.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mt-4">
      <a
        v-for="contribution in contributions"
        :key="contribution.path"
        target="_blank"
      >
        <Card
          class="h-full"
          :title="(contribution.meta?.name as string)"
          horizontal
          :icon="{
            path: `https://github.com/${contribution.meta?.username}.png`,
            class: 'object-cover',
          }"
          truncate
        >
          <template #description>
            <template v-if="contribution.meta.links">
              <BaseLinkIcon  
                v-for="(link, key) in contribution.meta.links"
                :key="key"
                :to="`https://github.com/${link}`"
                :title="link"
              />
            </template>
           
            <BaseLinkIcon  
              v-else
              :to="(contribution.meta?.url as string)"
            >
              <template #title>
                <span 
                  v-for="(type, key) in contribution.meta?.types" 
                  :key="key"
                >
                  {{ type }}
                </span>
              </template>
            </BaseLinkIcon>
          </template>
        </Card>
      </a>
    </div>

    <Alert to="https://github.com/HaythamaSalama/" title="Check My GitHub Account" class="mt-8">
      <template #leading>
        <IconGithub class="fill-white" />
      </template>
    </Alert>
  </section>

  <section class="mb-4">
    <SubTitle> Work Experience </SubTitle>

    <p class="text-gray-400 mt-4">
      I have worked on many projects in different fields, here are some of them.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mt-4">
      <Card
        v-for="project in projects"
        :key="project.path"
        :title="project.title"
        :description="project.description"
        :read-more="project.path"
        :date="`${project.meta.startAt} - ${project.meta.endAt}`"
        :to="project.path"
        truncate
      />
    </div>
  </section>
</template>
