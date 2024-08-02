<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElInput class="o-input" v-bind="attrs">
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </ElInput>
</template>

<style lang="scss">
.o-input {
  --o-input-height: 36px;
  --o-input-border-color: var(--o-color-border1);
  --o-input-font-color: var(--o-color-text1);
  --o-input-font-size: var(--o-font-size-text);
  --o-input-line-height: var(--o-line-height-text);
  --o-input-color-bg: var(--o-color-bg2);

  &.el-input {
    font-size: var(--o-input-font-size);
    line-height: var(--o-input-font-size);

    .el-input__wrapper {
      border-radius: 0;
      padding: 1px 15px;
      background-color: var(--o-input-color-bg);
      box-shadow: 0 0 0 1px var(--o-input-border-color) inset;

      .el-input__inner {
        height: var(--o-input-height);
        line-height: var(--o-input-font-size);
        color: var(--o-input-font-color);
      }
    }
  }
}
</style>
