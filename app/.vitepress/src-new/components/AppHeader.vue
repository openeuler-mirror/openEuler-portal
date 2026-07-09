<script setup lang="ts">
import { watch, computed, ref, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';
import { OHeader, OHeaderMobile, OHeaderSourceCode, OHeaderSearch, OHeaderLanguageSwitcher, OHeaderTheme, OHeaderUser } from '@opendesign-plus-test/components';
import type { OSearchRecommendItem, OSearchUploadImageFn } from '@opendesign-plus-test/components';
import { useTheme, getUserAuth } from '@opendesign-plus-test/composables';
import { useLocale, useLoginStore } from '@opendesign-plus/composables';
import { useDebounceFn } from '@vueuse/core';

import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import navFilterConfig from '@/data/common/nav-filter';
import { arList, getCodeRepository, AR_URL } from '~@/data/header';

import { getUnreadMsgCount } from '@/api/api-messageCenter';
import { queryPersonalInfo } from '@/api/api-login';
import { getPop, getSearchRecommend, getOnestepSearch, imageUpload } from '~@/api/api-search';

import logoLight from '~@/assets/category/header/logo.svg';
import logoDark from '~@/assets/category/header/logo_dark.svg';
import bgLeft from '~@/assets/category/header/nav_background_left.png';
import bgRight from '~@/assets/category/header/nav_background_right.png';

import { useI18n } from '~@/i18n';
import { setCustomCookie, getCustomCookie, login, logout, useStoreData } from '@/shared/utils';
import { useIdentities } from '~@/stores/common';

interface LanguageOptionT {
  id: string;
  label: string;
  simple: string;
}

const router = useRouter();
const { lang } = useData();
const { lePadV, size } = useScreen();
const commonStore = useCommon();
const i18n = useI18n();
const { csrfCookie } = getUserAuth();
const { t } = useLocale();
const loginStore = useLoginStore();
const identitiesStore = useIdentities();
const { guardAuthClient } = useStoreData();

const langOptions: LanguageOptionT[] = [
  { id: 'zh', label: '简体中文', simple: '中' },
  { id: 'en', label: 'English', simple: 'EN'  },
  { id: 'ar', label: 'العربية', simple: 'AR' },
];

const navData = computed(() => i18n.value.header.NAV_ROUTER);

const activeIndex = computed(() => {
  const path = router.route.path;
  const localePrefix = `/${lang.value}/`;
  const items = navData.value;

  const hrefMap = new Map<string, string>();
  for (const item of items) {
    collectLocalHrefs(item.children, item.id, hrefMap, localePrefix);
    collectLocalHrefs(item.shortcut, item.id, hrefMap, localePrefix);
  }

  let bestMatch = '';
  let bestId = '';
  for (const [href, parentId] of hrefMap) {
    const cleanHref = href.split('#')[0].replace(/\/$/, '');
    if ((path.startsWith(cleanHref) || path === cleanHref) && cleanHref.length > bestMatch.length) {
      bestMatch = cleanHref;
      bestId = parentId;
    }
  }
  if (bestId) return bestId;

  if (path.startsWith(localePrefix)) {
    const purePath = path.slice(localePrefix.length).replace(/\/$/, '');
    const firstSegment = purePath.split('/')[0];
    for (const item of items) {
      if (item.id === firstSegment) return item.id;
    }
  }
  return '';
});

function collectLocalHrefs(children: any[], parentId: string, hrefMap: Map<string, string>, localePrefix: string) {
  if (!children) return;
  for (const child of children) {
    if (child.children) {
      collectLocalHrefs(child.children, parentId, hrefMap, localePrefix);
    }
    if (child.href && child.href.startsWith(localePrefix)) {
      hrefMap.set(child.href, parentId);
    }
  }
}

// Logo
const logoUrl = computed(() =>
  commonStore.theme === 'light' ? logoLight : logoDark
);

// 代码仓数据 - 动态获取，支持语言实时切换
const codeRepository = computed(() => getCodeRepository());
const codeData = computed(() => lang.value === 'zh' ? codeRepository.value.children : codeRepository.value.children.slice(0, 3));
const codeDataMobile = computed(() => {
  if (lang.value === 'zh') {
    return codeRepository.value;
  } else {
    const temp = {
      label: codeRepository.value.label,
      children: codeRepository.value.children.slice(0, 3),
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

const langData = ref({});
const langList = ref<LanguageOptionT[]>([]);
const filterLang = () => {
  langList.value = langShow.value.map((id) => langOptions.find((el) => el.id === id)).filter(Boolean) as LanguageOptionT[];
  langData.value = {
    label: t('common.lang'),
    children: langList.value
  }
};

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

watch(
  () => langShow.value,
  () => {
    filterLang();
  },
  { immediate: true }
);

// 主题切换
const APPEARANCE_KEY = 'openEuler-theme-appearance';
const { theme: opTheme, setTheme } = useTheme();
const currentTheme = computed(() => (opTheme?.value as 'light' | 'dark') ?? commonStore.theme);
watch(
  () => opTheme?.value,
  (val) => {
    if (val) {
      commonStore.theme = val as 'light' | 'dark';
    }
  }
);

const onChangeTheme = (val: string) => {
  if (setTheme) {
    setTheme(val as 'darklight' | 'dark');
  }
  commonStore.theme = val as 'light' | 'dark';
  setCustomCookie(APPEARANCE_KEY, val, 180, import.meta.env.VITE_COOKIE_DOMAIN);
};

onMounted(() => {
  let theme;
  if (!getCustomCookie(APPEARANCE_KEY)) {
    const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefereDark ? 'dark' : 'light';
  } else {
    theme = getCustomCookie(APPEARANCE_KEY);
  }
  commonStore.theme = theme === 'dark' ? 'dark' : 'light';
});

// 登录
const unreadMsgCount = ref(0);
const userCenterUrl = computed(() => {
  const language = lang.value === 'zh' ? 'zh' : 'en';
  const path = lePadV.value ? 'settings' : 'workbench';
  return `${import.meta.env.VITE_MAIN_DOMAIN_URL}/${language}/my/${path}`;
})
const userOptions = computed(() => [
  {
    id: 'center',
    label: t('header.USER_CENTER'),
    url: userCenterUrl.value,
    target: '_blank',
    total: 0,
    logout: false,
  },
  {
    id: 'message',
    label: t('header.MESSAGE_CENTER'),
    url: import.meta.env.VITE_SERVICE_MESSAGE_CENTER_URL,
    target: '_blank',
    total: unreadMsgCount.value,
    logout: false,
  },
  {
    id: 'logout',
    label: t('header.LOGOUT'),
    url: '',
    target: '_self',
    total: 0,
    logout: true,
  },
]);

watch(() => loginStore.isLogined, async (val) => {
  if (val) {
    const { data: userInfo } = await queryPersonalInfo();
    identitiesStore.$patch({
      identities: userInfo.identities,
    });
    const giteeLoginName: string | undefined = (
      userInfo.identities as any[]
    )?.find((item) => item.identity === 'gitee')?.login_name;
    const data = await getUnreadMsgCount(giteeLoginName);
    unreadMsgCount.value = Object.values(data).reduce(
      (count, val) => count + val,
      0
    );
  } else {
    unreadMsgCount.value = 0;
  }
}, {
  immediate: true,
});

// 搜索
const searchInput = ref('');
const imageUrl = ref('');
const searchValue = computed(() => i18n.value.header.SEARCH);
const searchUrl = computed(() => `/${lang.value}/other/search/`);
const hotItems = ref<string[]>([]);
const suggestItems = ref<OSearchRecommendItem[]>([]);
const onestepItems = ref<OSearchRecommendItem[]>([]);

const fetchHotItems = () => {
  if (hotItems.value.length) return;
  getPop(`lang=${lang.value}`).then((res) => {
    hotItems.value = res.obj;
  });
};

const fetchSuggestions = useDebounceFn((val: string) => {
  getSearchRecommend({ query: val, lang: lang.value }).then((res) => {
    suggestItems.value = (res.obj.word || []).map((item: any) => ({
      key: item.key,
      path: item.path?.startsWith(`/${lang.value}`) ? item.path : `/${lang.value}${item.path}`,
      type: item.type,
      count: item.count,
    }));
  });
  getOnestepSearch({ query: val, lang: lang.value }).then((res) => {
    onestepItems.value = (res.obj.word || []).map((item: any) => ({
      key: item.key,
      path: item.path?.startsWith(`/${lang.value}`) ? item.path : `/${lang.value}${item.path}`,
      type: item.type,
      count: item.count,
    }));
  });
}, 300);

watch(searchInput, (val) => {
  if (val) {
    fetchSuggestions(val);
  } else {
    suggestItems.value = [];
    onestepItems.value = [];
  }
});

const uploadImageFn: OSearchUploadImageFn = async (file: File) => {
  const res = await imageUpload({ image: file });
  return res.obj;
};

const onFocus = () => {
  fetchHotItems();
};

const isUserSimple = ref(false);
const isSearchSimple = ref(false);

type BreakpointsT = { both: number; user: number } | null;

const getBreakpoints = (locale: string, hasCookie: boolean): BreakpointsT => {
  if (locale === 'zh') return hasCookie ? { both: 920, user: 1000 } : null;
  return hasCookie ? { both: 1250, user: 1334 } : { both: 1246, user: 1246 };
};

watch(
  () => [size.width, csrfCookie, lang.value],
  () => {
    const bp = getBreakpoints(lang.value, !!csrfCookie);
    if (!bp) {
      isUserSimple.value = false;
      isSearchSimple.value = false;
      return;
    }
    isSearchSimple.value = size.width < bp.both;
    isUserSimple.value = size.width < bp.user;
  },
  { immediate: true }
);
</script>

<template>
  <!-- 桌面端导航 -->
  <OHeader
    v-if="!lePadV"
    :logo="logoUrl"
    :nav-data="navData"
    :active-index="activeIndex"
    :bgLeft="bgLeft"
    :bgRight="bgRight"
    community="openEuler"
    class="header-pc"
    :class="[`header-pc-${lang}`]"
    @go-home="goHome"
  >
    <template #toolbar>
      <div id="tour_headerNav_tool" class="header-tool">
        <OHeaderSearch
          v-model="searchInput"
          v-model:image-url="imageUrl"
          :placeholder="searchValue.PLEACHOLDER"
          :expanded-placeholder="searchValue.PLEACHOLDER_EXTEND"
          :image-placeholder="searchValue.PLEACHOLDER_IMAGE"
          :image-upload-tooltip="searchValue.UPLOAD_TOOLTIP"
          :hot-items="hotItems"
          :suggest-items="suggestItems"
          :onestep-items="onestepItems"
          :suggest-title="searchValue.SUGGEST"
          :onestep-title="searchValue.ONESTEP"
          :history-title="searchValue.BROWSEHISTORY"
          :hot-title="searchValue.TOPSEARCH"
          :no-data-text="searchValue.NO_DATA"
          :search-text-mobile="searchValue.TEXT"
          enable-image-search
          :upload-image="uploadImageFn"
          highlight-keyword
          store-history
          :search-url-open-blank="false"
          :search-url="searchUrl"
          :simple="isSearchSimple"
          @focus="onFocus"
        />
        <OHeaderSourceCode :title="codeRepository.label" :options="codeData" justify="flex-start" class="source-code" />
        <OHeaderLanguageSwitcher :options="langList" type="common" :auto="false" @change="handleLangClick" />
        <OHeaderTheme type="common" :theme="currentTheme" @change="onChangeTheme" />
        <div class="login">
          <OHeaderUser
            :token="csrfCookie"
            :noticeTotal="unreadMsgCount"
            :userInfo="guardAuthClient"
            :options="userOptions"
            :custom-size="20"
            :simple="isUserSimple"
            @login="login(lang)"
            @logout="logout(lang)"
          />
        </div>
      </div>
    </template>
  </OHeader>

  <!-- 移动端导航 -->
  <OHeaderMobile
    v-else
    :logo="isDark ? logoDark : logoLight"
    :is-simple-header="false"
    :lang="lang"
    :nav-data="navData"
    :active-index="activeIndex"
    :code-data="codeDataMobile"
    :lang-data="langList.length > 2 ? langData : {}"
    @lang-click="handleLangClick"
    @go-home="goHome"
    class="header-mb"
  >
    <template #toolbar>
      <div class="header-toolbar">
        <OHeaderSearch
          v-model="searchInput"
          v-model:image-url="imageUrl"
          :placeholder="searchValue.PLEACHOLDER"
          :expanded-placeholder="searchValue.PLEACHOLDER_EXTEND"
          :image-placeholder="searchValue.PLEACHOLDER_IMAGE"
          :image-upload-tooltip="searchValue.UPLOAD_TOOLTIP"
          :hot-items="hotItems"
          :suggest-items="suggestItems"
          :onestep-items="onestepItems"
          :suggest-title="searchValue.SUGGEST"
          :onestep-title="searchValue.ONESTEP"
          :history-title="searchValue.BROWSEHISTORY"
          :hot-title="searchValue.TOPSEARCH"
          :no-data-text="searchValue.NO_DATA"
          :search-text-mobile="searchValue.TEXT"
          enable-image-search
          :upload-image="uploadImageFn"
          highlight-keyword
          store-history
          :search-url-open-blank="false"
          :search-url="searchUrl"
          mobile
          @focus="onFocus"
        />
        <OHeaderUser
          :token="csrfCookie"
          :noticeTotal="unreadMsgCount"
          :userInfo="guardAuthClient"
          :options="userOptions"
          :custom-size="20"
          @login="login(lang)"
          @logout="logout(lang)"
        />
      </div>
    </template>
    <template #tool>
      <OHeaderLanguageSwitcher v-if="langList.length < 3" :options="langList" :auto="false" type="mobile" @change="handleLangClick" />
      <OHeaderTheme type="mobile" :theme="currentTheme" @change="onChangeTheme" />
    </template>
  </OHeaderMobile>
</template>

<style lang="scss" scoped>
.header-pc {
  --header-tool-gap: 20px;
  @media (min-width: 1201px) and (max-width: 1680px) {
    --header-tool-gap: 16px;
  }
  @include respond('pad_h') {
    --header-tool-gap: 12px;
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
    .o-theme-switcher {
      margin-left: var(--header-tool-gap);
    }
    .login {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: var(--header-tool-gap);
      .o-icon {
        --icon-size: 24px;
      }
    }
  }

  :deep(.openeuler) {
    &.approve-en {
      .item-sub {
        &:nth-of-type(1) {
          width: 25%;
          .content-item {
            width: 100%;
          }
        }
      }
    }
  }
}

:deep(.o-search-panel-hot) {
  .o-search-panel-icon {
    display: none;
  }
}

.header-mb {
  :deep(.header-right) {
    height: 100%;
  }
  .header-toolbar {
    display: flex;
    align-items: center;
    height: 100%;
    .header-user {
      margin-left: 16px;
    }
  }
  .header-tool {
    .mobile-change-language {
      margin-bottom: 24px;
    }
    .o-theme-switcher {
      margin-top: 12px;
    }
  }
}
</style>