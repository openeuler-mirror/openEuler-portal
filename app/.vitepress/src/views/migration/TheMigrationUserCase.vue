<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import practicesInfoData from '@/data/migration/migration-practices';

const i18n = useI18n();
const { lang } = useData();

const practicesInfo = computed(() => {
  return practicesInfoData[lang.value as 'zh' | 'en'];
});

const userCaseData = computed(() => i18n.value.showcase);

function goDetail(link: string) {
  window.open(link);
}
</script>
<template>
  <div class="migration-user-case">
    <div class="user-case-list">
      <OCard
        v-for="item in practicesInfo"
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
              userCaseData.button
            }}</OButton>
          </a>
        </div>
        <div class="card-type-img">
          <img :src="item.img" alt="" />
          <p class="type">{{ item.industry }}</p>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss">
.user-case-list {
  display: grid;
  width: 100%;
  margin: var(--o-spacing-h2) 0;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h4);
  @media (max-width: 1280px) {
    margin: var(--o-spacing-h4) 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    // padding: 0 16px;
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
      h4 {
        margin: 0;
        font-weight: 700;
        color: #ffffff;
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
        color: #ffffff;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
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
            width: 88px;
            font-size: var(--o-font-size-tip);
          }
        }
      }
    }
    .el-card__body {
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
</style>
