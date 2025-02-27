<template>
  <div class="banner-level2">
    <img src="@/assets/nestos/banner/banner-minisite.png" class="banner-bg" />
    <div class="wrap">
      <div class="banner-text" data-aos="fade-up">
        <p class="banner-text-bg">
          {{ i18n.nestos.banner.backgroundText }}
        </p>
        <h1 class="banner-title">{{ i18n.nestos.banner.title }}</h1>
        <p class="banner-subtitle">
          {{ i18n.nestos.banner.subtitle }}
        </p>
      </div>
      <div class="banner-illustration" data-aos="fade-down">
        <img src="@/assets/nestos/banner/banner-right.png" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from '@/i18n';
const i18n = useI18n();
</script>

<style lang="scss" scoped>
.banner-level2 {
  position: relative;
  width: 100%;
  height: 450px;
  background-size: cover;
  background-repeat: no-repeat;

  .banner-bg {
    position: absolute;
    height: 100%;
    width: 100vw;
    object-fit: fill;
    -webkit-user-select: none;
    user-select: none;
  }

  .wrap {
    position: relative;
    width: 74.2%;
    height: 100%;
    margin: 0 auto;
    color: #fff;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .banner-text {
      display: flex;
      flex-direction: column;
      position: relative;
      margin: auto 0;

      &-bg {
        position: absolute;
        top: 0;
        opacity: 0.14;
        font-size: 62px;
        font-weight: bold;
        -webkit-user-select: none;
        user-select: none;
      }

      .banner-title {
        position: relative;
        z-index: 1;
        margin-top: 32px;
        margin-bottom: 0;
        font-weight: 500;
      }

      .banner-subtitle {
        position: relative;
        z-index: 1;
        font-size: 20px;
        margin-top: 14px;
      }
    }

    .banner-illustration {
      width: 34%;
      object-fit: fill;
      text-align: right;

      img {
        -webkit-user-select: none;
        user-select: none;
        width: 100%;
      }
    }
  }
}
</style>
