<script lang="ts" setup>
import { computed } from 'vue';
import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { useData } from 'vitepress';
import { useScreen } from '~@/composables/useScreen';

import { VISION_DATA } from '~@/data/project';
import { LocaleT } from '~@/@types/type-locale';

const commonStore = useCommon();
const { lang } = useData();
const { t } = useLocale();
const { lePadV } = useScreen();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
const visionData = computed(() => VISION_DATA[lang.value as LocaleT]);
</script>
<template>
  <AppSection
    :title="t('intelligenceBoom.synopsis')"
  >
    <div class="introduction" :class="{ 'introduction-dark': isDark }">
      <p class="desc">{{ t('intelligenceBoom.synopsisDes') }}</p>
    </div>
  </AppSection>

  <AppSection
    :title="t('intelligenceBoom.vision')"
  >
    <div class="introduction vision" :class="{ 'introduction-dark': isDark }">
      <div class="vision-item" v-for="vision in visionData" :key="vision.title">
        <p class="vision-title">{{ vision.title }}</p>
        <p class="vision-desc">{{ vision.desc }}</p>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.introduction {
  padding: 32px;
  border-radius: var(--o-radius-xs);
  background-image: url('~@/assets/category/intelligence/introduction-bg.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: left bottom;
  background-color: var(--o-color-fill2);

  &.vision {
    background-position: right bottom;
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 12px;

    .vision-item {
      flex: 1;
      position: relative;

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: -6px;
        top: 20%;
        bottom: 40%;
        width: 1px;
        background-color: #ddd;
      }
    }

    .vision-title {
      font-weight: 600;
      @include h3;
    }

    .vision-desc {
      color: var(--o-color-info3);
      margin-top: var(--o-gap-3);
      @include text1;
    }

    @include respond('<=pad_v') {
      flex-direction: column;
      gap: var(--o-gap-2);
      text-align: left;

      .vision-item {
        &:not(:last-child)::after {
          display: none;
        }
      }

      .vision-desc {
        font-size: 14px;
        line-height: 22px;
        margin-top: var(--o-gap-2);
      }
    }
  }
  .desc {
    color: var(--o-color-info1);
    @include text2;
  }
}

@include respond('<=pad') {
  .introduction {
    padding: 12px;
    margin-top: 12px;
    .desc {
      @include text2;
    }
  }
}

@include respond('<=pad_v') {
  .introduction {
    background-image: none;

    &.vision {
      background-image: url('~@/assets/category/intelligence/introduction-bg.png');
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-position: center bottom;
    }
  }

  .introduction-dark {
    background-image: none !important;

    &.vision {
      background-image: url('~@/assets/category/intelligence/introduction-bg-dark.png') !important;
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-position: center bottom;
    }
  }
}

.introduction-dark {
  background-image: url('~@/assets/category/intelligence/introduction-bg-dark.png');
}
</style>

