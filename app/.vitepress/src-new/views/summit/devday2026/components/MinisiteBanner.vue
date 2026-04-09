<script setup lang="ts">
import { onMounted } from 'vue';
import { OFigure, OButton } from '@opensig/opendesign';

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
    <div class="banner-bg"></div>
    <div v-if="!lePadV" class="banner-content">
      <ContentWrapper data-aos="fade-up">
        <OFigure :src="bannerData.textImg" class="text-img" />
        <OButton class="banner-btn" variant="solid" color="primary" size="large" :href="bannerData.href" target="_blank">
          {{ bannerData.btn }}
        </OButton>
      </ContentWrapper>
    </div>
    <OButton v-else class="banner-btn" variant="solid" color="primary" size="medium" :href="bannerData.hrefMb" target="_blank">
      {{ bannerData.btn }}
    </OButton>
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
    background-image: url('../img//banner.jpg');
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
  .o-btn {
    margin-top: 24px;
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
      background-image: url('../img/banner-mb.jpg'), url('../img/mb.jpg');;
      background-repeat: no-repeat, no-repeat;
      background-size: auto 100%,cover, cover;
      background-position: center, center;
    }
    .o-btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 12px;
      --btn-min-width: 96px;
    }
  }
}
</style>
