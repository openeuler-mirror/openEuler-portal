<script setup lang="ts">
import { useAttrs, ref } from 'vue';
const attrs = useAttrs();
const tree = ref(null);
defineExpose({
  tree,
});
</script>

<template>
  <ElTree ref="tree" class="o-tree" v-bind="attrs"></ElTree>
</template>

<style lang="scss">
.o-tree {
  &.el-tree-node {
    color: var(--e-color-text1);
    border-radius: 0;
    background-color: var(--e-color-bg2);
    border: none;
  }
}
</style>
