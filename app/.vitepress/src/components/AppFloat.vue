<script setup lang="ts">
import { computed, ref, CSSProperties, watch, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { postFeedback } from '@/api/api-feedback';
import { ElMessage } from 'element-plus';

import IconTop from '~icons/footer/icon-top.svg';
import IconSmile from '~icons/footer/icon-smile.svg';
import IconHeadset from '~icons/footer/icon-headset.svg';
import IconCancel from '~icons/app/icon-cancel.svg';

import IconRobot_light from '~icons/footer/icon-robot_light.svg';
import IconRobot_dark from '~icons/footer/icon-robot_dark.svg';
import IconQuickIssue_light from '~icons/footer/icon-quickissue_light.svg';
import IconQuickIssue_dark from '~icons/footer/icon-quickissue_dark.svg';
import IconChat from '~icons/footer/icon-chat.svg';

const { lang, frontmatter } = useData();
const router = useRouter();
const isDark = computed(() => {
  return useCommon().theme === 'dark' ? true : false;
});
const TITLES = [
  '您向他人推荐 openEuler社区 的可能性有多大？',
  '您对 openEuler技术展示 的整体满意度如何？',
  '您对 openEuler学习与贡献 的整体满意度如何？',
  '您对 openEuler动态 的整体满意度如何？',
  '您对 openEuler下载 的整体满意度如何？',
  '您对 openEuler关于社区 的整体满意度如何？',
  '您对 openEuler交流 的整体满意度如何？',
  '您对 openEuler支持与服务 的整体满意度如何？',
  '您对 openEuler个人中心 的整体满意度如何？',
];
interface TitleItemT {
  [url: string]: string;
}
const tipsObj: TitleItemT = {
  '/zh/': TITLES[0],
  '/showcase/': TITLES[1],
  '/showcase/technical-white-paper/': TITLES[1],
  '/showcase/white-paper/': TITLES[1],
  '/learn/mooc/': TITLES[2],
  '/community/contribution/': TITLES[2],
  '/sig/sig-list/': TITLES[2],
  '/internship/': TITLES[2],
  '/interaction/news-list/': TITLES[3],
  '/interaction/blog-list/': TITLES[3],
  '/interaction/event-list/': TITLES[3],
  '/interaction/summit-list/': TITLES[3],
  '/download/': TITLES[4],
  '/mirror/list/': TITLES[4],
  '/community/organization/': TITLES[5],
  '/community/charter/': TITLES[5],
  '/oEEP/': TITLES[5],
  '/community/member/': TITLES[5],
  '/community/honor/': TITLES[5],
  '/community/program/': TITLES[5],
  '/mailing-list/': TITLES[6],
  '/sig/meeting-guide/': TITLES[6],
  '/migration/': TITLES[7],
  '/approve/': TITLES[7],
  '/compatibility/': TITLES[7],
  '/security/': TITLES[7],
};
const title = ref(TITLES[0]);
onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      if (router.route.path === '/zh/') {
        title.value = TITLES[0];
      } else {
        Object.keys(tipsObj).forEach((item) => {
          if (router.route.path.includes(item)) {
            title.value = tipsObj[item];
          }
        });
      }
    },
    { immediate: true }
  );
});

const isFloShow = ref(true);

// pop1 start
const score = ref(0);
const scoreTip = computed(() => {
  return score.value / 10;
});
const isReasonShow = ref(false);
const inputText = ref('');
function cancelPopup() {
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
}
function handleInput() {
  isReasonShow.value = true;
}
const scorePosition = computed(() => {
  return score.value + '%';
});
interface Mark {
  style: CSSProperties;
  label: string;
}
type Marks = Record<number, Mark | string>;
const marks = computed(() => {
  const temp: Marks = {};
  for (let i = 0; i < (score.value + 1) / 10; i++) {
    temp[i * 10] = '';
  }
  return temp;
});
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
};
const placeholder = computed(() => {
  if (title.value === TITLES[0]) {
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
const isFocuse = ref(false);
onMounted(() => {
  const textarea = document.getElementById('textarea-input');
  textarea!.addEventListener('focus', () => {
    isFocuse.value = true;
  });
  textarea!.addEventListener('blur', () => {
    isFocuse.value = false;
  });
});
// pop1 end
// pop2 start
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
      return isDark.value ? IconRobot_dark : IconRobot_light;
    }),
    text: '欧拉小智',
    tip: '提供自助问答与咨询',
    id: 'robot',
    link: 'https://qa-robot.openeuler.org/',
  },
  {
    img: computed(() => {
      return IconChat;
    }),
    text: '欧拉论坛',
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
]);
function handleClickTop() {
  window.scrollTo(0, 0);
}
function handleClickSubmit() {
  const params = {
    feedbackPageUrl: window.location.href,
    feedbackText: inputText.value,
    feedbackValue: score.value / 10,
  };
  postFeedback(params)
    .then(() => {
      ElMessage({
        message: '提交成功，感谢您的反馈！',
        type: 'success',
      });
    })
    .catch(() => {
      ElMessage({
        message: '提交失败，请刷新页面后重新提交！',
        type: 'warning',
      });
    });
  isReasonShow.value = false;
  inputText.value = '';
  score.value = 0;
}
</script>

<template>
  <div
    v-show="lang === 'zh' && isFloShow"
    class="float-wrap"
    :class="isDark ? 'dark-nav' : ''"
  >
    <div class="nav-box1">
      <div class="nav-item">
        <OIcon class="icon-box"><component :is="IconSmile"></component> </OIcon>
        <div class="o-popup1" :class="{ show: isReasonShow }">
          <OIcon class="icon-cancel" @click="cancelPopup">
            <IconCancel />
          </OIcon>
          <div class="slider">
            <p class="slider-title">{{ title }}</p>
            <div class="slider-body">
              <div class="slider-tip">
                <div v-show="isReasonShow" class="slide-btn-tip">
                  {{ scoreTip }}
                </div>
              </div>
              <el-slider
                v-model="score"
                :step="10"
                :marks="marks"
                show-stops
                :show-tooltip="false"
                @input="handleInput"
              />
            </div>
            <div class="grade-info">
              <span>{{
                title === TITLES[0] ? infoData.grade1 : infoData.grade1_1
              }}</span>
              <span>{{
                title === TITLES[0] ? infoData.grade2 : infoData.grade2_1
              }}</span>
            </div>
          </div>
          <div v-show="isReasonShow" class="reason">
            <div class="input-area" :class="{ 'is-focus': isFocuse }">
              <textarea
                id="textarea-input"
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
              <OButton type="outline" size="mini" @click="handleClickSubmit">
                {{ infoData.submit }}
              </OButton>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <OIcon class="icon-box"
          ><component :is="IconHeadset"></component>
        </OIcon>
        <div class="o-popup2">
          <div
            v-for="item in floatData"
            :key="item.link"
            class="pop-item"
            rel="noopener noreferrer"
          >
            <OIcon><component :is="item.img"></component> </OIcon>
            <div class="text">
              <p class="text-name">
                <a :href="item.link" target="_blank">{{ item.text }}</a>
              </p>
              <p class="text-tip">{{ item.tip }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-item nav-box2" @click="handleClickTop">
      <OIcon><component :is="IconTop"></component> </OIcon>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.float-wrap {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 200px;
  right: 40px;
  z-index: 10;

  @media screen and (max-width: 1200px) {
    display: none;
  }
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 48px;
    height: 48px;
    padding: 12px;
    background-color: var(--o-color-bg2);
    background-size: cover;
    font-size: 12px;
    line-height: 18px;
    color: var(--o-color-text1);
    position: relative;
    cursor: pointer;
    &:hover {
      .o-popup1 {
        transform: scale(1);
      }
      .o-popup2 {
        transform: scale(1);
      }
    }
    .icon-box {
      &:hover {
        color: var(--o-color-brand1);
      }
    }
    &:nth-of-type(1) + .nav-item::before {
      display: block;
      content: '';
      height: 1px;
      width: 16px;
      background-color: var(--o-color-bg4);
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%);
    }
    .o-icon {
      font-size: 24px;
    }
    .o-popup1 {
      position: absolute;
      width: 360px;
      top: 0;
      right: 64px;
      background-color: var(--o-color-bg2);
      padding: 16px 30px;
      transition: all 0.5s;
      transform: scale(0);
      transform-origin: 100% 50%;
      box-shadow: var(--o-shadow-l2);
      cursor: default;
      &.show {
        transform: scale(1);
      }
      .icon-cancel {
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        color: var(--o-color-text1);
      }
      .slider {
        .slider-title {
          font-size: var(--o-font-size-text);
          line-height: 20px;
          color: var(--o-color-text1);
          text-align: center;
        }
        .slider-body {
          padding-top: 30px;
          .slider-tip {
            position: relative;
            .slide-btn-tip {
              width: 28px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              font-size: var(--o-font-size-tip);
              color: var(--o-color-text1);
              background-color: var(--o-color-bg2);
              box-shadow: var(--o-shadow-l2);
              position: absolute;
              top: -30px;
              transform: translateX(-50%);
              left: v-bind(scorePosition);
              &::after {
                border-color: var(--o-color-bg2) transparent transparent;
                border-style: solid;
                border-width: 8px 8px 0;
                bottom: -5px;
                content: '';
                display: block;
                height: 0;
                position: absolute;
                right: 6px;
                width: 0;
              }
            }
          }
          :deep(.el-slider) {
            height: auto;
            height: 8px;
            .el-slider__runway {
              background-color: var(--o-color-bg-secondary);
            }
            .el-slider__bar {
              background-image: linear-gradient(
                90deg,
                #62b2f6 0%,
                #002fa7 100%
              );
            }
            .el-slider__button-wrapper + div {
              transform: translateY(2px);
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
              background-color: var(--o-color-bg6);
            }

            .el-slider__marks-stop {
              background-color: var(--o-color-bg2);
              &:nth-last-of-type(1) {
                display: none;
              }
            }
            .el-slider__button {
              position: relative;
              border: none;
              box-shadow: var(--o-shadow-l3);
              &::after {
                display: block;
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: var(--o-color-brand1);
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
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text4);
          margin-top: 14px;
        }
      }
      .reason {
        margin-top: 16px;
        .input-area {
          border: 1px solid var(--o-color-border2);
          padding: 8px 16px;
          height: 88px;
          font-size: var(--o-font-size-tip);
          line-height: 18px;
          position: relative;
          &:hover {
            border: 1px solid var(--o-color-border1);
          }
          &.is-focus {
            border: 1px solid var(--o-color-border1);
          }
          textarea {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            resize: none;
            background-color: var(--o-color-bg2);
            color: var(--o-color-text1);
          }
          p {
            text-align: right;
            color: var(--o-color-text4);
            position: absolute;
            right: 6px;
            bottom: 6px;
          }
        }
        .more-info {
          margin-top: 8px;
          color: var(--o-color-text4);
          font-size: var(--o-font-size-tip);
          line-height: 18px;
        }
        .submit-btn {
          margin-top: 16px;
          text-align: center;
          :deep(.o-button) {
            border-color: var(--o-color-border1);
            color: var(--o-color-text1);
            &:hover {
              background-color: var(--o-color-border1);
              color: var(--o-color-white);
            }
          }
        }
      }
    }
    .o-popup2 {
      position: absolute;
      top: 0;
      right: 64px;
      width: 240px;
      padding: 24px;
      background-color: var(--o-color-bg2);
      transition: all 0.5s;
      transform: scale(0);
      transform-origin: 100% 50%;
      box-shadow: var(--o-shadow-l2);
      cursor: default;
      .pop-item {
        display: flex;
        color: var(--o-color-text1);
        & ~ .pop-item {
          margin-top: 18px;
        }
        .o-icon {
          font-size: 32px;
        }
        .text {
          margin-left: 12px;
          text-align: left;
          .text-name {
            font-size: var(--o-font-size-text);
            line-height: 32px;
            font-weight: 600;
            a {
              color: var(--o-color-text1);
              &:hover {
                color: var(--o-color-brand1);
              }
            }
          }
          .text-tip {
            font-size: var(--o-font-size-tip);
            line-height: 18px;
            color: var(--o-color-text3);
          }
        }
      }
    }
  }
  .nav-box1 {
    box-shadow: var(--o-shadow-l1);
  }
  .nav-box2 {
    margin-top: 12px;
    box-shadow: var(--o-shadow-l1);
    &.nav-item {
      background-color: var(--o-color-bg2);
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
