<script setup lang="ts">
import { useData, useRoute, useRouter } from 'vitepress';
import type { Component } from 'vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

import AppHeader from '~@/components/AppHeader.vue';
import AppFooter from '~@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';
import LayoutAboutUs from '@/layouts/LayoutAboutUs.vue';
import LayoutAboutUsArchived from '@/layouts/LayoutAboutUsArchived.vue';
import LayoutDownload from './layouts/LayoutDownload.vue';
import LayoutEvent from './layouts/LayoutEvent.vue';
import LayoutSecurity from './layouts/LayoutSecurity.vue';
import LayoutWiki from './layouts/LayoutWiki.vue';
import LayoutFAQ from '@/layouts/LayoutFAQ.vue';
import LayouWhitePaper from '@/layouts/LayouWhitePaper.vue';

import FloatingButton from '~@/components/FloatingButton.vue';
import FloatingButtonEn from '~@/components/FloatingButtonEn.vue';

import AppTour from '~@/components/AppTour.vue';

import categories from '@/data/common/category';
import { useLocale } from '~@/composables/useLocale';
import { hideNssRoutes } from './data/common/nss';
import {
  OCookieNotice,
  OPlusConfigProvider,
} from '@opendesign-plus-test/components';
import { useCookieStore } from '~@/stores/common';
import { tryLogin } from '@opendesign-plus/composables';
import { queryPermission } from './api/api-login';
import { useUserInfoStore } from './stores/user';

const { changeLocale, isZh } = useLocale();
const { frontmatter, lang } = useData();
const router = useRouter();

const elLocale = computed(() => {
  return lang.value === 'zh' ? zhCn : en;
});

const compMapping: {
  [name: string]: Component;
} = {
  blog: LayoutBlog,
  news: LayoutNews,
  showcase: LayoutShowcase,
  migration: LayoutMigration,
  'about-us': LayoutAboutUs,
  'about-us-archived': LayoutAboutUsArchived,
  download: LayoutDownload,
  event: LayoutEvent,
  security: LayoutSecurity,
  faq: LayoutFAQ,
  wiki: LayoutWiki,
  'white-paper': LayouWhitePaper,
};

const isCustomLayout = computed(() => {
  return (
    !!frontmatter.value.category &&
    categories.indexOf(frontmatter.value.category) !== -1
  );
});

const comp = computed(() => {
  return compMapping[frontmatter.value.category];
});

// 是否添加footer 边距
const isDocs = computed(() => {
  return (
    frontmatter.value.category === 'migration' ||
    frontmatter.value.category === 'about-us' ||
    frontmatter.value.category === 'wiki'
  );
});

const isReport = computed(() => {
  return frontmatter.value.category === 'report';
});
// ----------------------------- new ----------------------------

const showNss = computed(() => {
  return !hideNssRoutes.some((route) => router?.route?.path?.includes(route));
});

watch(
  () => lang.value,
  () => {
    changeLocale(lang.value);
  },
  {
    immediate: true,
  }
);

 onMounted(async () => {
  const userInfoStore = useUserInfoStore();
  const userInfo = await tryLogin(queryPermission as any);

  if (userInfo) {
    userInfoStore.setGuardAuthClient(userInfo);
  }
});

const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN;
const cookieStore = useCookieStore();
const cookieRef = ref();
const route = useRoute();
watch(
  () => route.path,
  async () => {
    await nextTick();
    cookieRef.value?.check();
  }
);
</script>

<template>
  <template v-if="!isReport">
    <OPlusConfigProvider :locale="lang">
      <AppHeader />
      <el-config-provider :locale="elLocale">
        <main :class="frontmatter.class ? frontmatter.class : ''">
          <component :is="comp" v-if="isCustomLayout"></component>
          <Content v-else />
          <FloatingButton v-if="lang === 'zh' && !isReport && showNss" />
          <FloatingButtonEn v-else-if="!isReport && showNss" />
        </main>
      </el-config-provider>
    </OPlusConfigProvider>
    <OPlusConfigProvider :locale="lang">
      <OCookieNotice
        ref="cookieRef"
        v-model:visible="cookieStore.isNoticeVisible"
        community="openEuler"
        :detail-url="`/${lang}/other/cookies`"
        :cookie-domain="COOKIE_DOMAIN"
      />
    </OPlusConfigProvider>
    <AppFooter :class="{ 'is-docs': isDocs }" :lang="lang" />
    <ClientOnly>
      <AppTour />
    </ClientOnly>
  </template>
  <ClientOnly v-else>
    <Content v-if="isReport" />
  </ClientOnly>
</template>

<style lang="scss" scoped>
// TODO: 导航高度使用变量
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.o-scroller {
  height: 100vh;
  background-color: var(--o-color-fill1);
  --scrollbar-height: calc(100vh - var(--layout-header-height) * 2 - 10px);
  :deep(.o-scroller-container) {
    scroll-padding-top: var(--layout-header-height);
  }
}

main {
  position: relative;
  min-height: calc(100vh - 259px);
  background-color: var(--o-color-fill1);
  padding-top: 72px;
  &::after {
    content: '';
    display: table;
  }
  @include respond('<=laptop_s') {
    padding-top: 64px;
  }
  @include respond('<=pad') {
    padding-top: 56px;
  }
  &.download-page {
    @media (max-width: 1100px) {
      overflow: visible;
    }
  }
}
.is-docs {
  margin-left: 300px;
  @media (max-width: 1100px) {
    margin-left: 0;
  }
}
</style>

<style lang="scss">
#app {
  --layout-content-max-width: 1544px;
  --layout-content-padding: 64px;
  --layout-header-height: 72px;

  @include respond('<=laptop') {
    --layout-content-max-width: 100%;
    --layout-content-padding: 40px;
  }

  @include respond('<=pad') {
    --layout-content-padding: 32px;
  }

  @include respond('phone') {
    --layout-content-padding: 24px;
  }
}
</style>
