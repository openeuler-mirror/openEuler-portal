<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import AOS from 'aos';

import { useCommon } from '@/stores/common';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

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

const isLight = computed(() => {
  return commonStore.theme === 'light';
});

onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
</script>

<template>
  <div class="home-banner">
    <div class="banner-panel-cover"></div>
    <div class="banner-panel-content">
      <div data-aos="fade-up" class="banner-main">
        <img
          :src="isLight ? bannerData.pcTextImgLight : bannerData.pcTextImgDark"
          class="text-img"
        />
        <div v-if="bannerData.btn" data-aos="fade-up" class="action">
          <ClientOnly>
            <a :href="bannerData.link">
              <OButton animation class="home-banner-btn">
                {{ bannerData.btn }}
                <template #suffixIcon>
                  <OIcon><IconArrowRight /></OIcon>
                </template>
              </OButton>
            </a>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$banner-color: var(--e-color-text1);

.home-banner {
  width: 100%;
  height: 380px;
  position: relative;
  .banner-panel-cover {
    height: 100%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url(../img/banner_pc_light.jpg);
    @media screen and (max-width: 768px) {
      background-image: url(../img/banner_mo_light.png);
    }
  }
  .banner-panel-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    @media screen and (max-width: 768px) {
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 20px;
    }
  }

  .banner-main {
    width: 100%;
  }
  .text-img {
    height: 156px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .action {
    @media screen and (min-width: 550px) and (max-width: 768px) {
      display: none;
    }
    margin-top: 32px;
    a {
      display: inline-block;
    }
    .o-icon {
      @media screen and (max-width: 824px) {
        font-size: 16px;
      }
    }
    @media screen and (max-width: 768px) {
      margin-top: 0;
    }
  }
  .home-banner-btn {
    border-color: $banner-color;
    color: $banner-color;
    @media screen and (max-width: 824px) {
      padding: 5px 12px 5px 16px;
      line-height: 22px;
      font-size: 14px;
    }
  }
}
.dark .banner-panel-cover {
  background-image: url(../img/banner_pc_dark.jpg);
  @media screen and (max-width: 768px) {
    background-image: url(../img/banner_mo_dark.png);
  }
}
@media (max-width: 767px) {
  .home-banner {
    height: 300px;
    .banner-panel-content {
      width: 100%;
      max-width: 100%;
    }
    .banner-main {
      text-align: center;
    }
    .text-img {
      height: 60px;
      margin-bottom: 12px;
    }
  }
}
</style>
