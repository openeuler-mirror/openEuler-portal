<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { ElMessage } from 'element-plus';

import { useCommon } from '@/stores/common';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/banner/banner-interaction.png';
import illustration from '@/assets/illustrations/live.png';
import cardBg_light from '@/assets/category/live/card-bg_light.png';
import cardBg_light_mo from '@/assets/category/live/card-bg_light_mobile.png';
import cardBg_dark from '@/assets/category/live/card-bg_dark.png';
import cardBg_dark_mo from '@/assets/category/live/card-bg_dark_mobile.png';
import cardBg_light_mo_extension from '@/assets/category/live/bg-extension_light.png';
import cardBg_dark_mo_extension from '@/assets/category/live/bg-extension_dark.png';

import IconRight from '~icons/app/icon-arrow-right.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconTime from '~icons/app/icon-time.svg';

const i18n = useI18n();
const data = computed(() => i18n.value.live.LIVE_LIST);
const commonStore = useCommon();

const currentPage = ref(1);
const pageSize4 = ref(6);
const total = ref(data.value.length);

const changePage = (val: number, pagesize: number) => {
  const curVal = (val - 1) * pagesize;
  showLiveList.value = data.value.slice(curVal, curVal + pagesize);
};

// 移动端翻页
const jumpPage = (val: number) => {
  const curVal = (val - 1) * pageSize4.value;
  showLiveList.value = data.value.slice(curVal, curVal + pageSize4.value);
};

const showLiveList = ref(data.value.slice(0, 6));
const jumpTo = (url: string) => {
  url === ''
    ? ElMessage({
        message: i18n.value.live.LINKTIPS,
      })
    : window.open(url);
};

const headGround = computed(() =>
  commonStore.theme === 'dark' ? cardBg_dark : cardBg_light
);

// css变量 v-bind
const liveStyleMo = ref({
  light: `url(${cardBg_light_mo})`,
  dark: `url(${cardBg_dark_mo})`,
  lightExtension: `url(${cardBg_light_mo_extension})`,
  darkExtension: `url(${cardBg_dark_mo_extension})`,
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONNECT"
    :title="i18n.live.LIVETITLE"
    :illustration="illustration"
  />
  <AppContent>
    <div class="live">
      <div class="live-top-title">{{ i18n.live.REPLAYER }}</div>
      <div class="live-list">
        <OCard
          v-for="live in showLiveList"
          :key="live.PHOTOPATH"
          class="live-list-item"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="live-detail">
            <div
              class="live-background"
              :class="commonStore.theme"
              :style="{ backgroundImage: `url(${headGround})` }"
            >
              <img :src="live.PHOTOPATH" class="live-background-img" />
            </div>
            <div class="live-detail-right">
              <div>
                <h5 class="live-detail-title">
                  {{ live.LIVETITLE }}
                </h5>
                <div class="live-desc">
                  <span>
                    <OIcon class="smail-icon">
                      <IconUser />
                    </OIcon>
                    <span class="live-desc-text">
                      {{ live.LIVETEACHER.trim() }}
                    </span>
                  </span>
                  <span>
                    <OIcon class="smail-icon">
                      <IconTime />
                    </OIcon>
                    <span class="live-desc-text">{{
                      live.LIVETIME.trim()
                    }}</span>
                  </span>
                </div>
              </div>
              <p>
                <OButton
                  animation
                  size="mini"
                  class="live-button"
                  :style="{
                    color:
                      commonStore.theme === 'dark'
                        ? 'var(--o-color-white)'
                        : '',
                  }"
                  @click="jumpTo(live.FORMERLYLINK)"
                  >{{ i18n.live.REPLAYVIEW }}
                  <template #suffixIcon>
                    <OIcon class="live-button-icon"><IconRight /></OIcon>
                  </template>
                </OButton>
              </p>
            </div>
          </div>
        </OCard>
      </div>
      <div class="live-pagination">
        <div class="live-pagination-pc">
          <ClientOnly>
            <OPagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize4"
              :page-sizes="[6, 12, 18, 24]"
              :background="true"
              :hide-on-single-page="true"
              layout="sizes, prev, pager, next, slot, jumper"
              :total="total"
              @current-change="changePage(currentPage, pageSize4)"
              @size-change="changePage(currentPage, pageSize4)"
              @jump-page="jumpPage"
            >
              <span class="pagination-slot">{{
                currentPage * pageSize4 + '/' + total
              }}</span>
            </OPagination>
          </ClientOnly>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.live {
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  .live-top-title {
    width: 100%;
    margin: 0 auto;
    font-weight: 300;
    font-size: var(--o-font-size-h3);
    text-align: center;
    color: var(--o-color-text1);
    @media screen and (max-width: 767px) {
      font-size: var(--o-font-size-h8);
    }
  }
  .live-list {
    display: grid;
    max-width: 1504px;
    margin: var(--o-spacing-h2) auto;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 1504px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 1080px) {
      grid-template-columns: repeat(1, 1fr);
    }
    @media screen and (max-width: 767px) {
      margin: var(--o-spacing-h5) auto;
    }
    .live-list-item {
      width: 100%;
      flex: 1;
      padding: 0;
      max-height: 260px;
    }
  }
  .live-detail {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 0;
    height: 260px;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      height: 230px;
    }
    .live-background {
      @media screen and (max-width: 767px) {
        background: v-bind('liveStyleMo.light') left/contain no-repeat,
          v-bind('liveStyleMo.lightExtension') left no-repeat !important;
      }

      &.dark {
        @media screen and (max-width: 767px) {
          background: v-bind('liveStyleMo.dark') left/contain no-repeat,
            v-bind('liveStyleMo.darkExtension') left no-repeat !important;
        }
      }
    }
    .live-detail-right {
      padding: var(--o-spacing-h4);
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media screen and (max-width: 767px) {
        max-height: 132px;
        width: 100%;
        padding: 16px var(--o-spacing-h6);
      }
    }
    .live-detail-title {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: var(--o-font-size-h5);
      text-align: left;
      font-weight: 500;
      color: var(--o-color-text1);
      @media screen and (max-width: 767px) {
        font-size: var(--o-font-size-text);
        color: var(--o-color-text1);
      }
    }
  }
  .live-background {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 262px;
    height: 260px;
    @media screen and (max-width: 767px) {
      justify-content: flex-start;
      width: 100%;
      height: 98px;
      background-repeat: no-repeat;
      background-color: var(--o-color-bg4);
    }
    .live-background-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: var(--o-color-bg4);
      @media screen and (max-width: 767px) {
        width: 68px;
        height: 68px;
        margin-left: 74px;
      }
    }
  }
  .live-desc {
    margin-top: var(--o-spacing-h4);
    padding: 0;
    line-height: var(--o-line-height-tip);
    span {
      display: inline;
      font-weight: 400;
    }
    @media screen and (max-width: 767px) {
      margin-top: var(--o-spacing-h5);
    }
    .live-desc-text {
      margin-right: var(--o-spacing-h3);
      line-height: var(--o-line-height-tip);
      font-size: var(--o-font-size-text);
      color: var(--o-color-text1);
      overflow: hidden;
      text-overflow: ellipsis;
      @media screen and (max-width: 767px) {
        font-size: var(--o-font-size-tip);
        margin-right: var(--o-spacing-h5);
      }
    }
  }
  .live-button {
    .live-button-icon {
      color: var(--o-color-brand1);
    }
  }
  .live-pagination {
    width: auto;
    height: auto;
    margin: auto;
    // .live-pagination-pc {
    //   @media screen and (max-width: 767px) {
    //     display: none;
    //   }
    // }
  }
  .smail-icon {
    font-size: var(--o-font-size-h7);
    vertical-align: text-bottom;
    color: var(--o-color-text4);
    margin-right: var(--o-spacing-h8);
    @media screen and (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text4);
    }
  }
  .pagination {
    .pagination-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: var(--o-spacing-h5);
      width: 100%;
      height: 18px;
    }
    .pagination-options {
      display: flex;
      flex-direction: row;
      margin: auto;
      .pagination-options-icon {
        font-size: var(--o-font-size-tip);
        color: var(--o-color-brand1);
      }
      .pagination-options-icon:hover {
        cursor: pointer;
      }
      .pagination-options-text {
        font-size: var(--o-font-size-tip);
        margin-left: var(--o-spacing-h8);
        margin-right: var(--o-spacing-h8);
        color: var(--o-color-text1);
      }
      .pagination-options-text:hover {
        color: var(--o-color-brand1);
        cursor: pointer;
      }
    }
    .pagination-information {
      margin-left: 20px;
      margin-right: 20px;
      font-size: var(--o-font-size-tip);
      color: var(--o-color-text1);
      .pagination-information-current {
        color: var(--o-color-brand1);
        font-size: var(--o-font-size-tip);
      }
    }
  }
}

@media (max-width: 880px) {
  .url-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
