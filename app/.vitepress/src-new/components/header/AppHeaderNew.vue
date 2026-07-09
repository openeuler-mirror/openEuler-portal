<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import { useRouter, useData } from 'vitepress';
import { OHeader, OHeaderSourceCode, OHeaderMobile, OHeaderLanguageSwitcher } from '@opendesign-plus/components';

import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import navFilterConfig from '@/data/common/nav-filter';
import { arList, getCodeRepository, langData, AR_URL } from '~@/data/header';

import logoLight from '~@/assets/category/header/logo.svg';
import logoDark from '~@/assets/category/header/logo_dark.svg';

import { useI18n } from '~@/i18n';

import HeaderSearch from './HeaderSearch.vue';
import HeaderLanguage from './HeaderLanguage.vue';
import HeaderTheme from './HeaderTheme.vue';
import HeaderLogin from './HeaderLogin.vue';

interface LanguageOptionT {
  id: string;
  label: string;
  simple: string;
}

const router = useRouter();
const { lang } = useData();
const { lePadV } = useScreen();
const commonStore = useCommon();
const i18n = useI18n();

const langOptions = ref<LanguageOptionT[]>([
  { id: 'zh', label: '简体中文', simple: '中' },
  { id: 'en', label: 'English', simple: 'EN'  },
  { id: 'ar', label: 'العربية', simple: 'AR' },
]);

const navData = computed(() => i18n.value.header.NAV_ROUTER);

// Logo
const logoUrl = computed(() =>
  commonStore.theme === 'light' ? logoLight : logoDark
);

// 代码仓数据 - 动态获取，支持语言实时切换
const codeRepository = computed(() => getCodeRepository());
const codeData = computed(() => lang.value === 'zh' ? codeRepository.value.list : codeRepository.value.list.slice(0, 3));
const codeDataMobile = computed(() => {
  if (lang.value === 'zh') {
    return codeRepository.value;
  } else {
    const temp = {
      label: codeRepository.value.label,
      list: codeRepository.value.list.slice(0, 3),
    }
    return temp;
  }
})

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

// 语言选项
const routerPath = ref(router.route.path);
const langShow = ref(['zh', 'en']);
const isNewsorBlog = computed(() =>
  /^\/(zh|en)\/(news|blog)\//g.test(router.route.path)
);

const isHome = computed(() =>
  ['/', '/zh/', '/zh', '/en/', '/en'].includes(router.route.path)
);

// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};

// 处理导航点击
const handleNavClick = (val: any) => {
  if (val?.url) {
    router.go(val.url);
  }
};

// 检查当前路径是否支持阿语
const isArabicSupported = (path: string) => {
  const purePath = path.replace(/^\/(zh|en|ar)\//, '/');
  return arList.some(arPath => {
    // 精确匹配
    if (purePath === arPath || purePath === `${arPath}/`) {
      return true;
    }
    return false;
  });
};

// 语言切换
const handleLangClick = (val: any) => {
  const newlang = val.id;
  if (lang.value === newlang) return;
  const { pathname, search } = window.location;
  if ( newlang === 'ar' ) {
    window.location.href = `${AR_URL}${pathname.replace(`/${lang.value}/`, `/${newlang}/`)}`;
  } else {
    const newHref = pathname.replace(`/${lang.value}/`, `/${newlang}/`);
    router.go(newHref + search);
  }
}

// 监听路由变化，更新语言选项
watch(
  () => router.route.path,
  (val: string) => {
    routerPath.value = val;

    // 默认显示中文和英文
    langShow.value = ['zh', 'en'];

    // 首页
    if (isHome.value) {
      langShow.value = ['zh', 'en', 'ar'];
      return;
    }

    // 新闻、博客不一定存在对应中文
    if (isNewsorBlog.value) {
      langShow.value = [lang.value];
      return;
    }

    // 英文页面：检查是否有对应的阿语版本
    if (lang.value === 'en') {
      if (isArabicSupported(val)) {
        langShow.value = ['zh', 'en', 'ar'];
      }
      return;
    }

    // 语言过滤
    for (let i = 0, len = navFilterConfig.length; i < len; i++) {
      // 其他
      const routeArr = routerPath.value.split('/');
      const routeName = routeArr[routeArr.length - 2];
      // TODO:目前只支持一级
      const names = navFilterConfig[i].name.split('/');
      const name = names[0];

      if (
        // 路径后缀匹配
        routeName === name ||
        // 路径全匹配
        routerPath.value === name ||
        // 子路径匹配
        (names[1] && names[1] === '**' && routerPath.value.includes(name))
      ) {
        langShow.value = navFilterConfig[i].lang;
        break;
      }
    }
    if (isArabicSupported(val)) {
      langShow.value = ['zh', 'en', 'ar'];
    }
  },
  { immediate: true }
);

const languageChange = () => {
  console.log('切换语言');
}
</script>

<template>
  <div class="app-header-new">
    <!-- 桌面端导航 -->
    <template v-if="!lePadV">
      <OHeader
        :logo="logoUrl"
        :nav-data="navData"
        community="openEuler"
        class="o-header-pc"
        @go-home="goHome"
        @handle-click="handleNavClick"
      >
        <template #toolbar>
          <div class="header-tool">
            <HeaderSearch />
            <OHeaderSourceCode :title="codeRepository.label" :options="codeData" justify="flex-start" class="source-code" />
            <!-- <HeaderLanguage :show="langShow" /> -->
            <OHeaderLanguageSwitcher :options="langOptions" type="common" @change="languageChange" />
            <HeaderTheme />
            <HeaderLogin />
          </div>
        </template>
      </OHeader>
    </template>

    <!-- 移动端导航 -->
    <template v-else>
      <OHeaderMobile
        :logo="isDark ? logoDark : logoLight"
        :is-simple-header="false"
        :lang="lang"
        :nav-data="navData"
        :code-data="codeDataMobile"
        :lang-data="langData"
        @lang-click="handleLangClick"
        class="o-header-mobile"
      >
        <template #toolbar>
          <div class="header-tool">
            <HeaderSearch />
            <HeaderLogin />
          </div>
        </template>
        <template #tool>
          <!-- <OSourceCode :title="codeRepository.label" :options="codeData" justify="flex-start" class="source-code" /> -->
          <!-- <HeaderLanguage :show="langShow" /> -->
          <HeaderTheme />
        </template>
      </OHeaderMobile>
      <!-- <SearchHeaderMo v-if="isSearchPage" /> -->
    </template>
  </div>
</template>

<style lang="scss" scoped>
.app-header-new {
  background-color: var(--o-color-fill2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  box-shadow: var(--o-shadow-1);

  .o-header-pc {
    :deep(.content-item) {
      margin-top: 0;
      margin-bottom: 24px;

      @include respond-to('pad_v-laptop') {
        margin-bottom: 16px;
      }
    }

    --header-tool-gap: 20px;
    @media (min-width: 1201px) and (max-width: 1680px) {
      --header-tool-gap: 16px;
    }

    @include respond-to('pad_h') {
      --header-tool-gap: 12px;
    }

    :deep(.header-wrap) {
      position: relative;
      z-index: 991;
    }

    :deep(.header-nav-content) {
      position: relative;
      top: 0;
      z-index: 990;
    }

    .header-tool {
      display: flex;
      align-items: center;
      height: 100%;

      .source-code {
        margin-left: var(--header-tool-gap);
      }

      .header-lang {
        margin-left: var(--header-tool-gap);
      }

      .theme-box-pc {
        margin-left: var(--header-tool-gap);
      }

      .opt-user {
        display: flex;
        align-items: center;
        margin-left: var(--header-tool-gap);
        .o-icon {
          --icon-size: 24px;
        }
      }
    }

    // @include respond-to('pad_v-laptop') {
    //   :deep(.content-item) {
    //     .item-label .content-tag {
    //       display: block;
    //       height: 16px;
    //       line-height: 16px;
    //     }

    //     .o-tag-label {
    //       display: block !important;
    //       height: 14px !important;
    //       line-height: 14px;
    //     }
    //   }
    // }
  }

  .o-header-mobile {
    // :deep(.header-tool-item:last-child) {
    //   display: none;
    // }

    .source-code {
      justify-content: center;
    }

    .mobile-change-language {
      justify-content: center;
    }

    .header-right {
      .header-tool {
        display: flex;
      }
    }

    :deep(.el-switch) {
      background-color: transparent;
    }
  }
}
</style>