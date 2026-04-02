<script setup lang="ts">
import { onMounted } from 'vue';
import { OFigure } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import AOS from 'aos';

import { useScreen } from '~@/composables/useScreen';

const props = defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { lePadV } = useScreen();

onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
</script>

<template>
  <div class="minisite-banner">
    <div class="banner-bg" :style="{ backgroundImage: `url(${lePadV ? bannerData.bgMb : bannerData.bg})` }"></div>
    <div v-if="!lePadV" class="banner-content">
      <ContentWrapper data-aos="fade-up">
        <OFigure :src="bannerData.textImg" class="text-img" />
      </ContentWrapper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.minisite-banner {
  width: 100%;
  height: 360px;
  position: relative;
  .banner-bg {
    height: 100%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .banner-content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .content-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .text-img {
    height: 214px;
    display: block;
    :deep(.o-figure-img) {
      width: auto;
    }
  }
}

@include respond-to('<=laptop') {
  .minisite-banner {
    .text-img {
      height: 180px;
    }
  }
}
@include respond-to('<=pad') {
  .minisite-banner {
    .banner-bg {
      background-position: calc(55%);
    }
  }
}
@include respond-to('<=pad_v') {
  .minisite-banner {
    height: 300px;
    .banner-bg {
      background-position: center;
    }
  }
}
</style>
