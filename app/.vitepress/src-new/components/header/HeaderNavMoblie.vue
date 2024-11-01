<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useI18n } from '~@/i18n';
import { OCollapse, OIcon, OCollapseItem } from '@opensig/opendesign';
import { useCommon } from '@/stores/common';

import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';
import AppLogin from './AppLogin.vue';
import NavContent from './NavContent.vue';
import HeaderSearch from './HeaderSearch.vue';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconMenu from '~icons/app-new/icon-menu.svg';
import logo_light from '~@/assets/category/header/logo.svg';
import logo_dark from '~@/assets/category/header/logo_dark.svg';
import IconOutLink from '~icons/app/icon-out-link.svg';

const router = useRouter();
const { lang } = useData();
const i18n = useI18n();
const headerData = computed(() => i18n.value.header.NAV_ROUTER);
const codeData = computed(() => i18n.value.header.SOURCE_CODE);

const toBody = ref(false);
const menuIcon = ref(false);


onMounted(() => {
  navActive.value = 'download';
  navInfo.value = headerData.value[0];
  toBody.value = true;
});
onUnmounted(() => {
  toBody.value = false;
});

const props = defineProps({
  langOptions: {
    type: Array,
    default() {
      return [];
    },
  },
});

const collapseValue = ref([]);

const commonStore = useCommon();
const logoUrl = computed(() =>
  commonStore.theme === 'light' ? logo_light : logo_dark
);

// 返回首页
const goHome = () => {
  toBody.value = false;
  menuIcon.value = false;
  router.go(`/${lang.value}/`);
};

const navActive = ref('');
const navInfo = ref({})

const handleNavClick = (item: any) => {
  if (!item) {
    navActive.value = 'SOURCE_CODE';
    navInfo.value = codeData.value;
  } else {
    navActive.value = item.ID;
    navInfo.value = item;
  }
};

watch(
  () => menuIcon.value,
  (val: boolean) => {
    navActive.value = 'download';
    navInfo.value = headerData.value[0];
  }
);

watch(
  () => headerData.value || codeData.value,
  () => {
    navInfo.value = navActive.value === 'SOURCE_CODE' ?
      codeData.value
      : headerData.value.find(item => item.ID === navActive.value);
  },
  {
    deep: true,
  }
);

const linkClick = () => {
  menuPanel();
}

const menuPanel = () => {
  console.log(toBody.value);
  toBody.value = !toBody.value;
  setTimeout(() => {
    menuIcon.value = !menuIcon.value;
  }, 200);
};
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <div class="menu-icon">
        <div class="icon" @click="menuPanel">
          <OIcon>
            <IconMenu v-if="!menuIcon" />
            <IconCancel v-else />
          </OIcon>
        </div>
      </div>
      <img class="logo" alt="openEuler logo" :src="logoUrl" @click="goHome" />
        <div
          class="header-content"
          :class="lang"
        >
          <div class="header-nav" :class="{ active: menuIcon }">
              <nav class="o-nav">
                <ul class="o-nav-list">
                  <li
                    v-for="(item, index) in headerData"
                    :key="item.ID"
                    :class="{
                      active: navActive === item.ID,
                    }"
                  >
                    <span @click="handleNavClick(item)">{{
                      item.NAME
                    }}</span>
                  </li>
                </ul>
                <div class='nav-aside'>
                  <OCollapse v-if="navActive !== 'SOURCE_CODE'" v-model="collapseValue" class="nav-aside-wrapper">
                    <OCollapseItem
                      v-for="item in navInfo.CHILDREN"
                      :value="item.NAME"
                      :title="item.NAME"
                      :key="item.NAME"
                      class="nav-aside-content"
                    >
                      <div v-if="item.HASGROUP">
                        <div class="group" v-for="group in item.CHILDREN" :key="group.NAME">
                          <span>{{ group.NAME }}</span>
                          <NavContent :nav-content="group?.CHILDREN" @link-click="linkClick" :is-mobile="true" />
                        </div>
                      </div>
                      <NavContent v-else :nav-content="item?.CHILDREN" @link-click="linkClick" :is-mobile="true" />
                    </OCollapseItem>
                  </OCollapse>
                  <div v-else class="nav-aside-wrapper">
                    <div v-for="item in navInfo" :key="item.NAME" class="source-code-item">
                      <span>{{ item.NAME }}</span>
                      <OIcon>
                        <IconOutLink class="icon" />
                      </OIcon>
                    </div>
                  </div>
                </div>
              </nav>
            <div class="header-tool">
              <div class="header-tool-code" @click="handleNavClick(null)" :class="{
                      active: navActive === 'SOURCE_CODE',
                    }">
                {{ $t('header.CODE') }}
              </div>
              <AppLanguage :show="langOptions"/>
              <AppTheme />
            </div>
          </div>
        </div>
        <!-- 搜索 -->
        <HeaderSearch />
        <AppLogin />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@mixin nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  color: var(--o-color-info1);
  font-weight: 500;

  &.active {
    color: var(--o-color-primary1);
    background: var(--o-color-fill2);
  } 
}

.app-header {
  background-color: var(--o-color-fill2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  box-shadow: var(--o-shadow-1);
  .app-header-body {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    height: 48px;
    padding: 0 var(--o-gap-4);
    justify-content: space-between;
    position: relative;
  }
}
.logo {
  height: 24px;
  width: 136px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 12px;
}
.menu-icon {
  flex: 1;
  display: block;
  .icon {
    font-size: var(--o-icon_size-m);
    color: var(--o-color-info1);
    cursor: pointer;
  }
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  &.ru {
    display: none;
  }

  .header-nav {
    flex: 1;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    left: 0;
    overflow: hidden;
    border-top: 1px solid var(--o-color-control4);
    z-index: 100;
    top: 48px;
    height: calc(100% - 48px);
    transform: translateX(-130%);

    transition-duration: 0.333s;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.5, 0, 0.84, 0.25);
    display: block;

    &.active {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }
  }
}
.header-tool {
  position: absolute;
  bottom: 36px;
  left: 0;
  width: 99px;

  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .lang {
    color: var(--o-color-text1);
    letter-spacing: 0.08em;
    font-size: 16px;
  }

  .header-tool-code {
    width: 99px;
    @include nav-item;
    @include h4;
  }
}

.nav-aside {
  position: fixed;
  background-color: var(--o-color-fill2);
  top: 0;
  left: 0;
  width: calc(100% - 99px);
  transform: translateX(99px);
  height: 100%;
  z-index: 190;

  .nav-aside-wrapper {
     overflow-y: auto;
     padding: 12px 16px 24px 12px; 
     height: 100%;

     .nav-aside-content {
       display: block;
       flex: 0 1 auto;

       .group + .group {
          margin-top: var(--o-gap-3);
       }
    }

    .source-code-item {
      height: 40px;
      display: flex;
      align-items: center;
      color: var(--o-color-primary1);

      & + .source-code-item {
        border-top: 1px solid var(--o-color-control4);
      }

      .icon {
        margin-left: var(--o-gap-2);
      }
    }
  }
}

.o-nav { 
  height: 100%;
  position: relative;
  width: 99px;
  background: var(--o-color-fill1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .o-nav-list {
    padding: 0;
    margin: 0;
    height: auto;
    @include h4;

    > li {
      position: relative;
      @include nav-item;
    }
  }
}
</style>
