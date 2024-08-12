<script setup lang="ts">
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

import portalInfoData from '@/data/migration/migration-portal';

const { lang } = useData();

const portalInfo = computed(() => {
  return portalInfoData[lang.value as 'zh' | 'en'];
});

const commonStore = useCommon();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
</script>
<template>
  <div class="migration-help">
    <h3>{{ portalInfo.help.title }}</h3>
    <div class="migration-help-content">
      <OCard>
        <div class="help-box">
          <div class="help-box-tips">
            <div
              v-for="item in portalInfo.help.tips"
              :key="item.link"
              class="tips-context"
            >
              <span
                :style="{
                  color: isDark ? 'var(--e-color-white)' : '',
                }"
                >{{ item.textLeft
                }}<a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ item.linkText }}</a
                >{{ item.textRight }}</span
              >
            </div>
          </div>
          <div v-if="portalInfo.help?.officalQR.img" class="help-box-qrs">
            <div class="qrs-item">
              <img :src="portalInfo.help.officalQR.img" />
              <p>{{ portalInfo.help.officalQR.text }}</p>
            </div>
            <div class="qrs-item">
              <img :src="portalInfo.help.assistantQR.img" />
              <p>{{ portalInfo.help.assistantQR.text }}</p>
            </div>
          </div>
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
.migration-help {
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
  &-content {
    margin-top: var(--e-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
    .help-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      &-tips {
        margin: 0 0 -24px 0;
        @media screen and (max-width: 768px) {
          margin: 0 0 -4px 0;
        }
        .tips-context {
          margin: 0 0 24px 0;
          @media screen and (max-width: 768px) {
            text-align: center;
            margin: 0 0 4px 0;
          }
          span {
            word-wrap: break-word;
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
            color: var(--e-color-neutral5);
            font-weight: 400;
            @media screen and (max-width: 768px) {
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
            }
          }
        }
      }
      &-qrs {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 50%;
        @media screen and (max-width: 768px) {
          flex-direction: column;
          margin: auto;
        }
        .qrs-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          @media screen and (max-width: 768px) {
            padding-top: 16px;
            margin: auto;
          }
          img {
            max-width: 150px;
            @media screen and (max-width: 1310px) {
              max-width: 130px;
            }
          }
          p {
            margin: 12px 0 0 0;
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h8);
            color: var(--e-color-text1);
            font-weight: 500;
            text-align: center;
            @media screen and (max-width: 768px) {
              margin: 4px 0 0 0;
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
            }
          }
        }
      }
    }
  }
}
</style>
