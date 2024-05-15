<script lang="ts" setup>
import type { PropType } from 'vue';
import { useRouter } from 'vitepress';

import type { NewsDataT } from '@/shared/@types/type-news';

defineProps({
  options: {
    type: Array as PropType<Array<NewsDataT>>,
    default() {
      return [];
    },
  },
});

const router = useRouter();
const toNewsContent = (path: string) => {
  window.open('/' + path + '.html', '_blank');
};
</script>

<template>
  <div class="news-list" :class="options.length < 3 ? 'center' : ''">
    <OCard
      v-for="item in options"
      :key="item.path"
      class="news-list-item"
      shadow="hover"
      @click="toNewsContent(item.path)"
    >
      <div class="news-img">
        <img :src="'/' + item.banner" :alt="item.banner" />
      </div>
      <div class="news-info">
        <p class="news-title">{{ item.title }}</p>
        <p class="news-time">{{ item.date }}</p>
        <p class="news-content">
          {{ item.summary }}
        </p>
      </div>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
:deep(.el-card__body) {
  padding: 0;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
}
.news-list {
  max-width: 1448px;
  margin: var(--o-spacing-h2) auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h4);
  &.center {
    justify-content: center;
    display: flex;
    @media (max-width: 500px) {
      display: grid;
    }
  }
  @media (max-width: 1450px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }
  @media (max-width: 768px) {
    grid-gap: var(--o-spacing-h5);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .news-list-item {
    justify-self: center;
    align-self: center;
    flex: 1;
    width: 100%;
    height: 100%;
    max-width: 436px;
    cursor: pointer;
    @media (max-width: 1100px) {
      max-width: inherit;
    }
    &:hover {
      .news-img img {
        transform: scale(1.05);
      }
    }
    @media (max-width: 620px) {
      height: auto;
    }
    .news-img {
      width: 100%;
      height: 188px;
      max-height: 188px;
      object-fit: cover;
      overflow: hidden;
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        height: 180px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    .news-info {
      padding: var(--o-spacing-h4);
      color: var(--o-color-text1);
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        width: 100%;
        padding: var(--o-spacing-h6);
      }
      .news-title {
        font-weight: 400;
        height: 52px;
        line-height: var(--o-line-height-h7);
        font-size: var(--o-font-size-h7);
        margin-bottom: var(--o-spacing-h10);
        @include showline();
        -webkit-line-clamp: 2;
        @media (max-width: 500px) {
          height: auto;
          line-height: var(--o-line-height-text);
          font-size: var(--o-font-size-text);
          font-weight: 500;
          -webkit-line-clamp: 1;
          margin-bottom: var(--o-spacing-h8);
        }
      }
      .news-time {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);
          color: var(--o-color-neutral5);
        }
      }
      .news-content {
        margin-top: var(--o-spacing-h5);
        @include showline();
        -webkit-line-clamp: 2;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);
          color: var(--o-color-neutral5);
        }
      }
    }
  }
}
</style>
