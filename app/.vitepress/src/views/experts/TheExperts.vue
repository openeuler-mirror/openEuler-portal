<script setup lang="ts">
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import experts from '@/data/experts';

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/expert.png';
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMUNITY"
    title="社区顾问专家"
    :illustration="illustration"
  />
  <AppContent class="experts">
    <p class="experts-tip">注：按姓氏拼音首字母顺序排序</p>
    <div class="experts-content">
      <OContainer v-for="item in experts" :key="item.name" class="content-item">
        <div class="avator">
          <img :src="item.avator" :alt="item.name" />
        </div>
        <div class="info">
          <p class="info-name">{{ item.name }}</p>
          <div class="info-detail">
            <p v-for="detail in item.detail" :key="detail">
              {{ detail }}
            </p>
          </div>
        </div>
      </OContainer>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.item + .item {
  margin-left: 20px;
}
.experts {
  &-tip {
    color: var(--o-color-text1);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }

  &-content {
    margin-top: var(--o-spacing-h4);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--o-spacing-h2);
    row-gap: var(--o-spacing-h2);

    @media screen and (max-width: 1280px) {
      column-gap: var(--o-spacing-h4);
      row-gap: var(--o-spacing-h4);
    }

    @media screen and (max-width: 1080px) {
      margin-top: var(--o-spacing-h5);
      grid-template-columns: repeat(1, 1fr);
      column-gap: var(--o-spacing-h5);
      row-gap: var(--o-spacing-h5);
    }

    .content-item {
      display: flex;
      background-color: var(--o-color-bg2);

      .avator {
        width: 54%;
        background-image: url(@/assets/category/experts/bg.png);
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column-reverse;

        @media screen and (max-width: 768px) {
          background-image: none;
        }

        img {
          margin-left: 10%;
          max-width: 180px;
          object-fit: fill;

          @media screen and (max-width: 1280px) {
            margin-left: 5%;
          }

          @media screen and (max-width: 1080px) {
            grid-template-columns: repeat(1, 1fr);
            margin: 0 auto;
            max-width: 162px;
          }
        }
      }

      .info {
        padding: 44px 50px;
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 1280px) {
          padding: 30px 40px;
        }

        @media screen and (max-width: 1080px) {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 30px;
        }

        @media screen and (max-width: 768px) {
          padding: 20px 0;
        }

        &-name {
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          font-weight: 500;

          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }

        &-detail {
          margin-top: var(--o-spacing-h5);
          color: var(--o-color-text4);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);

          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            margin-top: var(--o-spacing-h8);
          }
        }
      }
    }
  }
}
</style>
