<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OIcon } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import IconLowCode from '~icons/intelligence/icon-low-code.svg';
import IconAvailability from '~icons/intelligence/icon-availability.svg';
import IconLightweight from '~icons/intelligence/icon-lightweight.svg';
import IconAfinity from '~icons/intelligence/icon-affinity.svg';

import IconLowCodeDark from '~icons/intelligence/icon-low-code-dark.svg';
import IconAvailabilityDark from '~icons/intelligence/icon-availability-dark.svg';
import IconLightweightDark from '~icons/intelligence/icon-lightweight-dark.svg';
import IconAfinityDark from '~icons/intelligence/icon-affinity-dark.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const features = [
  {
    id: 'low-code',
    icon: IconLowCode,
    iconDark: IconLowCodeDark,
    title: t('intelligence.lowCode'),
    desc: t('intelligence.lowCodeDesc'),
  },
  {
    id: 'availability',
    icon: IconAvailability,
    iconDark: IconAvailabilityDark,
    title: t('intelligence.availability'),
    desc: t('intelligence.availabilityDesc'),
  },
  {
    id: 'lightweight',
    icon: IconLightweight,
    iconDark: IconLightweightDark,
    title: t('intelligence.lightweight'),
    desc: t('intelligence.lightweightDesc'),
  },
  {
    id: 'affinity',
    icon: IconAfinity,
    iconDark: IconAfinityDark,
    title: t('intelligence.affinity'),
    desc: t('intelligence.affinityDesc'),
  },
];
</script>
<template>
  <AppSection :title="t('intelligence.features')">
    <ORow v-if="!lePadV" gap="0 0" wrap="wrap" class="features-list">
      <OCol flex="0 0 50%" v-for="item in features" :key="item.id">
        <div class="features-item">
          <OIcon
            ><component :is="isDark ? item.iconDark : item.icon"></component
          ></OIcon>
          <div class="right-content">
            <p class="item-title">{{ item.title }}</p>
            <p class="item-desc">{{ item.desc }}</p>
          </div>
        </div>
      </OCol>
    </ORow>
    <ORow v-else gap="0 0" wrap="wrap" class="features-list">
      <OCol flex="0 0 100%" v-for="item in features" :key="item.id">
        <div class="features-item">
          <div class="right-content">
            <OIcon
              ><component :is="isDark ? item.iconDark : item.icon"></component
            ></OIcon>
            <p class="item-title">{{ item.title }}</p>
          </div>
          <p class="item-desc">{{ item.desc }}</p>
        </div>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.app-section {
  --o-gap-section: 72px;

  @include respond-to('<=laptop') {
    --o-gap-section: 56px;
  }
  @include respond-to('pad_h') {
    --o-gap-section: 40px;
  }
  @include respond-to('<=pad_v') {
    --o-gap-section: 32px;
  }
}

.item-title {
  font-weight: 500;
  @include h3;
}
.item-desc {
  margin-top: 12px;
  color: var(--o-color-info3);
  @include text1;
}

.features-item {
  display: flex;
  align-items: flex-start;
  .o-icon {
    flex-shrink: 0;
    --icon-size: 32px;
  }
  .right-content {
    margin-left: 16px;
    margin-top: 1px;
  }
}
.features-list {
  .o-col {
    &:nth-of-type(1) {
      padding: 0 16px 32px 0;
      border-right: 1px solid var(--o-color-control4);
      border-bottom: 1px solid var(--o-color-control4);
    }
    &:nth-of-type(2) {
      padding: 0 0 32px 16px;
      border-bottom: 1px solid var(--o-color-control4);
    }
    &:nth-of-type(3) {
      padding: 32px 16px 0 0;
      border-right: 1px solid var(--o-color-control4);
    }
    &:nth-of-type(4) {
      padding: 32px 0 0 16px;
    }
  }
}

@include respond-to('pad_h') {
  .item-desc {
    margin-top: 8px;
  }
  .features-list {
    .o-col {
      &:nth-of-type(1) {
        padding: 0 8px 8px 0;
      }
      &:nth-of-type(2) {
        padding: 0 0 8px 8px;
      }
      &:nth-of-type(3) {
        padding: 8px 8px 0 0;
      }
      &:nth-of-type(4) {
        padding: 8px 0 0 8px;
      }
    }
  }
}

@include respond-to('<=pad_v') {
  .features-item {
    flex-direction: column;
    .o-icon {
      --icon-size: 24px;
    }
    .right-content {
      margin-left: 0;
      margin-top: 0;
      display: flex;
      align-items: center;
    }
  }
  .item-title {
    margin-left: 8px;
  }
  .item-desc {
    margin-top: 8px;
  }
  .features-list {
    .o-col {
      &:nth-of-type(1) {
        padding: 0 0 12px 0;
        border-right: none;
      }
      &:nth-of-type(2) {
        padding: 12px 0;
      }
      &:nth-of-type(3) {
        padding: 12px 0;
        border-right: none;
        border-bottom: 1px solid var(--o-color-control4);
      }
      &:nth-of-type(4) {
        padding: 12px 0 0 0;
      }
    }
  }
}
</style>
