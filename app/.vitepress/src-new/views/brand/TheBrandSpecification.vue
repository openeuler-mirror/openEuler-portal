<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OFigure } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import banner from '~@/assets/category/brand/zh/brand-banner.jpg';
import bannerEn from '~@/assets/category/brand/en/brand-banner.png';

import { brandSpecification, brandSpecificationEn } from '~@/data/brand';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale } = useLocale();
const { lePadV } = useScreen();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="specification-banner" :background-image="locale === 'zh' ? banner : bannerEn" />
  <AppSection v-for="(item, i) in locale === 'zh' ? brandSpecification : brandSpecificationEn" :key="i" :title="item.title" :class="`specification-box${i}`">
    <div class="item-box" :class="{'item-box-dark': isDark}">
      <ORow gap="0 12px" wrap="wrap">
        <OCol v-for="(val, k) in item.desc" :key="k" flex="0 0 100%">
          <p v-dompurify-html="val"></p>
        </OCol>
      </ORow>
      <OFigure v-if="item.img" :src="item.img" />
      <OFigure v-if="item?.img2" :src="item.img2" />
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.specification-banner {
  :deep(.wrap) {
    height: 280px;

    @media screen and (max-width: 1680px) {
      height: 220px;
    }

    @media screen and (max-width: 1200px) {
      height: 180px;
    }
  }
}

.item-box {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px;
  color: var(--o-color-info2);
  @include text1;
  :deep(.blod) {
    font-weight: 500;
    color: var(--o-color-info1);
  }
  .o-figure {
    margin-top: 32px;
    background-color: var(--o-color-white);
  }
}
.item-box-dark {
  .o-figure {
    @include img-in-dark;
  }
}

.specification-box0 {
  :deep(.section-body) {
    .item-box {
      display: flex;
    }
    .o-figure {
      margin-top: 0;
      margin-left: 32px;
      width: 467px;
      flex-shrink: 0;
    }

    @include respond-to('laptop') {
      .o-figure {
        width: 374px;
        margin-left: 24px;
      }
    }
    @include respond-to('pad_h') {
      .o-figure {
        width: 300px;
        margin-left: 16px;
      }
    }
    @include respond-to('<=pad_v') {
      .item-box {
        display: flex;
        flex-direction: column;
      }
      .o-figure {
        width: auto;
        margin-top: 12px;
        margin-left: 0;
      }
    }
  }
}

@include respond-to('laptop') {
  .item-box {
    .o-figure {
      margin-top: 24px;
    }
  }
}
@include respond-to('pad_h') {
  .item-box {
    padding: 16px;
    .o-figure {
      margin-top: 16px;
    }
  }
}
@include respond-to('<=pad_v') {
  .item-box {
    padding: 12px;
    .o-figure {
      margin-top: 12px;
    }
  }
}
</style>
