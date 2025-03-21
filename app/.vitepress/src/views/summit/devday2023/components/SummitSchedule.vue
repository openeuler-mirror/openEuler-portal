<script lang="ts" setup>
import { ref } from 'vue';
import IconTime from '~icons/app/icon-time.svg';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => {
      return {
        title: '',
        content: [],
      };
    },
  },
});

// 控制分论坛的详情弹窗显示
const idSubItemShow: any = ref('');
const idShow: any = ref('');
function changeIndexShow(id: string, idItem: string) {
  idShow.value = id;
  idSubItemShow.value = idItem;
}
const otherTabType = ref(0);
</script>

<template>
  <div class="schedule">
    <h4>{{ agendaData.lable }}</h4>
    <span
      v-if="agendaData.lable.includes('TC开放工作会议')"
      class="go-etherpad"
    >
      <a
        href="https://etherpad.openeuler.org/p/odd2023-TC-Meeting"
        target="_blank"
        rel="noopener noreferrer"
        >点击此处</a
      >按要求填写议题需求
    </span>
    <span
      v-if="agendaData.lable.includes('SIG组开放工作会议')"
      class="go-etherpad"
    >
      <a
        href="https://etherpad.openeuler.org/p/ODD-2023-SIG-Meeting"
        target="_blank"
        rel="noopener noreferrer"
        >点击此处</a
      >并选择感兴趣的SIG组-Etherpad文件，按要求填写议题和参会信息
    </span>
    <div class="schedule-item other">
      <el-tabs
        v-if="agendaData.content[1]"
        v-model.number="otherTabType"
        class="other-tabs"
      >
        <el-tab-pane
          v-for="(itemList, scheduleIndex) in agendaData.content"
          :key="itemList.id"
          :name="scheduleIndex"
        >
          <template #label>
            <div class="time-tabs">
              {{ itemList.name }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div
        v-for="(itemList, listIndex) in agendaData.content"
        v-show="otherTabType == listIndex"
        :key="itemList.id"
        class="content"
      >
        <h4 v-if="itemList.title" class="other-title">
          {{ itemList.title }}
        </h4>
        <div class="content-list">
          <div
            v-for="subItem in itemList.content"
            :key="subItem.id"
            class="content-item"
            :class="{
              'show-detail':
                idSubItemShow === subItem.id && idShow === itemList.id,
            }"
          >
            <span class="time">
              <IconTime />
              {{ subItem.time }}
            </span>
            <span
              class="desc"
              :class="{ 'exit-detail': subItem.detail }"
              @click="changeIndexShow(itemList.id, subItem.id)"
            >
              <span
                v-for="item in subItem.desc.split('\n')"
                :key="item + '1'"
                >{{ item }}</span
              >
            </span>
            <div v-if="subItem.person[0]" class="name-box">
              <div v-for="personItem in subItem.person" :key="personItem.id">
                <span v-if="personItem.name" class="name">
                  {{ personItem.name }}
                </span>
                <span v-if="personItem.post" class="post">
                  {{ personItem.post }}
                </span>
              </div>
            </div>
            <div v-if="subItem.detail" class="detail">
              <p>
                <span>议题名称：</span
                ><span
                  ><span v-for="item in subItem.desc.split('\n')" :key="item">{{
                    item
                  }}</span></span
                >
              </p>
              <p v-if="subItem.detail">
                <span>议题简介：</span>
                <span>
                  <span v-for="item in subItem.detail.split('\n')" :key="item"
                    >{{ item }}
                  </span>
                </span>
              </p>
              <p v-if="subItem.person[0]">
                <span>发言人：</span>
                <span>
                  <span
                    v-for="personItem in subItem.person"
                    :key="personItem.id"
                    class="person-box"
                    >{{ personItem.name }}
                    <span v-if="personItem.post">{{ personItem.post }}</span>
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div
            v-show="idSubItemShow !== '' && idShow === itemList.id"
            class="mask"
            @click="changeIndexShow('', '')"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-button {
  border-radius: 0;
}
.schedule {
  margin-top: 20px;
  h4 {
    margin-top: 32px;
    text-align: center;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      margin-top: 24px;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .go-etherpad {
    display: block;
    margin-top: 18px;
    justify-content: center;
    text-align: center;
    color: var(--e-color-text1);
    @media screen and (max-width: 768px) {
      margin-top: 4px;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  .meeting-title {
    font-weight: 400;
    color: var(--e-color-text1);
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      line-height: 22px;
    }
  }
  :deep(.el-tabs) {
    .el-tabs__header.is-top .el-tabs__item.is-top {
      padding: 0;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }
  :deep(.el-tabs__header) {
    text-align: center;
    margin: 0;
  }

  .schedule-tabs {
    position: relative;
    text-align: center;
    margin-top: 24px;

    :deep(.el-tabs__nav-wrap) {
      display: flex;
      justify-content: center;
    }
    :deep(.el-tabs__content) {
      overflow: visible;
      .el-button {
        position: absolute;
        left: 0;
        top: -75px;
        z-index: 1;
      }
    }
    :deep(.el-tabs__nav) {
      .el-tabs__active-bar {
        display: none;
      }
      .el-tabs__item {
        padding: 0;
      }
    }
    .time-tabs {
      display: inline-block;
      cursor: pointer;
      border: 1px solid var(--e-color-border2);
      color: var(--e-color-text1);
      text-align: center;
      background: var(--e-color-bg2);
      font-size: 14px;
      line-height: 38px;
      padding: 0 16px;
      @media (max-width: 1100px) {
        line-height: 28px;
        font-size: 12px;
        padding: 0 12px;
      }
    }

    .is-active .time-tabs {
      color: #fff;
      background: var(--e-color-brand1);
      border-color: var(--e-color-brand1);
    }
  }
  .schedule-item {
    width: 100%;
    padding: 24px;
    background-color: var(--e-color-bg2);
    margin-top: var(--e-spacing-h4);
    @media (max-width: 1100px) {
      padding: 16px;
    }
    &.other {
      :deep(.el-tabs) {
        margin-bottom: 24px;
        .el-tabs__header.is-top .el-tabs__item.is-top {
          padding: 0px 20px 0px 0;
          @media (max-width: 1100px) {
            height: auto;
            padding: 0px 18px 0px 0;
            line-height: 22px;
          }
        }
        .el-tabs__nav {
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        .el-tabs__header {
          text-align: center;
          margin: 0;
          .el-tabs__item {
            @media (max-width: 1100px) {
              font-size: 12px;
              line-height: 18px;
            }
          }
        }
      }
      :deep(.el-tabs__nav-scroll) {
        color: var(--e-color-text1);
        display: flex;
        justify-content: center;
      }
      :deep(.is-scrollable) {
        .el-tabs__nav-scroll {
          display: block;
        }
      }
      :deep(.el-tabs__content) {
        overflow: visible;
        @media (max-width: 1100px) {
          margin-top: 16px;
        }
      }
      :deep(.el-tabs__nav) {
        @media (max-width: 1100px) {
          line-height: 44px;
        }
      }
      .other-text {
        margin: 24px auto 0 auto;
        color: var(--e-color-text1);
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 1100px) {
          font-size: 14px;
          line-height: 22px;
          margin: 16px 0;
        }
        svg {
          margin-right: 8px;
        }
      }
      .other-title {
        margin: 24px auto;
        color: var(--e-color-text1);
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: normal;
        @media (max-width: 1100px) {
          font-size: 14px;
          line-height: 22px;
          margin: 16px 0;
        }
      }
      .content-list {
        .detail {
          display: none;
        }
        .show-detail {
          .detail {
            display: block;
          }
        }
      }
      .exit-detail {
        cursor: pointer;
      }
    }
    .detail {
      display: none;
    }
    :deep(.time-tabs) {
      color: var(--e-color-text1);
      &:hover {
        color: var(--e-color-brand1);
      }
    }
    :deep(.is-active) {
      .time-tabs {
        color: var(--e-color-brand1);
      }
    }
  }
}
.content-list {
  @media screen and (max-width: 1100px) {
    position: relative;
  }
  .content-item {
    display: grid;
    grid-template-columns: 192px 580px 445px;
    // border-bottom: 1px solid var(--e-color-border2);
    padding: 20px 0px;
    transition: all 0.25s ease;
    align-items: center;
    min-height: 64px;
    position: relative;
    & + .content-item {
      border-top: 1px solid var(--e-color-border2);
    }
    @media screen and (max-width: 1328px) {
      grid-template-columns: 192px 450px 400px;
    }
    @media screen and (max-width: 1100px) {
      grid-template-columns: 80px auto;
      padding: 6px 0;
      min-height: 36px;
      position: static;
    }
    // &:hover {
    //   background-color: var(--e-color-bg4);
    // }
    .name-box {
      @media screen and (max-width: 1100px) {
        grid-column-end: 3;
      }
      div {
        display: flex;
        align-items: center;
        @media screen and (max-width: 1100px) {
          grid-column-start: 2;
          grid-column-end: 3;
          display: block;
        }
      }
    }
    .del-content {
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 12px;
    }
    .desc {
      font-size: 18px;
      line-height: 30px;
      color: var(--e-color-text1);
      display: block;
      margin-right: 36px;
      cursor: default;
      > span {
        display: block;
        & ~ span {
          margin-top: var(--e-spacing-h6);
        }
      }
      @media (max-width: 1100px) {
        margin-right: 0;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .name {
      min-width: 200px;
      display: inline-block;
      color: var(--e-color-text3);
      font-size: 16px;
      line-height: var(--e-line-height-h8);
      @media (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
      }
    }
    .post {
      width: 100%;
      display: inline-block;
      color: var(--e-color-text3);
      font-size: 16px;
      line-height: 24px;
      // word-break: keep-all;
      flex: 1;
      @media (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
      }
    }
    .post-more {
      width: 345px;
      @media screen and (max-width: 1100px) {
        width: 100%;
      }
    }
    .time {
      width: 192px;
      font-size: 18px;
      line-height: 26px;
      color: var(--e-color-text3);
      display: flex;
      align-items: center;
      @media screen and (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
        width: 80px;
      }
      svg {
        width: 18px;
        height: 18px;
        color: var(--e-color-text3);
        margin-right: 6px;
        @media screen and (max-width: 1100px) {
          display: none;
        }
      }
    }
    .info .desc {
      width: 460px;
      margin-right: 40px;
      display: inline-block;
    }
    .detail {
      width: 75%;
      padding: 40px;
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
      background-color: var(--e-color-bg2);
      box-shadow: var(--e-shadow-l4);
      max-height: 300px;
      overflow: auto;
      @media (max-width: 1100px) {
        padding: 24px;
        top: 50% !important;
        transform: translateX(-50%) translateY(-50%);
      }
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      // display: none;
      p {
        display: flex;
        & + p {
          margin-top: 8px;
        }
        > span {
          font-size: 14px;
          line-height: 22px;
          color: var(--e-color-text1);
          display: inline-block;
          @media (max-width: 1100px) {
            font-size: 12px;
            line-height: 18px;
          }
          &:nth-of-type(1) {
            display: inline-block;
            width: 110px;
            @media (max-width: 1100px) {
              width: 80px;
            }
          }
          &:nth-of-type(2) {
            flex: 1;
            > span {
              display: block;
            }
          }
          .detail-text {
            display: block;
          }
        }
      }
    }
    &:nth-last-of-type(1),
    &:nth-last-of-type(2),
    &:nth-last-of-type(3) {
      .detail {
        top: auto;
        bottom: 70%;
        @media (max-width: 1100px) {
          top: auto;
          bottom: auto;
        }
      }
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .sub-container {
    .content-item {
      grid-template-columns: 192px auto 96px 410px;
    }
  }
}
</style>
