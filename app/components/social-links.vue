<script lang="ts" setup>
  const { socials } = useAppConfig();
</script>

<template>
  <div>
    <a
      :href="socials.twitter"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X (Twitter)"
    >
      <IconTwitter class="fill-white hover:fill-primary" />
    </a>
    <a
      :href="socials.github"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <IconGithub class="fill-white hover:fill-primary" />
    </a>
    <a
      :href="socials.linkedin"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <IconLinkedin class="fill-white hover:fill-primary" />
    </a>
    <a
      :href="socials.medium"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Medium"
    >
      <IconMedium class="fill-white hover:fill-primary w-7 h-7" />
    </a>
  </div>
</template>
