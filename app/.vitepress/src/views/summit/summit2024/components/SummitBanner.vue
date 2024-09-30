<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import AOS from 'aos';

import useWindowResize from '@/components/hooks/useWindowResize';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { lang } = useData();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
</script>

<template>
  <div class="home-banner">
    <div class="banner-panel-cover" :style="{ backgroundImage: `url(${isMobile ? bannerData.moBanner : bannerData.pcBanner})` }"></div>
    <div class="banner-panel-content">
      <div data-aos="fade-up" class="banner-main">
        <img :src="isMobile ? bannerData.moTextImg : bannerData.pcTextImg" class="text-img" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark .banner-panel-cover {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}

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
    height: 156px;
    margin-top: 90px;
  }
}

@media (max-width: 767px) {
  .home-banner {
    height: 300px;
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
      height: 60px;
      margin-bottom: 12px;
    }
  }
}
</style>
