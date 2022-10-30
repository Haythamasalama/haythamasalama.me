<script setup>
  definePageMeta({
    title: 'About'
  });
</script>

<template>
  <!-- about me in short -->
  <section class="flex flex-col sm:flex-row sm:items-center mb-8">
    <div class="flex flex-col sm:w-3/5 order-2 sm:order-1">
      <h3 class="text-2xl sm:text-4xl font-bold text-white mt-4 gaxp-x-1 sm:mt-0 flex-wrap">
        Hi there, I'm
        <span class="text-primary-gradient">
          Haytham A. Salama
        </span>
      </h3>

      <p class="sm:text-justify mt-4 text-gray-100">
        I'm a software engineer with over 4 years of experience as a Full-Stack Developer, specializing in analyzing and
        implementing software across various domains such as CRM, customer service, human resources management, workshop
        car systems, asset management, and automation.
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
    <SubTitle>Experience</SubTitle>

    <div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center my-6">
        <div class="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0">
          <span class="bg-primary-gradient px-3 py-1 rounded-full w-fit mb-3 sm:mb-0 sm:mr-4"> 1 </span>
          <div>
            <h4 class="text-primary-gradient font-bold capitalize">
              WINCH
            </h4>
            <h4>Full-Stack Engineer</h4>
          </div>
        </div>

        <div class="flex flex-col sm:justify-center sm:items-center">
          <h4 class="text-primary-gradient font-bold">
            Feb 2023 - present
          </h4>
          <h4>Full-time - Saudi Arabia</h4>
          <h4>Remote</h4>
        </div>
      </div>

      <div>
        <ul class="list-disc list-outside px-4 text-justify">
          <li class="my-1">
            Develop and maintain a platform for the business sector and forwarders using DDD Utilized Laravel, NuxtJs,
            and other technologies.
          </li>
        </ul>
      </div>
    </div>

    <div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center my-6">
        <div class="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0">
          <span class="bg-primary-gradient px-3 py-1 rounded-full w-fit mb-3 sm:mb-0 sm:mr-4"> 2 </span>
          <div>
            <h4 class="text-primary-gradient font-bold capitalize">
              Faris petrol company
            </h4>
            <h4>Full-Stack Developer</h4>
          </div>
        </div>

        <div class="flex flex-col sm:justify-center sm:items-center">
          <h4 class="text-primary-gradient font-bold">
            Nov 2019 - April 2023
          </h4>
          <h4>Full-time - Palestine</h4>
        </div>
      </div>

      <div>
        <ul class="list-disc list-outside px-4 text-justify">
          <li class="my-1">
            Designed and developed a web-based reservation system for vehicle water washing pumps, incorporating
            electronic circuits across multiple locations using Raspberry Pi, Laravel, VueJs, and other technologies.
          </li>
          <li class="my-1">
            Developed and implement a charging balance system for processing bulk card transactions and integrating with
            a financial system using TTD. Utilized Laravel, VueJs, Queues, WebSocket, and PHPUnit.
          </li>
          <li class="my-1">
            Designed and Implemented a workshop car system for managing checklists, services, and accounts for vehicles
            and cars using Laravel, VueJs, and other technologies.
          </li>
          <li class="my-1">
            Developed a Games platform for events which includes a wheel of fortune, box numbers, and a scheduled QR
            that appears at a specific time using Laravel, NuxtJs, TailwindCss, and other technologies.
          </li>
          <li class="my-1">
            Developed a human resource management system, including employee profiles, holidays, leaves, attendance,
            contracts, reports, and more. Integrated with attendance devices and other systems using Laravel, Queues,
            Flutter, and other technologies.
          </li>
          <li class="my-1">
            Designed and implemented a CRM system with an app mobile, including contacts, calls, template messages,
            messages, visits, merchant tickets, notes, and more, integrated with other systems using Laravel, jQuery,
            Queues, Flutter, and other technologies.
          </li>
          <li class="my-1">
            Managed various network systems such as Mikrotik, Alcatel-Lucent, Unifi, VPNs, Active Directory, Kaspersky
            Server, Truenas, 3CX, Windows Server, Ubuntu, VM, and Alcatel switches.
          </li>
        </ul>
      </div>
    </div>

    <div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center my-6">
        <div class="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0">
          <span class="bg-primary-gradient px-3 py-1 rounded-full w-fit mb-3 sm:mb-0 sm:mr-4"> 3 </span>
          <div>
            <h4 class="text-primary-gradient font-bold capitalize">
              Patric Technology
            </h4>
            <h4>Full-Stack Developer</h4>
          </div>
        </div>

        <div class="flex flex-col sm:justify-center sm:items-center">
          <h4 class="text-primary-gradient font-bold">
            Dec 2019 - March 2023
          </h4>
          <h4>Full-time - Palestine</h4>
        </div>
      </div>

      <div>
        <p>Designed and developed different websites:</p>

        <ul class="list-disc list-outside px-4 sm:text-justify">
          <li class="my-1">
            clever.ps, support.clever.ps, weptric.com, fpco.co, speedocloud.com.
          </li>
        </ul>
      </div>
    </div>

    <div>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center my-6">
        <div class="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-0">
          <span class="bg-primary-gradient px-3 py-1 rounded-full w-fit mb-3 sm:mb-0 sm:mr-4"> 4 </span>
          <div>
            <h4 class="text-primary-gradient font-bold capitalize">
              Freelancer Web Developer
            </h4>
          </div>
        </div>

        <div class="flex flex-col sm:justify-center sm:items-center">
          <h4 class="text-primary-gradient font-bold">
            Apr 2016 - Feb 2018
          </h4>
          <h4>Part-time - Remote</h4>
        </div>
      </div>

      <div>
        <p>Designed and developed different websites:</p>
        <ul class="list-disc list-outside px-4 text-justify">
          <li class="my-2">
            mcm.sa
          </li>
          <li class="my-2">
            eofficem.com
          </li>
          <li class="my-2">
            isohere.sa
          </li>
          <li class="my-2">
            drasatech.com
          </li>
          <li class="my-2">
            howatperfume.sa
          </li>
          <li class="my-2">
            nshamagames.com
          </li>
          <li class="my-2">
            thcccam.com
          </li>
          <li class="my-2">
            rashatink3.com
          </li>
          <li class="my-2">
            e3lankgroup1
          </li>
          <li class="my-2">
            thiptv.com
          </li>
          <li class="my-2">
            shamil5.com
          </li>
          <li class="my-2">
            fatlosebelly.com
          </li>
        </ul>
      </div>
    </div>

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
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
      <h4>Bachelor of Engineering - Software Engineering</h4>
      <h4 class="text-primary-gradient font-bold">
        Aug 2019 - May 2024
      </h4>
    </div>
  </section>
</template>
