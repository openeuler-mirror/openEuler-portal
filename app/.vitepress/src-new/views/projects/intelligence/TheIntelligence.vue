<script lang="ts" setup>
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import IntelligenceIntro from './components/intelligenceIntro.vue';
import IntelligenceFramework from './components/intelligenceFramework.vue';
import IntelligenceFeatures from './components/intelligenceFeatures.vue';
import IntelligenceDeploy from './components/intelligenceDeploy.vue';

import banner from '~@/assets/category/intelligence/ai-banner-bg.jpg';

import { useLocale } from '~@/composables/useLocale';

const { t } = useLocale();
</script>
<template>
  <BannerLevel2
    :background-image="banner"
    :title="t('intelligence.title')"
    :subtitle="t('intelligence.subtitle')"
    class="intelligence-banner"
  ></BannerLevel2>
  <IntelligenceIntro />
  <IntelligenceFramework />
  <IntelligenceFeatures />
  <IntelligenceDeploy />
</template>

<style scoped lang="scss">
.intelligence-banner {
  &.banner-level2 {
    :deep(.wrap) {
      height: 280px;
      .banner-text {
        max-width: 60%;
        .banner-title {
          color: rgba(var(--o-black));
          @include display2;
        }
        .banner-subtitle {
          color: rgba(var(--o-black));
          margin-top: var(--o-gap-2);
          @include text2;
        }
      }

      @media screen and (max-width: 1680px) {
        height: 220px;

        .banner-text {
          .banner-title {
            font-size: 40px;
            line-height: 56px;
          }
          .banner-subtitle {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }

      @media screen and (max-width: 1200px) {
        height: 180px;

        .banner-text {
          .banner-title {
            @include display2;
          }
          .banner-subtitle {
            @include text2;
          }
        }
      }
    }
  }
}

@include respond-to('<=pad_v') {
  .intelligence-banner {
    &.banner-level2 {
      background-color: unset;
      :deep(.banner-bg) {
        display: none;
      }
      :deep(.wrap) {
        height: auto;
        margin-top: var(--o-gap-5);

        .banner-text {
          max-width: 100%;

          .banner-title {
            color: var(--o-color-info1);
            @include display1;
          }
          .banner-subtitle {
            color: var(--o-color-info2);
            margin-top: var(--o-gap-2);
            @include text1;
          }
        }
      }
    }
  }
}
</style>
