<script lang="ts" setup>
import { ref, Ref, watch, computed } from 'vue';
import { useRouter, useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconDown from '~icons/app/icon-chevron-down.svg';

const props = defineProps({
  show: {
    type: Object,
    default() {
      return [];
    },
  },
});

const router = useRouter();
const { lang } = useData();
const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 1100 ? true : false));

// 选择语言;
const langOptions = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'English' },
];

// 选择语言
const emits = defineEmits(['language-click']);
const changeLanguageMobile = (newlang: string) => {
  changeLanguage(newlang);
  emits('language-click');
};

function changeLanguage(newlang: string) {
  if (lang.value === newlang) return;
  const { pathname, search } = window.location;
  const newHref = pathname.replace(`/${lang.value}/`, `/${newlang}/`);
  isMenu.value = false;
  router.go(newHref + search);
}

const isMenu = ref(false);
const showSub = () => {
  isMenu.value = true;
};
const hideSub = () => {
  isMenu.value = false;
};

interface LangType {
  id: string;
  label: string;
}
const langList: Ref<LangType[]> = ref([]);
const filterLang = () => {
  langList.value = [];
  props.show.forEach((item: string) => {
    langOptions.filter((el: LangType) => {
      if (el.id === item) {
        langList.value.push(el);
      }
    });
  });
};

watch(
  () => props.show,
  () => {
    filterLang();
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="!isMobile"
    class="lang-menu"
    @mouseenter="showSub()"
    @mouseleave="hideSub()"
  >
    <span class="lang-menu-link" :class="{ 'no-state': langList.length < 2 }">
      {{ lang === 'zh' ? '中文' : lang === 'ru' ? 'RU' : 'EN' }}
      <OIcon v-if="langList.length > 1"><icon-down></icon-down></OIcon>
    </span>
    <ul v-if="isMenu && langList.length > 1" class="lang-menu-list">
      <li
        v-for="item in langList"
        :key="item.id"
        class="lang-item"
        :class="{ active: lang === item.id }"
        @click="changeLanguage(item.id)"
      >
        {{ item.id === 'zh' ? '中文' : item.id === 'ru' ? 'RU' : 'EN' }}
      </li>
    </ul>
  </div>
  <div v-else class="mobile-change-language">
    <span
      v-for="item in langList"
      :key="item.id"
      :class="{ active: lang === item.id }"
      @click.stop="changeLanguageMobile(item.id)"
      >{{ item.id === 'zh' ? '中文' : item.id === 'ru' ? 'RU' : 'EN' }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.lang-menu {
  position: relative;
  height: 100%;
  margin-right: var(--o-spacing-h5);
  &-link {
    display: flex;
    align-items: center;
    font-size: var(--o-font-size-text);
    color: var(--o-color-text1);
    cursor: pointer;
    height: 100%;
    &.no-state {
      cursor: default;
    }
  }
  &-list {
    position: absolute;
    top: 80px;
    left: -24px;
    background: var(--o-color-bg2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--o-shadow-l1);
    min-width: 78px;
    .lang-item {
      line-height: var(--o-line-height-h3);
      text-align: center;
      font-size: var(--o-font-size-text);
      color: var(--o-color-text1);
      border-bottom: 1px solid var(--o-color-division1);
      padding: 0 var(--o-spacing-h5);
      &:last-child {
        border-bottom: 0 none;
      }

      &:hover {
        background: var(--o-color-brand1);
        color: var(--o-color-text2);
      }
      &.active {
        color: var(--o-color-brand1);
        background: none;
        cursor: default;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.mobile-change-language {
  display: none;
  line-height: var(--o-line-height-h3);
  span {
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text4);
    margin-right: 12px;
    cursor: pointer;
    &.active {
      color: var(--o-color-brand1);
      font-weight: 600;
    }
    &:not(:last-child) {
      &:after {
        content: '|';
        margin-left: 12px;
        color: var(--o-color-text4);
      }
    }
  }
  @media screen and (max-width: 1100px) {
    display: flex;
  }
}
</style>
