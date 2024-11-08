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
  <AppSection :title="$t('home.introTitle')" class="home-intro">
    <div class="intro-container" :level-index="1">
      <div v-if="!lePadV" class="intro-pc">
        <div class="intro-card-pc">
          <div class="intro-content-pc">
            <div class="intro-list-pc">
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
      align-items: center;
    }

    .intro-list-pc {
      position: relative;
      display: flex;
      flex-flow: column;
      margin: 32px 32px 32px 18px;
      .intro-list-item {
        display: flex;
        align-items: center;
        &:last-child {
          .circle {
            display: none;
          }
        }
        &:not(:last-child) {
          margin-bottom: 72px;
          @include respond-to('laptop') {
            margin-bottom: 56px;
          }
          @media screen and (max-width: 1000px) {
            margin-bottom: 16px;
          }
        }
        .intro-list-icon {
          position: relative;
          width: 58px;
          .circle {
            position: absolute;
            width: 16px;
            bottom: -36px;
            left: 50%;
            transform: translate(-50%, 50%);
            @include respond-to('laptop') {
              bottom: -28px;
            }
            @media screen and (max-width: 1000px) {
              bottom: -18px;
            }
          }
          @include respond-to('laptop') {
            width: 52px;
          }
          @include respond-to('pad_h') {
            width: 50px;
          }
          @media screen and (max-width: 1000px) {
            width: 28px;
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
          @include respond-to('laptop') {
            left: 26px;
          }
          @include respond-to('pad_h') {
            left: 25px;
          }
          @media screen and (max-width: 1000px) {
            left: 14px;
          }
        }
      }
      @include respond-to('<=laptop') {
      }
      @include respond-to('laptop') {
      }
      @include respond-to('pad_h') {
        margin-right: 16px;
      }
      @media screen and (max-width: 1000px) {
        padding: 0;
        margin-right: 16px;
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
      .en-title {
        display: flex;
        align-items: center;
        height: 58px;
        @include respond-to('laptop') {
          height: 52px;
        }
        @include respond-to('pad_h') {
          height: 50px;
        }
        @media screen and (max-width: 1000px) {
          height: 28px;
        }
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
    .intro-img-mobile {
      img {
        width: 100%;
        border-radius: var(--o-radius-s);
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
