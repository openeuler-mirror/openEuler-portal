<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElDropdown v-bind="attrs" trigger="click" class="o-dropdown">
    <slot> </slot>
    <template #dropdown>
      <slot name="dropdown"> </slot>
    </template>
  </ElDropdown>
</template>

<style lang="scss">
.el-dropdown__popper.is-light {
  background-color: var(--o-color-bg2);
  border-radius: 0;
  .el-dropdown-menu__item:not(.is-disabled):focus {
    color: var(--o-color-bg4);
  }
  .el-dropdown-menu__item {
    padding: 0 32px 0 20px;
    height: 34px;
    line-height: 34px;
  }
}
.o-dropdown {
  --o-dropdown-height: 36px;
  --o-dropdown-border-color: var(--o-color-border1);
  --o-dropdown-font-color: var(--o-color-text1);
  --o-dropdown-font-size: var(--o-font-size-text);
  --o-dropdown-line-height: var(--o-line-height-text);
  --o-dropdown-color-bg: var(--o-color-bg2);
  .o-search {
    margin: 0 var(--o-spacing-h5);
  }
}
.el-dropdown__popper {
  .el-scrollbar {
    .el-dropdown__list {
      .el-dropdown-menu {
        background-color: var(--o-color-bg2);

        .o-dropdown-item {
          content-visibility: auto;
          color: var(--o-color-text1);
        }
        .active {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
