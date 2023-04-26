<script setup lang="ts">
defineProps({
  floorData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <div class="floor-box">
    <h2 v-if="floorData.title" :id="floorData.title" class="floor-title">
      <span v-dompurify-html="floorData.description" class="title-bg"></span>
      <span v-dompurify-html="floorData.title" class="title-text"></span>
    </h2>
    <div v-dompurify-html="floorData.content" class="markdown"></div>
  </div>
</template>
<style lang="scss" scoped>
.floor-box {
  .markdown {
    margin: 0;
    width: 100%;
    max-width: 100%;
    min-height: 0;
  }
}
</style>
