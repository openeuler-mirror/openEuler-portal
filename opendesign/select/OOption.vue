<script lang="ts" setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>
<template>
  <ElOption v-bind="attrs" class="e-option">
    <slot> </slot>
  </ElOption>
</template>

<style lang="scss">
.el-popper__arrow {
  display: none;
}
.el-select-dropdown {
  border: none;
  border-radius: 0 !important;
  background-color: var(--e-color-bg2);
}
</style>
