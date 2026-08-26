<script lang="ts" setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>
<template>
  <ElTabPane v-bind="attrs">
    <template v-if="$slots.label" #label><component :is="$slots.label"></component></template>
    <slot> </slot>
  </ElTabPane>
</template>

<style lang="scss"></style>
