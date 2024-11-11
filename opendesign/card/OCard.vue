<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElCard class="e-card" v-bind="attrs">
    <slot name="header"></slot>
    <slot></slot>
  </ElCard>
</template>

<style lang="scss">
.e-card {
  --e-card-font-color: var(--e-color-text1);
  --e-card-bg-color: var(--e-color-fill2);
  --e-card-division-color: var(--e-color-division1);
  --e-card-bg-color_hover: var(--e-color-fill2_hover);

  &.el-card {
    color: var(--e-card-font-color);
    border-radius: 0;
    background-color: var(--e-card-bg-color);
    transition: none;
    border: none;

    &.is-always-shadow {
      box-shadow: var(--e-shadow-l2);
    }

    &.is-hover-shadow {
      box-shadow: var(--e-shadow-l2);
      &:hover,
      &:focus {
        @media screen and (min-width: 1100px) {
          box-shadow: var(--e-shadow-l2_hover);
          background-color: var(--e-card-bg-color_hover);
        }
      }
    }

    .el-card__header {
      border-bottom: 1px solid var(--e-card-division-color);
    }
  }
}
</style>
