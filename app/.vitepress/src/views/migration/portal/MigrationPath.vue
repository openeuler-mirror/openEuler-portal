<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import { useCommon } from '@/stores/common';

import migrationContent from '#content/migration';

const commonStore = useCommon();

const { lang } = useData();

const portalInfo = computed(() => {
  return migrationContent[lang.value as 'zh' | 'en'];
});

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
</script>
<template>
  <div class="migration-path">
    <h3>{{ portalInfo.path.title }}</h3>
    <div class="migration-path-content">
      <OCard>
        <div class="content-pc">
          <img :src="portalInfo.path.img_light" :alt="portalInfo.path.title" />
        </div>
        <div class="content-mobile">
          <div class="content-mobile-item">
            <p>{{ portalInfo.path.img_mo.top.title }}</p>
            <div
              class="item-description"
              :style="{
                color: isDark ? 'var(--e-color-white)' : '',
              }"
            >
              {{ portalInfo.path.img_mo.top.description }}
            </div>
            <img :src="portalInfo.path.img_mo.top.img" alt="" />
          </div>
          <div class="content-mobile-item" :style="{ 'margin-top': '24px' }">
            <p>{{ portalInfo.path.img_mo.bottom.title }}</p>
            <div
              class="item-description"
              :style="{
                color: isDark ? 'var(--e-color-white)' : '',
              }"
            >
              {{ portalInfo.path.img_mo.bottom.description }}
            </div>
            <img :src="portalInfo.path.img_mo.bottom.img" alt="" />
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
.migration-path {
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
    text-align: center;
    margin-top: var(--e-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
    .content-pc {
      @media screen and (max-width: 768px) {
        display: none;
      }
      img {
        padding: 12px;
        background-color: rgb(236, 236, 236);
        max-width: 974px;
        @media screen and (max-width: 1410px) {
          max-width: 674px;
        }
        @media screen and (max-width: 1110px) {
          max-width: 774px;
        }
      }
    }
    .content-mobile {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
        margin: 0;
      }
      &-item {
        p {
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            // color: var(--e-color-text1);
            font-weight: 400;
            margin: 0;
          }
        }
        .item-description {
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            color: var(--e-color-neutral5);
            font-weight: 400;
            margin-top: 4px;
          }
        }
        img {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
