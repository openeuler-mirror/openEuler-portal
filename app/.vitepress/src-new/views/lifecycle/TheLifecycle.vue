<script lang="ts" setup>
import { computed } from 'vue';
import { OFigure } from '@opensig/opendesign';

import Markdown from 'markdown-it';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import banner from '~@/assets/category/lifecycle/banner.jpg'
import imgZh1 from '~@/assets/category/lifecycle/img-zh1.jpg'
import imgZh2 from '~@/assets/category/lifecycle/img-zh2.jpg'
import imgEn1 from '~@/assets/category/lifecycle/img-en1.jpg'
import imgEn2 from '~@/assets/category/lifecycle/img-en2.jpg'

import overall from '~@/data/lifecycle/overall.md?raw';
import lts from '~@/data/lifecycle/lts.md?raw';
import overallEn from '~@/data/lifecycle/overall-en.md?raw';
import ltsEn from '~@/data/lifecycle/lts-en.md?raw';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t } = useLocale();
const { lePadV } = useScreen();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

const md = new Markdown({
  html: true,
  linkify: true,
});
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="lifecycle-banner" :title="t('lifecycle.title')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('lifecycle.title') }}</p>
  </div>
  <AppSection>
    <div v-if="locale === 'zh'" class="lifecycle-markdown">
      <div v-dompurify-html="md.render(overall)" class="markdown-new"></div>
      <OFigure :src="imgZh1" :class="{'figure-dark': isDark}"></OFigure>
      <div v-dompurify-html="md.render(lts)" class="markdown-new markdown-lts"></div>
      <OFigure :src="imgZh2" :class="{'figure-dark': isDark}"></OFigure>
    </div>
    <div v-else class="lifecycle-markdown">
      <div v-dompurify-html="md.render(overallEn)" class="markdown-new"></div>
      <OFigure :src="imgEn1" :class="{'figure-dark': isDark}"></OFigure>
      <div v-dompurify-html="md.render(ltsEn)" class="markdown-new markdown-lts"></div>
      <OFigure :src="imgEn2" :class="{'figure-dark': isDark}"></OFigure>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.lifecycle-banner {
  background-color: transparent;
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;
      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;
      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond-to('<=pad_v') {
    padding: 24px 24px 20px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
  }
}

.app-section {
  :deep(.section-wrapper) {
    margin-top: 0;
  }
}

.lifecycle-markdown {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 48px 40px;
  color: var(--o-color-info2);
  @include text1;
}

:deep(.markdown-new) {
  ul,
  ol {
    padding-left: 24px;
  }
  ol {
    list-style: decimal;
  }
}
.markdown-lts {
  :deep(h1) {
    margin-top: 48px !important;
  }
}

.figure-dark {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}

@include respond-to('<=laptop') {
  .lifecycle-markdown {
    padding: 40px 32px;
  }
}

@include respond-to('<=pad') {
  .lifecycle-markdown {
    padding: 32px 24px;
  }
}

@include respond-to('<=pad_v') {
  .lifecycle-markdown {
    padding: 16px;
  }
}
</style>
