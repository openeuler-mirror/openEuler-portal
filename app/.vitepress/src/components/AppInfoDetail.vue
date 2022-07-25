<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import BannerLevel3 from '@/components/BannerLevel3.vue';

const { frontmatter } = useData();
const isDoc = computed(() => {
  return !!frontmatter.value.doc;
});
</script>

<template>
  <div class="layout">
    <BannerLevel3
      v-if="frontmatter.banner"
      :background-image="frontmatter.banner"
      :title="frontmatter.company"
      :subtitle="frontmatter.summary"
    />
    <div class="makdown-wrap">
      <Content :class="{ markdown: isDoc }" />
    </div>
  </div>
</template>

<style lang="scss"></style>
