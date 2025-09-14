<script lang="ts" setup>
  import type { RepositoriesContributedTo } from '~/types';

  definePageMeta({
    title: 'Projects'
  });

  const { data: projects } = await useAsyncData('projects', () =>
    queryCollection('projects')
      .order('path', 'DESC')
      .all()
  );

  const repos = ref<RepositoriesContributedTo>({
    data: {
      viewer: {
        repositoriesContributedTo: {
          nodes: [],
          pageInfo: {
            endCursor: '',
            hasNextPage: true
          }
        }
      }
    }
  });

  const endCursor = ref('');

  const { data: repositories, pending } = await useAsyncData<RepositoriesContributedTo>(
    'repos',
    () => $fetch('/api/github', {
      params: {
        endCursor: endCursor.value
      }
    }), {
      watch: [endCursor]
    }
  );

  const loadMoreRepos = () => {
    endCursor.value = repos.value.data.viewer.repositoriesContributedTo.pageInfo.endCursor;
  };

  const hasNextPage = computed(() => repos.value.data.viewer.repositoriesContributedTo.pageInfo.hasNextPage);

  watch(
    () => repositories.value,
    (repositories) => {
      if (!repositories?.data?.viewer) {
        return;
      }

      repos.value = {
        data: {
          viewer: {
            repositoriesContributedTo: {
              ...repositories.data.viewer.repositoriesContributedTo,
              nodes: [
                ...(repos.value.data.viewer.repositoriesContributedTo.nodes || []),
                ...(repositories.data.viewer.repositoriesContributedTo.nodes || [])
              ]
            }
          }
        }
      };
    },
    { immediate: true }
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
        v-for="repo in repos?.data?.viewer?.repositoriesContributedTo.nodes"
        :key="repo.nameWithOwner"
        :href="repo.url"
        target="_blank"
      >
        <Card
          class="h-full"
          :title="repo.nameWithOwner"
          :icon="{ path: repo.owner.avatarUrl, class: 'object-cover' }"
          :description="repo.description"
          truncate
        />
      </a>
    </div>

    <div v-if="pending">
      <Card class="justify-center mt-4" title="Loading..." />
    </div>

    <Alert to="https://github.com/HaythamaSalama/cipherTool" title="Check My GitHub Account" class="mt-8">
      <template #leading>
        <IconGithub class="fill-white" />
      </template>
    </Alert>

    <div v-if="hasNextPage" class="my-8 w-full text-center">
      <BaseButton more @click="loadMoreRepos" />
    </div>
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
