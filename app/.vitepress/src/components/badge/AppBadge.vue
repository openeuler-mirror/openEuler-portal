<script setup lang="ts">
import { computed } from 'vue';
import { badgeProps } from './types';
import { isNumber } from '@opensig/opendesign';

const props = defineProps(badgeProps);

const content = computed(() => {
  if (isNumber(props.value) && isNumber(props.max)) {
    return props.value < props.max ? `${props.value}` : `${props.max}+`;
  }
  return props.value;
});

const style = computed(() => {
  const [x, y] = props.offset;
  const right = isNumber(x) ? `-${x}px` : `-${x}`;
  const top = isNumber(y) ? `${y}px` : `${y}`;
  return {
    right,
    top,
  };
});
</script>

<template>
  <div class="o-badge">
    <slot></slot>
    <sup class="o-badge-content" :style="style">
      <slot name="content">
        <div class="o-badge-label">{{ content }}</div>
      </slot>
    </sup>
  </div>
</template>

<style lang="scss" scoped>
@use './style/style.scss' as *;
</style>