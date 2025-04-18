<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { showGuard, logout, useStoreData, getUserAuth } from '@/shared/login';
import { OIcon, ODropdown, ODropdownItem } from '@opensig/opendesign';

import AppBadge from '@/components/badge/AppBadge.vue';
import { getUnreadMsgCount } from '@/api/api-messageCenter';
import { queryPersonalInfo } from '@/api/api-login';
import IconLogin from '~icons/app-new/icon-header-person.svg';

const { lang } = useData();
const { token } = getUserAuth();
const { guardAuthClient } = useStoreData();

const jumpToUserZone = () => {
  const language = lang.value === 'zh' ? 'zh' : 'en';
  window.open(`/${language}/workspace`, '_blank');
};

const jumpToMsgCenter = () => {
  window.open(import.meta.env.VITE_SERVICE_MESSAGE_CENTER_URL);
};

const unreadMsgCount = ref(0);

onMounted(async () => {
  if (token) {
    const { data: userInfo } = await queryPersonalInfo();
    const giteeLoginName: string | undefined = (
      userInfo.identities as any[]
    )?.find((item) => item.identity === 'gitee')?.login_name;
    const data = await getUnreadMsgCount(giteeLoginName);
    unreadMsgCount.value = Object.values(data).reduce(
      (count, val) => count + val,
      0
    );
  }
});
</script>

<template>
  <div class="opt-user">
    <ODropdown
      v-if="token"
      trigger="hover"
      optionPosition="bottom"
      option-wrap-class="dropdown"
    >
      <div class="el-dropdown-link opt-info">
        <AppBadge v-if="unreadMsgCount" :value="unreadMsgCount">
          <img
            v-if="guardAuthClient.photo"
            :src="guardAuthClient.photo"
            class="user-img"
          />
          <div v-else class="user-img"></div>
        </AppBadge>

        <div v-else>
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
        <p class="opt-name">{{ guardAuthClient.username }}</p>
      </div>

      <template #dropdown>
        <ODropdownItem @click="jumpToUserZone()">{{
          $t('header.USER_CENTER')
        }}</ODropdownItem>
        <ODropdownItem @click="jumpToMsgCenter()">
          <AppBadge v-if="unreadMsgCount" :value="unreadMsgCount">
            {{ $t('header.MESSAGE_CENTER') }}
          </AppBadge>
          <div v-else>
            {{ $t('header.MESSAGE_CENTER') }}
          </div>
        </ODropdownItem>
        <ODropdownItem @click="logout()">{{
          $t('header.LOGOUT')
        }}</ODropdownItem>
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
  height: calc(100% + 10px);
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
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
      @include respond-to('<=pad_v') {
        width: 28px;
        height: 28px;
      }
    }
  }

  .opt-name {
    padding: 2px 0;
    color: var(--o-color-info1);
    margin-left: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 72px;
    @include respond-to('<=pad_v') {
      display: none;
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
