<script lang="ts" setup>
import { computed } from 'vue';

import { useScreen } from '~@/composables/useScreen';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import SigWelcomeJoin from './SigWelcomeJoin.vue';
import SigAbout from './SigAbout.vue';
import SigList from './SigList.vue';

import illustration from '~@/assets/category/talent-assessment/illustration.png';
import banner from '~@/assets/category/talent-assessment/banner-bg.png';

const { isPhone, isPad } = useScreen();

const verticalPadding = computed(() => {
  if (isPhone.value) {
    return ['0', '32px'];
  } else if (isPad.value) {
    return ['0', '40px'];
  } else {
    return ['0', '72px'];
  }
});
</script>
<template>
  <BannerLevel2
    class="sig-banner"
    :title="$t('sig.sigCenter')"
    :subtitle="$t('sig.subtitle')"
    :background-image="banner"
    :illustration="illustration"
  />
  <div class="mo-title">{{ $t('sig.sigCenter') }}</div>
  <SigWelcomeJoin class="sig-welcome" />
  <SigAbout />
  <SigList />
</template>

<style scoped lang="scss">
.sig-banner {
  @include respond-to('<=pad_v') {
    display: none;
  }
}
.mo-title {
  display: none;
  @include respond-to('<=pad_v') {
    margin-top: 16px;
    display: block;
    text-align: center;
    @include display1;
  }
}
.sig-welcome {
  :deep(.section-wrapper) {
    margin-top: 40px;
    @include respond-to('<=pad_v') {
      margin-top: 12px;
    }
  }
}
</style>
