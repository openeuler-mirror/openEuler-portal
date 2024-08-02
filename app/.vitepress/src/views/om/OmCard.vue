<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  items: string[];
  width: number;
  height: number;
}>();

const cardStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };
});
</script>

<template>
  <div class="om-card-box" :style="cardStyle">
    <p class="om-card-title">{{ title }}</p>
    <div class="om-card-content">
      <div v-for="item in items" :key="item" class="om-card-item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.om-card-box {
  display: inline-block;
  background-color: var(--e-color-kleinblue5);
  color: var(--e-color-white);
  font-size: var(--e-font-size-text);
  text-align: center;
  box-sizing: border-box;
  padding: 12px;
  margin: 6px;

  .om-card-title {
    line-height: 18px;
    margin-bottom: 8px;
  }

  .om-card-content {
    background-color: var(--e-color-kleinblue9);
    height: calc(100% - 26px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 6px 0;
  }

  .om-card-item {
    min-width: 64px;
    background-color: var(--e-color-kleinblue8);
    font-size: var(--e-font-size-tip);
    line-height: 24px;
    padding: 0 5px;
    margin: 0 2px;
  }
}
</style>
