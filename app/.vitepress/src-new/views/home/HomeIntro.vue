<script setup lang="ts">
import { ref, computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

import { OButton, OIcon, OCollapse, OCollapseItem } from '@opensig/opendesign';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import AppSection from '~@/components/AppSection.vue';

import introData from '~@/data/home/intro';

import line from '~@/assets/category/home/intro/line.png';
import circle from '~@/assets/category/home/intro/circle.png';
import lineDark from '~@/assets/category/home/intro/line_dark.png';
import circleDark from '~@/assets/category/home/intro/circle_dark.png';

const { locale, isZh } = useLocale();
const { isPhone, lePadV } = useScreen();
const { theme } = storeToRefs(useCommon());

const active = ref(0);

const activeMobile = ref([0]);

const imgSrc = computed(() => {
  return lePadV.value
    ? introData[active.value].img[locale.value].mo
    : introData[active.value].img[locale.value].pc;
});

const handleChangeActive = (index: number) => {
  active.value = index;
  activeMobile.value = [index];
};

const handleChangeActiveMobile = (activeValues: number[]) => {
  if (activeValues?.length) {
    active.value = Number(activeValues[0]);
  }
};
</script>

<template>
  <AppSection
    :title="$t('home.introTitle')"
    class="home-intro"
    :footer="$t('home.getOpenEuler')"
    :footer-href="`/${locale}/download/#get-openeuler`"
  >
    <div class="intro-container" :level-index="1">
      <div v-if="!lePadV" class="intro-pc">
        <div class="intro-card-pc">
          <div class="intro-content-pc">
            <div
              class="intro-list-pc"
              :class="[locale !== 'zh' ? 'intro-list-pc-en' : '']"
            >
              <div
                v-for="(item, index) in introData"
                :key="item.title[locale]"
                class="intro-list-item"
              >
                <div class="intro-list-icon">
                  <img :src="item.icon[theme]" alt="" />
                  <img
                    class="circle"
                    :src="theme === 'light' ? circle : circleDark"
                  />
                </div>
                <div
                  :class="[
                    'intro-info-pc',
                    active === index ? 'active' : '',
                    locale !== 'zh' ? 'intro-info-pc-en' : '',
                  ]"
                  @click="handleChangeActive(index)"
                >
                  <div class="title" :class="{ 'en-title': !isZh }">
                    {{ item.title[locale] }}
                  </div>
                  <div v-if="isZh" class="description">
                    {{ item.description }}
                  </div>
                </div>
                <img
                  class="line"
                  :src="theme === 'light' ? line : lineDark"
                  alt=""
                />
              </div>
            </div>
            <div class="intro-img-pc">
              <img :src="imgSrc" alt="openEuler" />
            </div>
          </div>
        </div>
      </div>

      <OCollapse
        v-else
        v-model="activeMobile"
        class="intro-mobile"
        accordion
        :style="{ '--collapse-radius': '4px' }"
        @change="handleChangeActiveMobile"
      >
        <OCollapseItem
          v-for="(item, index) in introData"
          :key="item.title[locale]"
          :value="index"
          class="intro-card-mobile"
        >
          <template #title>
            <img :src="item.icon[theme]" alt="" /> {{ item.title[locale] }}
          </template>
          <div class="intro-img-mobile">
            <img :src="imgSrc" alt="openEuler" />
          </div>
        </OCollapseItem>
      </OCollapse>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-intro {
  .intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  // PC 端 css
  .intro-pc {
    display: block;
    .intro-content-pc {
      display: flex;
    }

    .intro-list-pc {
      position: relative;
      display: flex;
      flex-flow: column;
      margin: 32px 32px 32px 18px;
      .intro-list-item {
        display: flex;
        align-items: center;
        // 左侧icon宽度
        --intro-gap: 72px;
        @include respond-to('laptop') {
          --intro-gap: 56px;
        }
        @media screen and (max-width: 1200px) {
          --intro-gap: 40px;
        }
        @media screen and (max-width: 1100px) {
          --intro-gap: 24px;
        }
        @media screen and (max-width: 1000px) {
          --intro-gap: 16px;
        }
        &:last-child {
          .circle {
            display: none;
          }
        }
        &:not(:last-child) {
          margin-bottom: var(--intro-gap);
        }
        // 左侧icon宽度
        --icon-width: 58px;
        @include respond-to('laptop') {
          --icon-width: 52px;
        }
        @include respond-to('pad_h') {
          --icon-width: 50px;
        }
        @media screen and (max-width: 1100px) {
          --icon-width: 36px;
        }
        @media screen and (max-width: 1000px) {
          --icon-width: 28px;
        }
        .intro-list-icon {
          position: relative;
          width: var(--icon-width);

          .circle {
            position: absolute;
            width: 16px;
            bottom: calc(var(--intro-gap) / 2 * -1);
            left: 50%;
            transform: translate(-50%, 50%);
            @media screen and (max-width: 1100px) {
              bottom: -20px;
            }
            @media screen and (max-width: 1000px) {
              bottom: -18px;
            }
          }
          img {
            width: 100%;
          }
        }
        .line {
          position: absolute;
          left: 29px;
          width: 1px;
          z-index: -1;
          left: calc(var(--icon-width) / 2);
        }
      }
      @include respond-to('pad_h') {
        margin: 24px 24px 24px 18px;
      }
      @media screen and (max-width: 1000px) {
        padding: 0;
        margin: 0 16px 0 0;
      }
    }
    .intro-list-pc-en {
      .intro-list-item {
        @media screen and (max-width: 1200px) {
          --intro-gap: 40px;
        }
      }
    }

    .intro-img-pc {
      flex: 1;
      height: min-content;
      padding: 0 0 24px 24px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--o-radius-s);
      }
      background-repeat: no-repeat;
      background-position: center top 24px;
      background-size: 100% 100%;
      background-image: url(~@/assets/category/home/intro/right-bg_light.png);
      border-radius: 8px;
      @include respond-to('pad_h') {
        padding: 0 0 16px 16px;
        background-position: center top 16px;
      }
      @media screen and (max-width: 1000px) {
        padding: 0 0 14px 14px;
        background-position: center top 14px;
      }
    }

    .intro-info-pc {
      cursor: pointer;
      text-align: left;
      margin-left: 24px;

      .title {
        @include h3;
        font-weight: 500;
        color: var(--o-color-info1);
      }
      @media screen and (max-width: 1200px) {
        .intro-list-item {
          margin-bottom: 40px;
        }
      }
      .en-title {
        display: flex;
        align-items: center;
        height: var(--icon-width);
      }
      .description {
        margin-top: 4px;
        @include text1;
        color: var(--o-color-info2);
      }
      @include hover {
        .title {
          color: var(--o-color-primary1);
        }
      }
      @include respond-to('<=laptop') {
        margin-top: 0;
      }
    }
    .active {
      .title {
        color: var(--o-color-primary1);
      }
    }
    .intro-info-pc-en {
      width: 266px;
    }
  }
  .intro-mobile {
    margin-top: 12px;
    width: 100%;
    .intro-card-mobile {
      overflow: hidden;
    }
    :deep(.o-collapse-item-title) {
      display: flex;
      align-items: center;
      img {
        margin-right: 12px;
        width: 30px;
      }
    }
    :deep(.o-collapse-item-body) {
      margin-bottom: 0;
    }
    .intro-img-mobile {
      margin-bottom: var(--collapse-item-gap);
      img {
        width: 100%;
        border-radius: var(--o-radius-xs);
      }
    }
  }
  .intro-button-mo {
    margin: 12px auto 0;
  }
}

[data-o-theme='dark'] {
  .intro-pc {
    .intro-list-pc {
      &::before {
        background-image: url(~@/assets/category/home/intro/left-bg_dark.png);
      }
    }
  }
}
</style>
