<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';

import { CityItemT } from '@/shared/@types/type-usergroup';
import { useScreen } from '@/shared/useScreen';
import { useCommon } from '@/stores/common';

import IconEmail from '~icons/mooc/icon-email.svg';
import IconUserGroup from '~icons/mooc/icon-user-group.svg';

defineProps({
  options: {
    type: Array as PropType<Array<CityItemT>>,
    default() {
      return [];
    },
  },
  title: {
    type: String,
    default() {
      return '';
    },
  },
});

const { gtPad } = useScreen();
const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<template>
  <div class="member-panel" :class="title.toLocaleLowerCase()">
    <div class="member-header">
      <h3 class="title">{{ title }}</h3>
    </div>
    <div class="member-content">
      <div
        v-for="item in options"
        :key="item.name"
        class="member-item"
        :class="[title.toLocaleLowerCase(), isLight ? 'light' : 'dark']"
      >
        <div class="info">
          <div class="name-info">
            <span class="name">{{ item.name }}</span>
            <template v-if="item.contribution && gtPad">
              <el-popover
                width="336px"
                :effect="isLight ? 'light' : 'dark'"
                placement="top"
              >
                <template #reference>
                  <OIcon>
                    <IconUserGroup />
                  </OIcon>
                </template>
                <template #default>
                  <div class="member-contribution">
                    <p class="title">贡献</p>
                    <div class="text">
                      {{ item.contribution }}
                    </div>
                  </div>
                </template>
              </el-popover>
            </template>
          </div>
          <p v-if="item.position" class="position">{{ item.position }}</p>
          <p v-if="item.homePage && title === 'Ambassador'" class="homePage">
            <a :href="item.homePage" target="_blank" rel="noopener noreferrer"
              >个人主页</a
            >
          </p>
          <p v-if="item.email && title === 'Organizer'" class="email">
            <a
              :href="`mailto:` + item.email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OIcon><IconEmail /></OIcon>
            </a>
          </p>
          <div
            v-if="item.technology && item.technology.length > 0"
            class="technology"
          >
            <OTag
              v-for="(tag, index) in item.technology"
              :key="'tag' + index"
              type="primary"
              size="small"
            >
              {{ tag }}
            </OTag>
          </div>
        </div>
        <div class="avatar">
          <template v-if="title.toLocaleLowerCase() !== 'member'">
            <img :src="isLight ? item.avatar : item.avatarDark" />
          </template>
          <template v-else>
            <img :src="item.avatar" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-popover) {
  .el-popover__title {
    color: var(--o-color-text1);
    font-weight: bold;
  }
}
.member-contribution {
  .title {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    color: var(--o-color-text1);
    margin-bottom: 4px;
  }
  .text {
    height: 72px;
    color: var(--o-color-text3);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    overflow-y: auto;
    @include scrollbar;
  }
}
.member-panel {
  margin-bottom: 24px;
  .member-header {
    position: relative;
    height: 48px;
    @media screen and (max-width: 768px) {
      height: 40px;
    }
    &::after {
      background: var(--o-color-brand1);
      opacity: 0.1;
      content: '';
      position: absolute;
      left: 32px;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  .title {
    background: url(@/assets/category/user-group/title-bg.png) no-repeat left
      center/contain;
    position: relative;
    z-index: 2;
    line-height: 48px;
    font-size: var(--o-font-size-h5);
    color: #fff;
    width: 246px;
    text-align: center;
    font-weight: 500;
    @media screen and (max-width: 768px) {
      line-height: 40px;
      width: 204px;
      font-size: var(--o-font-size-h6);
    }
  }
  .member-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 24px;
    @media screen and (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 768px) {
      gap: 16px;
      grid-template-columns: repeat(1, 1fr);
    }

    .member-item {
      box-shadow: var(--o-shadow-l1);
      min-height: 184px;
      position: relative;
      background: var(--o-color-bg2) no-repeat no-repeat right bottom;
      &.organizer {
        .avatar {
          width: 274px;
          height: 140px;
        }
      }
      &.ambassador {
        .avatar {
          width: 197px;
          height: 132px;
        }
      }

      .avatar {
        height: 134px;
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .name-info {
      display: flex;
      align-items: center;
      .o-icon {
        margin-left: 6px;
        cursor: pointer;
        color: var(--o-color-text1);
        &:hover {
          color: var(--o-color-brand1);
        }
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
    .name {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      color: var(--o-color-text1);
    }
    .info {
      padding: 24px;
      position: relative;
      z-index: 9;
      height: 100%;

      @media screen and (max-width: 1100px) {
        padding: 16px;
      }
      .position {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text4);
        margin-top: 4px;
        max-width: 185px;
      }
      .technology {
        margin-top: 4px;
        max-width: 185px;
        :deep(.o-tag) {
          background: var(--o-color-bg1);
          border: 0 none;
          border-radius: 12px;
          color: var(--o-color-text1);
          margin-right: 8px;
          margin-top: 8px;
        }
      }
      .email .o-icon {
        font-size: 24px;
        color: var(--o-color-brand1);
      }
      .homePage,
      .email {
        position: absolute;
        bottom: 24px;
        left: 24px;
        a {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
    }
  }

  &.member .member-item {
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--o-color-greyblue3);
      overflow: hidden;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
    }
    .position {
      max-width: 150px;
    }
  }
}
</style>
