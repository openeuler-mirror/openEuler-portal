<script lang="ts" setup>
import { OButton, OIcon } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import NestOSIntro from './components/NestOSIntro.vue';
import NestOSVersion from './components/NestOSVersion.vue';
import NestOSFeatures from './components/NestOSFeatures.vue';
import NestOSResources from './components/NestOSResources.vue';
import NestOSPerformance from './components/NestOSPerformance.vue';
import NestOSPartner from './components/NestOSPartner.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import banner from '~@/assets/category/projects/project-banner.jpg';

import IconOutLink from '~icons/app-new/icon-outlink-new.svg';

const { t } = useLocale();
const { lePadV } = useScreen();
</script>

<template>
  <BannerLevel2
    v-if="!lePadV"
    class="nestos-banner"
    :title="t('nestos.title')"
    :subtitle="t('nestos.subtitle')"
    :background-image="banner"
  >
    <OButton variant="solid" color="primary" size="large" href="https://atomgit.com/openeuler/NestOS" target="_blank" class="banner-btn">
      {{ t('nestos.buttonTitle') }}
      <template #suffix>
        <OIcon><IconOutLink /></OIcon>
      </template>
    </OButton>
  </BannerLevel2>

  <!-- 移动端 banner -->
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('nestos.title') }}</p>
    <p class="mo-subtitle">{{ t('nestos.subtitle') }}</p>
    <OButton variant="solid" color="primary" href="https://atomgit.com/openeuler/NestOS" target="_blank" class="banner-btn">
      {{ t('nestos.buttonTitle') }}
      <template #suffix>
        <OIcon><IconOutLink /></OIcon>
      </template>
    </OButton>
  </div>

  <NestOSIntro />
  <NestOSVersion />
  <NestOSFeatures />
  <ClientOnly><NestOSPerformance /></ClientOnly>
  <NestOSResources id="resource" />
  <NestOSPartner />
</template>

<style scoped lang="scss">
.nestos-banner {
  background-color: transparent;
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        font-weight: 500;
        @include display2;
      }
      .banner-subtitle {
        color: var(--o-color-black);
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

.mo-banner {
  padding: 24px 24px 0;

  .mo-title {
    font-weight: 500;
    @include display3;
  }

  .mo-subtitle {
    color: var(--o-color-info2);
    margin-top: 8px;
    @include tip1;
  }

  .banner-btn {
    --btn-height: 32px;
    margin-top: 12px;
    @include text1;
  }

  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
    .mo-subtitle {
      @include text1;
    }
  }
}
</style>
