<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import portalInfoData from '@/data/migration/migration-portal';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const { lang } = useData();

const portalInfo = computed(() => {
  return portalInfoData[lang.value as 'zh' | 'en'];
});

const handleGo = (path: string) => {
  window.open('/' + lang.value + path, '_blank');
};
</script>

<template>
  <div class="migration-guide">
    <h3>{{ portalInfo.guide.title }}</h3>
    <div class="migration-guide-content">
      <OCard>
        <div class="guide-box">
          <a
            v-for="item in portalInfo.guide.list"
            :key="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="guide-box-item"
          >
            <p>{{ item.label }}</p>
          </a>
        </div>
        <div class="line-box"></div>
        <div class="btn-box">
          <OButton
            animation
            type="text"
            class="btn-box-item"
            @click="handleGo(portalInfo.guide.btn.link)"
          >
            <template #suffixIcon>
              <IconArrowRight class="btn-box-item-icon"></IconArrowRight>
            </template>
            {{ portalInfo.guide.btn.text }}
          </OButton>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--e-spacing-h5) var(--e-spacing-h6);
  }
}
.migration-guide {
  margin-top: var(--e-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h2);
  }
  h3 {
    font-size: var(--e-font-size-h3);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: 0;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      margin: 0;
    }
  }
  p {
    font-size: var(--e-font-size-h7);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h8);
    width: 100%;
    text-align: center;
    margin-top: var(--e-spacing-h5);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h8);
    }
  }
  &-content {
    margin-top: var(--e-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
    .guide-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-top: -8px;
      }
      &-item {
        background: var(--e-color-bg1);
        padding: 16px 18px;
        text-align: left;
        width: 32%;
        border: 1px solid rgba(0, 0, 0, 0);
        @media screen and (max-width: 768px) {
          width: 100%;
          margin-top: 8px;
          padding: 12px 8px;
        }
        p {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h8);
          color: var(--e-color-text1);
          font-weight: 500;
          text-align: left;
          margin: 0 0 4px 0;
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
          }
        }
        span {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          color: var(--e-color-neutral5);
          font-weight: 400;
          text-align: left;
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
      }
      &-item:hover {
        background-color: var(--e-color-bg2);
        border: 1px solid var(--e-color-brand1);
      }
    }
    .line-box {
      margin: 32px 0 24px 0;
      width: 100%;
      height: 1px;
      background: var(--e-color-division1);
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
          font-size: var(--e-font-size-text);
        }
        &-icon {
          color: var(--e-color-brand1);
          width: var(--e-font-size-h8);
          height: var(--e-font-size-h8);
        }
      }
    }
  }
}
</style>
