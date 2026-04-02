<script lang="ts" setup>
import { ORow, OCol } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';

defineProps({
  introduceData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { lePadV } = useScreen();
</script>

<template>
  <div class="minisite-introduce">
    <p class="floor-title">{{ introduceData.title }}</p>
    <ORow :gap="lePadV ? '0 12px' : '0 16px'" wrap="wrap" class="introduce-desc">
      <OCol v-for="(item, i) in introduceData.description" :key="i" flex="0 0 100%">{{ item }}</OCol>
    </ORow>
  </div>
</template>

<style lang="scss" scoped>
.introduce-desc {
  color: var(--o-color-info2);
  margin-top: 40px;
  @include h4;

  @include respond-to('<=laptop') {
    margin-top: 24px;
  }
  @include respond-to('<=pad') {
    margin-top: 16px;
  }
  @include respond-to('<=pad_v') {
    margin-top: 12px;
  }
}
.o-col {
  white-space: pre-wrap;
}
</style>
