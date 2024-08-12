<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';

import IconTime from '~icons/app/icon-time.svg';

import useWindowResize from '@/components/hooks/useWindowResize';

defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
const windowWidth = ref(useWindowResize());
</script>

<template>
  <div class="date-list">
    <div v-for="(subitem, i) in options" :key="i" class="data-item">
      <p class="type">{{ subitem.type }}</p>
      <div
        v-for="(child, j) in subitem.children"
        :key="j"
        class="child-item"
        :class="{'child-item-dark': isDark}"
        :style="{ backgroundImage: `url(${windowWidth > 767 ? child.bg : child.bgMo})` }"
      >
        <p class="title">{{ child.title }}</p>
        <div class="bottom">
          <span class="date"><IconTime /><span>{{ child.date }}</span></span>
          <span class="time">{{ child.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-item {
  margin: var(--e-spacing-h2) 0 0 var(--e-spacing-h3);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: calc(100% + var(--e-spacing-h2));
    top: 18px;
    left: -25px;
    background-color: var(--e-color-brand1);
  }
  &:last-of-type {
    &::before {
      display: none;
    }
  }
  @media (max-width: 767px) {
    margin: var(--e-spacing-h5) 0 0 var(--e-spacing-h5);
    &::before {
      width: 1px;
      height: calc(100% + var(--e-spacing-h5));
      top: 11px;
      left: -12.5px;
    }
  }
}
.type {
  width: 160px;
  background-image: linear-gradient(270deg, rgba(180,97,246,0.00) 2%, var(--e-color-brand1) 100%);
  padding: var(--e-spacing-h10) var(--e-spacing-h6);
  font-size: var(--e-font-size-h6);
  color: #fff;
  line-height: var(--e-line-height-h6);
  font-weight: 500;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 10px;
    left: -32px;
    background-color: var(--e-color-brand1);
  }
  @media (max-width: 767px) {
    width: 128px;
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    &::before {
      width: 8px;
      height: 8px;
      top: 11px;
      left: -16px;
    }
  }
}
.child-item {
  width: 100%;
  padding: var(--e-spacing-h4);
  margin-top: var(--e-spacing-h5);
  height: 100%;
  background-color: var(--e-color-bg2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .title {
    font-size: 22px;
    color: var(--e-color-text1);
    line-height: 30px;
    font-weight: 500;
    margin-left: 14px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 6px;
      height: 22px;
      border-radius: 3px;
      top: 3px;
      left: -14px;
      background-color: var(--e-color-brand1);
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    font-size: var(--e-font-size-h8);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h8);
    font-weight: 400;
    margin-top: var(--e-spacing-h4);
    .date {
      display: flex;
      align-items: flex-start;
      svg {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
    }
    .time {
      margin-left: var(--e-spacing-h2);
    }
  }
  @media (max-width: 767px) {
    padding: var(--e-spacing-h5);
    background-size: cover;
    background-position: top;
    &:nth-child(2n + 1) {
      background-position: bottom;
    }
    .title {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      margin-left: 8px;
      &::before {
        content: '';
        width: 3px;
        height: 16px;
        border-radius: 3px;
        top: 4px;
        left: -8px;
      }
    }
    .bottom {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h4);
      .date {
        svg {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
      .time {
        margin-left: var(--e-spacing-h4);
      }
    }
  }
}
.child-item-dark {
  background-color: rgba(38, 35, 40, 0.8);
}
</style>
