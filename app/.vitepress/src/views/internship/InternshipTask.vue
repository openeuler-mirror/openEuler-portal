<script lang="ts" setup>
import { useRouter } from 'vitepress';
import IconArrowRight from '~icons/app/icon-arrow-right';
import Task from '@/data/intership/intership-task';

const router = useRouter();
const jumpTo = (path: string) => {
  if (path && !path.includes('http')) {
    router.go(path);
  } else if (path.includes('http')) {
    window.open(path);
  } else {
    return false;
  }
};
</script>

<template>
  <div class="openeuler-task">
    <p class="task-introduce">{{ Task.INSTRODUCE }}</p>
    <div class="item-box">
      <div
        v-for="(item, index) in Task.EULER_TASK_ITEM"
        :key="index"
        class="item"
      >
        <p class="item-name" @click="jumpTo(item.NAME_LINK)">
          {{ item.NAME }}
        </p>
        <div class="item-intriduce" :class="{ more: item.more }">
          {{ item.INTRODUCE }}
        </div>
        <div class="button-box">
          <OButton
            v-if="item.TASK"
            type="primary"
            class="task-link"
            @click="jumpTo(item.TASK)"
            >{{ Task.INTERNSHIP_TASK }}
            <OIcon><IconArrowRight /></OIcon>
          </OButton>
          <OButton
            v-if="item.GITEE"
            type="text"
            placement="right"
            class="sig-detail"
            @click="jumpTo(item.GITEE)"
          >
            <span>{{ Task.SIG_DETAIL }}</span>
            <OIcon><IconArrowRight /></OIcon>
          </OButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.openeuler-task {
  .task-introduce {
    font-size: 20px;
    line-height: 40px;
    color: var(--e-color-text4);
    @media (max-width: 1000px) {
      text-align: left;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  .item-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 30px;
    @media (max-width: 1440px) {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 16px;
    }
    @media screen and (min-width: 768px) and (max-width: 1440px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 780px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
    @media (max-width: 1000px) {
      .item:nth-child(n) {
        width: 100%;
        padding: 16px;
        position: relative;
        min-height: 160px;
        .item-intriduce {
          width: 100%;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          margin-bottom: 0;
        }
        .button-box {
          justify-content: inherit;
          gap: 16px;
          position: absolute;
          bottom: var(--e-spacing-h5);
          left: var(--e-spacing-h5);
        }
      }
    }
    .item {
      padding: 40px;
      background-color: var(--e-color-bg2);
      box-shadow: var(--e-shadow-l2);
      transition: box-shadow 0.1s;
      min-height: 180px;
      .item-name {
        color: var(--e-color-brand1);
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        @media (max-width: 1000px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .item-intriduce {
        padding-top: 8px;
        margin-bottom: 20px;
        height: 70px;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: var(--e-color-text4);
      }
      .more {
        font-size: 20px;
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .button-box {
        display: flex;
        align-items: center;
        white-space: nowrap;
        .o-button {
          padding: 8px 12px;
          height: auto;
          margin-right: 24px;
          white-space: nowrap span {
            color: var(--e-color-brand1);
          }
          &:nth-of-type(2) {
            margin-right: 0;
          }
          @media (max-width: 1000px) {
            padding: 3px 16px;
            font-size: var(--e-font-size-tip);
            margin-right: 0;
          }
          .o-icon {
            color: var(--e-color-brand1);
            margin-left: 8px;
            transition: all 0.3s;
          }
          &:hover .o-icon {
            @media screen and (min-width: 1100px) {
              transform: translateX(3px);
            }
          }
          &:nth-of-type(1) {
            color: #fff;
          }
        }
        .task-link {
          .o-icon {
            color: #fff;
          }
        }
        .sig-detail {
          &:hover {
            @media screen and (min-width: 1100px) {
              border: 1px solid var(--e-color-brand1);
              span {
                color: var(--e-color-brand1);
              }
            }
          }
        }
        .o-button--text {
          color: var(--e-color-text1);
          padding: 8px 12px !important;
          height: auto;
          &:hover {
            @media screen and (min-width: 1100px) {
              .o-icon {
                color: var(--e-color-brand2);
              }
            }
          }
          .o-icon {
            color: var(--e-color-brand1);
          }
        }
      }
    }

    .item:hover {
      @media screen and (min-width: 1100px) {
        box-shadow: var(--e-shadow-l2_hover);
      }
    }
  }
}
</style>
