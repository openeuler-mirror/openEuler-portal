<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  OIcon,
  ORow,
  OCol,
  OFigure,
  ODivider,
  OLink,
  OScroller,
} from '@opensig/opendesign';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import AppSection from '~@/components/AppSection.vue';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

import { casesZh, casesEn } from '~@/data/home/case';

import { getHomeShowCases } from '~@/api/api-search';

const emit = defineEmits(['result']);

export interface CasesT {
  label: string;
  icon: {
    [key: string]: string;
  };
  iconActive: {
    [key: string]: string;
  };
  img: string;
}

const { theme } = storeToRefs(useCommon());
const { locale, t } = useLocale();
const { isPhone } = useScreen();

const userCase = ref<HTMLElement>();
const activeTab = ref(0);
const cases = ref<CasesT[]>([]);
cases.value = locale.value === 'zh' ? casesZh : casesEn;

// -------------------- 获取案例数据 --------------------
const caseData = ref({});
const getCases = () => {
  getHomeShowCases(locale.value).then((res) => {
    emit('result');

    const result: any = {};
    res?.obj?.records.forEach((item: { lang: string; industry: string }) => {
      if (typeof result[item.industry] === 'undefined') {
        result[item.industry] = [];
      }
      if (result[item.industry].length < 4) {
        result[item.industry].push(item);
      }
    });
    caseData.value = result;
  });
};

// -------------------- 自动切换tab --------------------
const timer = ref();
const changeCase = () => {
  activeTab.value === cases.value.length - 1
    ? (activeTab.value = 0)
    : activeTab.value++;
};
const setCaseInterval = () => {
  timer.value = setInterval(changeCase, 5000);
};
const clearCaseInterval = () => {
  clearInterval(timer.value);
};

// -------------------- 点击切换tab --------------------
const changeTab = (val: number) => {
  activeTab.value = val;
};

const moreLink = (val: number) => {
  const url = `showcase/?industry=${val}`.replace(/(index)$/g, '');
  window.open(url, '_blank');
};

onMounted(() => {
  getCases();
  try {
    if (userCase.value) {
      setCaseInterval();
      userCase.value.addEventListener('mouseover', clearCaseInterval);
      //鼠标移出继续
      userCase.value.addEventListener('mouseout', setCaseInterval);
    }
  } catch (error: any) {
    console.error(error);
  }
});
onUnmounted(() => {
  timer.value.clearInterval;
  userCase.value?.removeEventListener('mouseover', clearCaseInterval);
  userCase.value?.removeEventListener('mouseout', setCaseInterval);
});
</script>
<template>
  <AppSection
    :title="t('home.case')"
    class="user-case"
    data-aos="fade-up"
    :footer="t('home.more')"
    :footer-href="
      `showcase/?industry=${activeTab + 1}`.replace(/(index)$/g, '')
    "
  >
    <div ref="userCase">
      <OScroller show-type="never">
        <div class="tab">
          <ul class="tab-list">
            <li
              v-for="(tab, i) in cases"
              :key="i"
              class="item-tab"
              :class="{ 'item-tab-active': activeTab === i }"
              @click="changeTab(i)"
            >
              <img
                v-if="activeTab === i"
                :src="tab.iconActive[theme]"
                class="nav-item-icon"
              />
              <img v-else :src="tab.icon[theme]" class="nav-item-icon" />
              <span>{{ tab.label }}</span>
            </li>
          </ul>
        </div>
      </OScroller>
      <ul class="content">
        <li class="case-list">
          <div class="left-content">
            <ORow gap="0" wrap="wrap">
              <OCol
                flex="0 0 100%"
                v-for="(item, i) in caseData[cases[activeTab].label]"
                :key="i"
                class="item-case"
              >
                <OLink
                  :href="'/' + item.path.replace(/(index)$/g, '')"
                  target="_blank"
                  class="item-link"
                >
                  <div class="item-title">
                    <p class="company">{{ item.company }}</p>
                    <OIcon class="company-icon"><IconChevronRight /></OIcon>
                  </div>
                  <p class="summary">{{ item.summary }}</p>
                </OLink>
                <ODivider v-if="i < 3" />
              </OCol>
            </ORow>
          </div>
        </li>
        <li v-if="!isPhone" class="case-img">
          <OFigure :src="cases[activeTab].img" colorful class="right-img" />
        </li>
      </ul>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.tab {
  text-align: center;
}
.tab-list {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e6f5;
  padding: 6px;
  border-radius: var(--o-radius-s);
  white-space: nowrap;
}
.item-tab {
  display: flex;
  align-items: center;
  @include text2;
  color: var(--o-color-info1);
  padding: 6px 48px;
  border-radius: var(--o-radius-xs);
  cursor: pointer;
  @include hover {
    color: var(--o-color-primary1);
  }
}
.nav-item-icon {
  width: 24px;
  margin-right: 8px;
}
.item-tab-active {
  color: var(--o-color-primary1);
  background-color: var(--o-color-fill2);
  box-shadow: 0 2px 4px 0 rgba(0, 47, 167, 0.16);
}

.content {
  width: 100%;
  height: 491px;
  background-image: url('~@/assets/category/home/case/light/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--o-radius-xs);
  margin-top: 32px;
  position: relative;
  display: flex;
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9;
    background-image: linear-gradient(178deg, #3888ef 0%, #002fa7 100%);
    border-radius: var(--o-radius-xs);
  }
}
.case-list {
  width: 52%;
  margin-left: 48px;
  padding: 32px 0 40px;
  .o-divider {
    --o-divider-gap: 24px 0 24px;
    --o-divider-color: rgba(var(--o-mixedgray-14), 0.1);
  }
}
.item-case {
  cursor: pointer;
  @include hover {
    .company {
      color: var(--o-color-link1);
    }
  }
}
.item-link {
  display: block;
  width: 100%;
  padding: 0;
}
.item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .company {
    @include h2;
    color: var(--o-color-info1);
    font-weight: 500;
    @include text-truncate(1);
  }
  .company-icon {
    @include h1;
  }
}
.summary {
  @include text1;
  color: var(--o-color-info2);
  margin-top: 12px;
  @include text-truncate(1);
}

.case-img {
  width: 48%;
  margin-left: 72px;
  text-align: center;
}
.right-img {
  width: 550px;
}

.o-col {
  min-width: 0;
}

@include respond-to('laptop') {
  .item-tab {
    padding: 6px 16px;
  }
  .content {
    height: 387px;
    margin-top: 24px;
    &::after {
      width: 12px;
    }
  }
  .case-list {
    width: 52%;
    margin-left: 36px;
    padding: 24px 0 32px;
    .o-divider {
      --o-divider-gap: 16px 0 16px;
    }
  }
  .summary {
    margin-top: 8px;
  }
  .case-img {
    width: 36%;
    margin-left: 220px;
  }
  .right-img {
    width: 100%;
  }
}

@include respond-to('<=pad') {
  .tab-list {
    padding: 4px;
  }
  .item-tab {
    padding: 4px 20px;
  }
  .case-list {
    width: 48%;
    margin-left: 36px;
    padding: 24px 0;
    .o-divider {
      --o-divider-gap: 12px 0 12px;
    }
  }
  .case-img {
    width: 40%;
    margin-left: auto;
  }
  .right-img {
    width: 100%;
  }
  .content {
    height: 347px;
    margin-top: 24px;
    &::after {
      width: 12px;
    }
  }
  .summary {
    margin-top: 8px;
  }
}

@include respond-to('<=pad_v') {
  .item-tab {
    padding: 4px 12px;
  }
  .nav-item-icon {
    width: 16px;
    margin-right: 4px;
  }
  .case-img {
    width: 47%;
    margin-left: auto;
  }
  .right-img {
    width: 100%;
  }
  .content {
    height: 299px;
    margin-top: 16px;
    &::after {
      width: 8px;
    }
  }
  .case-list {
    width: 47%;
    margin-left: 16px;
    padding: 12px 0;
    .o-divider {
      --o-divider-gap: 12px 0 12px;
    }
  }
  .item-title {
    .company {
      @include h3;
    }
  }
  .summary {
    margin-top: 4px;
  }
}

@media screen and (max-width: 700px) {
  .tab {
    height: 26px;
  }
  .tab-list {
    background-color: transparent;
    padding: 0;
    white-space: nowrap;
  }
  .item-tab {
    @include text2;
    color: var(--o-color-info2);
    padding: 0;
    cursor: pointer;
    margin-left: 16px;
    &:first-of-type {
      margin-left: 0;
    }
  }
  .nav-item-icon {
    display: none;
  }
  .item-tab-active {
    color: var(--o-color-primary1);
    background-color: transparent;
    box-shadow: none;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 16px;
      height: 2px;
      left: 50%;
      transform: translateX(-50%);
      bottom: -4px;
      background-color: var(--o-color-primary1);
      border-radius: 1px;
    }
  }
}

@include respond-to('phone') {
  .title {
    margin-bottom: 12px;
  }
  .content {
    height: 267px;
    margin-top: 16px;
    &::after {
      width: 8px;
    }
  }
  .case-list {
    width: 100%;
    margin-left: 8px;
    padding: 12px 0;
    .o-divider {
      --o-divider-gap: 12px 0 12px;
      --o-divider-color: rgba(var(--o-mixedgray-14), 0.1);
    }
  }
  .item-link {
    &:hover {
      color: var(--o-color-info2);
    }
    &:active {
      color: var(--o-color-info2);
    }
  }
  .item-title {
    padding: 0 16px 0 8px;
    .company {
      @include text2;
    }
    .company-icon {
      @include h2;
    }
  }
  .summary {
    padding: 0 16px 0 8px;
    @include text1;
    margin-top: 2px;
  }
}

[data-o-theme='dark'] {
  .tab-list {
    background-color: #242427;
  }
  .item-tab-active {
    color: var(--o-color-primary1);
    background-color: #353539;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  }
  .more {
    --link-color: var(--o-color-info1);
    --link-color-hover: #4374f2;
  }
  @include respond-to('phone') {
    .tab {
      height: 26px;
    }
    .tab-list {
      background-color: transparent;
      padding: 0;
      white-space: nowrap;
    }
    .item-tab-active {
      color: var(--o-color-info1);
      background-color: transparent;
      &::after {
        background-color: var(--o-color-white);
      }
    }
  }
}
</style>
