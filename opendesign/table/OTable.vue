<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElTable class="e-table" v-bind="attrs">
    <slot></slot>
  </ElTable>
</template>

<style lang="scss">
.e-table {
  &.el-table {
    --el-table-header-bg-color: var(--e-color-bg4);
    --el-table-row-hover-bg-color: var(--e-color-bg3);
    --el-table-border-color: var(--e-color-division1);
    box-shadow: var(--e-shadow-l1);
    color: var(--e-color-text4);
    --el-table-border: none;
    .el-table__empty-block {
      background-color: var(--e-color-bg2);
    }
    thead {
      color: var(--e-color-text1);
    }
    th.el-table__cell.is-leaf {
      border-bottom: none;
    }
    tr {
      background: var(--e-color-bg2);
      position: relative;
      &::after {
        width: calc(100% - 32px);
        background: var(--e-color-division1);
        content: ' ';
        display: inline-block;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        z-index: 1;
      }
      &:last-child::after {
        height: 0;
      }
      td {
        color: var(--e-color-text4);
      }
    }

    .el-table__header-wrapper {
      background-color: var(--e-color-greyblue1);
    }
    .el-table__cell {
      padding: var(--e-spacing-h5) 0;
    }
    .cell {
      padding: 0 var(--e-spacing-h5);
    }
    .el-table__inner-wrapper::before {
      background: var(--e-color-bg1);
    }
  }
}
</style>
