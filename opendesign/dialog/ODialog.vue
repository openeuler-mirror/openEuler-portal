<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElDialog class="o-dialog" v-bind="attrs">
    <template #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<style scope lang="scss">
.el-dialog {
  --o-dialog-font-color: var(--o-color-text1);
  --o-dialog-bg-color: var(--o-color-bg2);
  --o-dialog-division-color: var(--o-color-division1);
  color: var(--o-dialog-font-color);
  border-radius: 0;
  background-color: var(--o-dialog-bg-color);
  transition: none;
  border: none;
  .el-dialog__header {
    padding: 62px 40px 24px 40px;
    margin: 0;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
  }
  .el-dialog__body {
    padding: 16px 62px;
  }
  .el-dialog__footer {
    padding: 46px 62px 62px 62px;
    &:empty {
      display: none;
    }
  }
}
</style>
