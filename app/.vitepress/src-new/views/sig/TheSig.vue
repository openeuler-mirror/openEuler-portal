<script lang="ts" setup>
import { computed } from 'vue';

import { useScreen } from '~@/composables/useScreen';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import SigWelcome from './SigWelcome.vue';
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
  <SigWelcome />
  <SigAbout />
  <SigList />
</template>

<style scoped lang="scss">
.sig-banner {
  @include respond-to('<=pad_v') {
    display: none;
  }
}
</style>
