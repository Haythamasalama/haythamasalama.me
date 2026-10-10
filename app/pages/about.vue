<script setup lang="ts">
  useSeoMeta({
    title: 'About',
    description: 'Haytham A. Salama — a full-stack engineer who started out taking radios apart. His story, skills, how he works and where he is headed.'
  });

  const { data: technologies } = await useAsyncData('about-technologies', () =>
    queryCollection('technologies').order('order', 'ASC').all()
  );

  const groupOrder = ['Main stack', 'Back end', 'Front end', 'Testing', 'Deployment', 'Languages', 'Hardware'] as const;

  const skills = computed(() => groupOrder
    .map(group => ({ group, items: technologies.value?.filter(tech => tech.group === group) ?? [] }))
    .filter(row => row.items.length));

  const story = [
    { when: 'Age 5', icon: 'lucide:cpu', text: 'Fell for computers and circuit boards. Repaired radios and PCs, then moved on to Arduino.' },
    { when: 'Design', icon: 'lucide:palette', text: 'Taught myself Photoshop, Illustrator, Premiere and After Effects, and sold design and video work as a freelancer.' },
    { when: 'Age 15', icon: 'lucide:globe', text: 'Found the web: HTML, CSS and JavaScript, then WordPress sites and templates for clients.' },
    { when: '2016', icon: 'lucide:briefcase', text: 'Went freelance as a web developer and delivered more than 16 custom websites.' },
    { when: '2019', icon: 'lucide:graduation-cap', text: 'Started a software engineering degree at Al Azhar University and my first full-time engineering roles.' },
    { when: 'Today', icon: 'lucide:layers', text: 'Building domain-driven logistics and fintech platforms at WINCH and Sanad, and leading the teams around them.' }
  ];

  // Step numbers fade from Iris to Azure down the list.
  const principles = [
    { title: 'Model the domain first', icon: 'lucide:boxes', color: '#7F7CF2', text: 'Software that mirrors the business stays easy to change. Anything that moves money or enforces rules gets Domain-Driven Design.' },
    { title: 'Tests are the spec', icon: 'lucide:flask-conical', color: '#6E89F0', text: 'For card charging and workshop systems I wrote the tests first, so behaviour was agreed before any code existed.' },
    { title: 'Speed is a feature', icon: 'lucide:zap', color: '#618EF8', text: 'Database redesigns, queues and rate limits are product work, not chores — users feel every one of them.' },
    { title: 'Lead across the stack', icon: 'lucide:users', color: '#4F9BFF', text: 'I\'m at my best between front-end, back-end and mobile teams, turning one plan into software that ships.' }
  ];

  const goals = [
    { label: 'Master\'s in ML', icon: 'lucide:graduation-cap' },
    { label: 'Research & teaching', icon: 'lucide:presentation' },
    { label: 'More open source', icon: 'lucide:git-pull-request' }
  ];

  const contacts = [
    { label: 'LinkedIn', to: 'https://www.linkedin.com/in/haythamasalama', icon: 'brand:linkedin', size: 15 },
    { label: 'X', to: 'https://x.com/haythamasalama', icon: 'simple-icons:x', size: 14 },
    { label: 'GitHub', to: 'https://github.com/haythamasalama', icon: 'simple-icons:github', size: 16 }
  ];
</script>

<template>
  <div>
    <section class="flex flex-wrap items-center gap-x-7 gap-y-6 pt-16 md:pt-20">
      <img
        class="photo size-28 shrink-0 rounded-[28px] object-cover"
        src="/images/haytham.jpg"
        alt="Portrait of Haytham A. Salama"
        width="112"
        height="112"
        fetchpriority="high"
      >
      <div class="min-w-0 flex-[1_1_320px]">
        <h1 class="text-[28px] leading-tight font-semibold tracking-[-0.02em] md:text-[30px]">
          About
        </h1>
        <p class="mt-3 text-[17px] leading-[1.7] text-soft">
          I'm Haytham — a full-stack engineer who started out as the kid taking radios apart to see how they worked. I
          still build that way.
        </p>
      </div>
    </section>

    <section aria-labelledby="story" class="pt-14">
      <SectionTitle id="story" class="mb-2">
        The story so far
      </SectionTitle>
      <ol class="border-b border-line">
        <li v-for="step in story" :key="step.when" class="group flex items-start gap-4 border-t border-line py-4">
          <LogoTile
            :mark="{ icon: step.icon }"
            :size="36"
            class="transition-colors group-hover:border-iris-900 group-hover:text-accent-2"
          />
          <span class="flex min-w-0 flex-auto flex-col gap-0.5">
            <span class="font-mono text-xs text-faint">{{ step.when }}</span>
            <span class="text-[15px] leading-[1.65] text-soft">{{ step.text }}</span>
          </span>
        </li>
      </ol>
    </section>

    <section aria-labelledby="skills" class="pt-14">
      <SectionTitle id="skills" class="mb-5">
        Skills &amp; technologies
      </SectionTitle>
      <dl class="flex flex-col gap-[18px]">
        <div v-for="row in skills" :key="row.group" class="flex flex-wrap gap-x-6 gap-y-2">
          <dt class="flex-[0_0_112px] font-mono text-xs leading-[30px] text-faint">
            {{ row.group }}
          </dt>
          <dd class="flex flex-[1_1_400px] flex-wrap gap-1.5">
            <TechChip
              v-for="tech in row.items"
              :key="tech.id"
              :label="tech.name"
              :icon="tech.icon"
              size="md"
            />
          </dd>
        </div>
      </dl>
    </section>

    <section aria-labelledby="how" class="pt-14">
      <SectionTitle id="how" class="mb-2">
        How I work
      </SectionTitle>
      <ol class="border-b border-line">
        <li
          v-for="(principle, index) in principles"
          :key="principle.title"
          class="group flex items-start gap-4 border-t border-line py-[18px]"
        >
          <LogoTile
            :mark="{ icon: principle.icon }"
            :size="40"
            :icon-size="20"
            class="transition-colors group-hover:border-iris-900 group-hover:text-accent-2"
          />
          <span class="flex flex-col gap-1">
            <span class="flex items-baseline gap-2.5">
              <span class="font-mono text-xs" :style="{ color: principle.color }">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="text-base font-medium">{{ principle.title }}</span>
            </span>
            <span class="text-[15px] leading-[1.65] text-muted">{{ principle.text }}</span>
          </span>
        </li>
      </ol>
    </section>

    <section aria-labelledby="vision" class="pt-14">
      <SectionTitle id="vision" class="mb-5">
        Where I'm headed
      </SectionTitle>
      <p class="font-serif text-[32px] leading-[1.25] tracking-[-0.005em] text-fg italic">
        From building systems to researching them.
      </p>
      <p class="mt-5 text-[17px] leading-[1.7] text-soft">
        I'm planning a master's degree in machine learning, and I aspire to become an associate professor in the field
        and earn international recognition for the work. Along the way I'll keep doing what I love today: designing
        clean, domain-driven software and giving back to open source.
      </p>
      <ul class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,180px),1fr))] gap-2.5">
        <li
          v-for="goal in goals"
          :key="goal.label"
          class="flex items-center gap-2.5 rounded-xl bg-surface px-3.5 py-3 text-sm text-soft"
        >
          <Icon :name="goal.icon" class="size-4 text-accent-2" />
          {{ goal.label }}
        </li>
      </ul>
    </section>

    <section aria-labelledby="hello" class="pt-14">
      <SectionTitle id="hello" class="mb-3">
        Say hello
      </SectionTitle>
      <p class="text-[15px] leading-[1.7] text-muted">
        The quickest way to reach me is a message on LinkedIn or X.
      </p>
      <div class="mt-2 flex flex-wrap gap-x-[22px] text-sm">
        <NuxtLink
          v-for="contact in contacts"
          :key="contact.label"
          :to="contact.to"
          class="link-muted inline-flex min-h-11 items-center gap-2"
        >
          <Icon :name="contact.icon" class="text-mark" :style="{ width: `${contact.size}px`, height: `${contact.size}px` }" />
          {{ contact.label }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
