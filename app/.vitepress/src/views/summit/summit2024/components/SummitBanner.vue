<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import AOS from 'aos';

import {
  OButton,
  OIcon,
  ODropdown,
  ODropdownItem,
  OLink,
  ODialog,
} from '@opensig/opendesign';

import { useCommon } from '@/stores/common';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';
import IconOutLink from '~icons/app-new/icon-outlink.svg';

import useWindowResize from '@/components/hooks/useWindowResize';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const screenWidth = ref(useWindowResize());
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const commonStore = useCommon();

const isLight = computed(() => {
  return commonStore.theme === 'light';
});

onMounted(() => {
  AOS.init({
    duration: 800,
  });
});

const dialogVisible = ref(false);
const dropdownVisible = ref(false);
const visibleChange = (val: boolean) => {
  dropdownVisible.value = val;
};

const viewBtn = (url: string) => {
  window.open(url, '_blank');
  dialogVisible.value = false;
};
</script>

<template>
  <div class="home-banner">
    <div class="banner-panel-cover"></div>
    <div class="banner-panel-content">
      <div data-aos="fade-up" class="banner-main">
        <img
          :src="isLight ? bannerData.pcTextImgLight : bannerData.pcTextImgDark"
          class="text-img"
        />
        <div v-if="bannerData.btn" data-aos="fade-up" class="action">
          <ClientOnly>
            <div
              v-if="!isMobile"
              class="btn-dropdown"
              :class="{ 'dropdown-visible': dropdownVisible }"
            >
              <ODropdown
                trigger="hover"
                option-position="bottom"
                option-wrap-class="dropdown"
                @visible-change="visibleChange"
              >
                <OButton
                  variant="outline"
                  color="normal"
                  size="large"
                  class="view-btn"
                >
                  {{ bannerData.btn }}
                  <template #suffix>
                    <OIcon><IconChevronDown /></OIcon>
                  </template>
                </OButton>

                <template #dropdown>
                  <ODropdownItem
                    v-for="item in bannerData.list"
                    :key="item.text"
                    class="list"
                  >
                    <OLink
                      color="normal"
                      variant="text"
                      :href="item.url"
                      target="_blank"
                    >
                      {{ item.text }}<OIcon><IconOutLink /></OIcon>
                    </OLink>
                  </ODropdownItem>
                </template>
              </ODropdown>
            </div>
            <OButton
              v-else
              variant="outline"
              color="normal"
              size="large"
              class="view-btn"
              :class="{ 'view-btn-visible': dialogVisible }"
              @click="dialogVisible = true"
            >
              {{ bannerData.btn }}
              <template #suffix>
                <OIcon><IconChevronDown /></OIcon>
              </template>
            </OButton>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
  <ODialog
    v-model:visible="dialogVisible"
    class="playback-body"
    size="medium"
    :style="{ '--dlg-radius': '4px' }"
  >
    <template #header>
      <span class="del-title">{{ bannerData.btn }}</span>
    </template>
    <div class="dlg-body">
      <OLink
        v-for="item in bannerData.list"
        :key="item.text"
        color="normal"
        variant="text"
        @click="viewBtn(item.url)"
      >
        {{ item.text }}<OIcon><IconOutLink /></OIcon>
      </OLink>
    </div>
  </ODialog>
</template>

<style lang="scss" scoped>
$banner-color: var(--e-color-text1);

.home-banner {
  width: 100%;
  height: 380px;
  position: relative;
  .banner-panel-cover {
    height: 100%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url(../img/banner_pc_light.jpg);
    @media screen and (max-width: 768px) {
      background-image: url(../img/banner_mo_light.png);
    }
  }
  .banner-panel-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1504px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 44px;
    display: flex;
    @media screen and (max-width: 1439px) {
      padding: 0 24px;
    }
    @media screen and (max-width: 768px) {
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 20px;
    }
  }

  .banner-main {
    width: 100%;
  }
  .text-img {
    height: 156px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .action {
    max-width: 136px;
    margin-top: 32px;
    @media screen and (min-width: 550px) and (max-width: 768px) {
      display: none;
    }
    @media screen and (max-width: 768px) {
      max-width: none;
      margin-top: 0;
    }
  }
}
.btn-dropdown {
  .view-btn {
    .o-icon {
      transition: all var(--o-duration-m1) var(--o-easing-standard-in);
    }
  }
  @include hover {
    .view-btn {
      --btn-color-hover: var(--o-color-info1);
      background-color: transparent;
      .o-icon {
        transform: rotate(-180deg);
      }
    }
  }
}
.dropdown-visible {
  .view-btn {
    .o-icon {
      transform: rotate(-180deg);
    }
  }
}
.o-btn {
  --btn-radius: 0;
  --btn-padding: 7px 15px 7px 23px;
}
.o-dropdown-item {
  --dropdown-item-padding: 0;
  --dropdown-item-radius: var(--o-radius-xs);
}
.o-link {
  padding: 8px 17px;
  width: 100%;
  @include text1;
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-left: 8px;
    }
  }
}

.dark .banner-panel-cover {
  background-image: url(../img/banner_pc_dark.jpg);
  @media screen and (max-width: 768px) {
    background-image: url(../img/banner_mo_dark.png);
  }
}
@media (max-width: 767px) {
  .home-banner {
    height: 300px;
    .banner-panel-content {
      width: 100%;
      max-width: 100%;
    }
    .banner-main {
      text-align: center;
    }
    .text-img {
      height: 60px;
      margin-bottom: 12px;
    }
  }

  .o-btn {
    --btn-height: 32px;
    --btn-radius: 0;
    --btn-padding: 3px 5px 3px 13px;
    --btn-color: var(--o-color-info1);
    --btn-color-active: var(--o-color-info1);
    --btn-bg-color-active: transparent;
    background-color: transparent;
    @include text2;
  }
  .view-btn-visible {
    .o-icon {
      transform: rotate(-180deg);
    }
  }
  .o-link {
    padding: 12px 16px;
    width: 100%;
    --link-color-active: var(--o-color-info2);
    @include text2;
    :deep(.o-link-label) {
      .o-icon {
        --icon-size: 16px;
        margin-left: 8px;
      }
    }
  }
}
</style>
