<script lang="ts" setup>
import type { PropType } from 'vue';

interface RightItemT {
  TITLE: string;
  EQUITY: string[];
  OBLIGATION: string[];
}

defineProps({
  options: {
    type: Object as PropType<RightItemT>,
    default() {
      return {};
    },
  },
});

const repeatStr = (v: string) => {
  if (v.includes('oEVP')) {
    return `晋升社区 <a href='/zh/community/program/join-oEVP/'>oEVP</a>`;
  } else {
    return v;
  }
};
</script>

<template>
  <div class="right-card">
    <div class="right-title dot">
      {{ options.TITLE }}
    </div>
    <ul class="right-list">
      <li v-for="item in options.EQUITY" :key="item" class="item dot">
        <span v-dompurify-html="repeatStr(item)"></span>
      </li>
    </ul>
    <ul class="right-list">
      <li v-for="item in options.OBLIGATION" :key="item" class="item dot">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.right-card {
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    display: block;
  }
  .right-title {
    position: relative;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    flex: 1;
  }
  .dot {
    position: relative;
    padding-left: 12px;
    &::before {
      content: '';
      position: absolute;
      left: 0px;
      width: 6px;
      height: 6px;
      left: 0px;
      top: 6px;
      border-radius: 50%;
      background-color: var(--o-color-brand1);
    }
  }
  .right-list {
    flex: 1;
    .item {
      color: var(--o-color-text4);
      line-height: var(--o-line-height-text);
      font-size: var(--o-font-size-text);
      &:not(:last-child) {
        margin-bottom: 8px;
        @media screen and(max-width:768px) {
          margin-bottom: 4px;
        }
      }
    }
    @media screen and(max-width:768px) {
      margin-top: 12px;

      .item {
        padding-left: 20px;
        font-size: var(--o-font-size-tip);
        &::before {
          left: 8px;
          width: 4px;
          height: 4px;
          top: 8px;
        }
      }
    }
  }
}
</style>
