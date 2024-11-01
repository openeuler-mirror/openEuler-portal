<script lang="ts" setup>
import { ref, Ref, watch, computed } from 'vue';
import { useRouter, useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';

import DropInfo from './DropInfo.vue';
import IconDown from '~icons/app-new/icon-chevron-down.svg';

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
const isMobile = computed(() => (screenWidth.value <= 1200 ? true : false));

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
  router.go(newHref + search);
}

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
  <DropInfo
    v-if="!isMobile" 
    :data="langList"
    :field="'id'"
    :default-value="lang"
    @item-change="changeLanguage"
  >
    <template #title>
      <span>{{ lang === 'zh' ? '中文' : lang === 'ru' ? 'RU' : 'EN' }}</span>
      <OIcon v-if="langList.length > 1"><icon-down class="icon"></icon-down></OIcon>
    </template>
    <template #item="{ item }">
      {{ item.id === 'zh' ? '中文' : item.id === 'ru' ? 'RU' : 'EN' }}
    </template>
  </DropInfo>
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
.icon {
  font-size: var(--o-icon_size_control-xs);
  margin-left: var(--o-gap-1);
}
.mobile-change-language {
  display: flex;
  align-items: center;
  height: 36px;
  span {
    color: var(--o-color-info1);
    margin-right: var(--o-gap-3);
    text-align: center;
    @include text1;
    cursor: pointer;
    &.active {
      color: var(--o-color-primary1);
      font-weight: 500;
    }
    &:not(:last-child) {
      &:after {
        content: '|';
        margin-left: var(--o-gap-3);
        color: var(--o-color-info1);
      }
    }
  }
}
</style>
