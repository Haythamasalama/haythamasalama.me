<script lang="ts" setup>
  import type { Experience } from '@/types';

  definePageMeta({
    title: 'About'
  });

  const workExperience: Experience[] = [
    {
      title: 'Full-Stack Engineer',
      company: {
        name: 'WINCH',
        url: 'https://winch.sa/'
      },
      startDate: 'Feb 2023',
      endDate: 'present',
      employmentType: 'full-time',
      location: {
        name: 'Jeddah, Saudi Arabia',
        type: 'Remote'
      },
      descriptions: [
        'Built and maintained business platforms using Domain-Driven Design (DDD), improving long-term scalability and system clarity.',
        'Migrated legacy systems from MVC to a monolithic DDD structure, reducing complexity and easing future development.',
        'Integrated payment gateways and government services (e.g., Elm) to enable secure transactions and compliance.',
        'Improved performance through database redesign, queue processing, and rate limiting, making the system more efficient and stable.',
        'Led cross-functional teams (front-end, back-end, mobile) to deliver reliable business and owner platforms.',
      ]
    },
    {
      title: 'Full-Stack Engineer',
      company: {
        name: 'Sanad',
        url: 'https://investsanad.sa/'
      },
      startDate: 'May 2024',
      endDate: 'present',
      employmentType: 'part-time',
      location: {
        name: 'Jeddah, Saudi Arabia',
        type: 'Remote'
      },
      descriptions: [
        'Developed a platform and an admin dashboard for collective real estate investments.',
        'Designed the platform architecture using DDD to ensure reliability and scalability for financial systems.',
        'Integrated payment gateways and governmental services (e.g., Elm) into the platform.',
        'Collaborated with teams to build a high-traffic investment system with strong data security and compliance standards.',
      ]
    },
    {
      title: 'Full-Stack Developer',
      company: {
        name: 'Faris petrol company',
        url: 'https://fpco.co'
      },
      startDate: 'Nov 2019',
      endDate: 'April 2023',
      employmentType: 'full-time',
      location: {
        name: 'Palestine'
      },
      descriptions: [
        'Designed and developed a reservation system for vehicle water washing pumps, using Raspberry Pi and Laravel to automate operations across multiple locations.',
        'Built a charging balance system with test-driven development (TDD), handling bulk card transactions in background queues.',
        'Created a workshop management system with TDD to track checklists, services, and vehicle accounts.',
        'Developed a games platform for events with interactive features, enhancing customer engagement.',
        'Delivered a human resource system integrated with attendance devices, improving workforce management.',
        'Built a CRM with mobile integration, managing calls, messages, visits, tickets, and more for business teams.'
      ]
    },
    {
      title: 'Full-Stack Developer',
      company: {
        name: 'Patric Technology',
        url: 'https://weptric.com'
      },
      startDate: 'Dec 2019',
      endDate: 'March 2023',
      employmentType: 'full-time',
      location: {
        name: 'Palestine'
      },
      descriptions: [
        'Designed and developed websites, including clever.ps, support.clever.ps, and weptric.com, helping clients establish their digital presence.'
      ]
    },
    {
      title: 'Freelancer Web Developer',
      startDate: 'Apr 2016',
      endDate: 'Feb 2018',
      employmentType: 'freelance',
      descriptions: [
        'Delivered more than 16 custom websites for a range of clients, building early experience in full-stack development and client communication.'
      ]
    }
  ];
</script>

<template>
  <!-- about me in short -->
  <section class="flex flex-col sm:flex-row sm:items-center mb-8">
    <div class="flex flex-col sm:w-3/5 order-2 sm:order-1">
      <h3 class="text-2xl sm:text-4xl font-bold text-white mt-4 gaxp-x-1 sm:mt-0 flex-wrap">
        Hi 👋 , I'm
        <span class="text-primary-gradient">
          Haytham A. Salama
        </span>
      </h3>

      <p class="sm:text-justify mt-4 text-gray-100">
        Full-stack software engineer with 5+ years of experience building scalable logistics and fintech platforms. Specialized in Domain-Driven Design (DDD) and modern stacks (Laravel, Vue.js, Nuxt.js, TypeScript). Experienced in leading cross-functional teams and delivering high-performance systems. Passionate about open-source contributions and applying clean architecture to complex business challenges.
      </p>
    </div>

    <div class="flex order-1 sm:order-2 sm:w-2/5 sm:justify-center">
      <img
        class="w-48 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-primary"
        src="https://avatars.githubusercontent.com/u/37311945?v=4"
        alt="Haytham A. Salama"
      >
    </div>
  </section>

  <section class="flex flex-col mt-4 mb-8 text-gray-100 border-t-2 pt-8">
    <SubTitle>Summary</SubTitle>

    <p class="text-justify mt-4">
      My talent for technology and computers started when I was 5 years old. I have always had a passion for using
      computers and electronic boards.<br><br>

      I started when I was a child, repairing electronic parts and devices such as computers, radios, etc., and dealing
      with advanced electronic parts such as Arduino. On the other hand, I started learning Office and other programs
      and how to install Windows.<br><br>

      And after a while, I started learning graphic design and editing videos using different programs such as
      Photoshop, Illustrator, Premiere, After Effect, etc. Then I provided this service on freelance sites. Then I
      started learning new things about programming, like programming desktop applications and other fields down to web
      applications. I started my journey on the web when I was 15 years old. I started learning the basics, such as
      HTML, CSS, and JS. Then I started gradually, providing services for building websites and WordPress, selling
      templates, etc., and gradually completing my learning roadmap and work so far.<br><br>

      During the learning journey, I used resources that helped me, such as Google, YouTube, various sites, and daily
      content from YouTube channels, as well as some forums, societies, and online courses. After finishing high school,
      I started studying software engineering with a Bachelor's degree and working with different organizations in the
      software industry field.<br><br>

      I'm planning to study for a master's degree in machine learning, and I aspire to have an associate professor
      degree in it and achieve international awards.
    </p>
  </section>

  <section class="flex flex-col mt-4 mb-8 text-gray-100 border-t-2 pt-8">
    <SubTitle>Work Experience</SubTitle>

    <WrokExperienceSection
      v-for="(experience, key) in workExperience"
      :key="key"
      v-bind="experience"
    />

    <Alert to="https://www.linkedin.com/in/haythamasalama/" title="Check My Linkedin Account" class="mt-4">
      <template #leading>
        <IconLinkedin class="fill-white" />
      </template>
    </Alert>
  </section>

  <section class="flex flex-col mt-4 text-gray-100 border-t-2 pt-8">
    <SubTitle>Education</SubTitle>

    <h4 class="text-primary-gradient font-bold capitalize mt-4">
      Al Azhar University - Palestine
    </h4>
    <h4>Bachelor of Engineering - Software Engineering</h4>
    <h4 class="text-sm">
      Aug 2019 - May 2024
    </h4>
  </section>
</template>
