<script setup lang="ts">
import { ref, computed } from 'vue';

import { OButton, OIcon, OCollapse, OCollapseItem } from '@opensig/opendesign';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import introData from '~@/data/home/intro';

import IconArrowRight from '~icons/app/icon-chevron-right.svg';

const { locale, isZh } = useLocale();
const { isPhone, leLaptop } = useScreen();

const active = ref(0);

const activeMobile = ref([0]);

const imgSrc = computed(() => {
  return introData[active.value].img[locale.value];
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
  <div class="home-intro">
    <h3>{{ $t('home.introTitle') }}</h3>
    <div data-aos="fade-up" class="intro-container" :level-index="1">
      <div v-if="!isPhone" class="intro-pc">
        <div class="intro-card-pc">
          <div class="intro-content-pc">
            <div class="intro-list-pc">
              <div
                v-for="(item, index) in introData"
                :key="item.title[locale]"
                :class="[
                  'intro-info-pc',
                  active === index ? 'active' : '',
                  locale !== 'zh' ? 'intro-info-pc-en' : '',
                ]"
                @click="handleChangeActive(index)"
              >
                <div class="title">
                  {{ item.title[locale] }}
                </div>
                <div v-if="isZh" class="description">
                  {{ item.description }}
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-intro {
  // PC 端 css
  .intro-pc {
    margin-top: 40px;
    display: block;
    .intro-content-pc {
      display: flex;
    }

    .intro-list-pc {
      position: relative;
      display: flex;
      flex-flow: column;
      padding: 32px;
      margin-right: 32px;
      padding-left: calc(32px + 72px);
      &::before {
        position: absolute;
        top: -52px;
        left: 16px;
        width: 60px;
        height: 490px;
        content: '';
        background-image: url(~@/assets/category/home/intro/left-bg_light.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      @include respond-to('<=pad_v') {
        width: 100%;
        flex-direction: column;
      }
    }

    .intro-img-pc {
      flex: 1;
      padding: 0 0 24px 24px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      background-repeat: no-repeat;
      background-position: center top 24px;
      background-size: 100% 100%;
      background-image: url(~@/assets/category/home/intro/right-bg_light.png);
      border-radius: 8px;
    }

    .intro-info-pc {
      cursor: pointer;
      text-align: left;
      &:not(:last-child) {
        margin-bottom: 72px;
      }
      .title {
        @include h3;
        color: var(--o-color-info1);
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
    .intro-card-mobile {
      overflow: hidden;
    }
    .intro-img-mobile {
      img {
        width: 100%;
      }
    }
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
