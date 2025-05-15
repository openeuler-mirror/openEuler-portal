<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OFigure } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import frameworkImgZh from '~@/assets/category/intelligence/framework-img-zh.png';
import frameworkImgZhDark from '~@/assets/category/intelligence/framework-img-zh-dark.png';
import frameworkImgEn from '~@/assets/category/intelligence/framework-img-en.png';
import frameworkImgEnDark from '~@/assets/category/intelligence/framework-img-en-dark.png';

import frameworkImgZhMb from '~@/assets/category/intelligence/framework-img-zh-mb.png';
import frameworkImgZhDarkMb from '~@/assets/category/intelligence/framework-img-zh-dark-mb.png';
import frameworkImgEnMb from '~@/assets/category/intelligence/framework-img-en-mb.png';
import frameworkImgEnDarkMb from '~@/assets/category/intelligence/framework-img-en-dark-mb.png';

import frameworkBg from '~@/assets/category/intelligence/framework-bg.png';
import frameworkBgDark from '~@/assets/category/intelligence/framework-bg-dark.png';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const frameworkList = [
  {
    id: 'apply',
    title: t('intelligence.applyLayer'),
    desc: t('intelligence.applyLayerDesc'),
  },
  {
    id: 'compatible',
    title: t('intelligence.compatible'),
    desc: t('intelligence.compatibleDesc'),
  },
  {
    id: 'reasoning',
    title: t('intelligence.inference'),
    desc: t('intelligence.inferenceDesc'),
  },
];

const lightImg = {
  zh: frameworkImgZh,
  en: frameworkImgEn,
};
const darkImg = {
  zh: frameworkImgZhDark,
  en: frameworkImgEnDark,
};

const lightImgMb = {
  zh: frameworkImgZhMb,
  en: frameworkImgEnMb,
};
const darkImgMb = {
  zh: frameworkImgZhDarkMb,
  en: frameworkImgEnDarkMb,
};
</script>
<template>
  <AppSection :title="t('intelligence.framework')">
    <div
      class="framework"
      :class="{ 'framework-en': locale === 'en' }"
      :style="{
        backgroundImage: `url(${isDark ? frameworkBgDark : frameworkBg})`,
      }"
    >
      <OFigure
        v-if="!lePadV"
        :src="isDark ? darkImg[locale] : lightImg[locale]"
        class="framework-img"
      ></OFigure>
      <OFigure
        v-else
        :src="isDark ? darkImgMb[locale] : lightImgMb[locale]"
        class="framework-img"
      ></OFigure>
      <ORow gap="0 16px" wrap="wrap" class="framework-list">
        <OCol flex="0 0 100%" v-for="item in frameworkList" :key="item.id">
          <div class="framework-item">
            <p class="item-title">{{ item.title }}</p>
            <p class="item-desc">{{ item.desc }}</p>
          </div>
        </OCol>
      </ORow>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.app-section {
  --o-gap-section: 0;
}

.framework {
  display: flex;
  align-items: flex-start;
  padding: 48px 72px 48px 80px;
  border-radius: var(--o-radius-xs);
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: right bottom;
  background-color: var(--o-color-fill2);
}
.framework-img {
  width: 818px;
  flex-shrink: 0;
  margin-right: 8px;
  :deep(.o-figure-img) {
    height: auto;
  }
}

.item-title {
  font-weight: 500;
  @include h3;
}
.item-desc {
  margin-top: 16px;
  color: var(--o-color-info3);
  @include text1;
}
.framework-list {
  .o-col {
    display: flex;
    align-items: center;
    &:nth-of-type(1) {
      height: 192px;
    }
    &:nth-of-type(2) {
      height: 291px;
    }
    &:nth-of-type(3) {
      height: 137px;
    }
  }
}
.framework-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.framework-en {
  padding: 48px;
  .framework-img {
    width: 760px;
  }
  .framework-list {
    .o-col {
      &:nth-of-type(2) {
        height: 276px;
      }
      &:nth-of-type(3) {
        height: 160px;
      }
    }
  }
}

@include respond-to('laptop') {
  .framework {
    padding: 32px 48px;
    align-items: center;
  }
  .framework-img {
    width: 654px;
    margin-right: 8px;
  }
  .framework-list {
    .o-col {
      &:nth-of-type(1) {
        height: 154px;
      }
      &:nth-of-type(2) {
        height: 232px;
      }
      &:nth-of-type(3) {
        height: 110px;
      }
    }
  }

  .framework-en {
    padding: 32px;
    .framework-img {
      width: 650px;
    }
    .framework-list {
      .o-col {
        &:nth-of-type(1) {
          height: 180px;
        }
        &:nth-of-type(2) {
          height: 240px;
        }
        &:nth-of-type(3) {
          height: 160px;
        }
      }
    }
  }
}
@include respond-to('pad_h') {
  .framework {
    padding: 24px;
    @media (max-width: 935px) {
      align-items: center;
    }
  }
  .framework-img {
    width: 522px;
    margin-right: 8px;
  }
  .framework-list {
    .o-col {
      &:nth-of-type(1) {
        height: 123px;
        @media (max-width: 935px) {
          height: 160px;
        }
      }
      &:nth-of-type(2) {
        height: 185px;
        @media (max-width: 935px) {
          height: 246px;
        }
      }
      &:nth-of-type(3) {
        height: 88px;
        @media (max-width: 935px) {
          height: 130px;
        }
      }
    }
  }
  .item-desc {
    margin-top: 8px;
  }

  .framework-en {
    padding: 24px;
    align-items: center;

    .item-title {
      @include text2;
    }
    .item-desc {
      @include tip1;
    }

    .framework-img {
      width: 500px;
      @media (max-width: 1050px) {
        width: 450px;
      }
    }
    .framework-list {
      .o-col {
        &:nth-of-type(1) {
          height: 150px;
          align-items: flex-end;
          @media (max-width: 876px) {
            height: 180px;
          }
        }
        &:nth-of-type(2) {
          height: 180px;
          align-items: flex-end;
          @media (max-width: 876px) {
            height: 200px;
          }
        }
        &:nth-of-type(3) {
          height: 160px;
          @media (max-width: 1050px) {
            height: 200px;
          }
        }
      }
    }
  }
}

@include respond-to('<=pad_v') {
  .framework {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    margin-top: 12px;
    background-image: none !important;
  }
  .framework-img {
    width: 100%;
    margin-right: 0;
    :deep(.o-figure-img) {
      height: auto;
    }
  }
  .framework-list {
    .o-col {
      height: auto !important;
    }
  }
  .item-desc {
    margin-top: 8px;
  }
  .o-row {
    margin-top: 16px;
  }

  .framework-en {
    .framework-img {
      width: 100%;
    }
  }
}
</style>
