<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { OButton } from '@opensig/opendesign';
import AOS from 'aos';

import { useCommon } from '@/stores/common';

import useWindowResize from '@/components/hooks/useWindowResize';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
</script>

<template>
  <div class="summit-banner">
    <div class="banner-panel-cover" :class="{'banner-panel-cover-dark': isDark}"></div>
    <div class="banner-panel-content">
      <div data-aos="fade-up" class="banner-main">
        <img :src="bannerData.textImg[commonStore.theme]" class="text-img" :alt="bannerData.textImgAlt" />
        <img :src="bannerData.textImgMb[commonStore.theme]" class="text-img-mb" :alt="bannerData.textImgAlt" />
        <OButton
          class="banner-btn"
          animation
          variant="solid"
          color="primary"
          size="large"
          :href="bannerData.replayLink"
          target="_self"
        >
          {{ bannerData.watchReplay }}
        </OButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-banner {
  width: 100%;
  height: 380px;
  position: relative;
  .banner-panel-cover {
    height: 100%;
    margin: 0 auto;
    background-image: url('../img/banner-pc-light.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .banner-panel-content {
    position: absolute;
    width: 100%;
    max-width: 1504px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 44px;
    display: flex;
    @media screen and (max-width: 1439px) {
      padding: 0 24px;
    }
  }
  .banner-main {
    width: 100%;
  }
  .text-img {
    height: 153px;
    margin-top: 75px;
    display: block;
  }
  .text-img-mb {
    display: none;
  }

  .banner-btn {
    margin-top: 32px;
  }

  .banner-panel-cover-dark {
    background-image: url('../img/banner-pc-dark.jpg');
  }
}

@media (max-width: 1200px) {
  .summit-banner {
    .banner-panel-cover {
      background-position: calc(70%);
    }
    .text-img {
      height: 120px;
      margin-top: 75px;
    }
    .banner-btn {
      --btn-height: 36px;
      width: 96px;
      @include text1;
    }
  }
}

@media (max-width: 767px) {
  .summit-banner {
    height: 300px;
    .banner-panel-cover {
      background-image: url('../img/banner-mb-light.jpg');
    }
    .banner-panel-content {
      width: 100%;
      max-width: 100%;
      align-items: flex-end;
      justify-content: center;
    }
    .banner-main {
      text-align: center;
    }
    .text-img {
      display: none;
    }
    .text-img-mb {
      display: block;
      width: 70%;
      height: auto;
      margin: 0 auto;
    }

    .banner-btn {
      margin-bottom: 12px;
    }

    .banner-panel-cover-dark {
      background-image: url('../img/banner-mb-dark.jpg');
    }

    .banner-btn {
      margin-top: 16px;
    }
  }
}
@media (max-width: 445px) {
  .summit-banner {
    .text-img-mb {
      width: auto;
      height: 76px;
    }
  }
}
</style>
