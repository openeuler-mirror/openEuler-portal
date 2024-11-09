<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  pcTop: {
    type: Number,
    default: 64,
  },
  mobileTop: {
    type: Number,
    default: 40,
  },
});

const mobilePaddingTop = computed(() => {
  return props.mobileTop + 'px';
});

const pcPaddingTop = computed(() => {
  return props.pcTop + 'px';
});
</script>

<template>
  <div class="app-content"><slot></slot></div>
</template>

<style lang="scss" scoped>
.app-content {
  padding-top: v-bind('pcPaddingTop');
  padding-bottom: var(--e-spacing-h1);
  max-width: var(--layout-content-max-width);
  padding-left: var(--layout-content-padding);
  padding-right: var(--layout-content-padding);
  margin: 0 auto;

  @media (max-width: 1100px) {
    padding-top: v-bind('mobilePaddingTop');
    padding-bottom: var(--e-spacing-h2);
  }
}
</style>
