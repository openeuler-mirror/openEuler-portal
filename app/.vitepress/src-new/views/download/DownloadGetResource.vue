<script lang="ts" setup>
import { computed } from 'vue';

import { ORow, OCol, OCard } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';

import downloadContent from '#content/download';
import { createSvgIcon } from '~@/composables/createSvgIcon';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const emits = defineEmits<{
  (e: 'reportDownload', val: Record<string, string>): void;
}>();
const { locale, t } = useLocale();
const { isPhone, lePad } = useScreen();

const flexGap = computed(() =>
  isPhone.value ? '12px 12px' : lePad.value ? '16px 16px' : '32px 32px'
);

const getResource = computed(() => downloadContent[locale.value].get_resource);

const onClickCard = (item: any) => {
  emits('reportDownload', {
    level1: t('download.getResource'),
    level2: item.title,
  });
};
</script>
<template>
  <AppSection :title="$t('download.getResource')">
    <ORow :gap="flexGap" flex-wrap="wrap">
      <OCol
        v-for="item in getResource"
        :key="item.title"
        flex="0 1 50%"
        :laptop="{ flex: '0 50%' }"
        :pad="{ flex: '0 1 50%' }"
        :pad-v="{ flex: '0 1 100%' }"
        :phone="{ flex: '0 1 100%' }"
      >
        <OCard
          :title="item.title"
          :detail="item.label"
          :detail-row="2"
          layout="h"
          :href="item.href"
          @click="onClickCard(item)"
          target="_blank"
          rel="noopener noreferrer"
          hoverable
          :icon="createSvgIcon(item.icon_light)"
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
      color: var(--o-color-info1);
      @include h3;
    }
    .label {
      margin-top: 12px;
      color: var(--o-color-info2);
      @include text1;
    }
  }
}
</style>
