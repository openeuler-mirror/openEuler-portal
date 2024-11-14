<script lang="ts" setup>
import { computed } from 'vue';

import { useScreen } from '~@/composables/useScreen';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import TalentCertification from './TalentCertification.vue';
import TalentDemand from './TalentDemand.vue';
import TalentQuery from './TalentQuery.vue';

import illustration from '~@/assets/category/talent-assessment/illustration.png';
import banner from '~@/assets/category/talent-assessment/banner-bg.png';

const { isPhone, isPad } = useScreen();

const verticalPadding = computed(() => {
  if (isPhone.value) {
    return ['32px', '32px'];
  } else if (isPad.value) {
    return ['40px', '40px'];
  } else {
    return ['72px', '72px'];
  }
});
</script>
<template>
  <BannerLevel2
    :title="$t('talent.bannerTitle')"
    :background-image="banner"
    :illustration="illustration"
  />
  <ContentWrapper :vertical-padding="verticalPadding">
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
  @include respond-to('phone') {
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
