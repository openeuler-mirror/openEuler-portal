<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';
import { OIcon, ODropdown, ODropdownItem } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';

import IconLocale from '~icons/app-new/icon-locale.svg';

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
const { lePadV } = useScreen();

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

const getLang = (lang: String, simple?: boolean) => {
  return lePadV.value ? 
  lang === 'zh' ? '中文' : 'EN'
  : lang === 'zh' ? simple ? '中' : '简体中文' : simple ? 'EN' : 'English';
};
</script>

<template>
  <div
    v-if="!lePadV"
    :class="langList.length <= 1 ? 'hide-lang' : 'header-lang'"
  >
    <ODropdown
      trigger="hover"
      optionPosition="bottom"
      option-wrap-class="dropdown"
    >
      <div class="info-wrap">
        <OIcon class="icon">
          <IconLocale />
          <div :class="['locale-tag', { 'is-en': lang === 'en' }]">{{ getLang(lang, true) }}</div>
        </OIcon>
      </div>

      <template #dropdown>
        <ODropdownItem
          v-for="item in langList"
          @click="changeLanguage(item.id)"
          :key="item.id"
          :class="['list', { 'is-active': lang === item.id }]"
        >
          {{ getLang(item.id) }}
        </ODropdownItem>
      </template>
    </ODropdown>
  </div>

  <div
    v-else
    :class="langList.length <= 1 ? 'hide-lang' : 'mobile-change-language'"
  >
    <span
      v-for="item in langList"
      :key="item.id"
      :class="{ active: lang === item.id }"
      @click.stop="changeLanguageMobile(item.id)"
      >{{ getLang(item.id) }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.hide-lang {
  display: none;
}

.header-lang {
  height: calc(100% + 10px);
  display: flex;
  align-items: center;

  .info-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      font-size: var(--o-icon_size_control-m);
      position: relative;
      color: var(--o-color-info1);

      &:hover {
        color: var(--o-color-primary1);
      }
    }
    .locale-tag {
      position: absolute;
      font-size: 10px;
      height: 12px;
      width: 12px;
      background-color: var(--o-color-fill2);

      display: flex;
      justify-content: center;
      align-items: center;
      left: 12px;
      top: 11px;

      &.is-en {
        width: 16px;
      }
    }
  }
  .list {
    background: var(--o-color-fill2);
    cursor: pointer;
    box-shadow: var(--o-shadow-1);
    border-radius: var(--o-radius_control-xs);
    padding: var(--o-gap-1);
    width: 144px;
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
  color: var(--o-color-info1);

  @include hover {
    background: var(--o-color-control2-light);
  }

  &.is-active {
    color: var(--o-color-primary1);
    background: var(--o-color-control3-light);
  }
}
.dropdown {
  --dropdown-list-radius: var(--o-radius-xs);
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
