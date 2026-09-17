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

const support = computed(() => downloadContent[locale.value].support_service);

const onClickCard = (item: any) => {
  emits('reportDownload', {
    level1: t('download.support'),
    level2: item.title,
  });
};
</script>
<template>
  <AppSection :title="$t('download.support')">
    <ORow :gap="flexGap" flex-wrap="wrap">
      <OCol
        v-for="item in support"
        :key="item.title"
        :flex="locale === 'zh' ? '0 1 33.33%' : '0 1 50%'"
        :laptop="{ flex: locale === 'zh' ? '0 1 33.33%' : '0 1 50%' }"
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

<style lang="scss" scoped></style>
