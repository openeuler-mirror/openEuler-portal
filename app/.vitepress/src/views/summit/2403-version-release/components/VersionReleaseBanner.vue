<script setup lang="ts">
import data_zh from '../data/data_zh';
import AppContext from '@/components/AppContent.vue';
</script>
<template>
  <div class="banner">
    <div class="banner-container">
      <AppContext :pc-top="84" class="banner-wrap">
        <div class="banner-content">
          <p>{{ data_zh.euler }}</p>
          <p>{{ data_zh.version }}</p>

          <div class="release-info">
            <span>{{ data_zh.releaseTime }}</span>
            <span>{{ data_zh.address }}</span>
          </div>
        </div>
      </AppContext>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 380px;
  @media screen and(max-width:768px) {
    height: 300px;
  }
}
.banner-wrap {
  height: 100%;
  position: relative;
}
.banner-container {
  width: 100%;
  height: 100%;
  background-image: url('../img/banner-pc.png');
  background-position: 70% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and(max-width:1280px) {
    background-position: 60%;
  }
  @media screen and(max-width:600px) {
    background-image: url('../img/banner-mo.png');
    background-position-y: 70%;
  }
}

.banner-content {
  width: fit-content;
  text-align: center;
  color: #fff;
  position: absolute;
  left: 112px;
  top: 86px;
  @media screen and(max-width:1100px) {
    left: 84px;
  }
  @media screen and(max-width:768px) {
    top: 52px;
  }
  @media screen and(max-width:600px) {
    display: none;
  }

  p {
    font-size: var(--e-font-size-h1);
    line-height: 65px;
    @media screen and(max-width:1100px) {
      font-size: var(--e-font-size-h2);
      line-height: var(--e-line-height-h2);
    }
    @media screen and(max-width:767px) {
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
    }
  }

  .release-info {
    margin-top: 16px;
    display: flex;
    justify-content: center;

    span {
      font-size: 22px;
      line-height: 30px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
