<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import Banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/category/certification/ill.png';
import cardBg from '@/assets/category/certification/card-bg.png';

import IconRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();
function onMoreClick(type: number, link = '') {
  if (type === 1) {
    router.go(`/${lang.value}/community/certification-services/search.html`);
  } else if (link) {
    window.open(link, '_blank');
  }
}
</script>
<template>
  <BannerLevel2
    :background-image="Banner"
    background-text="COMMUNITY"
    :title="i18n.certification.title"
    :illustration="illustration"
  >
    <template #default>
      <OButton
        class="more-btn"
        type="outline"
        animation
        size="nomral"
        @click="onMoreClick(1)"
      >
        {{ i18n.certification.download }}
        <template #suffixIcon>
          <OIcon class="banner-icon"><IconRight /></OIcon>
        </template>
      </OButton>
    </template>
  </BannerLevel2>
  <AppContent>
    <div class="detail">
      {{ i18n.certification.detail }}
    </div>
    <div class="card-box">
      <OCard
        v-for="item in i18n.certification.cardList"
        :key="item.professional"
        class="card-item"
      >
        <div class="item-head">
          <img class="left-bg" :src="cardBg" alt="" />
          <img class="right-bg" :src="item.ill" alt="" />
        </div>
        <div class="item-body">
          <p class="name">{{ item.name }}</p>
          <p class="professional">{{ item.professional }}</p>
          <OButton
            class="card-more"
            type="outline"
            animation
            size="nomral"
            @click="onMoreClick(2, item.link)"
          >
            {{ item.more }}
            <template #suffixIcon>
              <OIcon class="banner-icon"><IconRight /></OIcon>
            </template>
          </OButton>
        </div>
      </OCard>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.dark {
  .item-head,
  .flash-sale img {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
  }
  .training-mobile .train-step .step-box,
  .training-pc .train-step .step-box {
    .step1 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/01-dark.png);
    }
    .step2 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/02-dark.png);
    }
    .step3 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/03-dark.png);
    }
    .step4 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/04-dark.png);
    }
    .step5 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/05-dark.png);
    }
    .step6 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/06-dark.png);
    }
    .step7 {
      background-image: url(/.vitepress/src/assets/category/authentication/training/img/step/07-dark.png);
    }
  }
}
.more-btn {
  color: var(--o-color-white);
  border-color: var(--o-color-white);
  @media (max-width: 767px) {
    padding: 3px 16px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  .banner-icon {
    color: var(--o-color-brand2);
    @media (max-width: 767px) {
      font-size: var(--o-font-size-text);
    }
  }
}
.detail {
  font-size: var(--o-font-size-h7);
  line-height: var(--o-line-height-h7);
  color: var(--o-color-text1);
  @media screen and (max-width: 1100px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text4);
  }
}
.card-box {
  margin-top: var(--o-spacing-h2);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--o-spacing-h4);
  @media screen and (max-width: 1328px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
  }
  @media screen and (max-width: 585px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .card-item {
    &:hover {
      box-shadow: var(--o-shadow-l2_hover);
      @media screen and (max-width: 1100px) {
        box-shadow: var(--o-shadow-l2);
      }
    }
    :deep(.el-card__body) {
      padding: 0;
    }
    .item-head {
      width: 100%;
      height: 188px;
      background-color: var(--o-color-brand1);
      position: relative;
      @media screen and (max-width: 1100px) {
        height: 98px;
      }
      .left-bg {
        position: absolute;
        left: -10px;
        top: 0;
        @media screen and (max-width: 1100px) {
          height: 134px;
          left: 0vw;
        }
      }
      .right-bg {
        position: absolute;
        right: 10px;
        top: 0;
        @media screen and (max-width: 1100px) {
          height: 98px;
          right: 3vw;
        }
      }
    }
    .item-body {
      padding: var(--o-spacing-h4);
      @media screen and (max-width: 1100px) {
        padding: var(--o-spacing-h6);
      }
      .name {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        @media screen and (max-width: 1100px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .professional {
        margin-top: var(--o-spacing-h8);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text4);
        @media screen and (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      .card-more {
        margin-top: var(--o-spacing-h4);
        border: none;
        padding: 0;
        color: var(--o-color-text1);
        @media screen and (max-width: 1100px) {
          margin-top: var(--o-spacing-h5);
          font-size: var(--o-font-size-text);
        }
        :deep(.suffix-icon) {
          color: var(--o-color-brand1);
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-text);
          }
        }
      }
    }
    & + .card-item {
      .card-more {
        filter: contrast(20%);
        cursor: not-allowed;
        &.animation:hover {
          :deep(.suffix-icon) {
            transform: translate(0);
          }
        }
      }
    }
  }
}
</style>
