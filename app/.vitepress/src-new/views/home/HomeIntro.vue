<script setup lang="ts">
import { ref, computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

import { OButton, OIcon, OCollapse, OCollapseItem } from '@opensig/opendesign';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import AppSection from '~@/components/AppSection.vue';

import introData from '~@/data/home/intro';

import IconArrowRight from '~icons/app/icon-chevron-right.svg';

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
    <div data-aos="fade-up" class="intro-container" :level-index="1">
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
              </div>
            </div>
            <div class="intro-img-pc">
              <img :src="imgSrc" alt="openEuler" />
            </div>
          </div>
          <a
            class="intro-button-pc"
            :href="`/${locale}/community/contribution/detail.html`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OButton
              :size="isPhone ? 'medium' : 'large'"
              :style="{
                '--btn-padding': 0,
                '--btn-bg-color-hover': 'transparent',
                '--btn-bg-color-active': 'transparent',
              }"
              variant="text"
            >
              {{ $t('home.introBtn') }}
              <template #suffix>
                <OIcon>
                  <IconArrowRight></IconArrowRight>
                </OIcon>
              </template>
            </OButton>
          </a>
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
            {{ item.title[locale] }}
          </template>
          <div class="intro-img-mobile">
            <img :src="imgSrc" alt="openEuler" />
          </div>
        </OCollapseItem>
      </OCollapse>
      <a
        v-if="lePadV"
        class="intro-button-mo"
        :href="`/${locale}/community/contribution/detail.html`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OButton
          :size="isPhone ? 'medium' : 'large'"
          :style="{
            '--btn-padding': 0,
            '--btn-bg-color-hover': 'transparent',
            '--btn-bg-color-active': 'transparent',
          }"
          variant="text"
        >
          {{ $t('home.introBtn') }}
          <template #suffix>
            <OIcon>
              <IconArrowRight></IconArrowRight>
            </OIcon>
          </template>
        </OButton>
      </a>
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
      padding: 32px;
      .intro-list-item {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 72px;
          @include respond-to('laptop') {
            margin-bottom: 56px;
          }
          @include respond-to('pad_h') {
            margin-bottom: 24px;
          }
          @media screen and (max-width: 1000px) {
            margin-bottom: 16px;
          }
        }
        .intro-list-icon {
          width: 58px;
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
      }
      @include respond-to('<=laptop') {
        padding-right: 0;
      }
      @include respond-to('laptop') {
        padding-left: calc(32px + 54px);
      }
      @include respond-to('pad_h') {
        padding: 16px;
        padding-left: calc(18px + 40px);
        margin-right: 16px;
      }
      @media screen and (max-width: 1000px) {
        padding: 0;
        padding-left: calc(16px + 28px);
        margin-right: 16px;
      }
    }

    .intro-img-pc {
      flex: 1;
      padding: 0 0 24px 24px;
      img {
        width: 100%;
        height: 100%;
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
    .intro-button-pc {
      display: flex;
      margin: auto;
      margin-top: 32px;
      justify-content: center;
      align-items: center;
      width: min-content;
    }
  }
  .intro-mobile {
    margin-top: 12px;
    width: 100%;
    .intro-card-mobile {
      overflow: hidden;
    }
    .intro-img-mobile {
      img {
        width: 100%;
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
