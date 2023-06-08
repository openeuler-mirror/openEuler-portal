<script setup lang="ts">
import showMd from 'markdown-it';
defineProps({
  floorData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
// 转换md语法
function convertMd(data: string) {
  return showMd().render(data);
}
</script>
<template>
  <div class="floor-box">
    <h2 v-if="floorData.title" :id="floorData.title" class="floor-title">
      <span
        v-dompurify-html="convertMd(floorData.description)"
        class="title-bg"
      ></span>
      <span
        v-dompurify-html="convertMd(floorData.title)"
        class="title-text"
      ></span>
    </h2>
    <div v-dompurify-html="convertMd(floorData.content)" class="markdown"></div>
  </div>
  <template v-if="floorData.items?.length">
    <div
      v-for="itemData in floorData.items"
      :key="itemData.title"
      class="floor-box"
    >
      <h2 v-if="itemData.title" :id="itemData.title" class="floor-title">
        <span
          v-dompurify-html="convertMd(itemData.description)"
          class="title-bg"
        ></span>
        <span
          v-dompurify-html="convertMd(itemData.title)"
          class="title-text"
        ></span>
      </h2>
      <div
        v-dompurify-html="convertMd(itemData.content)"
        class="markdown"
      ></div>
    </div>
  </template>
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
