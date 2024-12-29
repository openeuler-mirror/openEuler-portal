<script setup lang="ts">
import { OResult } from '@opensig/opendesign';

import { useCommon } from '@/stores/common';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';
import { computed } from 'vue';

defineProps({
  // 描述文本
  description: {
    type: String,
    default: '',
  },
});
const commonStore = useCommon();

const emptyImage = computed(() => {
  return commonStore.theme === 'light' ? notFoundImg_light : notFoundImg_dark;
});
</script>

<template>
  <OResult
    class="result-empty"
    :description="description || $t('common.empty')"
  >
    <template #image>
      <slot name="image">
        <img class="empty-image" alt="empty" :src="emptyImage" />
      </slot>
    </template>
  </OResult>
</template>

<style lang="scss" scoped>
.result-empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  --result-image-width: 248px;
  --result-image-height: 300px;
}
</style>
