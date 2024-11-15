<script setup lang="ts">
import {
  computed,
  ref,
  CSSProperties,
  watch,
  onMounted,
  Ref,
  onUnmounted,
} from 'vue';
import { useRouter, useData } from 'vitepress';
import { useThrottleFn } from '@vueuse/core';

import { OIcon, ODivider, OPopup, OLink, OButton } from '@opensig/opendesign';
import { ElMessage } from 'element-plus';

import IconTop from '~icons/footer/icon-top.svg';
import IconSmile from '~icons/footer/icon-smile.svg';
import IconHeadset from '~icons/footer/icon-headset.svg';
import IconCancel from '~icons/footer/icon-cancel.svg';

import IconQuickIssue_light from '~icons/footer/icon-quickissue_light.svg';
import IconQuickIssue_dark from '~icons/footer/icon-quickissue_dark.svg';
import IconChat from '~icons/footer/icon-chat.svg';
import IconFAQ from '~icons/footer/icon-faq.svg';

import { postFeedback } from '@/api/api-feedback';

import useWindowResize from '@/components/hooks/useWindowResize';
import { useCommon } from '@/stores/common';
import { useStoreData } from '@/shared/login';

const screenWidth = useWindowResize();
const { lang, frontmatter } = useData();
const { guardAuthClient } = useStoreData();
const router = useRouter();

const isDark = computed(() => {
  return useCommon().theme === 'dark' ? true : false;
});

const TITLES1 = ['您向他人推荐 ', '您对 '];
const TITLES2 = [
  'openEuler社区',
  '获取方式',
  '社区发行版',
  '其他版本',
  '下载服务',
  '课程中心',
  '迁移与运维',
  '技术展示',
  '兼容性专区',
  '支持与服务',
  '关于社区',
  '贡献与成长',
  '项目',
  '社区交流',
  '社区活动',
  '资讯',
];
const TITLES3 = [' 的可能性有多大？', ' 的整体满意度如何？'];

const infoData = {
  grade1: '0-不可能',
  grade2: '10-非常可能',
  grade1_1: '0-不满意',
  grade2_1: '10-非常满意',
  placeholder1: '请输入您不太满意的原因（0-6）',
  placeholder2: '改进哪些方面会让您更满意？（7-8）',
  placeholder3: '请输入您满意的原因（9-10）',
  more1: '感谢您的反馈，如需帮助，可论坛',
  more2: '发帖求助',
  more2Link: 'https://forum.openeuler.org/',
  submit: '提交',
  cancel: '取消',
  confirm: '确认',
  feedbackTitle: '满意度反馈',
  welcome: '欢迎在此反馈您在社区体验中的任何建议或问题',
  know: '知道了',
};

const placeholder = computed(() => {
  if (title2.value === TITLES2[0]) {
    if (score.value / 10 < 7) {
      return '请输入您不太推荐的原因';
    } else if (score.value / 10 < 9) {
      return '改进哪些方面会让您更愿意推荐？';
    } else {
      return '请输入您推荐的原因';
    }
  } else {
    if (score.value / 10 < 7) {
      return '请输入您不太满意的原因';
    } else if (score.value / 10 < 9) {
      return '改进哪些方面会让您更满意？';
    } else {
      return '请输入您满意的原因';
    }
  }
});

interface TitleItemT {
  [url: string]: string;
}

const tipsObj: TitleItemT = {
  '/zh/': TITLES2[0],
  '/download/': TITLES2[2],
  '/download/get-os/': TITLES2[1],
  '/download/commercial-release/': TITLES2[3],
  '/mirror/list/': TITLES2[4],
  '/interaction/live-list/': TITLES2[5],
  '/learn/mooc/': TITLES2[5],
  '/blog/openeuler/20240428-security.html': TITLES2[5],
  '/migration/': TITLES2[6],
  '/om/': TITLES2[6],
  '/showcase/': TITLES2[7],
  '/showcase/technical-white-paper/': TITLES2[7],
  '/showcase/market-report/': TITLES2[7],
  '/compatibility/': TITLES2[8],
  '/approve/': TITLES2[9],
  '/security/security-bulletins/': TITLES2[9],
  '/security/bug-bulletins/': TITLES2[9],
  '/faq/': TITLES2[9],
  '/community/organization/': TITLES2[10],
  '/community/charter/': TITLES2[10],
  '/community/member/': TITLES2[10],
  '/community/honor/': TITLES2[10],
  '/oEEP/': TITLES2[10],
  '/community/user-group/': TITLES2[10],
  '/overview/': TITLES2[10],
  '/sig/sig-list/': TITLES2[11],
  '/community/contribution/': TITLES2[11],
  '/universities/': TITLES2[11],
  '/internship/': TITLES2[11],
  '/other/projects/atune/': TITLES2[12],
  '/other/projects/isula/': TITLES2[12],
  '/other/projects/stratovirt/': TITLES2[12],
  '/other/projects/bishengjdk/': TITLES2[12],
  '/other/projects/secgear/': TITLES2[12],
  '/community/mailing-list/': TITLES2[13],
  '/meeting/': TITLES2[13],
  '/interaction/event-list/': TITLES2[14],
  '/interaction/summit-list/summit2024/': TITLES2[14],
  '/community/program/': TITLES2[14],
  '/interaction/news-list/': TITLES2[15],
  '/interaction/blog-list/': TITLES2[15],
  '/monthly-summary': TITLES2[15],
};

const title1 = computed(() => {
  if (title2.value === TITLES2[0]) {
    return TITLES1[0];
  } else {
    return TITLES1[1];
  }
});

const title2 = ref(TITLES2[0]);

const title3 = computed(() => {
  if (title2.value === TITLES2[0]) {
    return TITLES3[0];
  } else {
    return TITLES3[1];
  }
});

onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/zh/') {
        title2.value = TITLES2[0];
      } else {
        Object.keys(tipsObj).forEach((item) => {
          if (router.route.path.includes(item)) {
            title2.value = tipsObj[item];
          }
        });
      }
    },
    { immediate: true }
  );
});

const score = ref(0);
const scoreTip = computed(() => {
  return score.value / 10;
});

const feedbackRef = ref();
const issuebackRef = ref();
const inputText = ref('');

const popoverRef = ref();
const showPopup = ref(false);
const isReasonShow = ref(false);

// 鼠标进入图标区域
const onMouseEnter = () => {
  showPopup.value = true;
};
// 鼠标离开图标区域
const onMouseLeave = () => {
  showPopup.value = false;
};

function closePopup() {
  showPopup.value = false;
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
}

function changeSlider() {
  isReasonShow.value = true;
}

const scorePosition = computed(() => {
  return score.value + '%';
});

const STEP = 10;

interface Mark {
  style: CSSProperties;
  label: string;
}

type Marks = Record<number, Mark | string>;
const marks = computed(() => {
  const temp: Marks = {};
  for (let i = 0; i < STEP + 1; i++) {
    temp[i * 10] = '';
  }
  return temp;
});

const isFocus = ref(false);
const textareaRef: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.addEventListener('focus', () => {
      isFocus.value = true;
    });
    textareaRef.value.addEventListener('blur', () => {
      isFocus.value = false;
    });
  }
});

// ------------------ 提交反馈 -----------------
function submitFeedback() {
  if (!isReasonShow.value) {
    return;
  }
  const params = {
    userName: guardAuthClient.value.username,
    feedbackPageUrl: window.location.href,
    feedbackText: inputText.value,
    feedbackValue: score.value / 10,
  };
  postFeedback(params)
    .then((res) => {
      if (res.code === 200) {
        ElMessage({
          message: '提交成功，感谢您的反馈！',
          type: 'success',
        });
        const summitTime = new Date().valueOf();
        if (screenWidth.value <= 1200) {
          localStorage.setItem(
            'submit-feedback-time-mb',
            JSON.stringify(summitTime)
          );
          isReasonShow.value = false;
          inputText.value = '';
          score.value = 0;
          isShowFeedbackMb.value = false;
          dialogVisible.value = false;
        } else {
          localStorage.setItem(
            'submit-feedback-time-pc',
            JSON.stringify(summitTime)
          );
          isReasonShow.value = false;
          inputText.value = '';
          score.value = 0;
        }
      } else {
        ElMessage({
          message: res.msg,
          type: 'error',
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: '提交失败，请刷新页面后重新提交！',
        type: 'error',
      });
    });
}

const handleClickSubmit = () => {
  // pc12小时之内只能提交一次
  const lastSummitTimePc = localStorage.getItem('submit-feedback-time-pc');
  const submitTimeLimit = 1 * 12 * 60 * 60 * 1000;
  const currentTime = new Date().valueOf();

  if (lastSummitTimePc) {
    const isOverSubmitLimit =
      currentTime - JSON.parse(lastSummitTimePc) > submitTimeLimit;

    if (isOverSubmitLimit) {
      submitFeedback();
    } else {
      ElMessage({
        message: '请不要频繁提交！',
        type: 'warning',
      });
    }
  } else {
    submitFeedback();
  }
};

// ------------------ 满意度提示 -----------------
const isFloatTipShow = ref(false);
onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/zh/') {
        isFloatTipShow.value = true;
        setTimeout(() => {
          isFloatTipShow.value = false;
        }, 5000);
      } else {
        isFloatTipShow.value = false;
      }
    },
    { immediate: true }
  );
});
const closeFloatTip = () => {
  isFloatTipShow.value = false;
};

// ------------------ 滚到顶部 -----------------
function handleClickTop() {
  window.scrollTo(0, 0);
}

const isMigration = computed(() => {
  return (
    frontmatter.value.category === 'migration' ||
    router.route.path.split('/')[2] === 'migration'
  );
});

const quickIssueUrl = computed(() => {
  return isMigration.value
    ? 'https://quickissue.openeuler.org/zh/new-issues/?c2lnPXNpZy1NaWdyYXRpb24mcmVwbz1vcGVuZXVsZXIvbWlncmF0aW9uLWFzc2lzdGFudCZyZXBvX2lkPTE1OTI4MzA0JnR5cGU96L+B56e75o+Q5LyYJnRpdGxlPVvmkKzov4Fd'
    : 'https://quickissue.openeuler.org/zh/issues/';
});

const floatData = ref([
  {
    img: computed(() => {
      return IconChat;
    }),
    text: '社区论坛',
    tip: '发帖互助解决各类问题',
    id: 'forum',
    link: 'https://forum.openeuler.org/',
  },
  {
    img: computed(() => {
      return isDark.value ? IconQuickIssue_dark : IconQuickIssue_light;
    }),
    id: 'quickIssue',
    text: 'QuickIssue',
    tip: '快捷提交/查询社区Issues',
    link: quickIssueUrl,
  },
  {
    img: computed(() => {
      return IconFAQ;
    }),
    id: '',
    text: 'FAQs',
    tip: '',
    link: `/${lang.value}/faq/`,
  },
]);

// ------------------ 移动端nss评分 -----------------
const dialogVisible = ref(false);
const isShowFeedbackMb = ref(false);

const marksMobile = computed(() => {
  const temp = [];
  for (let i = 0; i < STEP + 1; i++) {
    temp.push(i);
  }
  return temp;
});

const toggleDialogVisible = () => {
  dialogVisible.value = true;
};

const cancelDialog = () => {
  dialogVisible.value = false;
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
};

const closeFeedbackMb = () => {
  isShowFeedbackMb.value = false;
  const closeTime = new Date().valueOf();
  localStorage.setItem('close-feedback-time-mb', JSON.stringify(closeTime));
};

const setScore = (val: number) => {
  isReasonShow.value = true;
  score.value = val * 10;
};

const handleFeedbackShow = () => {
  if (router.route.path.includes('/interaction/summit-list')) {
    isShowFeedbackMb.value = false;
    return;
  }

  // 移动端用户关闭后7天不展示,提交后30日内不出现入口
  const lastCloseTimeMb = localStorage.getItem('close-feedback-time-mb');
  const lastSummitTimeMb = localStorage.getItem('submit-feedback-time-mb');

  const closeTimeLimit = 7 * 24 * 60 * 60 * 1000; // mobile关闭nss再次使用nss时长限制
  const submitTimeLimit = 30 * 24 * 60 * 60 * 1000; // mobile提交nss后再次提交时长限制
  const currentTime = new Date().valueOf();

  if (lastCloseTimeMb || lastSummitTimeMb) {
    let isOverColseTimeLimit;
    let isOverSubmitTimeLimit;

    if (lastCloseTimeMb) {
      isOverColseTimeLimit =
        currentTime - JSON.parse(lastCloseTimeMb) > closeTimeLimit;
    } else if (lastSummitTimeMb) {
      isOverSubmitTimeLimit =
        currentTime - JSON.parse(lastSummitTimeMb) > submitTimeLimit;
    }

    if (isOverColseTimeLimit && isOverSubmitTimeLimit) {
      isShowFeedbackMb.value = true;
    } else {
      isShowFeedbackMb.value = false;
    }
  } else {
    isShowFeedbackMb.value = true;
  }
};

// 页面滚动大于一屏时，显示回到顶部悬浮按钮
const showBackTop = ref(false);

const listenScroll = () => {
  if (window.pageYOffset > window.innerHeight) {
    showBackTop.value = true;
  } else {
    showBackTop.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', listenScroll);

  handleFeedbackShow();
});

onUnmounted(() => {
  window.removeEventListener('scroll', listenScroll);
});

watch(
  () => router.route.path,
  () => {
    handleFeedbackShow();
  }
);
</script>

<template>
  <div class="feedback">
    <div class="feedback-wrap">
      <div v-show="isFloatTipShow" class="float-tip">
        <h4 class="tip-title">{{ infoData.feedbackTitle }}</h4>
        <div class="tip-detail">{{ infoData.welcome }}</div>
        <div class="tip-handle">
          <p class="tip-konwed" @click="closeFloatTip">
            {{ infoData.know }}
          </p>
        </div>
      </div>

      <div
        id="tour_feedback"
        class="nav-box1"
        :class="isDark ? 'dark-nav' : ''"
      >
        <div
          class="nav-item"
          id="feedback"
          @mouseenter="onMouseEnter"
          @mouseleave="useThrottleFn(onMouseLeave, 300)"
        >
          <OIcon ref="feedbackRef" class="icon-smile">
            <component :is="IconSmile"> </component>
          </OIcon>

          <OPopup
            :visible="showPopup"
            position="rb"
            :target="feedbackRef"
            wrapper="#feedback"
            body-class="popup-feedback o-popup1"
            :auto-hide="isReasonShow ? false : true"
            :offset="24"
            trigger="hover"
          >
            <OIcon class="icon-cancel" @click="closePopup">
              <IconCancel />
            </OIcon>

            <div class="slider">
              <p class="slider-title">
                {{ title1 }}
                <span class="title-name">{{ title2 }}</span>
                {{ title3 }}
              </p>
              <div class="slider-body">
                <div class="slider-tip">
                  <div
                    v-show="isReasonShow"
                    ref="popoverRef"
                    class="slide-btn-tip"
                  >
                    {{ scoreTip }}
                  </div>
                </div>

                <ClientOnly>
                  <el-slider
                    show-stops
                    v-model="score"
                    :step="10"
                    :marks="marks"
                    :show-tooltip="false"
                    @input="changeSlider"
                  />
                </ClientOnly>
              </div>

              <div class="grade-info">
                <span>{{
                  title2 === TITLES2[0] ? infoData.grade1 : infoData.grade1_1
                }}</span>
                <span>{{
                  title2 === TITLES2[0] ? infoData.grade2 : infoData.grade2_1
                }}</span>
              </div>
            </div>

            <div v-show="isReasonShow" class="reason">
              <div class="input-area" :class="{ 'is-focus': isFocus }">
                <textarea
                  ref="textareaRef"
                  v-model="inputText"
                  :placeholder="placeholder"
                  maxlength="500"
                ></textarea>
                <p>
                  <span>{{ inputText.length }}</span
                  >/500
                </p>
              </div>
              <p class="more-info">
                {{ infoData.more1
                }}<a :href="infoData.more2Link" target="_blank"
                  >{{ infoData.more2 }}
                </a>
              </p>
              <div class="submit-btn">
                <OButton
                  size="medium"
                  color="primary"
                  @click="handleClickSubmit"
                >
                  {{ infoData.submit }}
                </OButton>
              </div>
            </div>
          </OPopup>
        </div>

        <ODivider :style="{ '--o-divider-gap': '12px' }" />

        <div class="nav-item">
          <OIcon
            ref="issuebackRef"
            id="issueback"
            style="position: relative"
            class="icon-headset"
          >
            <component :is="IconHeadset"> </component>
          </OIcon>

          <OPopup
            position="rb"
            :target="issuebackRef"
            wrapper="#issueback"
            body-class="popup-issueback"
            :offset="24"
            trigger="hover"
          >
            <OLink
              v-for="item in floatData"
              :key="item.link"
              :href="item.link"
              target="_blank"
              class="popup-item"
            >
              <OIcon><component :is="item.img"></component> </OIcon>

              <div class="text">
                <p class="text-name">
                  {{ item.text }}
                </p>

                <p v-if="item.tip" class="text-tip">{{ item.tip }}</p>
              </div>
            </OLink>
          </OPopup>
        </div>
      </div>

      <div
        class="nav-box2"
        :class="[
          isDark ? 'dark-nav' : '',
          showBackTop ? 'show-scroll-top' : '',
        ]"
        @click="handleClickTop"
      >
        <OIcon class="icon-top"><component :is="IconTop"></component> </OIcon>
      </div>
    </div>
  </div>

  <div v-if="isShowFeedbackMb" class="feedback-mb">
    <div class="feedback-mb-head">
      <div class="head-title" @click="toggleDialogVisible">
        <OIcon class="icon-box"><component :is="IconSmile"></component> </OIcon>
        <p>
          {{ title1 }}
          <span class="title-name">{{ title2 }}</span>
          {{ title3 }}
        </p>
      </div>
      <OIcon class="icon-box icon-close" @click="closeFeedbackMb"
        ><component :is="IconCancel"></component>
      </OIcon>
    </div>

    <el-dialog :show-close="false" v-model="dialogVisible">
      <div class="o-popup1">
        <div class="slider">
          <p class="slider-title">
            {{ title1 }}
            <span class="title-name">{{ title2 }}</span>
            {{ title3 }}
          </p>
          <ul class="score-list">
            <li
              v-for="item in marksMobile"
              :key="'mark' + item"
              :style="{ left: item * 10 + '%' }"
              :class="{ 'is-active': score / 10 === item }"
              @click="setScore(item)"
            >
              {{ item }}
            </li>
          </ul>
          <div class="slider-body">
            <ClientOnly>
              <el-slider
                v-model="score"
                :step="STEP"
                :marks="marks"
                show-stops
                :show-tooltip="false"
                @input="changeSlider"
              />
            </ClientOnly>
          </div>
          <div class="grade-info">
            <span>{{
              title2 === TITLES2[0] ? infoData.grade1 : infoData.grade1_1
            }}</span>
            <span>{{
              title2 === TITLES2[0] ? infoData.grade2 : infoData.grade2_1
            }}</span>
          </div>
        </div>
        <div v-show="isReasonShow" class="reason">
          <div class="input-area" :class="{ 'is-focus': isFocus }">
            <textarea
              ref="textareaRef"
              v-model="inputText"
              :placeholder="placeholder"
              maxlength="500"
            ></textarea>
            <p>
              <span>{{ inputText.length }}</span
              >/500
            </p>
          </div>
          <p class="more-info">
            {{ infoData.more1 }}
            <a :href="infoData.more2Link" target="_blank"
              >{{ infoData.more2 }}
            </a>
          </p>
        </div>
        <div class="btn-box">
          <OButton type="outline" size="medium" @click="cancelDialog">
            {{ infoData.cancel }}
          </OButton>
          <OButton
            type="outline"
            size="medium"
            @click="submitFeedback"
            :class="{ forbidden: !isReasonShow }"
          >
            {{ infoData.confirm }}
          </OButton>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.feedback {
  position: fixed;
  bottom: 200px;
  right: 80px;
  z-index: 10;

  @include respond-to('<=pad') {
    display: none;
  }

  @media (max-width: 1700px) {
    right: 20px;
  }
  @media (max-width: 1560px) {
    right: 2px;
  }
  @media (max-width: 1526px) {
    right: 44px;
  }

  @include respond-to('laptop') {
    right: 24px;
  }

  .dark-nav {
    border: 1px solid var(--o-color-control4-light);
  }

  .feedback-wrap {
    display: flex;
    flex-direction: column;
    position: relative;

    .float-tip {
      position: absolute;
      width: 180px;
      top: 0;
      right: 0;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      box-shadow: var(--o-shadow-2);
      padding: 16px;
      transform: translate(34%, -110%);
      @media (max-width: 1700px) {
        transform: translate(0, -110%);
      }
      .tip-title {
        color: var(--o-color-info1);
        @include text1;
      }
      .tip-detail {
        @include tip2;
        color: var(--o-color-info1);
      }
      .tip-handle {
        margin-top: 8px;
        display: flex;
        justify-content: end;
        .tip-konwed {
          @include tip1;
          color: var(--o-color-info1);
          cursor: pointer;

          @include hover {
            color: var(--o-color-primary1);
          }
        }
      }
      &::after {
        display: block;
        content: '';
        width: 0;
        border-left: 8px solid transparent;
        border-top: 8px solid var(--o-color-fill2);
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        position: absolute;
        bottom: -14px;
        left: 50%;
        @media (max-width: 1700px) {
          left: 84%;
        }
      }
    }

    .nav-box1,
    .nav-box2 {
      display: flex;
      flex-direction: column;
      padding: 12px;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      box-shadow: var(--o-shadow-2);

      .nav-item {
        .o-icon {
          font-size: var(--o-font_size-h2);
          color: var(--o-color-info2);
          cursor: pointer;
        }

        @include hover {
          .icon-smile,
          .icon-headset {
            color: var(--o-color-primary1);
          }
        }

        .icon-cancel {
          @include h4;
          transition: all var(--o-duration-m1) var(--o-easing-standard-in);

          @include hover {
            transform: rotate(180deg);
            color: var(--o-color-primary1);
          }
        }
      }

      .popup-item {
        .o-icon {
          font-size: var(--o-font_size-h1);
          color: var(--o-color-info1);
        }
      }

      .o-popup1 {
        .slider {
          --el-slider-button-wrapper-offset: -14px;
          .slider-title {
            @include tip1;
            color: var(--o-color-info1);
            text-align: center;
            white-space: nowrap;
            .title-name {
              font-weight: 600;
            }
          }
          .slider-body {
            padding-top: 30px;
            .slider-tip {
              position: relative;

              .slide-btn-tip {
                width: 28px;
                height: 20px;
                text-align: center;
                font-size: var(--o-font_size-tip1);
                color: var(--o-color-info1);
                background-color: var(--o-color-fill2);
                border-radius: var(--o-radius-xs);
                box-shadow: 0 3px 8px rgba(18, 20, 23, 0.08);
                backdrop-filter: blur(5px);
                border: 1px solid var(--o-color-control4-light);
                position: absolute;
                top: -32px;
                transform: translateX(-50%);
                left: v-bind(scorePosition);

                &::after {
                  content: '';
                  display: block;
                  width: 8px;
                  height: 8px;
                  transform: rotateZ(45deg);
                  border: 1px solid #000;
                  border-color: transparent var(--o-color-control4-light)
                    var(--o-color-control4-light) transparent;
                  background-color: var(--o-color-fill2);
                  position: absolute;
                  bottom: -4px;
                  right: 9px;
                }
              }
            }

            :deep(.el-slider) {
              height: auto;
              height: 10px;

              .el-slider__runway {
                height: 8px;
                border-radius: var(--o-radius-xs);
                background-color: var(--o-color-control1-light);
              }

              .el-slider__bar {
                height: 10px;
                background-image: linear-gradient(
                  270deg,
                  #002fa7 0%,
                  #21a9fc 100%
                );
                top: -1px;
                border-radius: 5px;
              }

              .el-slider__button-wrapper + div {
                position: relative;
                transform: translateY(2px);
                z-index: 2;

                & + div {
                  transform: translateY(2px);
                  & > .el-slider__stop:nth-of-type(1) {
                    transform: translatex(2px);
                  }
                }
              }

              .el-slider__stop {
                width: 2px;
                height: 2px;
                background-color: var(--o-color-control2);
                top: 1px;
              }

              .el-slider__marks-stop {
                background-color: var(--o-color-fill2);

                &:nth-last-of-type(1) {
                  transform: translateX(-4px);
                  background-color: var(--o-color-control2);
                }
              }

              .el-slider__button {
                position: relative;
                border: none;
                box-shadow: var(--o-shadow-2);

                &::after {
                  display: block;
                  content: '';
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: var(--o-color-primary1);
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }

          .grade-info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: var(--o-font_size-tip2);
            color: var(--o-color-info3);
            margin-top: 14px;
          }
        }

        .reason {
          margin-top: 16px;

          .input-area {
            border: 1px solid var(--o-color-control1);
            padding: 8px 16px;
            height: 88px;
            border-radius: var(--o-radius-xs);
            font-size: var(--o-font_size-tip2);
            line-height: 18px;
            position: relative;

            @include hover {
              border: 1px solid var(--o-color-primary1);
            }

            &.is-focus {
              border: 1px solid var(--o-color-primary1);
            }

            textarea {
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
              resize: none;
              background-color: var(--o-color-fill2);
              color: var(--o-color-info1);
            }

            p {
              text-align: right;
              color: var(--o-color-info4);
              position: absolute;
              right: 8px;
              bottom: 8px;
            }
          }
          .more-info {
            margin-top: 8px;
            color: var(--o-color-info4);
            @include tip2;
            text-align: center;

            a {
              color: var(--o-color-primary1);
              @include hover {
                color: var(--o-color-primary2);
              }
            }
          }

          .submit-btn {
            margin-top: 16px;
            text-align: center;
            :deep(.o-button) {
              padding: 6px 26px;
              font-size: var(--o-font_size-tip1);
              border-radius: var(--o-radius-l);
              border-color: var(--o-color-primary1);
              color: var(--o-color-primary1);

              @include hover {
                border-color: var(--o-color-primary2);
                color: var(--o-color-primary2);
              }
            }
          }
        }
      }
    }

    .nav-box2 {
      margin-top: 12px;
      cursor: pointer;
      opacity: 0;

      .icon-top {
        color: var(--o-color-info1);
        @include h2;

        @include hover {
          color: var(--o-color-primary1);
        }
      }
    }

    .show-scroll-top {
      opacity: 1;
    }
  }
}

.feedback-mb {
  position: sticky;
  bottom: 16px;
  z-index: 11;
  width: 100%;
  margin-bottom: 16px;
  max-width: var(--layout-content-max-width);
  padding-left: var(--layout-content-padding);
  padding-right: var(--layout-content-padding);
  display: none;

  @include respond-to('<=pad') {
    display: block;
  }
  .feedback-mb-head {
    height: 40px;
    padding: 12px;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(
      90deg,
      var(--o-color-control2-light) 0%,
      var(--o-color-control3-light) 100%
    );
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .o-icon {
      font-size: 16px;
    }
    .icon-close {
      position: absolute;
      right: 12px;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
      transition: all 0.25s cubic-bezier(0, 0, 0, 1);

      @include hover {
        transform: translateY(-50%) rotate(180deg);
        color: var(--o-color-primary1);
      }
    }
    .head-title {
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 12px;
      line-height: 16px;
      white-space: nowrap;
      .title-name {
        font-weight: 600;
      }
      .o-icon {
        margin-right: 8px;
        color: var(--o-color-primary1);
      }
    }
  }
  :deep(.el-dialog) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    margin-bottom: 0;
    margin-top: 0;
    background-color: transparent;
    border-radius: 8px 8px 0px 0px;
    padding: 0;

    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
      border-radius: 8px 8px 0px 0px;
    }
  }

  .o-popup1 {
    width: 100%;
    background-color: var(--o-color-fill2);
    padding: 16px 24px;
    transform-origin: 100% 50%;
    border-radius: 8px 8px 0px 0px;
    cursor: default;
    .icon-cancel {
      position: absolute;
      top: 5px;
      right: 10px;
      cursor: pointer;
      color: var(--o-color-info1);
    }
    .slider {
      .slider-title {
        font-size: var(--o-font_size-tip1);
        line-height: 20px;
        color: var(--o-color-info1);
        text-align: center;
        white-space: nowrap;
        .title-name {
          font-weight: 600;
        }
      }
      .score-list {
        width: 100%;
        display: flex;
        position: relative;
        height: 18px;
        line-height: 18px;
        margin-top: 18px;
        li {
          position: absolute;
          transform: translateX(-50%);
          font-size: 14px;
          color: var(--o-color-info3);
          &.is-active {
            color: var(--o-color-info1);
            font-size: 16px;
          }
          &:nth-last-of-type(1) {
            left: 99% !important;
            white-space: nowrap;
          }
        }
      }
      .slider-body {
        margin-top: 10px;
        .slider-tip {
          position: relative;
          .slide-btn-tip {
            display: flex;
            width: 110%;
            li {
              flex-grow: 1;
              &:nth-of-type(2) {
                transform: translateX(-2px);
              }
            }
          }
        }
        :deep(.el-slider) {
          height: auto;
          height: 12px;
          margin-top: 10px;
          .el-slider__button-wrapper {
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .el-slider__runway {
            height: 100%;
            background-color: var(--o-color-fill3);
            border-radius: 8px;
          }
          .el-slider__bar {
            height: 100%;
            border-radius: 8px;
            background-image: linear-gradient(90deg, #62b2f6 0%, #002fa7 100%);
          }

          .el-slider__button-wrapper + div {
            position: relative;
            transform: translateY(5px);
            z-index: 2;
            & + div {
              transform: translateY(5px);
              & > .el-slider__stop:nth-of-type(1) {
                transform: translatex(2px);
              }
            }
          }

          .el-slider__stop {
            width: 2px;
            height: 2px;
            background-color: var(--o-color-control2);
          }

          .el-slider__marks {
            width: 100%;
            transform: translateY(-42px);
            .el-slider__marks-text:nth-last-child(1) {
              left: 99% !important;
              white-space: nowrap;
            }
          }

          .el-slider__marks-stop {
            background-color: var(--o-color-fill2);

            &:nth-last-of-type(1) {
              transform: translateX(-6px);
              background-color: var(--o-color-control2);
            }
          }
          .el-slider__button {
            position: relative;
            border: none;
            box-shadow: var(--o-shadow-2);
            &::after {
              display: block;
              content: '';
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: var(--o-color-primary1);
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .grade-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: var(--o-font_size-tip2);
        color: var(--o-color-info3);
        margin-top: 8px;
        span {
          scale: 0.84;
        }
      }
    }
    .reason {
      margin-top: 16px;
      .input-area {
        border: 1px solid var(--o-color-control1);
        padding: 8px 16px;
        height: 88px;
        font-size: var(--o-font_size-tip2);
        line-height: var(--o-line_height-tip2);
        line-height: 18px;
        position: relative;
        border-radius: var(--o-radius-xs);
        @include hover {
          border: 1px solid var(--o-color-control3);
        }
        &.is-focus {
          border: 1px solid var(--o-color-control3);
        }
        textarea {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          resize: none;
          background-color: var(--o-color-fill2);
          color: var(--o-color-info1);
        }
        p {
          text-align: right;
          color: var(--o-color-info4);
          position: absolute;
          right: 6px;
          bottom: 6px;
        }
      }
      .more-info {
        margin-top: 8px;
        color: var(--o-color-info4);
        font-size: var(--o-font_size-tip2);
        line-height: 18px;
        text-align: center;
      }
    }
    .btn-box {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      .o-btn {
        flex-grow: 1;
        justify-content: center;
        border: none;
        color: var(--o-color-info1);
        position: relative;
        padding: 0;
        border: none !important;
        background: transparent !important;
        &.forbidden {
          color: var(--o-color-info4);
        }
        &:nth-of-type(1)::after {
          display: block;
          content: '';
          width: 1px;
          height: 100%;
          background-color: var(--o-color-control4);
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
}

:deep(.o-popup) {
  cursor: default;

  .o-popup-wrap {
    box-shadow: none;
  }
  .popup-feedback {
    padding: 16px 30px;
    background-color: var(--o-color-fill2);
    box-shadow: var(--o-shadow-2);
    border-radius: var(--o-radius-xs);
    --popup-min-width: 360px;
    top: 12px;
    position: relative;

    .icon-cancel {
      position: absolute;
      top: 8px;
      right: 12px;
      color: var(--o-color-info2);
      cursor: pointer;
    }
  }

  .popup-issueback {
    padding: 24px;
    background-color: var(--o-color-fill2);
    border-radius: var(--o-radius-s);
    box-shadow: var(--o-shadow-2);
    --popup-min-width: 220px;
    position: relative;
    display: flex;
    flex-direction: column;

    .popup-item {
      width: 100%;
      .o-link-label {
        display: flex;
        align-items: flex-start;
        color: var(--o-color-info1);
        cursor: pointer;
      }

      @include hover {
        & .text .text-name {
          color: var(--o-color-primary1);
        }
      }

      & ~ .popup-item {
        margin-top: 12px;
      }

      .text {
        margin-left: 8px;
        text-align: left;
        align-self: center;

        .text-name {
          font-size: var(--o-font_size-tip1);
          line-height: 22px;
          font-weight: 600;
          a {
            color: var(--o-color-info1);
          }
        }
        .text-tip {
          font-size: var(--o-font_size-tip2);
          line-height: 18px;
          color: var(--o-color-info2);
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
