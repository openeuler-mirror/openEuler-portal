<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <div class="banner">
    <div
      class="summit-banner-pc summit-banner"
      :style="{ backgroundImage: `url(${bannerData.img_pc})` }"
    >
      <div v-if="bannerData.img_text_pc" class="img-box">
        <img :src="bannerData.img_text_pc" alt="" />
        <a
          href="https://e-campaign.huawei.com/m/N7V3Eb"
          data-aos="fade-up"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
    </div>
    <div
      class="summit-banner-mo summit-banner"
      :style="{ backgroundImage: `url(${bannerData.img_mo})` }"
    >
      <div v-if="bannerData.img_text_mo" class="img-box">
        <img :src="bannerData.img_text_mo" alt="" />
        <a
          href="https://e-campaign.huawei.com/m/N7V3Eb"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
    </div>

    <div data-aos="fade-down" class="banner-text">
      <h4 v-if="bannerData.suptitle">{{ bannerData.suptitle }}</h4>
      <h2 v-if="bannerData.title">{{ bannerData.title }}</h2>
      <h3 v-if="bannerData.subtitle">{{ bannerData.subtitle }}</h3>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dark .banner {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.banner {
  width: 100%;
  height: 380px;
  position: relative;
  @media (max-width: 767px) {
    height: auto;
  }
  .summit-banner {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-pc {
    .img-box {
      max-width: 1504px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      img {
        max-width: 548px;
        display: block;
      }
      a {
        display: inline-block;
        margin-left: 40px;
        .banner-btn {
          color: #fff;
          border: 1px solid #fff;
          @media (max-width: 768px) {
            padding: 6px 16px;
            margin-top: 21px;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            .o-icon {
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;
    height: 360px;
    @media (max-width: 768px) {
      width: 100%;
      display: block;
    }
    .img-box {
      margin: 0 auto;
      max-width: 250px;
      height: 360px;
      display: flex;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        bottom: 16px;
      }
      a {
        display: inline-block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        .banner-btn {
          color: #fff;
          border: 1px solid #fff;
          @media (max-width: 768px) {
            padding: 6px 16px;
            margin-top: 21px;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            .o-icon {
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }

  .banner-text {
    position: absolute;
    top: 50%;
    left: 54%;
    transform: translateY(-50%);
    @media (max-width: 767px) {
      width: 100%;
      left: 0;
      text-align: center;
    }
    h4 {
      font-size: var(--e-font-size-h4);
      line-height: var(--e-line-height-h4);
      font-weight: normal;
      @media (max-width: 767px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-hight-h8);
      }
    }
    h2 {
      font-size: 40px;
      line-height: var(--e-line-height-h3);
      font-weight: normal;
      margin-top: var(--e-spacing-h5);
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h8);
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
      }
    }
    h3 {
      margin-top: 32px;
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
      font-weight: normal;
      @media (max-width: 767px) {
        margin-top: 16px;
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
    .banner-btn {
      margin-top: 32px;
      color: var(--e-color-black);
      border: 1px solid var(--e-color-black);
      @media (max-width: 768px) {
        padding: 6px 16px;
        margin-top: 21px;
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        .o-icon {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
