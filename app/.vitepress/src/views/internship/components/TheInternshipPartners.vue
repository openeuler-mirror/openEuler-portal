<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { computed } from 'vue';
import internshipContent from '#content/internship';

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const partners = computed(() => internshipContent.zh.partners);
</script>

<template>
  <div class="partners-grid">
    <div
      v-for="(partner, index) in partners"
      :key="index"
      class="partner-item"
    >
      <img :src="isDark ? partner.logo_dark : partner.logo_light" :alt="partner.name" class="partner-logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.partner-item {
  display: flex;
  align-items: center;
  justify-content: center;

  .partner-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
}

@media screen and (max-width: 840px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>