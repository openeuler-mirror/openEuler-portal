<script lang="ts" setup>
import { ref, Ref, watch, computed } from 'vue';
import { useRouter, useData } from 'vitepress';
import { OIcon, ODropdown, ODropdownItem } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

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

const getLang = (lang: String) => {
  return lang === 'zh' ? '中文' : 'EN';
};
</script>

<template>
  <div v-if="!lePadV" class="header-lang">
    <ODropdown
      trigger="hover"
      optionPosition="bottom"
      option-wrap-class="dropdown"
    >
      <div class="info-wrap hover-icon-rotate">
        <span class="title">{{ getLang(lang) }}</span>
        <OIcon class="icon"><IconChevronDown /></OIcon>
      </div>

      <template #dropdown>
        <ODropdownItem
          v-for="item in langList"
          @click="changeLanguage(item.id)"
          :key="item.id"
          class="list"
        >
          {{ getLang(item.id) }}
        </ODropdownItem>
      </template>
    </ODropdown>
  </div>

  <div v-else class="mobile-change-language">
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
.icon {
  font-size: var(--o-icon_size_control-xs);
  margin-left: var(--o-gap-1);
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

    .title {
      display: flex;
      align-items: center;
      color: var(--o-color-info1);
      cursor: pointer;
      height: 100%;
      @include tip1;
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

.hover-icon-rotate {
  .o-icon {
    transition: all var(--o-duration-m1) var(--o-easing-standard-in);
  }

  @include hover {
    .o-icon {
      transform: rotate(-180deg);
    }
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
