<script lang="ts" setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>
<template>
  <ElDropdownItem v-bind="attrs" class="o-dropdown-item">
    <slot> </slot>
  </ElDropdownItem>
</template>

<style lang="scss">
.o-dropdown-item {
  --e-dropdown-item-font-color: var(--e-color-text1);
  color: var(--e-dropdown-item-font-color);
}
</style>
