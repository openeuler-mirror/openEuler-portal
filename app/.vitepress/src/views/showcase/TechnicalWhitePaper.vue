<script setup lang="ts">
import { ref, computed } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import technicalDataTotal from '@/data/showcase/technical-while-paper';
import NotFound from '@/NotFound.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-community.png';
import technicalIll from '@/assets/illustrations/technical-white-paper.png';

type Language = 'zh' | 'en';

const i18n = useI18n();
const { lang } = useData();

const technicalData = technicalDataTotal[lang.value as Language];

const userCaseData = computed(() => i18n.value.showcase);

const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);

const randerPaperList = computed(() => {
  if (technicalData.length > pageSize.value) {
    return technicalData.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return technicalData;
  }
});

// 数据总条数
const total = computed(() => technicalData.length);
// 分页器总页数
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

const paginationVisible = computed(() => (totalPage.value > 0 ? true : false));
// 根据滚动位置移动端tag吸顶

// 移动端翻页事件
function jumpPage(page: number) {
  currentPage.value = page;
}
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMNUNITY"
    :title="userCaseData.technicalWhilePaper"
    :illustration="technicalIll"
  />
  <div class="user-case">
    <div class="case-list">
      <OCard
        v-for="item in randerPaperList"
        :key="item.path"
        shadow="hover"
        class="case-card"
      >
        <div class="card-content-text">
          <p class="detail" :title="item.summary">
            {{ item.summary }}
          </p>
          <a :href="item.path">
            <OButton type="primary" size="mini" class="confirm-btn">{{
              userCaseData.downloadPaper
            }}</OButton>
          </a>
        </div>
      </OCard>
    </div>
    <NotFound v-if="total === 0" />
    <div v-if="paginationVisible" class="page-box">
      <ClientOnly>
        <OPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :hide-on-single-page="true"
          :page-sizes="[pageSize]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
          @jump-page="jumpPage"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-case {
  max-width: 1504px;
  padding: 40px 44px 64px;
  margin: 0 auto;
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media (max-width: 768px) {
    padding: 24px 0 40px 0;
    background-color: var(--o-color-bg1);
  }

  .case-list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 1280px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 0 16px;
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
        color: var(--o-color-white);
        h4 {
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          max-width: 256px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
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
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          @media (max-width: 768px) {
            max-width: 190px;
            margin-top: 8px;
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
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
              font-size: var(--o-font-size-tip);
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
          @media (max-width: 768px) {
            width: 80px;
            height: 80px;
          }
        }
        .type {
          text-align: center;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: #ad9cd3;
        }
      }
    }
  }
  .page-box {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
  }
}
</style>
