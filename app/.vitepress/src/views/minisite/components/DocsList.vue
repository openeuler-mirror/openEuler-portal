<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import docBg_mobile from '@/assets/category/minisite/shared/bg-doc_mobile.png';
import stratovirtBg_mobile from '@/assets/category/minisite/stratovirt/stratovirt-grain_mobile.png';

const router = useRouter();
const { lang } = useData();

defineProps({
  dataList: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const goLink = (path: string) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value}` + path);
  }
};
</script>

<template>
  <div>
    <div class="docs-wraper">
      <div class="document">
        <div class="docs-list">
          <OContainer
            v-for="(item, index) in dataList"
            :key="index"
            class="item"
          >
            <div class="item-content">
              <div v-if="item.THEME" class="item-theme">{{ item.THEME }}</div>
              <div v-if="item.DESC" class="item-desc">{{ item.DESC }}</div>
              <div class="item-link">
                <OButton
                  v-for="(i, key) in item.LINK"
                  :key="key"
                  animation
                  type="text"
                  size="small"
                  class="item-link-button"
                  @click="goLink(i.LINK)"
                >
                  {{ i.TEXT }}
                  <template #suffixIcon>
                    <OIcon><IconArrowRight /></OIcon>
                  </template>
                </OButton>
              </div>
            </div>
            <div
              :style="{ backgroundImage: `url(${item.BACKGROUND.IMG})` }"
              :class="
                item.BACKGROUND.TYPE === 2
                  ? 'item-backgroundone'
                  : 'item-backgroundtwo'
              "
            ></div>
            <img v-if="item.IMG" class="item-img" :src="item.IMG" alt="" />
          </OContainer>
        </div>
      </div>
    </div>
    <div class="mobile-docs">
      <div class="docs-wrapper">
        <div v-for="(item, index) in dataList" :key="index" class="docs-item">
          <div class="docs-item-content">
            <div v-if="item.THEME" class="docs-item-theme">
              {{ item.THEME }}
            </div>
            <div v-if="item.DESC" class="docs-item-desc">
              {{ item.DESC }}
            </div>
            <div class="docs-item-link">
              <OButton
                v-for="(i, key) in item.LINK"
                :key="key"
                animation
                type="text"
                size="small"
                class="more-button"
                @click="goLink(i.LINK)"
              >
                {{ i.TEXT }}
                <template #suffixIcon>
                  <OIcon><IconArrowRight /></OIcon>
                </template>
              </OButton>
            </div>
          </div>
          <!-- TODO: -->
          <div
            :style="{
              backgroundImage:
                item.BACKGROUND.TYPE === 2
                  ? `url(${docBg_mobile})`
                  : `url(${stratovirtBg_mobile}`,
            }"
            :class="
              item.BACKGROUND.TYPE === 2
                ? 'docs-item-backgroundone'
                : 'docs-item-backgroundtwo'
            "
          ></div>
          <img v-if="item.IMG" class="docs-item-img" :src="item.IMG" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.docs-wraper {
  padding: 0;
  @media screen and (min-width: 768px) {
    display: block;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  .document {
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding: 0;
    .docs-list {
      .item {
        height: 192px;
        padding: var(--o-spacing-h2) 0 var(--o-spacing-h2) var(--o-spacing-h2);
        font-size: var(--o-font-size-h7);
        color: var(--o-color-text1);
        line-height: var(--o-line-height-h6);
        position: relative;
        overflow: hidden;
        &-content {
          position: absolute;
          z-index: 3;
        }
        &-theme {
          height: var(--o-line-height-h7);
          font-size: var(--o-font-size-h7);
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h7);
          font-weight: 500;
        }
        &-desc {
          margin-top: var(--o-spacing-h10);
          max-width: 256px;
          font-size: var(--o-font-size-text);
          font-weight: 400;
          color: var(--o-color-text4);
          line-height: var(--o-line-height-text);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-link {
          margin-top: var(--o-spacing-h2);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 4px 12px;
          &-button {
            padding: 0 !important;
            svg {
              color: var(--o-color-brand1);
            }
          }
        }
        &-img {
          width: 130px;
          position: absolute;
          right: 30px;
          top: 30px;
          bottom: 30px;
          z-index: 2;
        }
        &-backgroundone {
          position: absolute;
          right: -41px;
          top: -37px;
          width: 301px;
          height: 228px;
          background-size: 100%;
          z-index: 1;
        }
        &-backgroundtwo {
          position: absolute;
          right: 0px;
          top: -37px;
          width: 314px;
          height: 241px;
          background-size: 100%;
          z-index: 1;
        }
        &:hover {
          box-shadow: var(--o-shadow-l2_hover);
        }
      }
    }
    @media screen and (max-width: 767px) {
      .docs-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 24px;
      }
    }
    @media screen and (min-width: 1080px) {
      max-width: 1416px;
      .docs-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      .docs-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
      }
    }
  }
}
.mobile-docs {
  width: 100%;
  background-color: var(--o-color-bg1);
  @media screen and (min-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
  .docs-wrapper {
    .docs-item {
      width: 100%;
      height: 144px;
      margin: var(--o-spacing-h5) 0;
      background-color: var(--o-color-bg2);
      padding: var(--o-spacing-h5) 0 var(--o-spacing-h5) var(--o-spacing-h6);
      position: relative;
      box-shadow: var(--o-shadow-l2);
      &-content {
        position: absolute;
        z-index: 3;
        height: 112px;
      }
      &-theme {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        height: var(--o-line-height-text);
        color: var(--o-color-text1);
        font-weight: 500;
      }
      &-desc {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-top: var(--o-spacing-h8);
        max-width: 190px;
        color: var(--o-color-text4);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &-link {
        position: absolute;
        bottom: 0;
        width: 250px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .more-button {
          padding: 0 !important;
          margin-right: var(--o-spacing-h5);
          svg {
            color: var(--o-color-brand1);
          }
        }
      }
      &-backgroundone {
        width: 291px;
        height: 180px;
        position: absolute;
        top: 17px;
        right: 0;
        z-index: 1;
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      &-backgroundtwo {
        width: 246px;
        height: 152px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      &-img {
        position: absolute;
        right: 12px;
        top: 22px;
        bottom: 22px;
        z-index: 2;
        width: 100px;
        height: 100px;
      }
    }
    .docs-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
