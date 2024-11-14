<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { OButton, OFigure, OIcon } from '@opensig/opendesign';
import { useRoute, useData } from 'vitepress';

import IconClose from '~icons/app-new/icon-close.svg';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';

import {
  FIRST_TOUR_STEPS,
  NEW_CHANGE_TOUR_STEPS,
  NEW_CHANGE_DATA,
  NEW_GUIDE_TOUR_STEPS,
} from '~@/data/tour';

const route = useRoute();
const { lang } = useData();
const { theme } = storeToRefs(useCommon());
const { size } = useScreen();

const open = ref(false);
const currentStep = ref(0);
const total = ref(0);

total.value =
  FIRST_TOUR_STEPS.length +
  NEW_CHANGE_TOUR_STEPS.length +
  NEW_GUIDE_TOUR_STEPS.length;

const homeVisible = ref(false);
const newChangeVisible = ref(false);
const newGuideVisible = ref(false);

const steps = [
  ...FIRST_TOUR_STEPS,
  ...NEW_CHANGE_TOUR_STEPS,
  ...NEW_GUIDE_TOUR_STEPS,
];

const arrowColor = computed(() => {
  return steps[currentStep.value]?.color;
});

const handleStopWheel = (e: Event) => {
  e.preventDefault();
};

// -------------------- 首页 中文页面  pc端 --------------------
const isHome = computed(() => {
  return route.path === '/zh/' && lang.value === 'zh' && size.width > 1200;
});

watch(
  () => isHome.value,
  (val) => {
    open.value = false;
    if (val) {
      if (
        !localStorage.getItem('tour_guide') ||
        localStorage.getItem('tour_guide') !== '20241112'
      ) {
        window.addEventListener('wheel', handleStopWheel, {
          passive: false,
        });
        open.value = true;
      }
    }
  },
  { immediate: true }
);

// 跳过
const skip = () => {
  if (newChangeVisible.value) {
    currentStep.value = FIRST_TOUR_STEPS.length + NEW_CHANGE_TOUR_STEPS.length;
  } else {
    open.value = false;
  }
};

// 上一步
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
  }
};

// 下一步
const nextStep = (current: number, total: number) => {
  if (current === total - 1) {
    open.value = false;
  } else {
    currentStep.value += 1;
  }
};

// 切换tab
const changeStep = (val: number) => {
  currentStep.value = FIRST_TOUR_STEPS.length + val;
};

watch(
  () => currentStep.value,
  (val) => {
    homeVisible.value = false;
    newGuideVisible.value = false;
    newChangeVisible.value = false;
    if (val < FIRST_TOUR_STEPS.length) {
      homeVisible.value = true;
    } else if (
      val >
      FIRST_TOUR_STEPS.length + NEW_CHANGE_TOUR_STEPS.length - 1
    ) {
      newGuideVisible.value = true;
    } else {
      newChangeVisible.value = true;
    }
  },
  { immediate: true }
);

// 解决窗口尺寸改变导致遮罩不全屏的问题
useResizeObserver(window.document.body, () => {
  if (!open.value) {
    return;
  }

  const path = window.document.querySelector('.el-tour__hollow');
  if (!path) {
    return;
  }

  const d = path.getAttribute('d');
  if (!d) {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const newD = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
  path.setAttribute(
    'd',
    d.replace(/M(\d+),0 L0,0 L0,(\d+) L(\d+),(\d+) L(\d+),0 Z/, newD)
  );
});

watch(
  () => open.value,
  (val) => {
    if (!val && lang.value === 'zh' && size.width > 1200) {
      localStorage.setItem('tour_guide', '20241112');
    }
    if (!val) {
      window.removeEventListener('wheel', handleStopWheel);
    }
  }
);
</script>
<template>
  <el-tour
    v-model="open"
    v-model:current="currentStep"
    :show-close="false"
    :close-on-press-escape="false"
    :mask="true"
    :content-style="{ '--el-tour-bg-color': arrowColor }"
    :class="{
      'home-tour': homeVisible,
      'change-tour': newChangeVisible,
      'guide-tour': newGuideVisible,
    }"
  >
    <el-tour-step
      v-for="item in steps"
      :key="currentStep"
      :target="item.target || undefined"
      :placement="item.placement || undefined"
    >
      <template #header>
        <div v-if="!newChangeVisible" class="header-img">
          <OFigure :src="item.bg" />
        </div>
        <div v-else class="header-change">
          <div class="title">
            <span>{{ NEW_CHANGE_DATA.title }}</span>
            <img :src="NEW_CHANGE_DATA.icon" />
          </div>
          <p class="desc">{{ NEW_CHANGE_DATA.desc }}</p>
          <ul class="tab">
            <li
              v-for="(item, i) in NEW_CHANGE_DATA.list"
              :key="i"
              class="item-tab"
              :class="{
                'item-tab-active': i === currentStep - FIRST_TOUR_STEPS.length,
              }"
              @click="changeStep(i)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
      <div class="tour-text" :class="{ 'tour-text-case': currentStep === 4 }">
        <div v-if="newChangeVisible" class="tour-img">
          <OFigure :src="item.bg[theme]" />
        </div>
        <div class="tour-title">{{ item.title }}</div>
        <div v-if="item.desc.length" class="tour-desc">
          <div v-for="(subItem, subIndex) in item.desc" :key="subIndex">
            {{ subItem }}
          </div>
        </div>
        <div v-if="item.extra.length" class="tour-extra">
          <div v-for="(subItem, subIndex) in item.extra" :key="subIndex">
            {{ subItem }}
          </div>
        </div>
      </div>
      <div class="tour-footer">
        <div class="footer-item">
          <span v-if="newChangeVisible" class="indicator-text"
            >{{ currentStep + 1 - FIRST_TOUR_STEPS.length }}/{{
              NEW_CHANGE_TOUR_STEPS.length
            }}</span
          >
          <span v-if="newGuideVisible" class="indicator-text"
            >{{
              currentStep +
              1 -
              FIRST_TOUR_STEPS.length -
              NEW_CHANGE_TOUR_STEPS.length
            }}/{{ NEW_GUIDE_TOUR_STEPS.length }}</span
          >
          <span class="indicator-text skip" @click="skip">跳过</span>
        </div>
        <div class="footer-item">
          <span v-if="currentStep > 0" class="prev-step" @click="prevStep()"
            >上一步</span
          >
          <OButton
            class="next-step"
            variant="solid"
            color="primary"
            size="small"
            @click="nextStep(currentStep, total)"
            >{{ currentStep === total - 1 ? '知道了' : '下一步' }}</OButton
          >
        </div>
      </div>
      <OIcon v-if="!newGuideVisible" class="tour-close" @click="skip">
        <IconClose />
      </OIcon>
    </el-tour-step>
  </el-tour>
</template>

<style lang="scss">
.el-tour {
  .el-tour__content {
    width: 720px;
    padding: 0;
    border-radius: var(--o-radius-xs);
    background: var(--o-color-fill2);
  }

  .el-tour__header {
    padding: 0;
  }

  .header-img {
    width: 100%;

    .o-figure {
      width: 100%;
      height: 192px;
      border-radius: var(--o-radius-xs) var(--o-radius-xs) 0 0;
    }
  }

  .tour-text {
    padding: 24px 24px 32px;
  }
  .tour-title {
    @include tip1;
    font-weight: 500;
  }
  .tour-desc {
    @include tip2;
    margin-top: 16px;
    color: var(--o-color-info2);
  }
  .tour-extra {
    @include tip2;
    font-weight: 500;
    margin-top: 16px;
  }
  .indicator-text {
    @include tip2;
    color: var(--o-color-info4);
  }

  .tour-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 36px;
  }
  .footer-item {
    display: flex;
    align-items: center;
  }
  .skip {
    margin-left: 12px;
    cursor: pointer;
    @include hover {
      color: var(--o-color-info1);
    }
  }
  .prev-step {
    @include tip2;
    margin-right: 14px;
    color: var(--o-color-info3);
    cursor: pointer;
    @include hover {
      color: var(--o-color-info1);
    }
  }
  .next-step {
    @include tip2;
    padding: 13px 11px;
    border-radius: var(--o-radius-l);
  }

  .el-tour__footer {
    display: none;
  }
}

.home-tour {
  .skip {
    margin-left: 0px;
  }

  .tour-close {
    width: 32px;
    height: 32px;
    background-color: rgba(var(--o-mixedgray-14), 0.25);
    border-radius: 50%;
    font-size: 24px;
    color: var(--o-color-fill2);
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    @include x-svg-hover;
  }
}

.change-tour {
  .el-tour__content {
    display: flex;
    background: #f3f3f5;
  }

  .header-change {
    width: 240px;
    height: 100%;
    background: var(--o-color-fill2);
    padding: 26px 24px 24px;
    border-radius: var(--o-radius-xs) 0 0 var(--o-radius-xs);
    box-shadow: var(--o-shadow-2);
  }
  .title {
    display: flex;
    align-items: center;
    @include tip1;
    color: var(--o-color-info1);
    font-weight: 500;
    img {
      width: 118px;
      margin-left: 8px;
    }
  }
  .desc {
    @include tip2;
    color: var(--o-color-info2);
    margin-top: 20px;
  }
  .tab {
    margin-top: 20px;
  }
  .item-tab {
    width: 100%;
    @include text1;
    color: var(--o-color-info1);
    border-radius: var(--o-radius-xs);
    margin-top: 4px;
    text-align: center;
    padding: 8px 24px;
    cursor: pointer;
    transition: all var(--o-duration-s) var(--o-easing-standard);
    &.item-tab-active {
      color: var(--o-color-info1-inverse);
      background-color: var(--o-color-link1);
    }

    @include hover {
      color: var(--o-color-info1-inverse);
      background-color: var(--o-color-link2);

      &.item-tab-active {
        background-color: var(--o-color-link1);
      }
    }
  }

  .el-tour__body {
    width: 100%;
    background-image: url('~@/assets/category/tour/step-bg.png');
    background-size: 420px auto;
    background-repeat: no-repeat;
    background-position: left -80px top 0;
  }
  .tour-text {
    min-height: 351px;
    padding: 40px 24px 24px;
  }
  .tour-img {
    width: 100%;
    margin-bottom: 8px;

    .o-figure {
      width: 100%;
      border-radius: var(--o-radius-s);
    }
  }

  .tour-text-case {
    padding: 40px 24px 12px;
    .tour-desc {
      margin-top: 10px;
    }
  }

  .tour-close {
    font-size: 24px;
    color: var(--o-color-info1);
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    @include x-svg-hover;
  }
}

.guide-tour {
  .el-tour__content {
    width: 416px;
  }

  .header-img {
    .o-figure {
      height: 100px;
    }
  }

  .tour-text {
    min-height: 122px;
    padding: 24px 24px 12px;
  }
  .tour-desc {
    margin-top: 8px;
  }

  .tour-footer {
    padding: 0 24px 24px;
  }
}

[data-o-theme='dark'] {
  .change-tour {
    .el-tour__content {
      background: #1a1a1c;
    }
    .item-tab {
      &.item-tab-active {
        color: var(--o-color-info1);
      }

      @include hover {
        color: var(--o-color-info1);
      }
    }
  }
}
</style>
