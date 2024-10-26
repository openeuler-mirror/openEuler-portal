<script lang="ts" setup>
import { useScreen } from '~@/composables/useScreen';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import TalentCertification from './TalentCertification.vue';
import TalentDemand from './TalentDemand.vue';
import TalentQuery from './TalentQuery.vue';

import illustration from '~@/assets/category/talent-assessment/illustration.png';
import banner from '~@/assets/category/talent-assessment/banner-bg.png';

const { isPhone } = useScreen();
</script>
<template>
  <BannerLevel2
    :title="$t('talent.bannerTitle')"
    :background-image="banner"
    :illustration="illustration"
  />
  <ContentWrapper :vertical-padding="isPhone ? [0, '32px'] : [0, '72px']">
    <TalentCertification />
    <TalentDemand />
    <TalentQuery />
  </ContentWrapper>
</template>

<style scoped lang="scss">
:deep(.talent-title) {
  @include display3;
  font-weight: 500;
  color: var(--o-color-info1);
  text-align: center;
  margin-top: 72px;
  @media (max-width: 768px) {
    margin-top: 32px;
  }
}
:deep(.o-card) {
  --card-radius: 0;
}
:deep(.o-btn) {
  --btn-radius: 28px;
}
</style>
