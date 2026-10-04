<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  name?: string
  src?: string
  alt: string
  caption: string
}>()
</script>

<template>
  <figure class="guide-figure">
    <template v-if="name">
      <img class="figure-light" :src="withBase(`/images/${name}-light.svg`)" :alt="alt" width="720" height="360" loading="lazy" decoding="async">
      <img class="figure-dark" :src="withBase(`/images/${name}-dark.svg`)" :alt="alt" width="720" height="360" loading="lazy" decoding="async">
    </template>
    <img v-else-if="src" :src="withBase(src)" :alt="alt" loading="lazy" decoding="async">
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>
