<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  ORow,
  OCol,
  OIcon,
  ODivider,
  OCarousel,
  OCarouselItem,
  OFigure,
  ODialog,
  OTab,
  OTabPane,
  OTag,
} from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

import IconDeveloper from '~icons/intelligence/icon-developer.svg';
import IconEnterprise from '~icons/intelligence/icon-enterprise.svg';
import iconBuildTab from '~icons/intelligence/icon-build-tab.svg';
import iconInvokeTab from '~icons/intelligence/icon-invoke-tab.svg';
import IconInvokeTuning from '~icons/intelligence/icon-invoke-tuning.svg';
import iconInvokeoperations from '~icons/intelligence/icon-invoke-operations.svg';
import iconInvokeAnswer from '~icons/intelligence/icon-invoke-answer.svg';

import IconQuestionAnswer from '~icons/intelligence/icon-question-answer.svg';
import IconWorkflowApplication from '~icons/intelligence/icon-workflow-application.svg';
import IconIntelligenceApplication from '~icons/intelligence/icon-intelligence-application.svg';

import questionAnswerZh from '~@/assets/category/intelligence/question-answer-zh.png';
import workflowApplicationZh from '~@/assets/category/intelligence/workflow-application-zh.png';
import intelligenceApplicationZh from '~@/assets/category/intelligence/intelligence-application-zh.png';

import questionAnswerEn from '~@/assets/category/intelligence/question-answer-en.png';
import workflowApplicationEn from '~@/assets/category/intelligence/workflow-application-en.png';
import intelligenceApplicationEn from '~@/assets/category/intelligence/intelligence-application-en.png';

import tuningWebZh from '~@/assets/category/intelligence/invoke/tuning-web-zh.jpg';
import tuningWebEn from '~@/assets/category/intelligence/invoke/tuning-web-en.jpg';
import tuningShellZh from '~@/assets/category/intelligence/invoke/tuning-shell-zh.jpg';

import operationsWebZh from '~@/assets/category/intelligence/invoke/operations-web-zh.jpg';
import operationsWebEn from '~@/assets/category/intelligence/invoke/operations-web-en.jpg';
import operationsShellZh from '~@/assets/category/intelligence/invoke/operations-shell-zh.jpg';

import answerWebZh from '~@/assets/category/intelligence/invoke/answer-web-zh.jpg';
import answerWebEn from '~@/assets/category/intelligence/invoke/answer-web-en.jpg';
import answerShwllZh from '~@/assets/category/intelligence/invoke/answer-shell-zh.jpg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();

const { t, locale } = useLocale();
const { lePadV, lePad, isPhone } = useScreen();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const introList = [
  {
    id: 'developer',
    icon: IconDeveloper,
    title: t('intelligence.developer'),
    description: t('intelligence.developerDesc'),
  },
  {
    id: 'enterprise',
    icon: IconEnterprise,
    title: t('intelligence.enterprise'),
    description: t('intelligence.enterpriseDesc'),
  },
];

// -------------------- 切换tab --------------------
const introCarousel = [
  {
    id: 'auestion-answer',
    icon: IconQuestionAnswer,
    title: t('intelligence.answer'),
    description: [t('intelligence.answerDesc1'), t('intelligence.answerDesc2')],
    img: {
      zh: questionAnswerZh,
      en: questionAnswerEn,
    },
  },
  {
    id: 'workflow-application',
    icon: IconWorkflowApplication,
    title: t('intelligence.workflow'),
    description: [t('intelligence.workflowDesc')],
    img: {
      zh: workflowApplicationZh,
      en: workflowApplicationEn,
    },
  },
  {
    id: 'intelligence-application',
    icon: IconIntelligenceApplication,
    title: t('intelligence.intelligence'),
    description: [t('intelligence.intelligenceDesc')],
    img: {
      zh: intelligenceApplicationZh,
      en: intelligenceApplicationEn,
    },
  },
];
const introCarouselMb = [...introCarousel, ...introCarousel];

const invokeList = [
{
    id: 'invoke-tuning',
    icon: IconInvokeTuning,
    title: t('intelligence.tuning'),
    description: t('intelligence.tuningDesc'),
    shell: {
      zh: tuningShellZh,
      en: tuningShellZh,
    },
    web: {
      zh: tuningWebZh,
      en: tuningWebEn,
    },
  },
  {
    id: 'invoke-operations',
    icon: iconInvokeoperations,
    title: t('intelligence.operations'),
    description: t('intelligence.operationsDesc'),
    shell: {
      zh: operationsShellZh,
      en: operationsShellZh,
    },
    web: {
      zh: operationsWebZh,
      en: operationsWebEn,
    },
  },
  {
    id: 'intelligence-invokeAnswer',
    icon: iconInvokeAnswer,
    title: t('intelligence.invokeAnswer'),
    description: t('intelligence.invokeAnswerDesc'),
    shell: {
      zh: answerShwllZh,
      en: answerShwllZh,
    },
    web: {
      zh: answerWebZh,
      en: answerWebEn,
    },
  },
]
const invokeListMb = [...invokeList, ...invokeList];

const activeTab = ref(0);

const introCurrentIndex = ref(0);
const buildApplyImg = computed(() => introCarousel[introCurrentIndex.value].img);
const introClick = (val: number) => {
  introCurrentIndex.value = val;
}

const invokeCurrentIndex = ref(0);
const invokeClick = (val: number) => {
  invokeCurrentIndex.value = val;
}

const isChecked = ref(false);
const switchTab = (val: boolean) => {
  isChecked.value = val;
};

const invokeApplyImg = computed(() => {
  return isChecked.value ? invokeList[invokeCurrentIndex.value].web : invokeList[invokeCurrentIndex.value].shell;
});

const scaleVisible = ref(false);
const img = ref();
const imgScale = (val: any) => {
  img.value = val;
  scaleVisible.value = true;
};

const currentIndexImg = ref([0, 0, 0, 0, 0, 0]);
const carouselHeight = ref(0);

const heightImg = computed(() => {
  if (isPhone.value) {
    return '165px';
  }
  return '250px';
});
const changeTabMb = (val: number) => {
  if (val === 1) {
    setTimeout(() => {
      const carousel = document.querySelector(
        '.o-carousel .carousel-item-invoke'
      ) as HTMLElement;
      carouselHeight.value = carousel?.offsetHeight;
    }, 500);
  }
};
</script>
<template>
  <AppSection
    :title="t('intelligence.synopsis')"
  >
    <div class="introduction" :class="{ 'introduction-dark': isDark }">
      <p class="desc">{{ t('intelligence.introductionDesc') }}</p>
      <ORow v-if="!lePadV" gap="0 0" wrap="nowrap" align="flex-start">
        <template v-for="(item, i) in introList" :key="item.id">
          <OCol flex="0 0 50%" :class="`col-${item.id}`">
            <div class="item-info">
              <OIcon><component :is="item.icon"></component></OIcon>
              <div>
                <p class="info-title">{{ item.title }}</p>
                <p class="info-desc">{{ item.description }}</p>
              </div>
            </div>
          </OCol>
          <ODivider v-if="i === 0" class="info-divider" direction="v" />
        </template>
      </ORow>
      <ORow v-else gap="0 0" wrap="wrap">
        <OCol flex="0 0 100%" v-for="(item, i) in introList" :key="item.id">
          <ODivider class="info-divider" direction="h" />
          <div class="item-info">
            <div class="info-mb">
              <OIcon><component :is="item.icon"></component></OIcon>
              <p class="info-title">{{ item.title }}</p>
            </div>
            <p class="info-desc">{{ item.description }}</p>
          </div>
        </OCol>
      </ORow>
    </div>
  </AppSection>
  <AppSection
    :title="t('intelligence.introduction')"
    class="swiper-section"
  >
    <OTab v-if="!lePad" v-model="activeTab" :line="false">
      <OTabPane :value="0">
        <template #nav><OIcon :icon="iconBuildTab" />{{t('intelligence.buildApply')}}</template>
        <div class="build apply-bg" :class="{ 'apply-bg-dark': isDark, 'build-en': locale === 'en' }">
          <ORow gap="0 0" wrap="wrap">
            <OCol
              flex="0 0 100%"
              v-for="(item, i) in introCarousel"
              :key="item.id"
              @click="introClick(i)"
            >
              <div
                class="title-top"
                :class="{ 'title-active': introCurrentIndex === i }"
              >
                <OIcon><component :is="item.icon"></component></OIcon>
                <p class="item-title">{{ item.title }}</p>
              </div>
              <div class="item-desc" :class="{ 'desc-active': introCurrentIndex === i }">
                <p v-for="val in item.description" :key="val">
                  {{ val }}
                </p>
              </div>
              <ODivider v-if="i < introCarousel.length - 1" />
            </OCol>
          </ORow>
          <OFigure
            :src="buildApplyImg[locale]"
            @click="imgScale(buildApplyImg[locale])"
          ></OFigure>
        </div>
      </OTabPane>
      <OTabPane :value="1">
        <template #nav><OIcon :icon="iconInvokeTab" />{{t('intelligence.invokeApply')}}</template>
        <div class="invoke apply-bg" :class="{ 'apply-bg-dark': isDark }">
          <ORow gap="0 0" wrap="wrap">
            <OCol
              flex="0 0 100%"
              v-for="(item, i) in invokeList"
              :key="item.id"
              @click="invokeClick(i)"
            >
              <div
                class="title-top"
                :class="{ 'title-active': invokeCurrentIndex === i }"
              >
                <OIcon><component :is="item.icon"></component></OIcon>
                <p class="item-title">{{ item.title }}</p>
              </div>
              <div class="item-desc" :class="{ 'desc-active': invokeCurrentIndex === i }">
                {{ item.description }}
              </div>
              <ODivider v-if="i < invokeList.length - 1" />
            </OCol>
          </ORow>
          <div class="right-box">
            <div class="switch-tab" :class="{'switch-checked': isChecked}">
              <div class="switch-handler" :class="{'switch-active': !isChecked}" @click="switchTab(false)">{{t('intelligence.invokeShell')}}</div>
              <div class="switch-handler" :class="{'switch-active': isChecked}" @click="switchTab(true)">{{t('intelligence.invokeWeb')}}</div>
            </div>
            <div class="img-box">
              <OFigure
                :src="invokeApplyImg[locale]"
                @click="imgScale(invokeApplyImg[locale])"
              ></OFigure>
            </div>
          </div>
        </div>
      </OTabPane>
    </OTab>
    <OTab v-else v-model="activeTab" :line="false" @change="changeTabMb">
      <OTabPane :value="0">
        <template #nav>{{t('intelligence.buildApply')}}</template>
        <div class="build-mb"  :class="{ 'build-mb-dark': isDark }">
          <Swiper
            :modules="[Autoplay]"
            slides-per-view="auto"
            :space-between="12"
            :loop="true"
            :centered-slides="true"
          >
            <SwiperSlide v-for="(item, i) in introCarouselMb" :key="i" class="swiper-swiping">
              <slot :item="item">
                <div class="carousel-item">
                  <div class="title-top">
                    <OIcon><component :is="item.icon"></component></OIcon>
                    <p class="item-title">{{ item.title }}</p>
                  </div>
                  <div class="item-desc" :class="{ 'item-desc-en': locale === 'en' }">
                    <p v-for="val in item.description" :key="val">{{ val }}</p>
                  </div>
                  <OFigure
                    :src="item.img[locale]"
                    @click="imgScale(item.img[locale])"
                  ></OFigure>
                </div>
              </slot>
            </SwiperSlide>
          </Swiper>
        </div>
      </OTabPane>
      <OTabPane :value="1">
        <template #nav>{{t('intelligence.invokeApply')}}</template>
        <div class="invoke-mb build-mb" :class="{ 'build-mb-dark': isDark }">
          <Swiper
            :modules="[Autoplay]"
            slides-per-view="auto"
            :space-between="12"
            :initial-slide="3"
            :loop="true"
            :centered-slides="true"
          >
            <SwiperSlide v-for="(item, i) in invokeListMb" :key="i" class="swiper-swiping">
              <slot :item="item">
                <div class="carousel-item">
                  <div class="title-top">
                    <OIcon><component :is="item.icon"></component></OIcon>
                    <p class="item-title">{{ item.title }}</p>
                  </div>
                  <div class="item-desc" :class="{ 'item-desc-en': locale === 'en' }">
                    {{ item.description }}
                  </div>
                  <div class="carousel-invoke">
                    <OCarousel
                      v-model:active-index="currentIndexImg[i]"
                      ref="slidesRef"
                      effect="toggle"
                      indicator-click
                      arrow="never"
                      :style="{ height: carouselHeight ? carouselHeight + 'px' : heightImg }"
                      :auto-play="true"
                    >
                      <OCarouselItem v-for="(val, k) in [item.shell, item.web]" :key="k">
                        <div class="carousel-item-invoke" :class="{'carousel-item-dark': k === 0}">
                          <OFigure
                            :src="val[locale]"
                            @click="imgScale(val[locale])"
                          >
                            <OTag variant="solid" class="invoke-tag"  :class="{ 'invoke-tag-dark': isDark }">{{ currentIndexImg[i] === 0 ? t('intelligence.invokeShell') : t('intelligence.invokeWeb') }}</OTag>
                          </OFigure>
                        </div>
                      </OCarouselItem>
                    </OCarousel>
                  </div>
                </div>
              </slot>
            </SwiperSlide>
          </Swiper>
        </div>
      </OTabPane>
    </OTab>
  </AppSection>
  <ODialog
    v-model:visible="scaleVisible"
    :style="{ 'text-align': 'center', '--dlg-radius': '4px' }"
    class="figure-dialog"
  >
    <OFigure :src="img"></OFigure>
  </ODialog>
</template>

<style scoped lang="scss">
.introduction {
  padding: 32px;
  border-radius: var(--o-radius-xs);
  background-image: url('~@/assets/category/intelligence/introduction-bg.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center bottom;
  background-color: var(--o-color-fill2);
  .desc {
    color: var(--o-color-info1);
    @include text2;
  }
  .o-row {
    margin-top: 16px;
  }
  .o-col {
    display: flex;
    align-items: center;
  }
  .col-developer {
    padding-right: 48px;
  }
  .col-enterprise {
    padding-left: 48px;
  }
}
.item-info {
  display: flex;
  align-items: flex-start;
  width: 100%;
  .o-icon {
    margin-right: 16px;
    margin-top: 1px;
    font-size: 24px;
  }
}
.info-title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include text2;
}
.info-desc {
  color: var(--o-color-info3);
  margin-top: 8px;
  @include text1;
}
.info-divider {
  height: 50px;
  margin-top: auto;
  margin-bottom: auto;
  --o-divider-label-gap: 0;
}

:deep(.o-tab) {
  .o-tab-head {
    margin-bottom: 24px;
  }
}

.apply-bg {
  background-image: url('~@/assets/category/intelligence/apply-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
  display: flex;
  padding: 32px 40px;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  .o-row {
    margin: 8px 0;
  }
  .o-col {
    cursor: pointer;
  }
  .o-divider {
    --o-divider-gap: 16px;
  }
}
.build {
  .o-row {
    width: 100%;
    margin-right: 74px;
  }
  .o-figure {
    height: 100%;
    cursor: pointer;
  }
}
.build-en {
  align-items: center;
}

.title-top {
  display: flex;
  align-items: center;
  color: var(--o-color-info1);
  .o-icon {
    font-size: 24px;
  }
}
.item-title {
  margin-left: 12px;
  font-weight: 500;
  @include h3;
}
.item-desc {
  margin-top: 12px;
  margin-left: 36px;
  color: var(--o-color-info3);
  @include text1;
  p + p {
    margin-top: 8px;
  }
}
.title-active {
  color: var(--o-color-link1);
}
.desc-active {
  color: var(--o-color-info1);
}

.invoke {
  padding: 24px 40px;
  .o-row {
    width: 100%;
    margin: 16px 0;
  }
  .right-box {
    margin-left: 190px;
    margin-bottom: 20px;
  }
  .switch-tab {
    display: inline-flex;
    background-color: var(--o-color-fill1);
    border-radius: var(--o-radius-xs);
    padding: 4px;
    position: relative;
    @include text1;

    &::before {
      content: '';
      position: absolute;
      width: 109px;
      height: 26px;
      top: 4px;
      left: 4px;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      z-index: 1;
      transition: left .2s cubic-bezier(0.2, 0, 0, 1);
      box-shadow: 0 1px 3px rgba(var(--o-mixedgray-14), 0.1);
    }
    .switch-handler {
      width: 109px;
      padding: 2px 12px;
      z-index: 2;
      text-align: center;
      cursor: pointer;
    }
    .switch-handler + .switch-handler {
      margin-left: 1px;
    }
    .switch-active {
      color: var(--o-color-link1);
      font-weight: 500;
    }
  }
  .switch-checked {
    &::before {
      left: 114px;
    }
  }
  .img-box {
    margin-top: 16px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 20px;
      left: -20px;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      background-image: linear-gradient(
        130deg,
        rgba(182, 207, 247, 1) 0%,
        rgba(205, 210, 246, 1) 30%,
        rgba(227, 235, 255, 0.43) 81%,
        rgba(var(--o-mixedgray-14), 0) 100%
      );
      z-index: 1;
    }
  }
  .o-figure {
    --figure-radius: var(--o-radius-xs);
    z-index: 2;
    cursor: pointer;
  }
}

@include respond-to('laptop') {
  .build {
    .o-row {
      margin-right: 40px;
    }
  }
  .invoke {
    .right-box {
      margin-left: 100px;
    }
  }
}
@include respond-to('pad_h') {
  .item-desc {
    margin-top: 8px;
  }
  .build {
    .o-row {
      margin-right: 32px;
    }
  }
  .invoke {
    .right-box {
      margin-left: 70px;
    }
  }
}

@include respond-to('<=pad') {
  .introduction {
    padding: 12px;
    margin-top: 12px;
    .desc {
      @include text2;
    }
    .o-row {
      margin-top: 8px;
    }
  }
  .item-info {
    flex-direction: column;
    .o-icon {
      margin-right: 8px;
    }
  }
  .info-mb {
    display: flex;
    align-items: center;
  }
  .apply-bg {
    background-image: none;
  }
  .apply-bg-dark {
    background-image: none;
  }

  .swiper-section {
    :deep(.section-body) {
      padding: 0;
    }
  }

  .build-mb {
    .swiper-slide {
      width: 472px;
    }
    .carousel-item {
      width: 100%;
      height: auto;
      padding: 16px;
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      box-sizing: border-box;
    }
    .item-title {
      margin-left: 8px;
    }
    .item-desc {
      margin: 12px 0 0;
      height: 96px;
    }
    .o-figure {
      --figure-radius: var(--o-radius-xs);
      border: 1px solid var(--o-color-control4);
      margin-top: 24px;
    }

    .item-desc-en {
      height: 162px;
    }
  }

  .invoke-mb {
    .item-desc {
      height: 44px;
    }
    .item-desc-en {
      height: 88px;
    }
    .invoke-tag {
      position: absolute;
      top: 8px;
      right: 8px;
      --tag-radius: 2px;
      --tag-color: var(--o-color-white);
      border: none;
      --tag-bg-color: rgba(var(--o-mixedgray-14), 0.4);
    }
    .invoke-tag-dark {
      --tag-bg-color: rgba(var(--o-mixedgray-1), 0.25);
    }
    .carousel-item-dark {
      .invoke-tag {
        --tag-bg-color: rgba(var(--o-mixedgray-1), 0.25);
      }
      .invoke-tag-dark {
        --tag-bg-color: rgba(var(--o-mixedgray-14), 0.25);
      }
    }
  }
}

@include respond-to('<=pad_v') {
  .introduction {
    background-image: none;
    .o-row {
      margin-top: 0;
    }
    .o-col {
      flex-direction: column;
      &:nth-of-type(1) {
        padding-right: 0;
      }
      &:nth-of-type(2) {
        padding-left: 0;
      }
    }
  }
  .info-divider {
    height: auto;
    margin-top: 8px;
    margin-bottom: 8px;
    --o-divider-gap: 8px;
  }

  .introduction-dark {
    background-image: none !important;
  }
}
@include respond-to('phone') {
  .introduction {
    .desc {
      @include text1;
    }
  }
  .build-mb {
    .swiper-slide {
      width: calc(100% - 48px);
    }
    .item-desc {
      height: 80px;
    }
    .item-desc-en {
      height: 144px;
    }
  }
  .invoke-mb {
    .item-desc {
      height: 54px;
    }
    .item-desc-en {
      height: 72px;
    }
  }
}

.introduction-dark {
  background-image: url('~@/assets/category/intelligence/introduction-bg-dark.png');
}
.apply-bg-dark {
  background-image: url('~@/assets/category/intelligence/apply-bg-dark.jpg');
  .img-box {
    &::before {
      background-image: linear-gradient(
        130deg,
        rgba(66, 106, 170, 0.4) 0%,
        rgba(59, 65, 107, 0.7) 25%,
        rgba(54, 73, 124, 0.42) 80%,
        rgba(75, 91, 112, 0) 100%
      );
    }
  }
  .o-figure {
    :deep(img) {
      @include img-in-dark;
    }
  }
}
.build-mb-dark {
  .o-figure {
    :deep(img) {
      @include img-in-dark;
    }
  }
}

.figure-dialog {
  .o-figure {
    height: 100%;
  }
}
</style>
<style lang="scss">
.figure-dialog {
  .o-dlg-main {
    aspect-ratio: 1.72;
  }
}
</style>
