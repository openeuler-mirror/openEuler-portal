<script lang="ts" setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconSun from '~icons/app/icon-sun-outline.svg';
import IconMoon from '~icons/app/icon-moon-outline.svg';

// 风格切换
const APPEARANCE_KEY = 'vitepress-theme-appearance';

const commonStore = useCommon();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const changeTheme = () => {
  const theme = commonStore.theme === 'dark' ? 'light' : 'dark';
  commonStore.theme = theme;
  localStorage.setItem(APPEARANCE_KEY, theme);
};

const changeThemeMobile = () => {
  localStorage.setItem(APPEARANCE_KEY, commonStore.theme);
};

onMounted(() => {
  let theme;
  if (!localStorage.getItem(APPEARANCE_KEY)) {
    const prefereDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    theme = prefereDark ? 'dark' : 'light';
  } else {
    theme = localStorage.getItem(APPEARANCE_KEY);
  }

  commonStore.theme = theme === 'dark' ? 'dark' : 'light';
});

watch(
  () => {
    return commonStore.theme;
  },
  (val) => {
    const documentElement = document.documentElement;
    val === 'light' && documentElement.classList.remove('dark');
    val === 'dark' && documentElement.classList.add('dark');
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
    font-size: var(--o-font-size-h6);
    color: var(--o-color-text1);
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.theme-box-mobile {
  display: none;

  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.dark {
  .icon {
    color: var(--o-color-text1);
  }
}
:deep(.el-switch__inner) {
  .is-show {
    color: var(--o-color-text1);
  }
}
</style>
