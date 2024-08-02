<script setup lang="ts">
import { computed, CSSProperties, defineProps } from 'vue';

const props = defineProps({
  backgroundImage: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

const rootStyle = computed(() => {
  const result: CSSProperties = {};
  if (props.backgroundImage) {
    result.backgroundImage = `url(${props.backgroundImage})`;
  }

  if (props.backgroundColor) {
    result.backgroundColor = props.backgroundColor;
  }
  return result;
});
</script>

<template>
  <div class="app-banner" :style="rootStyle">
    <div class="wrap">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-banner {
  width: 100%;
  min-height: 280px;
  display: flex;
  justify-content: space-between;
  padding-top: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--e-color-brand1);
  .wrap {
    max-width: 1504px;
    padding: 0 44px;
  }
}
</style>
