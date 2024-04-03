<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import MoocContent from './MoocContent.vue';

import banner from '@/assets/banner/banner-learning.png';
import illustration from '@/assets/illustrations/mooc.png';

import { useI18n } from '@/i18n';

const i18n = useI18n();
</script>

<template>
  <div class="mooc">
    <BannerLevel2
      background-text="MOOC"
      :title="i18n.mooc.MOOC.MOOC"
      :background-image="banner"
      :illustration="illustration"
    />
    <AppContent>
      <MoocContent></MoocContent>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.mooc {
  .banner {
    height: 30px;
  }
}
</style>
