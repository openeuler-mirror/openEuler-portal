<script setup lang="ts">
import MarkdownImage from './MarkdownImage.vue';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div class="common-layout">
    <div v-for="(node, index) in data" :key="index">
      <div v-if="['h2', 'h3'].includes(node.type) && node.content" class="section-title">{{ node.content }}</div>
      <div v-if="node.type === 'p' && node.content" class="section-content">{{ node.content }}</div>
      <div v-if="node.type === 'img'" class="section-image">
        <MarkdownImage>
          <img :src="node.src" :alt="node.alt" >
        </MarkdownImage>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px;
  margin-top: 12px;

  .section-title {
    color: var(--o-color-info1);
    font-weight: 600;
    position: relative;
    @include h3;
  }

  .section-content {
    color: var(--o-color-info2);
    margin: 8px 0;
    @include text1;
  }

  .section-image {
    padding: 12px 0;
    display: flex;
    align-items: center;
  }
}
</style>
