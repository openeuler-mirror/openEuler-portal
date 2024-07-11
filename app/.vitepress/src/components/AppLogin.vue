<script lang="ts" setup>
import { useData } from 'vitepress';
import { showGuard, logout, useStoreData, getUserAuth } from '../shared/login';
import { useI18n } from '@/i18n';

import IconLogin from '~icons/app/icon-login.svg';

const { lang } = useData();
const { token } = getUserAuth();
const { guardAuthClient } = useStoreData();
const i18n = useI18n();

const jumpToUserZone = () => {
  const language = lang.value === 'zh' ? 'zh' : 'en';
  const origin = import.meta.env.VITE_LOGIN_ORIGIN;
  window.open(`${origin}/${language}/profile`, '_black');
};
</script>

<template>
  <div v-if="lang !== 'ru'" class="opt-user">
    <div v-if="token">
      <div class="el-dropdown-link opt-info">
        <img
          v-if="guardAuthClient.photo"
          :src="guardAuthClient.photo"
          class="user-img"
        />
        <div v-else class="user-img"></div>
        <p class="opt-name">{{ guardAuthClient.username }}</p>
      </div>
      <ul class="menu-list">
        <li @click="jumpToUserZone()">{{ i18n.common.USER_CENTER }}</li>
        <li @click="logout()">{{ i18n.common.LOGOUT }}</li>
      </ul>
    </div>
    <div v-else class="login" @click="showGuard()">
      <OIcon class="icon">
        <IconLogin />
      </OIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.opt-user {
  margin-left: var(--o-spacing-h5);
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .opt-info {
    display: flex;
    align-items: center;
    .user-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
      @media (max-width: 1100px) {
        width: 28px;
        height: 28px;
      }
    }
    .opt-name {
      color: var(--o-color-text1);
      margin-left: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 72px;
      line-height: var(--o-line-height-h8);
      @media (max-width: 1100px) {
        display: none;
      }
    }
  }
  &:hover {
    .menu-list {
      display: block;
    }
  }
  .menu-list {
    display: none;
    position: absolute;
    top: 80px;
    left: 0;
    @media (max-width: 1100px) {
      top: 48px;
      left: -60px;
    }
    background: var(--o-color-bg2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--o-shadow-l1);
    min-width: 78px;
    li {
      line-height: var(--o-line-height-h3);
      text-align: center;
      font-size: var(--o-font-size-text);
      color: var(--o-color-text1);
      border-bottom: 1px solid var(--o-color-division1);
      padding: 0 var(--o-spacing-h5);
      white-space: nowrap;
      &:last-child {
        border-bottom: 0 none;
      }

      &:hover {
        background: var(--o-color-brand1);
        color: var(--o-color-white);
      }
      &.active {
        color: var(--o-color-brand1);
        background: none;
        cursor: default;
      }
    }
  }
}
.login {
  .icon {
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
    cursor: pointer;
  }
}
</style>
