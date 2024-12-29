<script lang="ts" setup>
import { computed } from 'vue';

import { ORow, OCol, OCard } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';

import support from '~@/data/download/support-service';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { locale } = useLocale();
const { isPhone, lePad } = useScreen();

const flexGap = computed(() =>
  isPhone.value ? '12px 12px' : lePad.value ? '16px 16px' : '32px 32px'
);
</script>
<template>
  <AppSection :title="$t('download.support')">
    <ORow :gap="flexGap" flex-wrap="wrap">
      <template v-for="(item, index) in support" :key="item[locale]?.title">
        <OCol
          v-if="item[locale]"
          :flex="locale === 'zh' ? '0 1 33.33%' : '0 1 50%'"
          :laptop="{ flex: locale === 'zh' ? '0 1 33.33%' : '0 1 50%' }"
          :pad="{ flex: '0 1 50%' }"
          :pad-v="{ flex: '0 1 100%' }"
          :phone="{ flex: '0 1 100%' }"
        >
          <OCard
            :title="item[locale]?.title"
            :detail="item[locale]?.label"
            :detail-row="2"
            layout="h"
            :href="item[locale]?.href"
            target="_blank"
            rel="noopener noreferrer"
            hoverable
            :icon="item.icon.light"
          >
          </OCard>
        </OCol>
      </template>
    </ORow>
  </AppSection>
</template>

<style lang="scss" scoped></style>
