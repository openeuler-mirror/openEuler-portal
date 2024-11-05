<script lang="ts" setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';
import { setCustomCookie, getCustomCookie } from '@/shared/utils';

import IconSun from '~icons/app/icon-sun-outline.svg';
import IconMoon from '~icons/app-new/icon-header-moon.svg';

// 风格切换
const APPEARANCE_KEY = 'openEuler-theme-appearance';

const commonStore = useCommon();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1200 ? true : false));
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const changeTheme = () => {
  const theme = commonStore.theme === 'dark' ? 'light' : 'dark';
  commonStore.theme = theme;
  setCustomCookie(
    APPEARANCE_KEY,
    theme,
    180,
    import.meta.env.VITE_COOKIE_DOMAIN,
  );
};

const changeThemeMobile = () => {
  setCustomCookie(
    APPEARANCE_KEY,
    commonStore.theme,
    180,
    import.meta.env.VITE_COOKIE_DOMAIN,
  );
};

onMounted(() => {
  window.localStorage.removeItem('vitepress-theme-appearance');
  let theme;
  if (!getCustomCookie(APPEARANCE_KEY)) {
    const prefereDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    theme = prefereDark ? 'dark' : 'light';
  } else {
    theme = getCustomCookie(APPEARANCE_KEY);
  }
  commonStore.theme = theme === 'dark' ? 'dark' : 'light';
});

watch(
  () => {
    return commonStore.theme;
  },
  (val) => {
    const documentElement = document.documentElement;
    val === 'light' && documentElement.removeAttribute('data-o-theme');
    val === 'dark' && documentElement.setAttribute('data-o-theme', 'dark');
    val === 'light' && documentElement.classList.remove('dark');
    val === 'dark' && documentElement.classList.add('dark');
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div v-if="isMobile" class="theme-box-mobile">
    <OSwitch
      v-model="commonStore.theme"
      active-value="dark"
      inactive-value="light"
      inline-prompt
      style="--el-switch-on-color: #002fa7; --el-switch-off-color: #e5e8f0"
      :active-icon="IconSun"
      :inactive-icon="IconMoon"
      @click="changeThemeMobile"
    />
  </div>
  <div v-else class="theme-box-pc" @click="changeTheme">
    <OIcon class="icon">
      <IconMoon v-if="isLight" />
      <IconSun v-else />
    </OIcon>
  </div>
</template>

<style lang="scss" scoped>
.theme-box-pc {
  cursor: pointer;
  .icon {
    font-size: var(--o-icon_size-s);
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
}
.theme-box-mobile {
  display: none;

  @media screen and (max-width: 1200px) {
    display: block;
  }
}
:deep(.el-switch__inner) {
  .is-show {
    color: var(--o-color-info1);
  }
}
</style>
