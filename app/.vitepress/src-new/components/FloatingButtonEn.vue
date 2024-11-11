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
import { useRouter } from 'vitepress';

import IconTop from '~icons/footer/icon-top.svg';
import IconSmile from '~icons/footer/icon-smile.svg';
import IconHeadset from '~icons/footer/icon-headset.svg';
import IconCancel from '~icons/footer/icon-cancel.svg';

import IconFAQ from '~icons/footer/icon-faq.svg';

import { ElMessage } from 'element-plus';
import { OIcon, ODivider, OPopup, OLink } from '@opensig/opendesign';

import { postFeedback } from '@/api/api-feedback';

import useWindowResize from '@/components/hooks/useWindowResize';
import { useStoreData } from '@/shared/login';
import { useThrottleFn } from '@vueuse/core';
import { useCommon } from '@/stores/common';

const router = useRouter();
const screenWidth = useWindowResize();
const { guardAuthClient } = useStoreData();

const isDark = computed(() => {
  return useCommon().theme === 'dark' ? true : false;
});

const feedbackRef = ref();
const issuebackRef = ref();
const inputText = ref('');

const popoverRef = ref();
const showPopup = ref(false);
const isReasonShow = ref(false);

const score = ref(0);

const TITLES1 = [
  'How likely are you to recommend the ',
  'Are you satisfied with',
];

const TITLES2 = [
  'openEuler Community',
  'Get openEuler OS',
  'Community Releases',
  'Other Releases',
  'Install',
  'Training',
  'Migration',
  'Tech Highlights',
  'Compatibility',
  'Services & Resources',
  'About',
  'Contribute',
  'Projects',
  'Engage with Us',
  'Activities',
  'News & Blogs',
];
const TITLES3 = ['to others?', '?'];

interface TitleItemT {
  [url: string]: string;
}

const tipsObj: TitleItemT = {
  '/en/': TITLES2[0],
  '/download/': TITLES2[2],
  '/download/get-os/': TITLES2[1],
  '/download/commercial-release/': TITLES2[3],
  '/mirror/list/': TITLES2[4],
  '/interaction/live-list/': TITLES2[5],
  '/learn/mooc/': TITLES2[5],
  '/migration/': TITLES2[6],
  '/showcase/': TITLES2[7],
  '/showcase/technical-white-paper/': TITLES2[7],
  '/compatibility/': TITLES2[8],
  '/approve/': TITLES2[9],
  '/security/security-bulletins/': TITLES2[9],
  '/security/bug-bulletins/': TITLES2[9],
  '/faq/': TITLES2[9],
  '/community/organization/': TITLES2[10],
  '/community/conduct/': TITLES2[10],
  '/community/member/': TITLES2[10],
  '/sig/sig-list/': TITLES2[11],
  '/community/contribution/': TITLES2[11],
  '/other/projects/atune/': TITLES2[12],
  '/other/projects/isula/': TITLES2[12],
  '/other/projects/stratovirt/': TITLES2[12],
  '/other/projects/bishengjdk/': TITLES2[12],
  '/other/projects/secgear/': TITLES2[12],
  '/community/mailing-list/': TITLES2[13],
  '/interaction/event-list/': TITLES2[14],
  '/interaction/summit-list/summit2024/': TITLES2[14],
  '/community/program/': TITLES2[14],
  '/interaction/news-list/': TITLES2[15],
  '/interaction/blog-list/': TITLES2[15],
};

const title2 = ref(TITLES2[0]);

const title1 = computed(() => {
  if (title2.value === TITLES2[0]) {
    return TITLES1[0];
  } else {
    return TITLES1[1];
  }
});

const title3 = computed(() => {
  if (title2.value === TITLES2[0]) {
    return TITLES3[0];
  } else {
    return TITLES3[1];
  }
});

const floatData = ref([
  {
    img: computed(() => {
      return IconFAQ;
    }),
    id: '',
    text: 'FAQs',
    tip: '',
    link: `/en/faq/`,
  },
]);

onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/en/') {
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

// 鼠标进入图标区域
const onMouseEnter = () => {
  showPopup.value = true;
};
// 鼠标离开图标区域
const onMouseLeave = () => {
  showPopup.value = false;
};

// 关闭OPopup
function closePopup() {
  showPopup.value = false;
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
}

// 滑动slider
function changeSlider() {
  isReasonShow.value = true;
}

const infoData = {
  grade1: '0-Not likely',
  grade2: '10-Very likely',
  grade1_1: '0-Dissatisfied',
  grade2_1: '10-Very satisfied',
  submit: 'Submit',
  cancel: 'Cancel',
  confirm: 'Confirm',
  feedbackTitle: 'Feedback',
  welcome: 'Your questions and comments are welcome.',
  know: 'Got it',
};
const placeholder = computed(() => {
  if (title2.value === TITLES2[0]) {
    return 'Please leave your comment here.';
  } else {
    return 'Please leave your comment here.';
  }
});

const scoreTip = computed(() => {
  return score.value / 10;
});

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
          message: 'Submitted successfully. Thanks for your feedback.',
          type: 'success',
        });
        const summitTime = new Date().valueOf();
        if (screenWidth.value < 1100) {
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
        message: 'Submission failed. Refresh the page and try again.',
        type: 'error',
      });
    });
}

function handleClickSubmit() {
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
        message: 'Do not submit frequently.',
        type: 'warning',
      });
    }
  } else {
    submitFeedback();
  }
}

// ------------------ 满意度提示 -----------------
const isFloatTipShow = ref(false);
onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/en/') {
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

// ------------------ 移动端 -----------------
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

// 移动端用户关闭后7天不展示,提交后30日内不出现入口
const handleFeedbackShow = () => {
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
  <div v-if="screenWidth > 1100" class="feedback">
    <div class="feedback-wrap">
      <div v-show="isFloatTipShow" class="float-tip">
        <h4 class="tip-title">{{ infoData.feedbackTitle }}</h4>
        <div class="tip-detail">{{ infoData.welcome }}</div>
        <div class="btn-box">
          <OButton size="mini" @click="closeFloatTip">{{
            infoData.know
          }}</OButton>
        </div>
      </div>

      <div class="nav-box1" :class="isDark ? 'dark-nav' : ''">
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

              <div class="submit-btn">
                <OButton type="outline" size="mini" @click="handleClickSubmit">
                  {{ infoData.submit }}
                </OButton>
              </div>
            </div>
          </OPopup>
        </div>

        <ODivider :style="{ '--o-divider-gap': '12px' }" />

        <div class="nav-item">
          <OIcon ref="issuebackRef" id="issueback" class="icon-headset">
            <component :is="IconHeadset"> </component>
          </OIcon>

          <OPopup
            position="rt"
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

  <template v-else>
    <div v-if="isShowFeedbackMb" class="feedback-mb">
      <div class="feedback-mb-head">
        <div class="head-title" @click="toggleDialogVisible">
          <OIcon class="icon-box"
            ><component :is="IconSmile"></component>
          </OIcon>
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
          </div>
          <div class="btn-box">
            <OButton type="outline" size="middle" @click="cancelDialog">{{
              infoData.cancel
            }}</OButton>
            <OButton
              type="outline"
              size="middle"
              @click="submitFeedback"
              :class="{ forbidden: !isReasonShow }"
              >{{ infoData.confirm }}</OButton
            >
          </div>
        </div>
      </el-dialog>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.feedback {
  position: fixed;
  bottom: 200px;
  right: 80px;
  z-index: 10;

  @media (max-width: 1700px) {
    right: 20px;
  }
  @media (max-width: 1560px) {
    right: 2px;
  }
  @media (max-width: 1526px) {
    right: 44px;
  }
  @media (max-width: 1439px) {
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
      padding: 16px;
      transform: translate(34%, -110%);

      @media (max-width: 1700px) {
        transform: translate(0, -110%);
      }
      .tip-title {
        color: varvar(--o-color-info1);
        font-size: 16px;
      }
      .tip-detail {
        margin-top: 4px;
        font-size: 14px;
        color: var(--o-color-info1);
      }
      .btn-box {
        margin-top: 8px;
        display: flex;
        justify-content: end;
        .o-button {
          font-size: 14px;
          border: none;
          padding: 0;
          color: var(--o-color-info1);

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
          transition: all 0.25s cubic-bezier(0, 0, 0, 1);

          @include hover {
            transform: rotate(180deg);
            color: var(--o-color-primary1);
          }
        }
      }

      .popup-item {
        width: 100%;
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
                box-shadow: var(--o-shadow-2);
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
  padding: 0 16px;
  margin-bottom: 16px;

  .feedback-mb-head {
    padding: 12px;
    padding-right: 32px;
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
      transform: translateY(-50%);
    }
    .head-title {
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 12px;
      line-height: 16px;

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
        .title-name {
          word-break: keep-all;
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
            background-image: linear-gradient(270deg, #002fa7 0%, #21a9fc 100%);
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
    }
    .btn-box {
      margin-top: 12px;
      display: flex;
      justify-content: center;

      .o-button {
        flex-grow: 1;
        justify-content: center;
        border: none;
        color: var(--o-color-info1);
        position: relative;
        padding: 0;

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
    width: 360px;

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
    border-radius: var(--o-radius-xs);
    box-shadow: var(--o-shadow-2);
    --popup-min-width: 220px;

    .popup-item {
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
            @include hover {
              color: var(--o-color-primary1);
            }
          }
        }
        .text-tip {
          font-size: var(--o-font_size-tip2);
          color: var(--o-color-info2);
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
