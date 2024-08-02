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
  --o-dropdown-item-font-color: var(--o-color-text1);
  color: var(--o-dropdown-item-font-color);
}
</style>
