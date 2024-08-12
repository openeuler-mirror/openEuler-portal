<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <el-switch class="o-switch" v-bind="attrs"></el-switch>
</template>

<style lang="scss">
.o-switch {
  --e-switch-font-color: var(--e-color-text4);
  --e-switch-font-color-active: var(--e-color-brand1);
  --e-switch-on-color: var(--e-color-brand1);
  &.el-switch {
    .el-switch__label {
      color: var(--e-switch-font-color);
    }
    .el-switch__label.is-active {
      color: var(--e-switch-font-color-active);
      font-weight: 600;
    }
    &.is-checked .el-switch__core {
      background-color: var(--e-switch-on-color);
      border-color: var(--e-switch-on-color, var(--e-switch-on-color));
    }
  }
}
</style>
