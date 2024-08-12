<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElCollapse class="o-collapse" v-bind="attrs">
    <slot></slot>
  </ElCollapse>
</template>

<style lang="scss">
.o-collapse {
  --e-collapse-color-bg: var(--e-color-bg2);
  --e-collapse-color-bg1: var(--e-color-bg1);
  --e-collapse-color-border: var(--e-color-brand1);
  --e-collapse-color-text: var(--e-color-text1);
  --e-collapse-padding-left: var(--e-spacing-h6);
  --e-collapse-padding: var(--e-spacing-h8);
  --e-collapse-font-size: var(--e-font-size-h7);
  --e-collapse-font-size-icon: var(--e-font-size-h8);
  --e-collapse-line-height: var(--e-line-height-h7);
  --e-collapse-color-bg2: var(--e-color-bg4);
  --e-collapse-color-brand1: var(--e-color-brand1);

  &.el-collapse {
    border-top: none;
    .el-collapse-item__header {
      color: var(--e-collapse-color-text);
      padding-left: var(--e-collapse-padding-left);
      background-color: var(--e-collapse-color-bg);
      font-size: var(--e-collapse-font-size);
      line-height: var(--e-collapse-line-height);
      border-left: 2px solid var(--e-collapse-color-border);
      border-bottom: none;
      .el-collapse-item__arrow {
        margin: 0 0 0 auto;
        font-size: var(--e-collapse-font-size-icon);
      }
    }
    .el-collapse-item__wrap {
      border-bottom: none;
      .el-collapse-item__content {
        background-color: var(--e-collapse-color-bg2);
        color: var(--e-collapse-color-text);
        padding: var(--e-collapse-padding);
      }
    }
  }
}
</style>
