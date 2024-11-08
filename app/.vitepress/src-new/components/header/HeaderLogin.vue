<script lang="ts" setup>
import { ref } from 'vue';
import { useData } from 'vitepress';
import { showGuard, logout, useStoreData, getUserAuth } from '@/shared/login';

import IconLogin from '~icons/app-new/icon-header-person.svg';

const { lang } = useData();
const { token } = getUserAuth();
const { guardAuthClient } = useStoreData();

const jumpToUserZone = () => {
  const language = lang.value === 'zh' ? 'zh' : 'en';
  const origin = import.meta.env.VITE_LOGIN_ORIGIN;
  window.open(`${origin}/${language}/profile`, '_black');
};

const jumpToMsgCenter = () => {
  window.open(import.meta.env.VITE_MESSAGE_CENTER_URL);
};

const isMenu = ref(false);
const showSub = () => {
  isMenu.value = true;
};
const hideSub = () => {
  isMenu.value = false;
};
</script>

<template>
  <div class="opt-user" @mouseenter="showSub()"
  @mouseleave="hideSub()">
    <div v-if="token">
      <div class="el-dropdown-link opt-info">
        <img
          v-if="guardAuthClient.photo"
          :src="guardAuthClient.photo"
          class="user-img"
        />
        <div v-else class="login">
          <OIcon class="icon">
            <IconLogin />
          </OIcon>
        </div>
      </div>
      <ul class="menu-list" v-show="isMenu">
        <li @click="jumpToUserZone()">{{ $t('header.USER_CENTER') }}</li>
        <li @click="jumpToMsgCenter()">{{ $t('header.MESSAGE_CENTER') }}</li>
        <li @click="logout()">{{ $t('header.LOGOUT') }}</li>
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
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .opt-info {
    display: flex;
    align-items: center;
    .user-img {
      font-size: var(--o-icon_size-l);
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
      @include respond-to('<=pad_v') {
        width: 28px;
        height: 28px;
      }
    }
  }
  .menu-list {
    position: absolute;
    top: 80px;
    min-width: 136px;
    left: -58px;
    background: var(--o-color-fill2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--o-shadow-1);
    padding: var(--o-gap-1);

    @include respond-to('<=pad_v') {
      min-width: 96px;
      top: 48px;
      left: -60px;
    }

    @include respond-to('laptop') {
      left: -96px;
    }

    li {
      @include text1;
      text-align: center;
      height: 40px;
      color: var(--o-color-info1);
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      border-radius: 2px;

      &.active {
        color: var(--o-color-primary1);
        cursor: default;
      }
      @include hover {
        color: var(--o-color-primary1);
        background: var(--o-color-control2-light);
      }
    }
  }
}
.login {
  .icon {
    font-size: var(--o-icon_size-s);
    cursor: pointer;
  }
}
</style>
