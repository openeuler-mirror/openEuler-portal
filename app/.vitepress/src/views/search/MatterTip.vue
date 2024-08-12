<script setup lang="ts">
import IconTips from '~icons/app/icon-tips.svg';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
</script>
<template>
  <el-tooltip
    placement="top"
    :effect="commonStore.theme"
  >
    <template #content>
      <p class="tip-content">
        搜索结果是由AI生成，结果可能不准确，如发生此类情形，并不代表openEuler社区立场
      </p>
    </template>
    <span class="icon-tips">
      <OIcon class="o-icon"><IconTips /></OIcon>
      注意事项
    </span>
  </el-tooltip>
</template>
<style lang="scss" scoped>
.icon-tips {
  color: var(--e-color-text4);
  display: flex;
  align-items: center;
  height: min-content;
  .o-icon {
    font-size: var(--e-font-size-h6);
  }
}
</style>
