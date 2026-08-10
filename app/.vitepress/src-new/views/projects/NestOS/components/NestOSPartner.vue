<script lang="ts" setup>
import {  computed } from 'vue';
import { ORow, OCol, OCard, OFigure } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import nestosContent from '#content/nestos';

const { t } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

const partners = computed(() => nestosContent.zh.partners);

const gap = computed(() => {
  if (lePadV.value) {
    return '12px 0';
  } else if (lePad.value) {
    return '16px 0';
  } else if (leLaptop.value) {
    return '24px 0';
  }
  return '32px 0';
})
const flexWidth = computed(() => {
  if (lePadV.value) {
    return '0 0 50%';
  } else if (lePad.value) {
    return '0 0 33.33%';
  } else if (leLaptop.value) {
    return '0 0 25%';
  }
  return '0 0 20%';
})
</script>

<template>
  <AppSection :title="t('nestos.partnersTitle')">
    <ORow :gap="gap" wrap="wrap" justify="center" class="partners-row">
      <OCol
        v-for="(partner, i) in partners"
        :key="i"
        :flex="flexWidth"
      >
        <OCard>
          <OFigure :src="partner.logo" :class="partner.name" />
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.partners-row {
  width: 100%;
}

.o-card {
  --card-main-padding: 10px;
  :deep(.o-card-main-wrap) {
    justify-content: center;
    align-items: center;
  }
}
.Skysolidiss {
  height: 45px;
}

@include respond('phone') {
  .Skysolidiss {
    height: 28px;
  }
}
</style>
