<script lang="ts" setup>
import { ref } from 'vue';
import { useData } from 'vitepress';
import { showGuard, logout, useStoreData, getUserAuth } from '@/shared/login';
import { OIcon, ODropdown, ODropdownItem } from '@opensig/opendesign';

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
</script>

<template>
  <div class="opt-user">
    <ODropdown v-if="token" trigger="hover" optionPosition="bottom" option-wrap-class="dropdown">
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

      <template #dropdown>
        <ODropdownItem @click="jumpToUserZone()">{{ $t('header.USER_CENTER') }}</ODropdownItem>
        <ODropdownItem @click="jumpToMsgCenter()">{{ $t('header.MESSAGE_CENTER') }}</ODropdownItem>
        <ODropdownItem @click="logout()">{{ $t('header.LOGOUT') }}</ODropdownItem>
      </template>
    </ODropdown>
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
  @include respond-to('<=pad_v') {
    margin-left: var(--o-gap-2);
  }

  .opt-info {
    display: flex;
    align-items: center;
    height: 100%;
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
}
.login {
  .icon {
    font-size: var(--o-icon_size-s);
    cursor: pointer;
  }
}

.o-dropdown {
  height: 100%;
}
.o-dropdown-item {
  background: var(--o-color-fill2);
  cursor: pointer;
  border-radius: var(--o-radius_control-xs);
  padding: var(--o-gap-1);
  min-width: 144px;
  height: 40px;

  @include hover {
    color: var(--o-color-primary1);
    background: var(--o-color-control2-light);
  }
}
.dropdown {
  --dropdown-list-radius: var(--o-radius-xs);
}
</style>
