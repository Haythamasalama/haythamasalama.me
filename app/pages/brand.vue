<script setup lang="ts">
  import type { Mark } from '#shared/types/mark';

  definePageMeta({ wide: true });

  useSeoMeta({
    title: 'Brand guidelines',
    description: 'The visual identity of Haytham A. Salama — the handwritten signature, colour, type and voice, plus a brand kit to download.'
  });

  interface Swatch {
    name: string;
    hex: string;
    role: string;
    edge?: 'always' | 'light';
  }

  interface Bio {
    id: string;
    label: string;
    /** Read out by screen readers on the copy button. */
    copyLabel: string;
    text: string;
  }

  interface BrandFile {
    name: string;
    meta: string;
    url: string;
    download: string;
    /** Preview tile background — a fixed colour, the same on both themes. */
    tile: string;
    preview?: string;
    icon?: string;
    width: number;
    height: number;
  }

  // Number colours fade from Iris to Azure, one step darker on the light theme.
  const principles = [
    { title: 'Ink first', color: 'text-iris-400 light:text-iris-600', text: 'Black, white and generous space carry everything. If a layout works without colour, it\'s right.' },
    { title: 'Signed by hand', color: 'text-[#868FFE] light:text-[#486AD2]', text: 'The signature is the logo — personal, a little imperfect on purpose, and never retyped, redrawn or replaced.' },
    { title: 'Colour is a signal', color: 'text-azure-400 light:text-azure-600', text: 'Iris + Azure live in small, precise places — a badge, a hairline, a hover. Rare colour is recognisable colour.' }
  ];

  const donts = [
    { caption: 'Stretch or squash it', alt: 'Stretched signature', image: 'h-[61px] w-[120px] scale-y-56' },
    {
      caption: 'Recolour it',
      alt: 'Signature in an off-brand orange',
      image: 'h-[49px] w-24 [filter:brightness(0)_saturate(100%)_invert(52%)_sepia(93%)_saturate(1700%)_hue-rotate(345deg)]'
    },
    {
      caption: 'Add glows or shadows',
      alt: 'Signature with glow and shadow effects',
      image: 'h-[49px] w-24 [filter:drop-shadow(0_0_6px_#4F9BFF)_drop-shadow(3px_4px_0_#7F7CF2)]'
    },
    {
      caption: 'Place it on busy backgrounds',
      alt: 'Signature on a busy background',
      image: 'h-[49px] w-24',
      tile: 'bg-[repeating-linear-gradient(45deg,#7F7CF2_0_10px,#F5A524_10px_20px,#3FB950_20px_30px)]'
    }
  ];

  const faviconSizes = [16, 32, 48, 80];

  const swatches: Swatch[] = [
    { name: 'Ink', hex: '#0B0B0C', role: 'Page, dark theme', edge: 'always' },
    { name: 'Surface', hex: '#131316', role: 'Tiles and hover', edge: 'always' },
    { name: 'Line', hex: '#1F1F23', role: 'Borders, dividers' },
    { name: 'Text', hex: '#EDEDEF', role: '16.7 : 1 on Ink' },
    { name: 'Muted', hex: '#A1A1AA', role: '7.7 : 1 on Ink' },
    { name: 'Paper', hex: '#FFFFFF', role: 'Page, light theme', edge: 'light' },
    { name: 'Iris 500', hex: '#7F7CF2', role: 'The creative' },
    { name: 'Azure 500', hex: '#4F9BFF', role: 'The engineer' }
  ];

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const scales = [
    {
      name: 'Iris',
      hexes: ['#F5F6FE', '#E9EBFE', '#D4D7FE', '#BABEFE', '#9D9FFE', '#7F7CF2', '#6762D3', '#534DAF', '#3F3B87', '#2C2A62', '#1D1B45'],
      // The darkest step needs a hairline to read against Ink.
      edge: 'border border-[#2A2A3A]',
      ring: 'ring-iris-500'
    },
    {
      name: 'Azure',
      hexes: ['#F2F7FE', '#E2EEFF', '#C5DDFE', '#9EC7FE', '#70ADFF', '#4F9BFF', '#2873D1', '#195CAE', '#134686', '#0D3261', '#052144'],
      edge: 'border border-[#1A2A44]',
      ring: 'ring-azure-500'
    }
  ];

  const typefaces = [
    {
      sample: 'Haytham A. Salama',
      sampleClass: 'text-[34px] leading-[1.15] font-semibold tracking-[-0.025em]',
      font: 'Geist',
      url: 'https://fonts.google.com/specimen/Geist',
      note: '400 · 500 · 600 — headings and everything you read.'
    },
    {
      sample: 'JUL 2023 · laravel/framework #46405',
      sampleClass: 'font-mono text-base tracking-[0.04em] text-soft',
      font: 'Geist Mono',
      url: 'https://fonts.google.com/specimen/Geist+Mono',
      note: '— labels, dates, repositories and code.'
    },
    {
      sample: 'creative developer',
      sampleClass: 'font-serif text-[40px] leading-[1.1] italic',
      font: 'Instrument Serif',
      url: 'https://fonts.google.com/specimen/Instrument+Serif',
      note: 'italic — one human phrase per page.'
    }
  ];

  const marks: { name: string; mark: Mark }[] = [
    { name: 'WINCH', mark: { logo: 'winch' } },
    { name: 'Sanad', mark: { logo: 'sanad' } },
    { name: 'Faris Petrol Company', mark: { logo: 'faris' } },
    { name: 'Patric Technology', mark: { logo: 'patric' } },
    { name: 'Laravel', mark: { icon: 'simple-icons:laravel' } },
    { name: 'Nuxt', mark: { icon: 'simple-icons:nuxt' } },
    { name: 'PhpStorm', mark: { icon: 'simple-icons:phpstorm' } },
    { name: 'Laravel on GitHub', mark: { image: '/avatars/laravel.png' } },
    { name: 'Nuxt on GitHub', mark: { image: '/avatars/nuxt.png' } }
  ];

  const identity = [
    { term: 'Full name', value: 'Haytham A. Salama', note: '— spelled Haytham, never Haitham.' },
    { term: 'Short', value: 'Haytham' },
    { term: 'Title', value: 'Creative developer · Full-stack engineer' },
    { term: 'Handle', value: '@haythamasalama', valueClass: 'font-mono text-sm leading-[1.7]' },
    { term: 'Voice', value: 'Plain words over jargon. Show the work before the title. Warm, never loud.', valueClass: 'text-[15px] leading-[1.6] text-soft' }
  ];

  const bios: Bio[] = [
    {
      id: 'short',
      label: 'SHORT BIO · 40 WORDS',
      copyLabel: 'short bio',
      text: 'Haytham A. Salama is a creative developer and full-stack engineer who builds logistics and fintech platforms with Laravel, Vue and Nuxt. He is a top contributor to Nuxt UI, writes about shipping software, and is heading toward a master’s in machine learning.'
    },
    {
      id: 'long',
      label: 'LONG BIO · 90 WORDS',
      copyLabel: 'long bio',
      text: 'Haytham A. Salama is a full-stack engineer with more than five years of experience building scalable logistics and fintech platforms — today at WINCH and Sanad. He designs systems around the domain, tests them from day one, and leads front-end, back-end and mobile teams to ship them. Before code, he repaired electronics and worked as a designer and video editor, which still shapes how his software feels. He has contributed to Laravel, Nuxt and Nuxt UI, and is preparing for a master’s in machine learning, with an eye on research and teaching.'
    }
  ];

  const files: BrandFile[] = [
    {
      name: 'Signature — white',
      meta: 'SVG · for dark backgrounds',
      url: '/brand-kit/haytham-signature-white.svg',
      download: 'haytham-signature-white.svg',
      tile: 'bg-[#0F0F11]',
      preview: '/brand-kit/haytham-signature-white-small.svg',
      width: 34,
      height: 17
    },
    {
      name: 'Signature — white, small sizes',
      meta: 'SVG · heavier stroke, under 120 px',
      url: '/brand-kit/haytham-signature-white-small.svg',
      download: 'haytham-signature-white-small.svg',
      tile: 'bg-[#0F0F11]',
      preview: '/brand-kit/haytham-signature-white-small.svg',
      width: 34,
      height: 17
    },
    {
      name: 'Signature — black',
      meta: 'SVG · for light backgrounds',
      url: '/brand-kit/haytham-signature-black.svg',
      download: 'haytham-signature-black.svg',
      tile: 'bg-paper',
      preview: '/brand-kit/haytham-signature-black-small.svg',
      width: 34,
      height: 17
    },
    {
      name: 'Signature — black, small sizes',
      meta: 'SVG · heavier stroke, under 120 px',
      url: '/brand-kit/haytham-signature-black-small.svg',
      download: 'haytham-signature-black-small.svg',
      tile: 'bg-paper',
      preview: '/brand-kit/haytham-signature-black-small.svg',
      width: 34,
      height: 17
    },
    {
      name: 'Signature — Iris → Azure',
      meta: 'SVG · hover and focus only',
      url: '/brand-kit/haytham-signature-gradient.svg',
      download: 'haytham-signature-gradient.svg',
      tile: 'bg-[#0F0F11]',
      preview: '/brand-kit/haytham-signature-gradient-small.svg',
      width: 34,
      height: 17
    },
    {
      name: 'Favicon',
      meta: 'SVG · 32 px and up',
      url: '/brand-kit/haytham-favicon.svg',
      download: 'haytham-favicon.svg',
      tile: 'bg-[#0F0F11]',
      preview: '/brand-kit/haytham-favicon.svg',
      width: 30,
      height: 30
    },
    {
      name: 'Favicon — 16 px',
      meta: 'SVG · the H stroke only',
      url: '/brand-kit/haytham-favicon-16.svg',
      download: 'haytham-favicon-16.svg',
      tile: 'bg-[#0F0F11]',
      preview: '/brand-kit/haytham-favicon-16.svg',
      width: 30,
      height: 30
    },
    {
      name: 'App icon',
      meta: 'SVG · home screens, YouTube avatar',
      url: '/brand-kit/haytham-app-icon.svg',
      download: 'haytham-app-icon.svg',
      tile: 'bg-[#0F0F11]',
      preview: '/brand-kit/haytham-app-icon.svg',
      width: 42,
      height: 42
    },
    {
      name: 'Portrait',
      meta: 'JPG · 256 × 256',
      url: '/brand-kit/haytham-portrait.jpg',
      download: 'haytham-portrait.jpg',
      tile: 'bg-[#0F0F11]',
      preview: '/images/haytham.jpg',
      width: 42,
      height: 42
    },
    {
      name: 'Colour & type tokens',
      meta: 'CSS · every hex, gradient and font',
      url: '/brand-kit/haytham-brand-tokens.css',
      download: 'haytham-brand-tokens.css',
      tile: 'bg-[#0F0F11]',
      icon: 'lucide:file-code',
      width: 20,
      height: 20
    }
  ];
</script>

<template>
  <div>
    <section aria-labelledby="guidelines" class="pt-16 md:pt-20">
      <p class="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.08em] text-faint uppercase">
        <span>Brand guidelines</span>
        <span class="rounded-md border-gradient px-[7px] py-0.5 tracking-[0.1em]">
          <span class="text-gradient">v1.0</span>
        </span>
        <span>2026</span>
      </p>
      <h1 id="guidelines" class="mt-4 text-[44px] leading-[1.08] font-semibold tracking-[-0.03em]">
        Signed by hand.<br>
        <span class="text-faint">Built with care.</span>
      </h1>

      <div class="relative mt-10 flex flex-col items-center overflow-hidden rounded-[22px] border border-line bg-raised px-6 py-16">
        <span
          class="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,rgb(127_124_242/0),#7F7CF2,#4F9BFF,rgb(79_155_255/0))]"
          aria-hidden="true"
        />
        <img
          src="/brand-kit/haytham-signature-white.svg"
          alt="Haytham's handwritten signature"
          width="380"
          height="193"
          fetchpriority="high"
          class="block h-auto w-full max-w-[380px] light:hidden"
        >
        <img
          src="/brand-kit/haytham-signature-black.svg"
          alt="Haytham's handwritten signature"
          width="380"
          height="193"
          class="hidden h-auto w-full max-w-[380px] light:block"
        >
      </div>

      <p class="mt-8 text-[17px] leading-[1.7] text-soft">
        This is the visual identity of Haytham A. Salama —
        <span class="text-gradient pr-0.5 font-serif text-[22px] italic">creative developer</span>
        and full-stack engineer. It's a small, personal system: one handwritten signature, black and white doing most
        of the work, and two colours saved for the moments that matter.
      </p>
      <p class="mt-4 text-[15px] leading-[1.7] text-muted">
        Use it when you put my name on a conference poster, a podcast cover, a course, a YouTube thumbnail or an app.
        Everything you need is on this page and in the
        <NuxtLink to="#kit" class="link-underline">brand kit</NuxtLink>.
      </p>
    </section>

    <section aria-labelledby="principles" class="pt-[72px]">
      <SectionTitle id="principles" class="mb-5">
        00 — Three principles
      </SectionTitle>
      <ol class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
        <li
          v-for="(principle, index) in principles"
          :key="principle.title"
          class="flex flex-col gap-2.5 rounded-2xl border border-line p-[22px]"
        >
          <span class="font-mono text-xs" :class="principle.color">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="text-[17px] font-semibold tracking-[-0.01em]">
            {{ principle.title }}
          </h3>
          <p class="text-sm leading-[1.6] text-muted">
            {{ principle.text }}
          </p>
        </li>
      </ol>
    </section>

    <section aria-labelledby="signature" class="pt-[72px]">
      <SectionTitle id="signature" class="mb-2">
        01 — The signature
      </SectionTitle>
      <p class="mb-6 text-[15px] leading-[1.7] text-muted">
        Written once, used everywhere. It's ink: white on dark, black on light. It only takes colour when someone
        reaches for it.
      </p>

      <!-- Specimen tiles keep their own colours on both site themes. -->
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        <BrandFigure title="Dark — the default." caption="White signature on Ink.">
          <div class="flex h-[200px] items-center justify-center rounded-2xl border border-[#1F1F23] bg-[#0F0F11]">
            <img
              src="/brand-kit/haytham-signature-white.svg"
              alt="White signature on Ink"
              width="220"
              height="112"
              loading="lazy"
              class="block h-28 w-[220px]"
            >
          </div>
        </BrandFigure>
        <BrandFigure title="Light." caption="Black signature on Paper.">
          <div class="flex h-[200px] items-center justify-center rounded-2xl border border-transparent bg-paper light:border-line">
            <img
              src="/brand-kit/haytham-signature-black.svg"
              alt="Black signature on Paper"
              width="220"
              height="112"
              loading="lazy"
              class="block h-28 w-[220px]"
            >
          </div>
        </BrandFigure>
      </div>

      <div class="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
        <BrandFigure title="On touch." caption="Hover and focus fill it with Iris → Azure.">
          <div
            tabindex="0"
            role="img"
            aria-label="Signature that fills with Iris to Azure on hover and focus"
            class="group flex h-[150px] flex-col items-center justify-center gap-3 rounded-2xl border border-[#1F1F23] bg-[#0F0F11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
          >
            <img
              src="/brand-kit/haytham-signature-white-small.svg"
              alt="Signature at rest"
              width="110"
              height="56"
              loading="lazy"
              class="block h-14 w-[110px] group-hover:hidden group-focus-visible:hidden"
            >
            <img
              src="/brand-kit/haytham-signature-gradient-small.svg"
              alt="Signature on hover"
              width="110"
              height="56"
              loading="lazy"
              class="hidden h-14 w-[110px] group-hover:block group-focus-visible:block"
            >
            <span class="font-mono text-[11px] text-[#85858F]">hover me</span>
          </div>
        </BrandFigure>
        <BrandFigure title="Clear space." caption="Keep ¼ of its width empty on every side.">
          <div class="flex h-[150px] items-center justify-center rounded-2xl border border-[#1F1F23] bg-[#0F0F11]">
            <span class="flex rounded-md border border-dashed border-[#4A4A55] px-[22px] py-[18px]">
              <img
                src="/brand-kit/haytham-signature-white-small.svg"
                alt="Signature with its clear space"
                width="92"
                height="47"
                loading="lazy"
                class="block h-[47px] w-[92px]"
              >
            </span>
          </div>
        </BrandFigure>
        <BrandFigure
          title="Minimum size."
          caption="56 px on screen, 18 mm in print. Use the heavier &quot;small&quot; file below 120 px."
        >
          <div
            class="flex h-[150px] items-end justify-center gap-[22px] rounded-2xl border border-[#1F1F23] bg-[#0F0F11] pb-7"
          >
            <span class="flex flex-col items-center gap-2">
              <img
                src="/brand-kit/haytham-signature-white-small.svg"
                alt="Signature at 56 pixels"
                width="56"
                height="28"
                loading="lazy"
                class="block h-7 w-14"
              >
              <span class="font-mono text-[11px] text-[#85858F]">56 px</span>
            </span>
            <span class="flex flex-col items-center gap-2">
              <img
                src="/brand-kit/haytham-signature-white.svg"
                alt="Signature at 120 pixels"
                width="120"
                height="61"
                loading="lazy"
                class="block h-[61px] w-[120px]"
              >
              <span class="font-mono text-[11px] text-[#85858F]">120 px +</span>
            </span>
          </div>
        </BrandFigure>
      </div>

      <h3 class="mt-8 mb-3 text-[15px] font-medium">
        Please don't
      </h3>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-3">
        <figure v-for="dont in donts" :key="dont.caption" class="flex flex-col gap-2">
          <div
            class="flex h-[110px] items-center justify-center overflow-hidden rounded-xl"
            :class="dont.tile ?? 'border border-[#1F1F23] bg-[#0F0F11]'"
          >
            <img
              src="/brand-kit/haytham-signature-white-small.svg"
              :alt="dont.alt"
              width="96"
              height="49"
              loading="lazy"
              class="block"
              :class="dont.image"
            >
          </div>
          <figcaption class="flex items-center gap-1.5 text-[13px] text-muted">
            <Icon name="lucide:x" class="size-3.5 shrink-0 text-faint" />
            {{ dont.caption }}
          </figcaption>
        </figure>
      </div>
    </section>

    <section aria-labelledby="favicon" class="pt-[72px]">
      <SectionTitle id="favicon" class="mb-2">
        02 — Favicon &amp; app icon
      </SectionTitle>
      <p class="mb-6 text-[15px] leading-[1.7] text-muted">
        The same signature on an Ink tile. Below 32 px only the big "H" stroke survives, so the smallest favicon keeps
        just that. The app icon is the same mark, larger — no colour at all.
      </p>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        <div class="flex h-[190px] items-end justify-center gap-5 rounded-2xl border border-[#1F1F23] bg-[#16161A] pb-8">
          <span v-for="size in faviconSizes" :key="size" class="flex flex-col items-center gap-2.5">
            <img
              :src="size === 16 ? '/brand-kit/haytham-favicon-16.svg' : '/brand-kit/haytham-favicon.svg'"
              :alt="`Favicon, ${size} pixels`"
              :width="size"
              :height="size"
              loading="lazy"
              class="block"
              :style="{ width: `${size}px`, height: `${size}px` }"
            >
            <span class="font-mono text-[11px] text-[#85858F]">{{ size }}</span>
          </span>
        </div>
        <div class="flex h-[190px] items-center justify-center gap-[22px] rounded-2xl border border-[#1F1F23] bg-[#16161A]">
          <img
            src="/brand-kit/haytham-app-icon.svg"
            alt="App icon, 120 pixels"
            width="120"
            height="120"
            loading="lazy"
            class="block size-[120px] rounded-[28px]"
          >
          <img
            src="/brand-kit/haytham-app-icon.svg"
            alt="App icon, 60 pixels"
            width="60"
            height="60"
            loading="lazy"
            class="block size-[60px] rounded-[14px]"
          >
        </div>
      </div>
    </section>

    <section aria-labelledby="colour" class="pt-[72px]">
      <SectionTitle id="colour" class="mb-2">
        03 — Colour
      </SectionTitle>
      <p class="mb-6 text-[15px] leading-[1.7] text-muted">
        Two neutrals do the heavy lifting. Iris is the creative side — the designer and video editor before the code.
        Azure is the engineer — clear, calm, trusted with money. Click any swatch to copy it.
      </p>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,150px),1fr))] gap-3">
        <BrandSwatch v-for="swatch in swatches" :key="swatch.name" v-bind="swatch" />
      </div>

      <div class="mt-4 flex flex-col gap-2">
        <span
          class="h-14 rounded-[14px] bg-[linear-gradient(90deg,#7F7CF2,#7684F5_25%,#6C8CF9_50%,#5F94FC_75%,#4F9BFF)]"
          role="img"
          aria-label="The signature gradient, from Iris 500 to Azure 500"
        />
        <p class="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs text-faint">
          <span><span class="text-fg">Signature gradient</span> · Iris 500 → Azure 500</span>
          <span class="min-w-0 wrap-anywhere">linear-gradient(90deg, #7F7CF2, #6C8CF9, #4F9BFF)</span>
        </p>
      </div>

      <h3 class="mt-8 mb-2.5 text-[15px] font-medium">
        Full scales
      </h3>
      <div class="flex flex-col gap-2.5">
        <div
          v-for="scale in scales"
          :key="scale.name"
          class="grid grid-cols-11 gap-1"
          role="img"
          :aria-label="`${scale.name} scale, from ${scale.name} 50 to ${scale.name} 950`"
        >
          <span
            v-for="(hex, index) in scale.hexes"
            :key="hex"
            :title="`${scale.name} ${steps[index]} ${hex}`"
            class="h-10 rounded-md"
            :class="[
              steps[index] === 500 && ['ring-1 ring-offset-2 ring-offset-bg', scale.ring],
              steps[index] === 950 && scale.edge
            ]"
            :style="{ background: hex }"
          />
        </div>
        <div class="grid grid-cols-11 gap-1 text-center font-mono text-[10.5px] text-faint" aria-hidden="true">
          <span v-for="step in steps" :key="step" :class="{ 'text-fg': step === 500 }">{{ step }}</span>
        </div>
        <p class="mt-1.5 text-[13.5px] leading-[1.6] text-muted">
          <span class="text-fg">300–500</span> for details on dark · <span class="text-fg">600–700</span> for details on
          white and buttons with white text · every hex is in the tokens file.
        </p>
      </div>

      <h3 class="mt-8 mb-2.5 text-[15px] font-medium">
        The 95 / 5 rule
      </h3>
      <div class="flex h-10 overflow-hidden rounded-[10px] border border-[#1F1F23]" aria-hidden="true">
        <span class="flex-[70_1_0%] bg-ink" />
        <span class="flex-[25_1_0%] bg-[#EDEDEF]" />
        <span class="flex-[5_1_0%] bg-linear-90 from-iris-500 to-azure-500" />
      </div>
      <p class="mt-2.5 text-[13.5px] leading-[1.6] text-muted">
        70% Ink · 25% white, greys and the signature · never more than 5% Iris + Azure.
      </p>

      <h3 class="mt-8 mb-2.5 text-[15px] font-medium">
        Where the colour goes
      </h3>
      <ul class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
        <li class="flex h-[108px] flex-col justify-between rounded-[14px] border border-line p-[18px]">
          <span class="self-start rounded-md border-gradient px-[7px] py-0.5 font-mono text-[10.5px] tracking-[0.1em]">
            <span class="text-gradient">PRO</span>
          </span>
          <span class="text-[13px] text-muted"><span class="text-fg">Badges</span> — PRO, LIVE, NEW</span>
        </li>
        <li class="flex h-[108px] flex-col justify-between rounded-[14px] border border-line p-[18px]">
          <span class="inline-flex items-center gap-2 text-[13px] text-fg">
            <span
              class="size-2 shrink-0 animate-live rounded-full bg-linear-135 from-iris-500 to-azure-500"
              aria-hidden="true"
            />
            Live now
          </span>
          <span class="text-[13px] text-muted"><span class="text-fg">Status dot</span> — with a soft pulse</span>
        </li>
        <li class="flex h-[108px] flex-col justify-between rounded-[14px] border border-line p-[18px]">
          <span class="flex gap-3.5 text-[13px] text-muted">
            <span>Work</span>
            <span class="pb-[5px] text-fg [background:var(--gradient)_no-repeat_0_100%/100%_1.5px]">Writing</span>
            <span>About</span>
          </span>
          <span class="text-[13px] text-muted"><span class="text-fg">Active underline</span> — 1.5 px</span>
        </li>
        <li class="flex h-[108px] flex-col justify-between rounded-[14px] border border-line p-[18px]">
          <span class="flex flex-col gap-2">
            <span class="text-xs text-muted">Lesson 4 of 6</span>
            <span class="h-1 overflow-hidden rounded-xs bg-line">
              <span class="block h-full w-[64%] [background:var(--gradient)]" />
            </span>
          </span>
          <span class="text-[13px] text-muted"><span class="text-fg">Progress</span> — a thin bar, never a block</span>
        </li>
        <li class="flex h-[108px] flex-col justify-between rounded-[14px] border border-line p-[18px]">
          <span class="flex items-center gap-3">
            <span
              class="inline-flex min-h-[30px] items-center rounded-lg px-3 text-[13px] outline-2 outline-offset-2 outline-iris-400 light:outline-iris-600"
            >
              Focus
            </span>
            <span class="text-[13px] text-azure-400 light:text-azure-600">Link →</span>
          </span>
          <span class="text-[13px] text-muted"><span class="text-fg">Focus &amp; hover</span> — 400s on dark</span>
        </li>
        <li class="flex h-[108px] flex-col justify-between rounded-[14px] border border-line p-[18px]">
          <span class="text-[15px] text-soft">
            a <span class="text-gradient pr-0.5 font-serif text-xl italic">creative</span> word
          </span>
          <span class="text-[13px] text-muted"><span class="text-fg">One word</span> — per page, at most</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="typography" class="pt-[72px]">
      <SectionTitle id="typography" class="mb-6">
        04 — Typography
      </SectionTitle>
      <div class="flex flex-col border-t border-line">
        <div
          v-for="face in typefaces"
          :key="face.font"
          class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line py-[22px]"
        >
          <span :class="face.sampleClass">{{ face.sample }}</span>
          <span class="max-w-60 text-[13.5px] leading-normal text-muted">
            <NuxtLink :to="face.url" class="link-underline">{{ face.font }}</NuxtLink> {{ face.note }}
          </span>
        </div>
      </div>
    </section>

    <section aria-labelledby="icons" class="pt-[72px]">
      <SectionTitle id="icons" class="mb-2">
        05 — Icons &amp; the people I've worked with
      </SectionTitle>
      <p class="mb-5 text-[15px] leading-[1.7] text-muted">
        Tools, technologies and companies are shown in one soft white on a Surface tile, so they sit quietly together
        and never compete with the signature. Open-source projects keep their own GitHub avatars.
      </p>
      <ul aria-label="Logos and icons" class="flex flex-wrap gap-2">
        <li v-for="item in marks" :key="item.name" :title="item.name">
          <LogoTile :mark="item.mark" :size="52" />
          <span class="sr-only">{{ item.name }}</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="in-the-world" class="pt-[72px]">
      <SectionTitle id="in-the-world" class="mb-6">
        06 — Out in the world
      </SectionTitle>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
        <figure class="flex flex-col gap-2.5">
          <BrandSocialCard />
          <figcaption class="text-[13.5px] text-muted">
            <span class="text-fg">Social card</span> · 1200 × 630
          </figcaption>
        </figure>
        <figure class="flex flex-col gap-2.5">
          <BrandThumbnail />
          <figcaption class="text-[13.5px] text-muted">
            <span class="text-fg">YouTube thumbnail</span> · black and white, colour only on the badge
          </figcaption>
        </figure>
      </div>
    </section>

    <section aria-labelledby="voice" class="pt-[72px]">
      <SectionTitle id="voice" class="mb-6">
        07 — Name, title &amp; voice
      </SectionTitle>
      <dl class="flex flex-col border-t border-line">
        <div
          v-for="row in identity"
          :key="row.term"
          class="flex flex-wrap gap-x-6 gap-y-1 border-b border-line py-4"
        >
          <dt class="flex-[0_0_120px] font-mono text-xs leading-6 text-faint">
            {{ row.term }}
          </dt>
          <dd class="flex-[1_1_300px]" :class="row.valueClass ?? 'text-[15px] leading-[1.6]'">
            {{ row.value }}
            <span v-if="row.note" class="text-faint">{{ row.note }}</span>
          </dd>
        </div>
      </dl>

      <div class="mt-5 flex flex-col gap-3">
        <article v-for="bio in bios" :key="bio.id" class="flex flex-col gap-3 rounded-[14px] border border-line p-5">
          <div class="flex items-center justify-between gap-3">
            <h3 class="font-mono text-xs tracking-[0.06em] text-faint">
              {{ bio.label }}
            </h3>
            <!-- 36px tall like the design; the ::before stretches the tap target to 44px. -->
            <CopyButton
              :text="bio.text"
              :label="bio.copyLabel"
              class="relative min-h-9 border border-edge px-3 before:absolute before:inset-x-0 before:-inset-y-1 hover:border-chip"
            />
          </div>
          <p class="text-[15px] leading-[1.7] text-soft">
            {{ bio.text }}
          </p>
        </article>
      </div>
    </section>

    <section aria-labelledby="kit" class="pt-[72px]">
      <SectionTitle id="kit" class="mb-2 scroll-mt-8">
        08 — Brand kit
      </SectionTitle>
      <p class="mb-5 text-[15px] leading-[1.7] text-muted">
        Every file on this page, ready to drop into Figma, slides or code. Vector where it matters.
      </p>
      <ul class="flex flex-col gap-2">
        <li v-for="file in files" :key="file.download">
          <a
            :href="file.url"
            :download="file.download"
            class="link flex items-center gap-3.5 rounded-xl border border-line py-2.5 pr-3.5 pl-2.5 transition-colors hover:border-chip hover:bg-surface"
          >
            <span
              class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#232328]"
              :class="file.tile"
              aria-hidden="true"
            >
              <img
                v-if="file.preview"
                :src="file.preview"
                alt=""
                :width="file.width"
                :height="file.height"
                loading="lazy"
                class="block"
                :class="{ 'rounded-[9px] object-cover': file.width === 42 }"
                :style="{ width: `${file.width}px`, height: `${file.height}px` }"
              >
              <Icon
                v-else-if="file.icon"
                :name="file.icon"
                class="text-[#D4D4D8]"
                :style="{ width: `${file.width}px`, height: `${file.height}px` }"
              />
            </span>
            <span class="flex min-w-0 flex-auto flex-col gap-0.5">
              <span class="text-[14.5px] font-medium">{{ file.name }}</span>
              <span class="font-mono text-[11.5px] text-faint">{{ file.meta }}</span>
            </span>
            <span class="inline-flex shrink-0 items-center gap-1.5 text-[13px] text-muted">
              <Icon name="lucide:arrow-down-to-line" class="size-4" />
              Download
            </span>
          </a>
        </li>
      </ul>
      <p class="mt-5 text-sm leading-[1.7] text-faint">
        Need something that isn't here — a print file, a podcast cover, a talk slide? Message me on
        <NuxtLink to="https://www.linkedin.com/in/haythamasalama" class="link-underline">LinkedIn</NuxtLink> or
        <NuxtLink to="https://x.com/haythamasalama" class="link-underline">X</NuxtLink>.
      </p>
    </section>
  </div>
</template>
