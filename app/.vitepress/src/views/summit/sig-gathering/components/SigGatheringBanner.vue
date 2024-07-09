<script lang="ts" setup>
import { onMounted } from 'vue';
import AOS from 'aos';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
</script>

<template>
  <div class="banner">
    <div
      class="sig-gathering-banner"
      :style="{ backgroundImage: `url(${bannerData.bgPc})` }"
    ></div>
    <div class="banner-panel-content">
      <div data-aos="fade-down" class="banner-main">
        <p class="slogan">{{ bannerData.slogan }}</p>
        <p class="title">{{ bannerData.title }}</p>
        <p class="subtitle subtitle-pc">{{ bannerData.subtitle }}</p>
        <p class="subtitle subtitle-mo">{{ bannerData.subtitleMo }}</p>
      </div>
      <div
        v-if="bannerData.signUpTitle"
        data-aos="fade-up"
        class="action"
      >
        <a :href="bannerData.signUpHref">
          <OButton animation class="home-banner-btn">
            {{ bannerData.signUpTitle }}
            <template #suffixIcon>
              <OIcon><IconArrowRight /></OIcon>
            </template>
          </OButton>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark .banner {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}

.banner {
  width: 100%;
  height: 380px;
  position: relative;
  .sig-gathering-banner {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
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
    @media screen and (max-width: 1439px) {
      padding: 0 24px;
    }
  }
  .slogan {
    font-size: var(--o-font-size-h1);
    line-height: var(--o-line-height-h1);
    font-weight: 700;
    margin-top: 40px;
  }
  .title {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    font-weight: 700;
  }
  .subtitle {
    font-size: 22px;
    line-height: 30px;
    font-weight: 400;
    margin-top: 16px;
  }
  .subtitle-pc {
    display: block;
  }
  .subtitle-mo {
    display: none;
  }
}
.home-banner-btn {
  border-color: #000;
  color: #000;
  padding: 11px 13px 11px 25px;
  margin-top: 46px;
}
@media (max-width: 767px) {
  .banner {
    height: 180px;
    .sig-gathering-banner {
      height: 100%;
      margin: 0 auto;
      background: no-repeat center/cover;
    }
    .banner-panel-content {
      position: absolute;
      width: 200px;
      height: 100%;
      top: 0;
      left: 0;
      transform: translateX(0);
      padding: 0 44px;
      text-align: center;
      @media screen and (max-width: 1439px) {
        padding: 0 24px;
      }
    }
    .slogan {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      margin-top: 40px;
    }
    .title {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
    .subtitle {
      font-size: 8px;
      line-height: 12px;
      margin-top: 4px;
    }
    .subtitle-pc {
      display: none;
    }
    .subtitle-mo {
      display: block;
    }
  }
  .home-banner-btn {
    padding: 3px 11px;
    margin-top: 8px;
    --o-button-font-size: var(--o-font-size-tip);
    --o-button-line-heighte: var(--o-line-height-tip);
    --o-button-icon-font-size: var(--o-font-size-h8);
  }
}
</style>
