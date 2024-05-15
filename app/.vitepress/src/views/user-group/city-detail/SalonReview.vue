<script lang="ts" setup>
import type { PropType } from 'vue';

import { LatestActivity } from '@/shared/@types/type-usergroup';
import IconCalendar from '~icons/app/icon-calendar.svg';
import IconHome from '~icons/app/icon-home.svg';
defineProps({
  options: {
    type: Array as PropType<Array<LatestActivity>>,
    default() {
      return [];
    },
  },
});

// 精彩回顾下展示列表
const goDetail = (id: number) => {
  window.open(`/zh/interaction/event-list/detail/?id=${id}&isMini=1`);
};
</script>

<template>
  <div class="salon-review" :class="options.length < 3 ? 'center' : ''">
    <OCard
      v-for="item in options"
      :key="item.id"
      class="salon-review-card"
      shadow="hover"
      @click="goDetail(item.id)"
    >
      <div class="salon-review-card-title">
        {{ item.title }}
      </div>
      <div v-if="item.poster" class="salon-review-card-img">
        <img
          :src="`https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`"
          alt=""
        />
        <span>{{ item.title }}</span>
      </div>
      <div
        v-else
        class="salon-review-card-desc"
        :title="item.synopsis ? item.synopsis : ''"
      >
        {{ item.synopsis ? item.synopsis : '' }}
      </div>
      <div class="salon-review-card-bottom">
        <div class="salon-review-card-mobile">
          <div class="salon-review-card-title-mobile">
            {{ item.title }}
          </div>
          <div
            class="salon-review-card-desc-mobile"
            :title="item.synopsis ? item.synopsis : ''"
          >
            {{ item.synopsis ? item.synopsis : '' }}
          </div>
        </div>
        <div class="salon-review-card-info">
          <IconCalendar class="salon-review-card-icon"></IconCalendar>
          <span>{{ item.date }}</span>
          <IconHome class="home salon-review-card-icon"></IconHome>
          <span class="address" :title="item.address"> {{ item.address }}</span>
        </div>
      </div>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
.salon-review {
  display: grid;
  width: 100%;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h2) var(--o-spacing-h4);
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--o-spacing-h5);
  }
  &.center {
    justify-content: center;
    display: flex;
    @media (max-width: 500px) {
      display: grid;
    }
  }

  .salon-review-card {
    cursor: pointer;
    width: 100%;
    max-width: 436px;
    :deep(.el-card__body) {
      padding: var(--o-spacing-h4);
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
      @media (max-width: 768px) {
        padding: 0;
      }
    }

    .salon-review-card-mobile {
      display: none;
      @media (max-width: 768px) {
        display: flex;
        flex-flow: column;
      }

      .salon-review-card-title-mobile {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
      }
      .salon-review-card-desc-mobile {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text4);
        margin-top: var(--o-spacing-h9);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        word-break: break-all;
      }
    }

    .salon-review-card-icon {
      height: 24px;
      width: 24px;
      color: var(--o-color-text4);
      margin-right: var(--o-spacing-h9);
      @media (max-width: 768px) {
        height: 16px;
        width: 16px;
        color: var(--o-color-neutral8);
        margin-right: var(--o-spacing-h10);
      }
    }

    .salon-review-card-title {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
      overflow: hidden;
      text-overflow: ellipsis;
      height: 52px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      @media (max-width: 768px) {
        display: none;
      }
    }

    .salon-review-card-desc {
      width: 100%;
      height: 172px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      overflow: hidden;
      margin-top: var(--o-spacing-h4);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      word-break: break-all;
      @media (max-width: 768px) {
        display: none;
      }
    }

    .salon-review-card-img {
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 768px) {
        margin-top: 0px;
      }
      img {
        object-fit: cover;
        height: 172px;
        width: 100%;
        @media (max-width: 768px) {
          height: 120px;
        }
      }
      span {
        position: absolute;
        text-align: center;
        max-width: 400px;
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        color: #fff;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
    }

    .salon-review-card-info {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
    }

    .salon-review-card-bottom {
      padding: 0;
      width: 100%;
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h6);
      }

      .home {
        margin-left: var(--o-spacing-h2);
        @media (max-width: 768px) {
          margin-left: var(--o-spacing-h5);
        }
      }
      .address {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      span {
        color: var(--o-color-text4);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        white-space: nowrap;
        @media (max-width: 768px) {
          color: var(--o-color-neutral8);
        }
      }
    }
  }
}
</style>
