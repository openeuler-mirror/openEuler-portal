<script lang="ts" setup>
import { computed } from 'vue';
import { OFigure } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

import frameImgZh from '~@/assets/category/bisheng/frame_zh.png';
import frameImgEn from '~@/assets/category/bisheng/frame_en.png';

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const img = { zh: frameImgZh, en: frameImgEn };
</script>

<template>
  <AppSection :title="t('bishengJdk.architectureTitle')">
    <div class="architecture">
      <p class="arch-desc">{{ t('bishengJdk.architectureDesc') }}</p>
      <OFigure
        :src="img[locale]"
        class="arch-img"
      />
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.architecture {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 40px 32px;
}

.arch-desc {
  color: var(--o-color-info1);
  @include text2;
}

.arch-img {
  max-width: 1125px;
  --figure-radius: var(--o-radius-xs);
  margin: 32px auto 0;
  display: flex;
}

@include respond-to('laptop') {
  .architecture {
    padding: 32px 24px;
  }
  .arch-img {
    margin: 24px auto 0;
  }
}

@include respond-to('pad_h') {
  .architecture {
    padding: 16px;
  }
  .arch-img {
    margin: 16px auto 0;
  }
}

@include respond-to('<=pad_v') {
  .architecture {
    padding: 16px;
  }

  .arch-desc {
    @include text1;
  }
  .arch-img {
    margin: 12px auto 0;
  }
}
</style>
