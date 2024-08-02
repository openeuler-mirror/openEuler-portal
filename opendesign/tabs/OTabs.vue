<script setup lang="ts">
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>

<template>
  <ElTabs class="o-tabs" v-bind="attrs">
    <slot> </slot>
  </ElTabs>
</template>

<style lang="scss">
.o-tabs {
  --e-tabs-font: var(--e-color-text1);
  --e-tabs-color: var(--e-color-text1);
  --e-tabs-color_hover: var(--e-color-brand1);
  --e-font-color: var(--e-tabs-font);
  &.el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__nav-wrap {
      &::after {
        display: none;
      }
      .el-tabs__item {
        color: var(--e-tabs-color);
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
        height: auto;
        &:hover {
          color: var(--e-tabs-color_hover);
        }
      }
      .el-tabs__item.is-active {
        color: var(--e-tabs-color_hover);
      }
    }
    @media screen and (max-width: 768px) {
      .el-tabs__nav-wrap {
        .el-tabs__item {
          padding-top: 6px;
          padding-bottom: 6px;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
    }
  }
}
</style>
