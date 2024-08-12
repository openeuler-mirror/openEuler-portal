<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import portalInfoData from '@/data/migration/migration-portal';

import instructionBG1 from '@/assets/category/migration/portal/portal-instruction-bg-1.png';
import instructionBG2 from '@/assets/category/migration/portal/portal-instruction-bg-2.png';
import instructionBGMo1 from '@/assets/category/migration/portal/portal-instruction-bg-mo-1.png';
import instructionBGMo2 from '@/assets/category/migration/portal/portal-instruction-bg-mo-2.png';
import instructionBGMo3 from '@/assets/category/migration/portal/portal-instruction-bg-mo-3.png';
import instructionBGDark1 from '@/assets/category/migration/portal/portal-instruction-bg-dark-1.png';
import instructionBGDark2 from '@/assets/category/migration/portal/portal-instruction-bg-dark-2.png';
import instructionBGMoDark1 from '@/assets/category/migration/portal/portal-instruction-bg-mo-dark-1.png';
import instructionBGMoDark2 from '@/assets/category/migration/portal/portal-instruction-bg-mo-dark-2.png';
import instructionBGMoDark3 from '@/assets/category/migration/portal/portal-instruction-bg-mo-dark-3.png';

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const { lang } = useData();

const portalInfo = computed(() => {
  return portalInfoData[lang.value as 'zh' | 'en'];
});

const instructionBG = computed(() => {
  return commonStore.theme === 'dark'
    ? {
        url1: `url(${instructionBGDark1})`,
        url2: `url(${instructionBGDark2})`,
        url_mo_1: `url(${instructionBGMoDark1})`,
        url_mo_2: `url(${instructionBGMoDark2})`,
        url_mo_3: `url(${instructionBGMoDark3})`,
      }
    : {
        url1: `url(${instructionBG1})`,
        url2: `url(${instructionBG2})`,
        url_mo_1: `url(${instructionBGMo1})`,
        url_mo_2: `url(${instructionBGMo2})`,
        url_mo_3: `url(${instructionBGMo3})`,
      };
});
</script>
<template>
  <div class="migration-instruction">
    <h3>{{ portalInfo.instruction.title }}</h3>
    <p>{{ portalInfo.instruction.dexcription }}</p>
    <div class="migration-instruction-content">
      <OCard>
        <div class="instruction-box">
          <div
            v-for="(item, index) in portalInfo.instruction.list"
            :key="item"
            :class="
              index === 0
                ? 'instruction-item instruction-item-bg-1'
                : index === 3
                ? 'instruction-item instruction-item-bg-3'
                : 'instruction-item instruction-item-bg-2'
            "
          >
            <div>
              <p>{{ item.title }}</p>
              <div
                class="content-text"
                :style="{
                  color: isDark ? 'var(--e-color-white)' : '',
                }"
              >
                {{ item.content }}
              </div>
            </div>
            <p>{{ item.sogan }}</p>
          </div>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 40px;
  @media screen and (max-width: 768px) {
    padding: 16px 12px;
  }
}
.migration-instruction {
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
    .instruction-box {
      display: flex;
      flex-direction: row;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      .instruction-item-bg-1 {
        background: v-bind('instructionBG.url1') no-repeat;
        background-size: 100% 100%;
        background-position: 0% 0%;
        @media screen and (max-width: 768px) {
          padding: 12px 0 32px 0 !important;
          background: v-bind('instructionBG.url_mo_1') no-repeat;
          background-size: 100% 100%;
          background-position: 0% 0%;
        }
      }
      .instruction-item-bg-2 {
        padding: 24px 0 32px 0;
        background: v-bind('instructionBG.url2') no-repeat;
        background-size: 100% 100%;
        background-position: 0% 0%;
        @media screen and (max-width: 768px) {
          background: v-bind('instructionBG.url_mo_2') no-repeat;
          background-size: 100% 100%;
          background-position: 0% 0%;
          min-height: 200px;
          margin-top: -32px !important;
          padding: 56px 0 32px 0 !important;
        }
      }
      .instruction-item-bg-3 {
        padding: 24px 0 32px 0;
        background: v-bind('instructionBG.url2') no-repeat;
        background-size: 100% 100%;
        background-position: 0% 0%;
        @media screen and (max-width: 768px) {
          background: v-bind('instructionBG.url_mo_3') no-repeat;
          background-size: 100% 100%;
          background-position: 0% 0%;
          min-height: 200px;
          margin-top: -32px !important;
          padding: 60px 0 16px 0 !important;
        }
      }
      .instruction-item {
        padding: 24px 40px;
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media screen and (max-width: 768px) {
          padding: 0;
        }
        .content-text {
          margin: 8px 0 16px 0;
          white-space: pre-line;
          font-size: var(--e-font-size-text);
          line-height: var(--e-font-size-h7);
          font-weight: 400;
          color: var(--e-color-neutral5);
          @media screen and (max-width: 768px) {
            margin: 4px 0;
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }

        p {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-font-size-h6);
          font-weight: 400;
          color: var(--e-color-text1);
          margin: 0;
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
          }
        }
      }
    }
  }
}
</style>
