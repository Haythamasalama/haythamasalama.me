<script setup lang="ts">
  usePageSeo({
    title: 'Uses',
    description: 'The hardware and software Haytham A. Salama uses every day: editors, terminal, databases, planning and design tools.'
  });

  const { data: sections } = await useAsyncData('uses', () =>
    queryCollection('uses').order('order', 'ASC').all()
  );
</script>

<template>
  <div>
    <PageHeader title="Uses">
      <p>
        My own setup: the hardware and software I open every day. Something only lands here once it has earned a
        permanent spot.
      </p>
      <p class="text-[15px] text-muted">
        Looking for recommendations? Those live on <NuxtLink to="/tools" class="link-underline">Tools</NuxtLink>.
      </p>
    </PageHeader>

    <section
      v-for="section in sections"
      :key="section.id"
      :aria-labelledby="slugify(section.title)"
      class="pt-14"
    >
      <SectionTitle :id="slugify(section.title)" class="mb-2">
        {{ section.title }}
      </SectionTitle>
      <ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-x-6">
        <li v-for="item in section.items" :key="item.name" class="flex items-center gap-3.5 py-2.5">
          <LogoTile :mark="item.mark" :size="40" :icon-size="20" />
          <span class="flex flex-col gap-0.5">
            <span class="text-[15px] font-medium">{{ item.name }}</span>
            <span class="text-[13px] text-faint">{{ item.note }}</span>
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
