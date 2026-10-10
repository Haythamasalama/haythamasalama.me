<!--
  A 1200 × 630 social card mock-up. It is a specimen, so it keeps the Ink
  colours on both site themes. Every size is a share of the card width, so it
  matches the real /og.png at any size.
-->
<template>
  <div class="@container">
    <div
      class="relative flex aspect-[1200/630] flex-col justify-between overflow-hidden rounded-[14px] border border-[#1F1F23] bg-ink p-[7%] text-[#EDEDEF]"
    >
      <span
        class="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,#7F7CF2,#6C8CF9,#4F9BFF)]"
        aria-hidden="true"
      />
      <img
        src="/images/haytham.jpg"
        alt=""
        width="256"
        height="256"
        loading="lazy"
        class="block aspect-square h-auto w-[14%] rounded-full object-cover"
      >
      <span class="flex flex-col gap-[1cqw]">
        <span class="text-[length:5.67cqw] leading-[1.05] font-semibold tracking-[-0.02em]">
          Haytham A. Salama
        </span>
        <span class="text-[length:2.67cqw] text-[#A1A1AA]">
          Senior software engineer · SaaS, AI, FinTech &amp; Logistics
        </span>
        <span class="font-mono text-[length:2.33cqw] text-[#85858F]">
          haythamasalama.me
        </span>
      </span>
      <img
        src="/brand-kit/haytham-signature-white.svg"
        alt=""
        width="156"
        height="79"
        loading="lazy"
        class="absolute top-[6%] right-[5%] block h-auto w-[30%] opacity-90"
      >
    </div>
  </div>
</template>
