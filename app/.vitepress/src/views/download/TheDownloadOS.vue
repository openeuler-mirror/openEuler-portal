<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import { useCommon } from '@/stores/common';

import getOSData from '@/data/download/get-os';

import banner from '@/assets/banner/banner-interaction.png';
import iosIllustration from '@/assets/illustrations/ios.png';

const i18n = useI18n();
const downloadI18n = computed(() => {
  return i18n.value.download;
});

const { lang } = useData();

const isDark = computed(() => {
  return useCommon().theme === 'dark' ? true : false;
});

const osData = computed(() => {
  return lang.value === 'zh' ? getOSData.zh : getOSData.en;
});
</script>
<template>
  <BannerLevel2
    :background-image="banner"
    :title="downloadI18n.GET_OPENEULER_OS1"
    :illustration="iosIllustration"
    class="banner"
  >
    <template #default>
      <p class="banner-introduction">{{ downloadI18n.GET_OPENEULER_OS2 }}</p>
    </template>
  </BannerLevel2>
  <AppContent>
    <div class="os-cards">
      <OCard v-for="item in osData" :key="item" shadow="hover" class="os-card">
        <div class="os-card-title">
          <img
            class="os-card-title-icon"
            :src="isDark ? item.iconDark : item.icon"
            alt=""
          />
          <span class="os-card-title-text">{{ item.title }}</span>
        </div>
        <div class="os-card-body">
          {{ item.intro }}
        </div>
        <div
          class="os-card-links"
          :class="[
            `repeat-${item.repeat}`,
            { 'more-card': item.links.length > 4 },
          ]"
        >
          <a
            v-for="(link, index) in item.links"
            v-show="index <= 3"
            :href="link.href"
            class="link"
            target="_blank"
            rel="noopener noreferrer"
            >{{ link.label }}</a
          >
          <a
            v-if="item.links.length > 4"
            :href="item.links[4].href"
            target="_blank"
            class="more link"
            rel="noopener noreferrer"
            >{{ item.links[4].label }}</a
          >
        </div>
      </OCard>
    </div>

    <a
      :href="downloadI18n.GET_OPENEULER_OS_DOC_LINK"
      target="_blank"
      class="docs-link"
      rel="noopener noreferrer"
      >{{ downloadI18n.GET_OPENEULER_OS_DOC }}</a
    >
  </AppContent>
</template>

<style scoped lang="scss">
.banner {
  :deep(.wrap) {
    .banner-illustration {
      top: inherit;
      transform: translateY(0);
      bottom: 0 !important;
    }
  }
}
.banner-introduction {
  font-size: var(--o-font-size-h6);
  color: var(--o-color-white);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
  }
}

.os-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  @media screen and (max-width: 1416px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-gap: 12px;
    grid-template-columns: repeat(1, 1fr);
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    padding: 40px;
    height: 100%;
    @media screen and (max-width: 1416px) {
      padding: 24px;
    }
    @media screen and (max-width: 768px) {
      padding: 16px;
    }
    .os-card-title {
      display: flex;
      align-items: center;
      font-size: 32px;
      line-height: 44px;
      color: var(--o-color-text1);
      img {
        width: 40px;
        height: 40px;
        margin-right: 16px;
      }
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
    .os-card-body {
      margin-top: 16px;
      margin-bottom: 16px;
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      min-height: calc(2 * var(--o-line-height-h8));
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        min-height: calc(2 * var(--o-line-height-text));
      }
    }
    .os-card-links {
      position: relative;
      margin-top: auto;
      display: grid;
      /* 使用自动填充的列，每列的最小宽度是50%，最大宽度是1fr */
      gap: 18px; /* 根据需要设置间隙 */
      min-height: 62px;
      @media screen and (max-width:768px) {
        min-height: auto;
      }
      .link {
        position: relative;
        padding-left: 12px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);

        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          top: 9px;
          border-radius: 50%;
          left: 0;
          background-color: var(--o-color-brand1);
        }
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          &::before {
            top: 6px;
          }
        }
      }
      .more {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .repeat-1 {
      grid-template-columns: repeat(1, 1fr);
    }
    .repeat-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    .repeat-3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
.docs-link {
  margin-top: 24px;
  display: block;
  text-align: right;
  margin-left: auto;
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
}

.more-card {
  padding-right: 20%;
}
</style>
