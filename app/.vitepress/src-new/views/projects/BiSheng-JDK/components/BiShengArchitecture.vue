<script lang="ts" setup>
import { computed } from 'vue';
import { OFigure } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

import frameImgLightZh from '@/assets/category/minisite/bisheng/frame_light_zh.png';
import frameImgDarkZh from '@/assets/category/minisite/bisheng/frame_dark_zh.png';
import frameImgLightEn from '@/assets/category/minisite/bisheng/frame_light_en.png';
import frameImgDarkEn from '@/assets/category/minisite/bisheng/frame_dark_en.png';

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const lightImg = { zh: frameImgLightZh, en: frameImgLightEn };
const darkImg = { zh: frameImgDarkZh, en: frameImgDarkEn };
</script>

<template>
  <AppSection :title="t('bishengJdk.architectureTitle')">
    <div class="architecture">
      <p class="arch-desc">{{ t('bishengJdk.architectureDesc') }}</p>
      <div class="arch-figure">
        <OFigure
          :src="isDark ? darkImg[locale] : lightImg[locale]"
          class="arch-img"
        />
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.architecture {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px;
}

.arch-desc {
  color: var(--o-color-info1);
  @include text2;
  line-height: 1.75;
}

.arch-figure {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.arch-img {
  width: 100%;
  max-width: 900px;
  :deep(.o-figure-img) {
    height: auto;
    width: 100%;
  }
}

@include respond-to('laptop') {
  .architecture {
    padding: 24px;
  }

  .arch-figure {
    margin-top: 24px;
  }
}

@include respond-to('pad_h') {
  .architecture {
    padding: 20px;
  }
}

@include respond-to('<=pad_v') {
  .architecture {
    padding: 16px;
  }

  .arch-desc {
    @include text1;
  }

  .arch-figure {
    margin-top: 16px;
  }
}
</style>
