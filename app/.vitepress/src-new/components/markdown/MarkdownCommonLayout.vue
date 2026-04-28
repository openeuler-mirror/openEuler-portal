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
    <template v-for="(node, index) in data" :key="index">
      <div v-if="['h2', 'h3'].includes(node.type) && node.content" class="section-title">{{ node.content }}</div>
      <div v-if="node.type === 'strong' && node.content" class="strong">{{ node.content }}</div>
      <div v-if="node.type === 'p' && node.content" class="section-content">{{ node.content }}</div>
      <ul v-if="node.type === 'ul' && node.content" class="list">
        <li v-for="(item, i) in node.content" :key="i">{{ item }}</li>
      </ul>
      <div v-if="node.type === 'img'" class="section-image">
        <MarkdownImage>
          <img :src="node.src" :alt="node.alt" >
        </MarkdownImage>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 40px 32px;

  .section-title {
    color: var(--o-color-info1);
    font-weight: 600;
    position: relative;
    @include h3;
  }

  .strong,
  .section-content,
  .list {
    color: var(--o-color-info1);
    @include text2;
  }

  .strong {
    font-weight: 600;
  }

  .strong + .list {
    margin-top: 12px;
  }

  .section-content + .section-content {
    margin-top: 12px;
  }

  .section-image {
    display: flex;
    align-items: center;
    margin-top: 32px;
  }
}

@include respond-to('<=laptop') {
  .common-layout {
    padding: 24px;
    .section-image {
      margin-top: 24px;
    }
  }
}

@include respond-to('<=pad') {
  .common-layout {
    padding: 16px;
    .section-image {
      margin-top: 16px;
    }
  }
}

@include respond-to('<=pad_v') {
  .common-layout {
    padding: 12px;
    .section-image {
      margin-top: 12px;
    }
  }
}
</style>
