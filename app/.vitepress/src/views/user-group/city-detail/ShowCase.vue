<script lang="ts" setup>
import type { PropType } from 'vue';
import { useI18n } from '@/i18n';

import { CasesRecordsT } from '@/shared/@types/type-showcase';

defineProps({
  options: {
    type: Array as PropType<Array<CasesRecordsT>>,
    default() {
      return [];
    },
  },
});

// 点击跳转案例详情页面
function goDetail(link: string) {
  const search_result_url = '/' + link.replace('index', '');
  window.open(search_result_url);
}

const i18n = useI18n();
</script>

<template>
  <div class="case-list" :class="options.length < 3 ? 'center' : ''">
    <OCard
      v-for="(item, index) in options"
      :key="item.path"
      shadow="hover"
      class="case-card"
    >
      <div class="card-content-text">
        <h4>{{ item.title }}</h4>
        <p class="detail">
          {{ item.summary }}
        </p>
        <a @click="goDetail(item.path)">
          <OButton type="primary" size="mini" class="confirm-btn">{{
            i18n.showcase.button
          }}</OButton>
        </a>
      </div>
      <div class="card-type-img">
        <img :src="item.img" alt="" />
        <p class="type">{{ item.industry }}</p>
      </div>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
.case-list {
  display: grid;
  width: 100%;
  margin-top: var(--e-spacing-h4);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--e-spacing-h4);
  &.center {
    justify-content: center;
    display: flex;
    .case-card {
      max-width: 445px;
    }
    @media (max-width: 500px) {
      display: grid;
    }
  }
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--e-spacing-h5);
    padding: 0px;
  }
  .case-card {
    height: 198px;
    padding: 40px 26px 40px 40px;
    background-image: url(@/assets/category/showcase/case-card-bg.png);
    background-size: cover;
    position: relative;
    display: flex;
    @media (max-width: 768px) {
      height: 144px;
      padding: 16px 16px 14px 12px;
    }
    .card-content-text {
      color: #ffffff;
      h4 {
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        max-width: 256px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .detail {
        max-width: 256px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 2px;
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        @media (max-width: 768px) {
          max-width: 190px;
          margin-top: 8px;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
      a {
        position: absolute;
        bottom: 40px;
        @media (max-width: 768px) {
          bottom: 14px;
        }
        :deep(.confirm-btn) {
          width: 96px;
          display: flex;
          justify-content: center;

          @media (max-width: 768px) {
            width: 88px;
            font-size: var(--e-font-size-tip);
          }
        }
      }
    }
    :deep(.el-card__body) {
      width: 100%;
      padding: 0;
      display: flex;
      justify-content: space-between;
    }
    .card-type-img {
      img {
        width: 100px;
        height: 100px;
        @media (max-width: 768px) {
          width: 80px;
          height: 80px;
        }
      }
      .type {
        text-align: center;
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        color: #ad9cd3;
      }
    }
  }
}
</style>
