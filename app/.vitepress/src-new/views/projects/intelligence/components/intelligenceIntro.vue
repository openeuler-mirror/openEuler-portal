<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import {
  ORow,
  OCol,
  OIcon,
  ODivider,
  OCarousel,
  OCarouselItem,
  OFigure,
  ODialog,
} from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import IconDeveloper from '~icons/intelligence/icon-developer.svg';
import IconEnterprise from '~icons/intelligence/icon-enterprise.svg';

import IconQuestionAnswer from '~icons/intelligence/icon-question-answer.svg';
import IconWorkflowApplication from '~icons/intelligence/icon-workflow-application.svg';
import IconIntelligenceApplication from '~icons/intelligence/icon-intelligence-application.svg';

import questionAnswerZh from '~@/assets/category/intelligence/question-answer-zh.jpg';
import workflowApplicationZh from '~@/assets/category/intelligence/workflow-application-zh.jpg';
import intelligenceApplicationZh from '~@/assets/category/intelligence/intelligence-application-zh.jpg';

import questionAnswerEn from '~@/assets/category/intelligence/question-answer-en.jpg';
import workflowApplicationEn from '~@/assets/category/intelligence/workflow-application-en.jpg';
import intelligenceApplicationEn from '~@/assets/category/intelligence/intelligence-application-en.jpg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();

const { t, locale } = useLocale();
const { lePadV, lePad } = useScreen();
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

const slidesRef = ref<InstanceType<typeof OCarousel> | null>(null);

const currentIndex = ref(0);
const carouselHeight = ref(0);

const positionCarousel = (val: number) => {
  slidesRef.value?.active(val);
};

const scaleVisible = ref(false);
const img = ref();
const imgScale = (val: any) => {
  img.value = val;
  scaleVisible.value = true;
};

onMounted(() => {
  if (lePad.value) {
    setTimeout(() => {
      const carousel = document.querySelector(
        '.o-carousel .carousel-item'
      ) as HTMLElement;
      carouselHeight.value = carousel?.offsetHeight;
    }, 500);
  }
});
</script>
<template>
  <AppSection
    :title="t('intelligence.introduction')"
    :class="{ 'app-section-en': locale === 'en' }"
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
    <div
      v-if="!lePad"
      class="introduction-list"
      :class="{ 'introduction-list-dark': isDark }"
    >
      <ORow gap="0 32px" wrap="wrap">
        <OCol
          flex="0 0 100%"
          v-for="(item, i) in introCarousel"
          :key="item.id"
          @click="positionCarousel(i)"
        >
          <div
            class="title-top"
            :class="{ 'title-active': currentIndex === i }"
          >
            <OIcon><component :is="item.icon"></component></OIcon>
            <p class="item-title">{{ item.title }}</p>
          </div>
          <div class="item-desc" :class="{ 'desc-active': currentIndex === i }">
            <p v-for="val in item.description" :key="val">
              {{ val }}
            </p>
          </div>
        </OCol>
      </ORow>
      <div class="carousel">
        <OCarousel
          v-model:active-index="currentIndex"
          ref="slidesRef"
          class="intro-carousel"
          effect="toggle"
          active-class="current-slide"
          indicator-click
          auto-play
          arrow="never"
        >
          <OCarouselItem v-for="item in introCarousel" :key="item.id">
            <OFigure
              :src="item.img[locale]"
              @click="imgScale(item.img[locale])"
            ></OFigure>
          </OCarouselItem>
        </OCarousel>
      </div>
    </div>
    <OCarousel
      v-else
      v-model:active-index="currentIndex"
      effect="gallery"
      arrow="never"
      indicator-click
      :auto-play="false"
      :style="{ height: carouselHeight ? carouselHeight + 'px' : '350px' }"
    >
      <OCarouselItem v-for="(item, idx) in introCarousel" :key="item.id">
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
      </OCarouselItem>
    </OCarousel>
  </AppSection>
  <ODialog
    v-model:visible="scaleVisible"
    :style="{ '--layer-align': 'center' }"
  >
    <OFigure :src="img"></OFigure>
  </ODialog>
</template>

<style scoped lang="scss">
.app-section {
  --o-gap-section: 40px;
  padding-bottom: 72px;
  overflow: hidden;
  background-image: url('~@/assets/category/intelligence/introduction-img-bg.png');
  background-repeat: no-repeat;
  background-size: auto 723px;
  background-position: right calc(50% - 265px) bottom calc(-50% + 96px);

  @include respond-to('<=laptop') {
    --o-gap-section: 32px;
    padding-bottom: 56px;

    background-size: auto 580px;
    background-position: right -40px bottom calc(-50% + 96px);
  }
  @include respond-to('pad_h') {
    padding-bottom: 40px;
  }
  @include respond-to('<=pad') {
    background-image: none;
  }
  @include respond-to('<=pad_v') {
    padding-bottom: 32px;
  }
  @include respond-to('phone') {
    --o-gap-section: 32px;
  }
}

.app-section-en {
  background-size: auto 670px;
  background-position: right calc(50% - 240px) bottom calc(-50% + 315px);

  @media (max-width: 1480px) {
    background-position: right calc(50% - 240px) bottom calc(-50% + 365px);
  }
  @include respond-to('<=laptop') {
    background-size: auto 550px;
    background-position: right -40px bottom calc(-50% + 180px);
  }
  @media (max-width: 1380px) {
    background-size: auto 550px;
    background-position: right -18px bottom calc(-50% + 240px);
  }
  @media (max-width: 1260px) {
    background-position: right -40px bottom calc(-50% + 325px);
  }
}

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

.introduction-list {
  display: flex;
  align-items: center;
  margin-top: 32px;
  .o-row {
    margin-right: 48px;
  }
  .o-col {
    cursor: pointer;
  }
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
.carousel {
  width: 822px;
  height: 500px;
  flex-shrink: 0;
  .o-carousel {
    height: 462px;
    --carousel-indicator-offset: -36px;
  }
  .o-figure {
    --figure-radius: var(--o-radius-xs);
    border: 1px solid var(--o-color-control4);
    cursor: pointer;
  }
}

@include respond-to('laptop') {
  .introduction-list {
    margin-top: 24px;
    .o-row {
      margin-right: 32px;
    }
    .col-developer {
      padding-right: 32px;
    }
    .col-enterprise {
      padding-left: 32px;
    }
  }
  .item-desc {
    margin-left: 32px;
  }
  .carousel {
    width: 658px;
    height: 400px;
    .o-carousel {
      height: 370px;
      --carousel-indicator-offset: -24px;
    }
  }
}
@include respond-to('pad_h') {
  .introduction-list {
    .o-row {
      margin-right: 24px;
    }
    .col-developer {
      padding-right: 24px;
    }
    .col-enterprise {
      padding-left: 24px;
    }
  }
  .item-desc {
    margin-top: 8px;
    margin-left: 32px;
  }
}

@include respond-to('<=pad') {
  .app-section {
    :deep(.section-body) {
      padding-bottom: 20px;
    }
  }

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

  .o-carousel {
    height: 350px;
    width: 472px;
    margin: 12px auto 0;
    --carousel-indicator-offset: -20px;
  }
  :deep(.o-carousel-container-gallery) {
    margin-left: 6px;
  }
  :deep(.o-carousel-item-gallery) {
    width: calc(100% + 12px);
    height: 100%;
  }
  .carousel-item {
    width: calc(100% - 12px);
    height: auto;
    padding: 16px;
    border-radius: var(--o-radius-xs);
    background-color: var(--o-color-fill2);
    margin-right: 12px;
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
  .o-carousel {
    width: 100%;
  }
  .item-desc {
    height: 80px;
  }
  .item-desc-en {
    height: 144px;
  }
}

.introduction-dark {
  background-image: url('~@/assets/category/intelligence/introduction-bg-dark.png');
}
.introduction-list-dark {
  .o-figure {
    @include img-in-dark;
  }
}
</style>
