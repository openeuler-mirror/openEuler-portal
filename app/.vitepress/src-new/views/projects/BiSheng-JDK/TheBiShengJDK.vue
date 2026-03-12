<script lang="ts" setup>
import { OButton, OIcon, ODropdown } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import BiShengIntro from './components/BiShengIntro.vue';
import BiShengQuickLinks from './components/BiShengQuickLinks.vue';
import BiShengArchitecture from './components/BiShengArchitecture.vue';
import BiShengLearn from './components/BiShengLearn.vue';
import BiShengLinks from './components/BiShengLinks.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import banner from '@/assets/banner/banner-minisite.png';
import illustration from '@/assets/illustrations/minisite/bisheng.png';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

const { t } = useLocale();
const { lePadV } = useScreen();

const journeyLinks = [
  { text: 'bishengJdk.jdk8', href: 'https://atomgit.com/openeuler/bishengjdk-8' },
  { text: 'bishengJdk.jdk11', href: 'https://atomgit.com/openeuler/bishengjdk-11' },
  { text: 'bishengJdk.jdk17', href: 'https://atomgit.com/openeuler/bishengjdk-17' },
  { text: 'bishengJdk.jdk21', href: 'https://atomgit.com/openeuler/bishengjdk-21' },
];

const feedbackLinks = [
  { text: 'bishengJdk.jdk8', href: 'https://atomgit.com/openeuler/bishengjdk-8/issues' },
  { text: 'bishengJdk.jdk11', href: 'https://atomgit.com/openeuler/bishengjdk-11/issues' },
  { text: 'bishengJdk.jdk17', href: 'https://atomgit.com/openeuler/bishengjdk-17/issues' },
  { text: 'bishengJdk.jdk21', href: 'https://atomgit.com/openeuler/bishengjdk-21/issues' },
];
</script>

<template>
  <BannerLevel2
    v-if="!lePadV"
    class="bisheng-banner"
    :title="t('bishengJdk.title')"
    :subtitle="t('bishengJdk.subtitle')"
    :background-image="banner"
    :illustration="illustration"
  >
    <div class="banner-btns">
      <ODropdown trigger="click" option-position="bottom" class="banner-dropdown">
        <OButton variant="solid" color="primary" class="banner-btn">
          {{ t('bishengJdk.startJourney') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <div class="dropdown-list">
            <OButton
              v-for="item in journeyLinks"
              :key="item.href"
              color="normal"
              variant="text"
              :href="item.href"
              target="_blank"
              class="dropdown-item"
            >{{ t(item.text) }}</OButton>
          </div>
        </template>
      </ODropdown>
      <ODropdown trigger="click" option-position="bottom" class="banner-dropdown">
        <OButton variant="outline" color="primary" class="banner-btn banner-btn-outline">
          {{ t('bishengJdk.feedbackTitle') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <div class="dropdown-list">
            <OButton
              v-for="item in feedbackLinks"
              :key="item.href"
              color="normal"
              variant="text"
              :href="item.href"
              target="_blank"
              class="dropdown-item"
            >{{ t(item.text) }}</OButton>
          </div>
        </template>
      </ODropdown>
    </div>
  </BannerLevel2>

  <!-- 移动端 banner -->
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('bishengJdk.title') }}</p>
    <p class="mo-subtitle">{{ t('bishengJdk.subtitle') }}</p>
  </div>

  <BiShengIntro />
  <BiShengQuickLinks />
  <BiShengArchitecture />
  <BiShengLearn />
  <BiShengLinks />
</template>

<style scoped lang="scss">
.bisheng-banner {
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

.banner-btn-outline {
  border-color: var(--o-color-white) !important;
  color: var(--o-color-white) !important;

  :deep(.o-btn-label) {
    color: var(--o-color-white);
  }

  :deep(.o-btn-suffix) {
    color: var(--o-color-white);
  }
}

.dropdown-list {
  display: flex;
  flex-direction: column;
  min-width: 160px;
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

