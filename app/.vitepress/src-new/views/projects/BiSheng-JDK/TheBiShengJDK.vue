<script lang="ts" setup>
import { OButton, OIcon, ODropdown, ODropdownItem, OLink } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import BiShengIntro from './components/BiShengIntro.vue';
import BiShengQuickLinks from './components/BiShengQuickLinks.vue';
import BiShengArchitecture from './components/BiShengArchitecture.vue';
import BiShengLearn from './components/BiShengLearn.vue';
import BiShengLinks from './components/BiShengLinks.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import banner from '~@/assets/category/projects/project-banner.jpg';

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
  >
    <div class="banner-btns">
      <ODropdown trigger="hover" option-position="bottom" class="banner-dropdown">
        <OButton variant="solid" color="primary" class="banner-btn">
          {{ t('bishengJdk.startJourney') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <ODropdownItem v-for="item in journeyLinks" :key="item.href" class="dropdown-item">
            <OLink :href="item.href" target="_blank">{{ t(item.text) }}</OLink>
          </ODropdownItem>
        </template>
      </ODropdown>
      <ODropdown trigger="hover" option-position="bottom" class="banner-dropdown">
        <OButton variant="outline" color="primary" class="banner-btn">
          {{ t('bishengJdk.feedbackTitle') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <ODropdownItem v-for="item in feedbackLinks" :key="item.href" class="dropdown-item">
            <OLink :href="item.href" target="_blank">{{ t(item.text) }}</OLink>
          </ODropdownItem>
        </template>
      </ODropdown>
    </div>
  </BannerLevel2>

  <!-- 移动端 banner -->
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('bishengJdk.title') }}</p>
    <p class="mo-subtitle">{{ t('bishengJdk.subtitle') }}</p>
    <div class="banner-btns">
      <ODropdown trigger="click" option-position="bottom" class="banner-dropdown">
        <OButton variant="solid" color="primary" class="banner-btn">
          {{ t('bishengJdk.startJourney') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <ODropdownItem v-for="item in journeyLinks" :key="item.href" class="dropdown-item">
            <OLink :href="item.href" target="_blank">{{ t(item.text) }}</OLink>
          </ODropdownItem>
        </template>
      </ODropdown>
      <ODropdown trigger="click" option-position="bottom" class="banner-dropdown">
        <OButton variant="outline" color="primary" class="banner-btn">
          {{ t('bishengJdk.feedbackTitle') }}
          <template #suffix>
            <OIcon><IconChevronDown /></OIcon>
          </template>
        </OButton>
        <template #dropdown>
          <ODropdownItem v-for="item in feedbackLinks" :key="item.href" class="dropdown-item">
            <OLink :href="item.href" target="_blank">{{ t(item.text) }}</OLink>
          </ODropdownItem>
        </template>
      </ODropdown>
    </div>
  </div>

  <BiShengIntro />
  <BiShengQuickLinks />
  <BiShengArchitecture />
  <BiShengLearn />
  <BiShengLinks />
</template>

<style scoped lang="scss">
.bisheng-banner {
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

.banner-btns {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.banner-btn {
  --btn-border-radius: 4px;
  --btn-padding: 0 23px;
  --btn-height: 40px;
  @include text1;
}
.o-dropdown + .o-dropdown {
  margin-left: 16px;
}

.o-dropdown-item {
  background: var(--o-color-fill2);
  cursor: pointer;
  --dropdown-item-radius: var(--o-radius-xs);
  --dropdown-item-justify: flex-start;
  --dropdown-item-padding: 0;

  @include hover {
    color: var(--o-color-primary1);
    background: var(--o-color-control2-light);
  }
}
.o-link {
  padding: 8px 12px;
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

@include respond-to('<=pad_v') {
  .banner-btn {
    --btn-padding: 0 15px;
    --btn-height: 32px;
    @include text1;
  }
  .o-dropdown {
    margin-top: 12px;
  }
  .o-dropdown + .o-dropdown {
    margin-left: 12px;
  }
}
@include respond-to('phone') {
  .banner-btns {
    flex-direction: column;
    align-items: flex-start;
  }
  .o-dropdown + .o-dropdown {
    margin-left: 0;
  }
}
</style>

