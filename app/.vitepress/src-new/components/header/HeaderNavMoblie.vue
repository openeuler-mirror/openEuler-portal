<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '~@/i18n';
import { OCollapse, OIcon, OCollapseItem } from '@opensig/opendesign';
import { useCommon } from '@/stores/common';

import HeaderTheme from './HeaderTheme.vue';
import HeaderLanguage from './HeaderLanguage.vue';
import HeaderLogin from './HeaderLogin.vue';
import NavContent from './NavContent.vue';
import HeaderSearch from './HeaderSearch.vue';
import NavLink from './NavLink.vue';

import IconOutLink from '~icons/app/icon-out-link.svg';

const { lang } = useData();
const i18n = useI18n();
const headerData = computed(() => i18n.value.header.NAV_ROUTER);
const codeData = computed(() => i18n.value.header.SOURCE_CODE);

onMounted(() => {
  navActive.value = 'download';
  navInfo.value = headerData.value[0];
});

const props = defineProps({
  langOptions: {
    type: Array,
    default() {
      return [];
    },
  },
  menuShow: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const collapseValue = ref([]);

const navActive = ref('');
const navInfo = ref({});

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
  () => props.menuShow,
  (val: boolean) => {
    navActive.value = 'download';
    navInfo.value = headerData.value[0];
  }
);

watch(
  () => headerData.value || codeData.value,
  () => {
    navInfo.value =
      navActive.value === 'SOURCE_CODE'
        ? codeData.value
        : headerData.value.find((item) => item.ID === navActive.value);
  },
  {
    deep: true,
  }
);

const emit = defineEmits(['link-click']);
const linkClick = () => {
  emit('link-click');
};
</script>

<template>
  <div class="header-content" :class="lang">
    <div class="header-nav" :class="{ active: menuShow }">
      <nav class="o-nav">
        <ul class="o-nav-list">
          <li
            v-for="(item, index) in headerData"
            :key="item.ID"
            :class="{
              active: navActive === item.ID,
            }"
          >
            <span @click="handleNavClick(item)">{{ item.NAME }}</span>
          </li>
        </ul>
        <div class="nav-aside">
          <ul v-if="navActive !== 'SOURCE_CODE'" class="nav-aside-wrapper">
            <li
              v-for="item in navInfo.CHILDREN"
              :value="item.NAME"
              :title="item.NAME"
              :key="item.NAME"
              class="nav-aside-content"
            >
              <p class="content-title">{{ item.NAME }}</p>
              <NavLink
                v-if="item.MOBILE_LINK"
                class="content-title-url"
                style="margin-top: 0px"
                :url="item.URL"
                @link-click="linkClick"
              >
                {{ item.NAME }}
                <OIcon>
                  <component :is="item.ICON" class="icon" />
                </OIcon>
              </NavLink>
              <div v-if="item.HASGROUP">
                <div
                  class="group"
                  v-for="group in item.CHILDREN"
                  :key="group.NAME"
                >
                  <span>{{ group.NAME }}</span>
                  <NavContent
                    :nav-content="group?.CHILDREN"
                    @link-click="linkClick"
                    :is-mobile="true"
                  />
                </div>
              </div>
              <NavContent
                v-else
                :nav-content="item?.CHILDREN"
                @link-click="linkClick"
                :is-mobile="true"
              />
              <div v-if="item.EXTRAS" class="extra">
                <div v-for="extra in item.EXTRAS" :key="extra.NAME">
                  <NavLink
                    class="content-title-url"
                    :url="extra.URL"
                    @link-click="linkClick"
                  >
                    {{ extra.NAME }}
                    <OIcon>
                      <component :is="extra.ICON" class="icon" />
                    </OIcon>
                  </NavLink>
                  <NavContent
                    :nav-content="extra.CHILDREN"
                    @link-click="linkClick"
                    :is-mobile="true"
                  />
                </div>
              </div>
            </li>
          </ul>
          <div v-else class="nav-aside-wrapper">
            <NavLink
              v-for="item in navInfo"
              :url="item.PATH"
              :key="item.NAME"
              class="source-code-item"
            >
              <span>{{ item.NAME }}</span>
              <OIcon v-if="item.ICON">
                <IconOutLink class="icon" />
              </OIcon>
            </NavLink>
          </div>
        </div>
      </nav>
      <div class="header-tool">
        <div
          class="header-tool-code"
          @click="handleNavClick(null)"
          :class="{
            active: navActive === 'SOURCE_CODE',
          }"
        >
          {{ $t('header.CODE') }}
        </div>
        <HeaderLanguage :show="langOptions" />
        <HeaderTheme />
      </div>
    </div>
  </div>
  <!-- 搜索 -->
  <HeaderSearch />
  <HeaderLogin />
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
    top: 48px;
    height: calc(100vh - 48px);
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
    padding: 12px 12px 32px;
    height: 100%;

    .nav-aside-content {
      display: block;
      flex: 0 1 auto;

      & + .nav-aside-content {
        position: relative;
        padding-top: var(--o-gap-3);
        &::before {
          content: '';
          position: absolute;
          top: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(var(--o-mixedgray-14), 0.1);
        }
      }

      :deep(.o-collapse-item-body) {
        margin-bottom: 0;
      }

      .group + .group {
        margin-top: var(--o-gap-3);
      }

      .content-title {
        @include text1;
        color: var(--o-color-info3);
        font-weight: 500;
      }

      .content-title-url {
        @include text2;
        color: var(--o-color-primary1);
        margin: var(--o-gap-4) 0;

        .icon {
          height: 16px;
          width: 16px;
          margin-left: var(--o-gap-2);
        }
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

    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: var(--e-color-bg2);
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--e-color-bg2);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: var(--e-color-division1);
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
      text-align: center;
    }
  }
}
</style>
