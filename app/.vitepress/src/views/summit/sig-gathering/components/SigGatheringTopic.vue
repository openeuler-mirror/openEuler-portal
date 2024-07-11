<script lang="ts" setup>
import { computed } from 'vue';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

import { useCommon } from '@/stores/common';

defineProps({
  topicData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="topic">
    <div class="title-img">
      {{ topicData.title }}
      <img
        class="introduction-img"
        :src="isDark ? topicData.titleImDark : topicData.titleImg"
        alt=""
      />
    </div>
    <ul class="list">
      <li
        v-for="(item, i) in topicData.list"
        :key="i"
        :style="{ backgroundImage: `url(${isDark ? item.bgDark : item.bg})` }"
        class="item-topic"
        :class="{'dark': isDark}"
      >
        <p class="title">{{ item.title }}</p>
        <p v-for="(desc, j) in item.desc" :key="j" class="desc">{{ desc }}</p>
        <div class="link">
          <a :href="item.href" target="_blank">
            <span class="text">{{ topicData.text }}</span>
            <OIcon><IconChevronRight /></OIcon>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.topic {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: 40px;
  }
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item-topic {
  width: calc(50% - 16px);
  min-height: 252px;
  background-color: var(--o-color-bg2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  padding: 40px 40px 32px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  .title {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    font-weight: 500;
    color: var(--o-color-text1);
    margin-bottom: 16px;
  }
  .desc {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    &:last-of-type {
      margin-bottom: 16px;
    }
  }
  .link {
    margin-top: auto;
    a {
      display: inline-flex;
      align-items: center;
    }
    .text {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
      margin-right: 4px;
      &:hover {
        color: var(--o-color-neutral6);
      }
      &:active {
        color: var(--o-color-neutral1);
      }
    }
    .o-icon {
      font-size: var(--o-font-size-h5);
    }
  }
  &:nth-child(2n) {
    margin-left: 32px;
  }
  &:nth-of-type(1),
  &:nth-of-type(2) {
    margin-top: 0;
  }
}
@media (max-width: 1416px) {
  .item-topic {
    width: calc(50% - 12px);
    min-height: 196px;
    padding: 24px;
    margin-top: 24px;
    .title {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      margin-bottom: 16px;
    }
    .desc {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .link {
      .text {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    &:nth-child(2n) {
      margin-left: 24px;
    }
  }
}
@media (max-width: 1200px) {
  .item-topic {
    width: 100%;
    &:nth-child(2n) {
      margin-left: 0;
    }
    &:nth-of-type(2) {
      margin-top: 24px;
    }
  }
}
@media (max-width: 767px) {
  .item-topic {
    width: 100%;
    min-height: 132px;
    padding: 16px;
    margin-top: 16px;
    background-size: 100%;
    background-position: right bottom;
    .title {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-bottom: 8px;
    }
    .desc {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: rgba(0, 0, 0, 0.6);
    }
    .link {
      .text {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      .o-icon {
        font-size: var(--o-font-size-h8);
      }
    }
    &:nth-child(2n) {
      margin-left: 0;
    }
    &:nth-of-type(2) {
      margin-top: 16px;
      background-position: right top;
    }
    &:nth-of-type(5) {
      background-position: right top;
    }
  }
}
.dark .desc {
  color: rgba(255, 255, 255, 0.8);
  @media (max-width: 767px) {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
