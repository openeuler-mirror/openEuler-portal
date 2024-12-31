<script lang="ts" setup>
import { computed } from 'vue';

import { ORow, OCol, OCard } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';

import getResource from '~@/data/download/get-resource';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { locale } = useLocale();
const { isPhone, lePad, lePadV } = useScreen();

const flexGap = computed(() =>
  isPhone.value ? '12px 12px' : lePad.value ? '16px 16px' : '32px 32px'
);
</script>
<template>
  <AppSection :title="$t('download.getResource')">
    <ORow :gap="flexGap" flex-wrap="wrap">
      <OCol
        v-for="item in getResource"
        :key="item[locale].title"
        flex="0 1 50%"
        :laptop="{ flex: '0 50%' }"
        :pad="{ flex: '0 1 50%' }"
        :pad-v="{ flex: '0 1 100%' }"
        :phone="{ flex: '0 1 100%' }"
      >
        <OCard
          :title="item[locale].title"
          :detail="item[locale].label"
          :detail-row="2"
          layout="h"
          :href="item[locale].href"
          target="_blank"
          rel="noopener noreferrer"
          hoverable
          :icon="item.icon.light"
        >
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style lang="scss" scoped>
.download-get-resource {
  border-radius: var(--o-radius-xs);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  .get-resource-item {
    display: flex;
    padding: 24px;
    background-color: var(--o-color-fill2);
    .o-icon {
      margin-right: 12px;
      font-size: var(--o-icon_size-xl);
    }
    .title {
      @include h3;
      color: var(--o-color-info1);
    }
    .label {
      margin-top: 12px;
      @include text1;
      color: var(--o-color-info2);
    }
  }
}
</style>
