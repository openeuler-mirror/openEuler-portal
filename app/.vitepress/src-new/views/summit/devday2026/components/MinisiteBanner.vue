<script setup lang="ts">
import { onMounted } from 'vue';
import { OFigure, OButton, OIcon } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconOutLink from '~icons/app-new/icon-outlink.svg';

import AOS from 'aos';

import { useScreen } from '~@/composables/useScreen';

defineProps({
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
    <div
      class="banner-bg"
      :style="{ backgroundImage: `url(${lePadV ? bannerData.bg_mb : bannerData.bg})` }"
    ></div>
    <div v-if="!lePadV" class="banner-content">
      <ContentWrapper data-aos="fade-up">
        <OFigure :src="bannerData.text_img" class="text-img" />
        <OButton v-if="bannerData.href" class="banner-btn" variant="solid" color="primary" size="large" :href="bannerData.href" target="_blank">
          {{ bannerData.btn }}
          <template #suffix>
            <OIcon><IconOutLink /></OIcon>
          </template>
        </OButton>
      </ContentWrapper>
    </div>
    <OButton v-if="lePadV && bannerData.href" class="banner-btn" variant="solid" color="primary" size="medium" :href="bannerData.href" target="_blank">
      {{ bannerData.btn }}
      <template #suffix>
        <OIcon><IconOutLink /></OIcon>
      </template>
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

@include respond('<=laptop') {
  .minisite-banner {
    .text-img {
      height: 180px;
    }
  }
}
@include respond('<=pad') {
  .minisite-banner {
    .banner-bg {
      background-position: calc(55%);
    }
  }
}
@include respond('<=pad_v') {
  .minisite-banner {
    height: 300px;
    .banner-bg {
      background-size: auto 100%;
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
