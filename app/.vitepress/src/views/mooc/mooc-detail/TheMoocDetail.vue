<script setup lang="ts">
import { onMounted, ref, onUpdated, computed, onUnmounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import VideoCtrl from '@/components/VideoCtrl.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';
import NavTree from '@/components/NavTree.vue';

import IconArrowLeft from '~icons/app/icon-arrow-left.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/mooc/catalog.svg';

import logo_light from '@/assets/common/header/logo.png';
import logo_dark from '@/assets/common/header/logo_dark.png';
import video_bg_light from '@/assets/category/mooc/video-bg-light.png';
import video_bg_dark from '@/assets/category/mooc/video-bg-dark.png';

import type {
  TeacherItem,
  NodeItem,
  VideoObj,
} from '@/shared/@types/type-mooc';

const i18n = useI18n();
const router = useRouter();
const language = useData().lang;
const commonStore = useCommon();
const screenWidth = useWindowResize();

const moocData = computed(() => i18n.value.mooc);

const isNowPlay = ref(false);
const defaultProps = ref({
  children: 'children',
  label: 'label',
});
// 导航栏目录数据
const menuDataList: any = ref([]);
// 当前选中节点内容
const currentNode = ref({
  title: '',
  ppt: '',
  desc: '',
  video: '',
  key: '',
});
const teacherList = ref<TeacherItem[]>([]);
const introductionTextList = ref([]);
const allNodeList = ref<NodeItem[]>([]);
const courseH1 = ref('');
const welcomeStr = ref('');
const courseIndex = ref(0);
// 控制移动端二级导航展开收起
const isShowMenu = ref(false);
const treeRef: any = ref(null);
const playctrlEleRef: any = ref(null);
const videoMobileRef: any = ref(null);
// 操作视频控制对象
const ctrlObj = ref<VideoObj>();
// 确定介绍文字中的标题下标
const listTitleIndex = ref(0);
const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});
const videoBg = computed(() => {
  return commonStore.theme === 'light' ? video_bg_light : video_bg_dark;
});
const videoBgShow = ref(true);
onMounted(() => {
  getContent();
  teacherList.value = menuDataList.value[0].teacher;
  allNodeList.value = getCoursePath(menuDataList.value);
  if (screenWidth.value > 1400) {
    ctrlObj.value = {
      element: document.getElementById('pc-video'),
      isShow: true,
      barWidth: 700,
    };
  } else {
    ctrlObj.value = {
      element: document.getElementById('pc-video'),
      isShow: true,
      barWidth: 432,
    };
  }
  try {
    courseIndex.value =
      JSON.parse(sessionStorage.getItem('courseIndex') || '0') * 1;
  } catch (error: any) {
    console.error(error);
  }
  setCourseData(allNodeList.value[courseIndex.value]);
});
onUpdated(() => {
  setCheckedNode();
});
function toggleMenu(flag: boolean) {
  isShowMenu.value = flag;
}
// 设置选中节点
function setCheckedNode() {
  if (treeRef.value) {
    treeRef.value.tree.tree.setCurrentKey(currentNode.value.key);
  }

  // refs.tree.tree.tree.setCurrentKey(currentNode.value.key);
}
// 读取要渲染的课程内容数据
function getContent() {
  const listData = moocData.value.MOOC_DATA.COURSE_LIST;
  listData.forEach((item: any) => {
    menuDataList.value = item.NAV_DATA;
    courseH1.value = item.COURSE_H1;
    welcomeStr.value = item.WELCOME;
  });
}
// 控制视频的播放和暂停
function checkStatus(status: boolean) {
  videoBgShow.value = false;
  if (status === true) {
    isNowPlay.value = true;
  } else {
    isNowPlay.value = false;
  }
}
// 导航栏点击事件
function handleNodeClick(obj: NodeItem) {
  if (obj.introduction || obj.desc) {
    if (screenWidth.value < 1100) {
      toggleMenu(false);
    }
    setCourseData(obj);
  }
}
// 读取所有文档节点
function getCoursePath(menuDataList: any) {
  menuDataList.forEach((item: any) => {
    delete item.video_link
    delete item.desc
    delete item.ppt_link
    if (item.children && item.children.length) {
      getCoursePath(item.children);
    } else {
      allNodeList.value.push(item);
    }
  });
  return allNodeList.value;
}
// 点击视频播放按钮播放视频并隐藏该按钮,option:webBtn(pc端操作)、mobileBtn(移动端操作)
function playMoocVideo(option: string) {
  videoBgShow.value = false;
  if (option === 'webBtn') {
    playctrlEleRef.value.isPlay = true;
  } else if (option === 'mobileBtn') {
    videoMobileRef.value.play();
    isNowPlay.value = true;
  }
}
// 根据上下页操作改变激活节点及显示内容
function setTitleAndIndex(arr: any, option: string) {
  isNowPlay.value = false;
  arr.forEach((item: any, index: number) => {
    if (
      item.key === currentNode.value.key &&
      index !== 0 &&
      option === 'prev'
    ) {
      currentNode.value.title = arr[index - 1].label;
      courseIndex.value = index - 1;
    } else if (item.key === currentNode.value.key && option === 'next') {
      currentNode.value.title = arr[index + 1].label;
      courseIndex.value = index + 1;
    } else {
      return false;
    }
  });
}
// 根据激活节点显示的内容obj(读取的数据)
function setCourseData(obj: any) {
  if (obj.introduction) {
    introductionTextList.value = obj.introduction;
    currentNode.value.title = obj.label;
    currentNode.value.key = obj.key;
    currentNode.value.desc = '';
    setCheckedNode();
    setListTitleIndex();
    if (obj.ppt_link) {
      currentNode.value.ppt = obj.ppt_link;
    } else {
      currentNode.value.ppt = '';
    }
  } else if (obj.desc) {
    introductionTextList.value = [];
    currentNode.value.title = obj.label;
    currentNode.value.ppt = obj.ppt_link;
    currentNode.value.desc = obj.desc;
    currentNode.value.video = obj.video_link;
    currentNode.value.key = obj.key;
    if (playctrlEleRef.value) {
      playctrlEleRef.value.isPlay = false;
      playctrlEleRef.value.barPercentage = 0;
    }
    videoMobileRef.value ? (videoMobileRef.value.isPlay = false) : '';
    setCheckedNode();
    listTitleIndex.value = 0;
  } else {
    return false;
  }
  setCourseIndex();
}
// 保存当前所在页面防止刷新从第一页渲染
function setCourseIndex() {
  allNodeList.value.forEach((item: NodeItem, index: number) => {
    if (item.key === currentNode.value.key) {
      courseIndex.value = index;
      sessionStorage.setItem('courseIndex', JSON.stringify(courseIndex.value));
    }
  });
}
// 设置介绍文字中的标题下标
function setListTitleIndex() {
  introductionTextList.value.forEach((item: string, index: number) => {
    if (item.indexOf('：') !== -1) {
      listTitleIndex.value = index;
      return;
    }
  });
}
// 上一页
function previous() {
  setTitleAndIndex(allNodeList.value, 'prev');
  videoBgShow.value = true;
  currentNode.value.key = allNodeList.value[courseIndex.value].key;
  setCourseData(allNodeList.value[courseIndex.value]);
}
// 下一页
function next() {
  setTitleAndIndex(allNodeList.value, 'next');
  //最后一章则无下一篇
  if (courseIndex.value === allNodeList.value.length - 1) {
    return false;
  } else {
    videoBgShow.value = true;
    currentNode.value.key = allNodeList.value[courseIndex.value].key;
  }
  setCourseData(allNodeList.value[courseIndex.value]);
}
// 卸载时将文档位置回归到第一个
onUnmounted(() => {
  sessionStorage.setItem('courseIndex', '0');
});
// 返回首页
const goHome = () => {
  router.go(`/${language.value}/`);
};
const iconMenuShow = computed(() => {
  return commonStore.iconMenuShow;
});
</script>
<template>
  <AppContent :pc-top="40" :mobile-top="16">
    <div class="mooc-detail">
      <div v-if="screenWidth < 1100" class="detail-mobile">
        <OIcon v-show="iconMenuShow" class="catalog" @click="toggleMenu(true)"
          ><IconCatalog
        /></OIcon>
        <ClientOnly>
          <ODrawer
            v-model="isShowMenu"
            direction="ltr"
            size="268px"
            :show-close="false"
          >
            <div class="nav-tree">
              <div class="nav-top">
                <img
                  class="logo"
                  :src="logo"
                  alt="openEuler logo"
                  @click="goHome"
                />
                <OIcon @click="toggleMenu(false)"><IconCancel /></OIcon>
              </div>
              <NavTree
                ref="treeRef"
                :node-key="'key'"
                :data="menuDataList"
                :default-props="defaultProps"
                @node-click="handleNodeClick"
              />
            </div>
          </ODrawer>
        </ClientOnly>
        <BreadCrumbs
          :bread1="moocData.MOOC.MOOC"
          :bread2="moocData.MOOC.MOOC_COURSE[0].TITLE"
          link1="/zh/learn/mooc/"
          class="bread"
        />
        <div class="content-mobile">
          <h1>{{ courseH1 }}</h1>
          <p class="entry-welcome">{{ welcomeStr }}</p>
          <div class="infomation">
            <p :key="currentNode.title" class="title">
              {{ currentNode.title }}
            </p>
            <p class="desc">{{ currentNode.desc }}</p>
            <a
              v-show="currentNode.ppt"
              :href="currentNode.ppt"
              :download="currentNode.ppt"
              class="download"
            >
              <OButton type="primary" size="mini">
                {{ moocData.MOOC.COURSE_DOWNLOAD }}
                <template #suffixIcon>
                  <OIcon><IconArrowRight /></OIcon>
                </template>
              </OButton>
            </a>
          </div>
          <div v-show="introductionTextList.length" class="text">
            <p
              v-for="(item, index) in introductionTextList"
              :key="item"
              :class="[
                courseIndex === 0 && index === 0 ? 'welcome' : '',
                listTitleIndex !== 0 && listTitleIndex === index ? 'list1' : '',
              ]"
            >
              {{ item }}
            </p>
            <div v-if="currentNode.key === 'introduction0'" class="teacher">
              <p>{{ moocData.MOOC.TEACHER_TEAM }}</p>
              <div v-for="item in teacherList" :key="item.name" class="item">
                <img :src="item.img" alt="" />
                <div>
                  <p>{{ item.position }}</p>
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!introductionTextList.length" class="video">
            <video
              ref="videoMobileRef"
              :src="currentNode.video"
              loop
              style="width: 100%"
            ></video>
            <div
              v-if="videoBgShow"
              class="video-bg"
              :style="{ backgroundImage: 'url(' + videoBg + ')' }"
            ></div>
            <div
              v-if="!isNowPlay"
              class="play-btn"
              @click="playMoocVideo('mobileBtn')"
            ></div>
          </div>
          <div class="menu-mobile">
            <div class="prev" @click="previous">
              <OIcon><IconArrowLeft /></OIcon>
              <span>{{ moocData.MOOC.PREV_TEXT }}</span>
            </div>
            <div class="next" @click="next">
              <span>{{ moocData.MOOC.NEXT_TEXT }}</span>
              <OIcon><IconArrowRight /></OIcon>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="detail-pc">
        <BreadCrumbs
          :bread1="moocData.MOOC.MOOC"
          :bread2="moocData.MOOC.MOOC_COURSE[0].TITLE"
          link1="/zh/learn/mooc/"
        />
        <h1>{{ courseH1 }}</h1>
        <p class="entry-welcome">{{ welcomeStr }}</p>
        <div class="content">
          <div class="article-nav fl">
            <div class="nav-top">{{ moocData.MOOC.MOOC_CATALOG }}</div>
            <NavTree
              ref="treeRef"
              :node-key="'key'"
              :data="menuDataList"
              :default-props="defaultProps"
              @node-click="handleNodeClick"
            />
          </div>
          <div class="article-detail fl">
            <div class="infomation">
              <div>
                <p class="infomation-title">
                  <span :key="currentNode.title" class="title">{{
                    currentNode.title
                  }}</span>
                  <a
                    v-show="currentNode.ppt"
                    :href="currentNode.ppt"
                    :download="currentNode.ppt"
                    class="download"
                  >
                    <OButton type="primary" size="mini">
                      {{ moocData.MOOC.COURSE_DOWNLOAD }}
                    </OButton></a
                  >
                </p>
                <p class="desc">{{ currentNode.desc }}</p>
              </div>
            </div>
            <div v-show="introductionTextList.length" class="text">
              <p
                v-for="(item, index) in introductionTextList"
                :key="item"
                :class="[
                  courseIndex === 0 && index === 0 ? 'welcome' : '',
                  listTitleIndex !== 0 && listTitleIndex === index
                    ? 'list1'
                    : '',
                ]"
              >
                {{ item }}
              </p>
              <div v-if="currentNode.key === 'introduction0'" class="teacher">
                <p>{{ moocData.MOOC.TEACHER_TEAM }}</p>
                <div class="techer-img">
                  <div
                    v-for="item in teacherList"
                    :key="item.name"
                    class="item"
                  >
                    <img :src="item.img" alt="" />
                    <div>
                      <p class="name">{{ item.name }}</p>
                      <p class="position">{{ item.position }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="!introductionTextList.length" class="video">
              <video
                id="pc-video"
                :src="currentNode.video"
                loop
                style="width: 100%"
              ></video>
              <div
                v-if="videoBgShow"
                class="video-bg"
                :style="{ backgroundImage: 'url(' + videoBg + ')' }"
              ></div>
              <VideoCtrl
                ref="playctrlEleRef"
                :ctrl-obj="ctrlObj"
                @play-status="checkStatus"
              ></VideoCtrl>
              <div
                v-if="!isNowPlay"
                class="play-btn"
                @click="playMoocVideo('webBtn')"
              ></div>
            </div>
            <div class="crtl-btn">
              <div class="prev" @click="previous">
                <OIcon>
                  <IconArrowLeft />
                </OIcon>
                <span>{{ moocData.MOOC.PREV_TEXT }}</span>
              </div>
              <div class="next" @click="next">
                <span>{{ moocData.MOOC.NEXT_TEXT }}</span>
                <OIcon>
                  <IconArrowRight />
                </OIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.mooc-detail {
  width: 100%;
  .detail-pc {
    display: block;
    overflow: hidden;
    h1 {
      width: 100%;
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      margin-top: var(--o-spacing-h2);
    }
    .entry-welcome {
      font-size: var(--o-font-size-text);
      line-height: 22px;
      color: var(--o-color-text1);
      margin-top: var(--o-spacing-h8);
    }
    .back {
      cursor: pointer;
      font-size: 20px;
      color: #002fa7;
      line-height: 20px;
      width: 100%;
      margin: 28px auto 16px auto;
    }
    .content {
      width: 100%;
      margin-top: var(--o-spacing-h2);
      display: flex;
      align-items: flex-start;
      .article-nav {
        margin-right: 60px;
        background: var(--o-color-bg2);
        box-shadow: var(--o-shadow-l1);
        border-radius: 8px;
        .nav-top {
          width: 360px;
          height: 56px;
          background: var(--o-color-bg2);
          font-size: 18px;
          line-height: 60px;
          color: var(--o-color-text1);
          padding-left: var(--o-spacing-h4);
          font-weight: bold;
        }
      }
      .article-detail {
        max-width: 864px;
        .infomation {
          padding-bottom: 30px;
          border-bottom: 1px solid var(--o-color-division1);
          & > div {
            &:first-of-type {
              .desc {
                font-size: var(--o-font-size-text);
                color: var(--o-color-text1);
                line-height: 22px;
                margin-top: 20px;
              }
              .title {
                font-size: var(--o-font-size-h5);
                line-height: var(--o-line-height-h5);
                font-weight: 600;
                color: var(--o-color-text1);
              }
              .download {
                :deep(.o-button) {
                  padding: 3px 24px;
                }
                :deep(.o-button.o-button-type-primary) {
                  color: #ffffff;
                }
              }
            }
          }
          .infomation-title {
            max-width: 864px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        .video {
          width: 864px;
          height: 552px;
          min-width: 60%;
          position: relative;
          padding: 30px 0;
          border-bottom: 1px solid var(--o-color-division1);
          @media (max-width: 1400px) {
            width: 560px;
            height: 375px;
          }
          .video-bg {
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            height: calc(100% - 58px);
            background-size: 100% 100%;
          }
          :deep(.playControll) {
            display: none;
            @media (max-width: 1400px) {
              bottom: 30px !important;
            }
          }
          .big-controll {
            bottom: 34px;
          }
          .play-btn {
            width: 50px;
            height: 50px;
            position: absolute;
            border-radius: 50%;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -10px -25px;
            background-image: url('@/assets/category/mooc/video-ctrl/play.png');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
          }
          &:hover {
            .playControll {
              display: block;
            }
          }
        }
        .text {
          font-size: var(--o-font-size-text);
          line-height: 22px;
          padding: var(--o-spacing-h2) 0;
          color: var(--o-color-text4);
          border-bottom: 1px solid var(--o-color-division1);
          .teacher {
            margin-top: 20px;
            & > p {
              font-size: 14px;
              color: var(--o-color-text4);
              margin-bottom: 10px;
              line-height: 36px;
              &:nth-of-type(1) {
                font-size: var(--o-font-size-h8);
                line-height: var(--o-line-height-h8);
                font-weight: 600;
                color: var(--o-color-text1);
              }
            }
            .techer-img {
              display: flex;
              flex-wrap: wrap;
              .item {
                min-width: 197px;
                display: flex;
                flex-direction: row;
                margin-bottom: 20px;
                margin-right: var(--o-spacing-h2);
                img {
                  display: block;
                  width: 120px;
                  height: 120px;
                  margin-right: 20px;
                  border-radius: 50%;
                }
                .name {
                  font-size: var(--o-font-size-h7);
                  line-height: var(--o-line-height-h7);
                  color: var(--o-color-text1);
                  margin-top: 30px;
                }
                .position {
                  font-size: 14px;
                  line-height: 22px;
                  color: var(--o-color-text4);
                  margin-top: 3px;
                }
              }
            }
          }
          .welcome {
            color: var(--o-color-text1);
            font-size: 18px;
            font-weight: 300;
            margin-bottom: var(--o-spacing-h5);
          }
          .list1 {
            margin: var(--o-spacing-h5) 0;
          }
        }
        .crtl-btn {
          margin-top: 24px;
          position: relative;
          height: 30px;
          .prev,
          .next {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: var(--o-font-size-text);
            line-height: 22px;
            font-weight: 400;
            position: absolute;
            color: var(--o-color-text1);
            .o-icon {
              font-size: var(--o-font-size-h8);
              color: var(--o-color-brand1);
            }
            span:nth-of-type(1) {
              margin-right: 8px;
            }
            &:hover {
              color: var(--o-color-brand2);
              .o-icon {
                color: var(--o-color-brand2);
              }
            }
          }
          .prev {
            left: 0;
            top: 0;
          }
          .next {
            right: 0;
            top: 0;
          }
        }
      }
    }
  }
  .detail-mobile {
    @media screen and (max-width: 1100px) {
      display: block;
      .catalog {
        position: fixed;
        top: 12px;
        left: 48px;
        z-index: 99;
        font-size: 24px;
        color: var(--o-color-text1);
        cursor: pointer;
      }
      .menu-mobile {
        width: 100%;
        padding: var(--o-spacing-h5) 0 0 0;
        display: flex;
        justify-content: space-between;
        .prev,
        .menu,
        .next {
          font-size: 14px;
          font-weight: 400;
          color: var(--o-color-brand1);
          line-height: 20px;
          cursor: pointer;
        }
        .prev {
          span:nth-of-type(2) {
            color: var(--o-color-text1);
            margin-left: var(--o-spacing-h8);
            position: relative;
            top: -2px;
          }
        }
        .next {
          span:nth-of-type(1) {
            color: var(--o-color-text1);
            margin-right: var(--o-spacing-h8);
            position: relative;
            top: -2px;
          }
        }
      }
      .content-mobile {
        width: 100%;
        margin-top: var(--o-spacing-h5);
        padding: var(--o-spacing-h5);
        background-color: var(--o-color-bg2);
        h1 {
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          color: var(--o-color-text1);
          font-weight: 500;
        }
        .entry-welcome {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--o-color-text1);
          margin-top: var(--o-spacing-h8);
        }
        .infomation {
          margin-top: var(--o-spacing-h5);
          .title {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
            font-weight: 600;
          }
          .desc {
            font-size: 12px;
            color: var(--o-color-text1);
            line-height: 20px;
            margin-top: var(--o-spacing-h8);
          }
          .download {
            display: block;
            width: 100px;
            margin-top: var(--o-spacing-h5);
            :deep(.o-icon) {
              position: relative;
              top: -1px;
            }
            :deep(.o-button.o-button-size-mini) {
              color: #ffffff;
            }
          }
        }
        .text {
          p {
            font-size: 14px;
            color: var(--o-color-text1);
            line-height: 24px;
          }
          .teacher {
            margin-top: 16px;
            & > p {
              color: var(--o-color-text1);
            }
            .item {
              display: flex;
              flex-direction: row;
              margin: 16px 0 0 0;
              img {
                display: block;
                width: 50px;
                height: 50px;
                margin-right: 12px;
                border-radius: 50%;
              }
              div {
                p {
                  font-size: 12px;
                  color: var(--o-color-text1);
                  line-height: 16px;
                  &:last-of-type {
                    color: var(--o-color-text1);
                    margin-top: 10px;
                  }
                }
              }
            }
          }
          .welcome {
            color: var(--o-color-brand1);
            margin-bottom: var(--o-spacing-h5);
          }
        }
        .text,
        .video {
          border-top: 1px solid var(--o-color-division1);
          border-bottom: 1px solid var(--o-color-division1);
          padding: var(--o-spacing-h5) 0;
          margin-top: var(--o-spacing-h5);
          position: relative;
          .play-btn {
            width: 50px;
            height: 50px;
            position: absolute;
            border-radius: 50%;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -35px -25px;
            background-image: url('@/assets/category/mooc/video-ctrl/play.png');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
          }
          .video-bg {
            position: absolute;
            top: 16px;
            left: 0;
            width: 100%;
            height: calc(100% - 32px);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .nav-tree {
    position: fixed;
    left: 0;
    top: 0;
    width: 268px;
    height: 100vh;
    background: var(--o-color-bg2);
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 999;
    .nav-top {
      width: 100%;
      background: var(--o-color-bg2);
      font-size: 14px;
      line-height: 22px;
      color: var(--o-color-text1);
      padding: var(--o-spacing-h5);
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        height: 24px;
        cursor: pointer;
      }
      :deep(.o-icon) {
        padding: 12px;
        cursor: pointer;
        font-size: var(--o-font-size-h5);
      }
    }
  }
}
</style>
