<script lang="ts" setup>
import { computed } from 'vue';

import MiniTitle from './MiniTitle.vue';
import FrameList from './FrameList.vue';
import { useCommon } from '@/stores/common';
defineProps({
  frameObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
  layout: {
    type: String,
    default: '',
  },
});
const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="framework-box">
    <MiniTitle
      :inside-title="frameObj.TITLE_INSIDE"
      :outside-title="frameObj.TITLE_OUTSIDE"
      :special-component="!!frameObj.TAB"
    />
    <!-- 上下布局 -->
    <div v-if="layout === 'upAndDown'" class="framework-up-down">
      <!-- PC 端 -->
      <div class="pc">
        <!-- 有选项卡 -->
        <template v-if="frameObj.TAB">
          <OTabs>
            <OTabPane
              v-for="item in frameObj.TAB"
              :key="item.VALUE"
              :label="item.VALUE"
            >
              <FrameList
                :desc-list="frameObj[item.KEY].DESC_LIST"
                :framework-img="frameObj[item.KEY].FRAMEWORK_IMG"
                :framework-dark-img="frameObj[item.KEY].FRAMEWORK_IMG_DARK"
                :framework-title="frameObj[item.KEY].FRAMEWORK_TITLE"
                :dark-img="isDark"
                :frame-type="item.VALUE"
              />
            </OTabPane>
          </OTabs>
        </template>
        <!-- 无选项卡 -->
        <template v-else>
          <FrameList
            :desc-list="frameObj.DESC_LIST"
            :framework-img="frameObj.FRAMEWORK_IMG"
            :framework-dark-img="frameObj.FRAMEWORK_IMG_DARK"
            :framework-title="frameObj.FRAMEWORK_TITLE"
            :dark-img="isDark"
          />
        </template>
      </div>
      <!-- 移动端 -->
      <div class="mobile">
        <!-- 有选项卡只渲染第一项 -->
        <template v-if="frameObj.TAB">
          <FrameList
            :desc-list="frameObj[frameObj.TAB[0].KEY].DESC_LIST"
            :framework-img="frameObj[frameObj.TAB[0].KEY].FRAMEWORK_IMG"
            :framework-dark-img="
              frameObj[frameObj.TAB[0].KEY].FRAMEWORK_IMG_DARK
            "
            :framework-title="frameObj[frameObj.TAB[0].KEY].FRAMEWORK_TITLE"
            :dark-img="isDark"
          />
        </template>
        <!-- 无选项卡 -->
        <template v-else>
          <FrameList
            :desc-list="frameObj.DESC_LIST"
            :framework-img="frameObj.FRAMEWORK_IMG"
            :framework-dark-img="frameObj.FRAMEWORK_IMG_DARK"
            :framework-title="frameObj.FRAMEWORK_TITLE"
            :dark-img="isDark"
          />
        </template>
      </div>
    </div>
    <!-- 左右布局 -->
    <div v-if="layout === 'leftAndRight'" class="framework-left-right">
      <div class="info">
        <div class="info-desc-wrapper">
          <div class="desc">
            <p class="desc-title">{{ frameObj.DESC_LIST[0] }}</p>
            <div v-for="(item, index) in frameObj.DESC_LIST" :key="index">
              <p v-if="index > 0" class="desc-item">
                {{ `${index}、` }}{{ item }}
              </p>
            </div>
            <div
              class="desc-background"
              :style="{ backgroundImage: `url(${frameObj.DESC_BACKGROUND})` }"
            ></div>
          </div>
        </div>
        <div class="framework-img">
          <img v-if="isDark" :src="frameObj.FRAMEWORK_IMG_DARK" alt="" />
          <img v-else :src="frameObj.FRAMEWORK_IMG" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.framework-box {
  width: 100%;
  .framework-up-down {
    margin: 0 auto;
    max-width: 1416px;
    position: relative;
    .pc {
      @media screen and (min-width: 768px) {
        display: block;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .mobile {
      @media screen and (min-width: 768px) {
        display: none;
      }
      @media screen and (max-width: 768px) {
        display: block;
      }
    }
    :deep(.el-tabs) {
      .el-tabs__header {
        margin-bottom: var(--o-spacing-h4);
      }
      .el-tabs__nav {
        .el-tabs__active-bar {
          background-color: var(--o-color-brand1);
        }
        .is-active {
          color: var(--o-color-brand1);
        }
      }
      .el-tabs__content {
        box-shadow: var(--o-shadow-l1);
      }
    }
  }
  .framework-left-right {
    width: 100%;
    margin: 0 auto;
    .info {
      display: flex;
      justify-content: space-around;
      &__desc__wrapper {
        flex: 1;
      }
      .desc {
        background-color: var(--o-color-bg2);
        margin: 0 var(--o-spacing-h6) 0 0;
        padding: var(--o-spacing-h2) var(--o-spacing-h2) 0 var(--o-spacing-h2);
        position: relative;
        height: 100%;
        box-shadow: var(--o-shadow-l1);
        &-item {
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          margin-bottom: var(--o-spacing-h4);
        }
        &-title {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h5);
          padding-bottom: var(--o-spacing-h4);
        }
        &-background {
          background-size: 100%;
          position: absolute;
          right: -1px;
          bottom: 0;
          z-index: 11;
          width: 456px;
          height: 282px;
        }
      }
      .framework-img {
        flex: 1;
        background-color: var(--o-color-bg2);
        margin-left: var(--o-spacing-h6);
        box-shadow: var(--o-shadow-l1);
        img {
          margin: 0 auto;
          display: block;
          margin: 12px 88px 12px 156px;
        }
      }
    }
    @media screen and (min-width: 1440px) {
      max-width: 1416px;
      .info {
        .framework-img {
          img {
            width: 452px;
          }
        }
      }
    }
    @media screen and (min-width: 1080px) and (max-width: 1439px) {
      .info {
        .framework-img {
          img {
            width: 350px;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      .info {
        .desc {
          padding: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
          &-title {
            font-size: var(--o-font-size-text);
            font-weight: 500px;
            color: var(--o-color-text1);
            line-height: var(--o-line-height-h8);
            padding-bottom: var(--o-spacing-h6);
          }
          &-item {
            color: var(--o-color-text1);
            line-height: var(--o-line-height-tip);
            font-size: var(--o-font-size-tip);
            padding: var(--o-spacing-h8) 0;
          }
        }
        .framework-img {
          img {
            width: 250px;
          }
        }
      }
    }
    @media screen and (max-width: 767px) {
      width: 100%;
      .info {
        display: block;
        padding: 0;
        .desc {
          width: 100%;
          margin: 0;
          padding: var(--o-spacing-h5);
          padding-bottom: var(--o-spacing-h2);
          &-title {
            padding-bottom: 0;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            font-weight: 500;
            margin-bottom: var(--o-spacing-h5);
          }
          &-item {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            margin: var(--o-spacing-h8) 0 0 0;
          }
          &-background {
            width: 202px;
            height: 165px;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: bottom;
          }
        }
        .framework-img {
          padding: var(--o-spacing-h5);
          margin-top: var(--o-spacing-h5);
          margin-left: 0;
          width: 100%;
          background-color: var(--o-color-bg2);
          img {
            margin: 0 auto;
            display: block;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
