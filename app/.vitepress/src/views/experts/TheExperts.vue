<script setup lang="ts">
import banner from '@/assets/banner-secondary.png';
import summitIll from '@/assets/illustrations/summit.png';
import e1 from '@/assets/img/experts/e1.png';
import e2 from '@/assets/img/experts/e2.png';
import e3 from '@/assets/img/experts/e3.png';
import e4 from '@/assets/img/experts/e4.png';

import BannerLevel2 from '@/components/BannerLevel2.vue';

const info = [
  {
    avator: e1,
    name: '霍太稳',
    detail: ['极客邦科技创始人兼CEO'],
  },
  {
    avator: e2,
    name: '陆首群',
    detail: ['中国开源软件联盟名誉主席', '原国务院信息办常务副主任'],
  },
  {
    avator: e3,
    name: '倪光南',
    detail: ['中国工程院院士'],
  },
  {
    avator: e4,
    name: '周明辉',
    detail: ['北京大学计算机系教授', '北大博雅特聘教授'],
  },
];
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMUNITY"
    title="社区顾问专家"
    :illustration="summitIll"
  />
  <div class="experts">
    <p class="experts-tip">注：按姓氏拼音首字母顺序排序</p>
    <div class="experts-content">
      <div class="content-item" v-for="item in info" :key="item.name">
        <div class="avator">
          <img :src="item.avator" :alt="item.name" />
        </div>
        <div class="info">
          <p class="info-name">{{ item.name }}</p>
          <div class="info-detail">
            <p v-for="detail in item.detail">
              {{ detail }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experts {
  max-width: 1504px;
  margin: 0 auto;
  padding: 40px 44px 62px;

  @media screen and (max-width: 768px) {
    padding: 24px 24px 40px;
  }

  &-tip {
    color: var(--o-color-text2);
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
      background-color: var(--o-color-base);
      box-shadow: 0px 12px 32px 0px rgba(190, 196, 204, 0.2);

      .avator {
        width: 54%;
        background-image: url(@/assets/img/experts/bg.png);
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
          color: var(--o-color-text2);
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
          color: var(--o-color-text3);
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
