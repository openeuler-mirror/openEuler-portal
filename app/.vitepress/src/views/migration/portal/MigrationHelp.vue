<script setup lang="ts">
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

import portalInfo from '@/data/migration/migration-portal';

const { lang } = useData();

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
                  color: isDark ? 'var(--o-color-white)' : '',
                }"
                >{{ item.textLeft
                }}<a
                  :href="'/' + lang + item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ item.linkText }}</a
                >{{ item.textRight }}</span
              >
            </div>
          </div>
          <div class="help-box-qrs">
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
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5) var(--o-spacing-h6);
  }
}
.migration-help {
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
  &-content {
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
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
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
            color: var(--o-color-neutral5);
            font-weight: 400;
            @media screen and (max-width: 768px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
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
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h8);
            color: var(--o-color-text1);
            font-weight: 500px;
            text-align: center;
            @media screen and (max-width: 768px) {
              margin: 4px 0 0 0;
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
            }
          }
        }
      }
    }
  }
}
</style>
