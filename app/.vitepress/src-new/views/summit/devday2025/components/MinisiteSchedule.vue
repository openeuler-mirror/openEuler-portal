<script lang="ts" setup>
import { ref } from 'vue';

import IconTime from '~icons/app-new/icon-time.svg';

import useWindowResize from '@/components/hooks/useWindowResize';

defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
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
        :style="{
          backgroundImage: `url(${windowWidth > 840 ? child.bg : child.bgMo})`,
        }"
      >
        <div class="title-content">
          <p class="title">{{ child.title }}</p>
          <div class="subtitle-content">
            <p class="subtitle">{{ child.attendee }}</p>
            <p class="subtitle">{{ child.ldentity }}</p>
          </div>
        </div>
        <div class="bottom">
          <span class="date"
            ><IconTime /><span>{{ child.date }}</span></span
          >
          <span class="time">{{ child.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-item {
  margin: 40px 0 0 32px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: calc(100% + 40px);
    top: 18px;
    left: -25px;
    background-color: var(--o-color-primary1);
  }
  &:last-of-type {
    &::before {
      display: none;
    }
  }
  @include respond-to('<=pad_v') {
    margin: var(--o-gap-4) 0 0 var(--o-gap-4);
    &::before {
      width: 1px;
      height: calc(100% + var(--o-gap-4));
      top: 11px;
      left: -12.5px;
    }
  }
}
.type {
  @include h4;
  width: 160px;
  background-image: linear-gradient(
    270deg,
    rgba(180, 97, 246, 0) 2%,
    var(--o-color-primary1) 100%
  );
  padding: var(--o-gap-1) var(--o-gap-3);
  color: #fff;
  font-weight: 500;
  position: relative;
  border-radius: var(--o-radius-xs);
  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 10px;
    left: -32px;
    background-color: var(--o-color-primary1);
  }
  @include respond-to('<=pad_v') {
    width: 128px;
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
  padding: var(--o-gap-5);
  margin-top: var(--o-gap-4);
  height: 100%;
  background-color: var(--o-color-fill2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--o-radius-xs);
  .title-content {
    display: flex;
    align-items: flex-end;
    .title {
      @include h3;
      color: var(--o-color-info1);
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
        background-color: var(--o-color-primary1);
      }
    }

    @include respond-to('<=pad_v') {
      flex-direction: column;
      align-items: flex-start;
    }

    .subtitle-content {
      display: flex;
      .subtitle {
        @include text1;
        margin-left: var(--o-gap-2);
      }

      @include respond-to('<=pad_v') {
        margin-top: var(--o-gap-3);
        margin-left: 6px;
      }

      @media screen and (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
  .bottom {
    @include text1;
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    font-weight: 400;
    margin-top: var(--o-gap-5);
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
      margin-left: var(--o-gap-4);
    }
  }
  @include respond-to('<=pad_v') {
    padding: var(--o-gap-4);
    background-size: cover;
    background-position: top;
    &:nth-child(2n + 1) {
      background-position: bottom;
    }
    .title {
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
      margin-top: var(--o-gap-5);
      .date {
        svg {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
      .time {
        margin-left: var(--o-gap-5);
      }
    }
  }
}
</style>
