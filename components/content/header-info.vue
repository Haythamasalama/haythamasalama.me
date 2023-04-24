<script lang="ts" setup>
  const props = defineProps<{
    post: Partial<{
      author: {
        username: string;
        platform?: 'github'|'twitter';
      };
      date: string;
      tags: string[];
      readTime: string;
    }>;
  }>();

  const urlAuthor = computed(() => {
    if (props.post.author?.platform === 'twitter') {
      return `https://twitter.com/${props.post.author?.username}`;
    }

    return `https://github.com/${props.post.author?.username}`;
  });
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-2 sm:gap-x-5 text-gray-400 border-b pb-6">
    <div v-if="post.author?.username" class="flex items-center text-secondary">
      <span>@</span>
      <a :href="urlAuthor"> {{ post.author.username }} </a>
    </div>

    <div v-if="post.date">
      <span class="text-gray-400 me-2">Date :</span>
      <span>
        {{ post.date }}
      </span>
    </div>

    <div v-if="post.tags">
      <span class="text-gray-400 me-2">Tags :</span>
      <span>
        {{ post.tags?.join(' , ') }}
      </span>
    </div>

    <div v-if="post.readTime">
      <span class="text-gray-400 me-2"> Read Time :</span>
      <span>
        {{ post.readTime }}
      </span>
    </div>
  </div>
</template>
