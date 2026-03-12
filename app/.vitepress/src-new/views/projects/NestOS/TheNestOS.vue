<script lang="ts" setup>
import { OButton, OIcon, ODropdown } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import NestOSIntro from './components/NestOSIntro.vue';
import NestOSVersion from './components/NestOSVersion.vue';
import NestOSFeatures from './components/NestOSFeatures.vue';
import NestOSResources from './components/NestOSResources.vue';
import NestOSPerformance from './components/NestOSPerformance.vue';
import NestOSPartner from './components/NestOSPartner.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import banner from '@/assets/nestos/banner/banner-minisite.png';
import illustration from '@/assets/nestos/banner/banner-right.png';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

const { t } = useLocale();
const { lePadV } = useScreen();

const downloadLinks = [
  {
    text: 'NestOS 双模式-24.03-LTS',
    href: 'https://nestos.org.cn/nestos20240904/nestos-for-all/x86_64/NestOS-24.03-LTS.20240904.0.x86_64.iso',
  },
  {
    text: 'NestOS For Container-24.03-LTS',
    href: 'https://nestos.org.cn/NestOS-release/prod/streams/2403-LTS/builds/24.03-LTS.20240904.0/x86_64/nestos-24.03-LTS.20240904.0-live.x86_64.iso',
  },
  {
    text: 'NestOS For Virt-24.03-LTS',
    href: 'https://nestos.org.cn/nestos20240904/nestos-for-virt/x86_64/NestOS-For-Virt-24.03-LTS.20240904.0.x86_64.iso',
  },
];
</script>

<template>
  <BannerLevel2
    v-if="!lePadV"
    class="nestos-banner"
    :title="t('nestos.title')"
    :subtitle="t('nestos.subtitle')"
    :background-image="banner"
    :illustration="illustration"
  >
    <div class="banner-btns">
      <ODropdown trigger="click" option-position="bottom" class="banner-dropdown">
        <OButton variant="solid" color="primary" class="banner-btn">
          {{ t('nestos.downloadTitle') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <div class="dropdown-list">
            <OButton
              v-for="item in downloadLinks"
              :key="item.href"
              color="normal"
              variant="text"
              :href="item.href"
              target="_blank"
              class="dropdown-item"
            >{{ item.text }}</OButton>
          </div>
        </template>
      </ODropdown>
    </div>
  </BannerLevel2>

  <!-- 移动端 banner -->
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('nestos.title') }}</p>
    <p class="mo-subtitle">{{ t('nestos.subtitle') }}</p>
  </div>

  <NestOSIntro />
  <NestOSVersion />
  <NestOSFeatures />
  <ClientOnly><NestOSPerformance /></ClientOnly>
  <NestOSResources />
  <NestOSPartner />
</template>

<style scoped lang="scss">
.nestos-banner {
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        @include display2;
        font-weight: 500;
      }
      .banner-subtitle {
        margin-top: var(--o-gap-2);
        @include text2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 240px;
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
      height: 200px;
    }
  }
}

.banner-btns {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.banner-btn {
  --btn-border-radius: 4px;
}

.dropdown-list {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 4px 0;
}

.dropdown-item {
  width: 100%;
  justify-content: flex-start;
  padding: 8px 16px;
  border-radius: 0;

  &:hover {
    background-color: var(--o-color-fill2);
    color: var(--o-color-primary1);
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
