<template>
  <!-- Wide tables scroll inside their own box on phones instead of widening the page. -->
  <div class="my-6 overflow-x-auto">
    <table class="my-0">
      <slot />
    </table>
  </div>
</template>
