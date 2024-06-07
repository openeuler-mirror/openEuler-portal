<script setup lang="ts">
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

import portalInfoData from '@/data/migration/migration-portal';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const commonStore = useCommon();

const { lang } = useData();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const portalInfo = computed(() => {
  return portalInfoData[lang.value as 'zh' | 'en'];
});

const handleGo = (path: string) => {
  window.open('/' + lang.value + path, '_blank');
};
</script>

<template>
  <div class="migration-case">
    <h3>{{ portalInfo.case.title }}</h3>
    <div class="migration-case-content">
      <OCard>
        <div class="case-box">
          <a
            v-for="item in portalInfo.case.list"
            :key="item.name"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="case-box-item"
          >
            <p>{{ item.name }}</p>
            <span
              :style="{
                color: isDark ? 'var(--o-color-white)' : '',
              }"
              >{{ item.dexcription }}</span
            >
          </a>
        </div>
        <div class="line-box"></div>
        <div class="btn-box">
          <OButton
            animation
            type="text"
            class="btn-box-item"
            @click="handleGo(portalInfo.case.btn.link)"
          >
            <template #suffixIcon>
              <IconArrowRight class="btn-box-item-icon"></IconArrowRight>
            </template>
            {{ portalInfo.case.btn.text }}
          </OButton>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5) var(--o-spacing-h6);
  }
}
.migration-case {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: 0;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin: 0;
    }
  }
  p {
    font-size: var(--o-font-size-h7);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h8);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h5);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h8);
    }
  }
  &-content {
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    .case-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-top: -8px;
      }
      &-item {
        background: var(--o-color-bg1);
        padding: 16px 24px;
        text-align: left;
        width: 49%;
        border: 1px solid rgba(0, 0, 0, 0);
        @media screen and (max-width: 768px) {
          width: 100%;
          margin-top: 8px;
          padding: 12px 8px;
        }
        p {
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h8);
          color: var(--o-color-text1);
          font-weight: 500;
          text-align: left;
          margin: 0 0 4px 0;
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        span {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-neutral5);
          font-weight: 400;
          text-align: left;
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }
      &-item:hover {
        background-color: var(--o-color-bg2);
        border: 1px solid var(--o-color-brand1);
      }
    }
    .line-box {
      margin: 32px 0 24px 0;
      width: 100%;
      height: 1px;
      background: var(--o-color-division1);
      @media screen and (max-width: 768px) {
        margin: 16px 0;
      }
    }
    .btn-box {
      text-align: center;
      display: flex;
      justify-content: center;
      &-item {
        margin: auto;
        display: flex;
        padding: 0;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 1080px) {
          padding: 0;
          font-size: var(--o-font-size-text);
        }
        &-icon {
          color: var(--o-color-brand1);
          width: var(--o-font-size-h8);
          height: var(--o-font-size-h8);
        }
      }
    }
  }
}
</style>
