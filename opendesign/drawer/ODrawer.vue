<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

const drawerClassNames = computed(() => {
  return `${attrs['custom-class']}`
    ? `${attrs['custom-class']} o-drawer`
    : 'o-drawer';
});

const modalClassNames = computed(() => {
  return attrs['modal-class']
    ? `${attrs['modal-class']} o-drawer-modal`
    : 'o-drawer-modal';
});
</script>

<template>
  <ElDrawer
    v-bind="attrs"
    :custom-class="drawerClassNames"
    append-to-body
    :modal-class="modalClassNames"
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <slot></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </ElDrawer>
</template>

<style lang="scss">
.el-drawer {
  background-color: var(--e-color-bg2);
}
.o-drawer {
  --e-drawer-bg: var(--e-color-bg2);
  &.el-drawer {
    background-color: var(--e-drawer-bg);
  }
}
.o-drawer-modal {
  --e-drawer-modal-bg: var(--e-color-bg6);
  &.el-overlay {
    background-color: var(--e-drawer-modal-bg);
  }
}
</style>
