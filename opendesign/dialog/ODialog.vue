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
  --e-dialog-font-color: var(--e-color-text1);
  --e-dialog-bg-color: var(--e-color-bg2);
  --e-dialog-division-color: var(--e-color-division1);
  color: var(--e-dialog-font-color);
  border-radius: 0;
  background-color: var(--e-dialog-bg-color);
  transition: none;
  border: none;
  .el-dialog__header {
    padding: 62px 40px 24px 40px;
    margin: 0;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
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
