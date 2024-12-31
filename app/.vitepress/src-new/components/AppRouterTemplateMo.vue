<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vitepress';

import { OIcon, OTag, ODivider } from '@opensig/opendesign';

import ContentWrapper from './ContentWrapper.vue';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

const props = defineProps({
  bannerData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  tabsData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  btnDatas: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const router = useRouter();
const active = computed(() => {
  return router.route.path.split('/');
});

const shownSelect = ref(false);

const activeRoute = computed(() => {
  return active.value[active.value.length - 2];
});

const handleToggleDrawer = () => {
  shownSelect.value = !shownSelect.value;
};

const subTitle = computed(() => {
  return props.tabsData.find(
    (item: { name: string }) => item.name === activeRoute.value
  ).title;
});
</script>
<template>
  <div>
    <div class="app-router-template-mo">
      <ContentWrapper
        class="banner-wrapper"
        :style="{
          '--content-wrapper-vertical-paddingTop': '0',
          '--content-wrapper-vertical-paddingBottom': '0',
        }"
      >
        <div class="left-info">
          <span>{{ bannerData.bannerTitle }}</span>
          <OTag> {{ subTitle }} </OTag>
        </div>
        <div @click="handleToggleDrawer" class="right-icon">
          <OIcon :class="{ reversal: shownSelect }"> <IconChevronDown /></OIcon>
        </div>
      </ContentWrapper>
      <div
        v-if="shownSelect"
        class="mask"
        @click.stop="shownSelect = false"
      ></div>
      <ContentWrapper
        v-if="shownSelect"
        class="router-select"
        @click="handleToggleDrawer"
        :style="{
          '--content-wrapper-vertical-paddingTop': '0',
          '--content-wrapper-vertical-paddingBottom': '0',
        }"
      >
        <div class="select" v-for="(item, index) in tabsData" :key="item.name">
          <a :href="item.href">
            {{ item.title }}
          </a>
          <ODivider v-if="index + 1 !== tabsData.length" />
        </div>
      </ContentWrapper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-router-template-mo {
  position: relative;
  padding: 8px 0;
  background-image: linear-gradient(270deg, #0027a7 0%, #95b2fb 100%);
}

.reversal {
  transform: rotate(-180deg);
}

.banner-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--o-color-white);
  .left-info {
    span {
      @include h4;
      margin-right: 8px;
    }
    .o-tag {
      background-color: rgba($color: #000000, $alpha: 0.25);
      color: var(--o-color-white);
      border: none;
    }
  }
  .right-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: var(--o-icon_size-m);
    .o-icon {
      transition: var(--o-easing-standard);
    }
  }
}
.router-select {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 2;
  display: block;
  width: 100%;
  background-color: var(--o-color-fill2);
  padding-top: 12px;
  padding-bottom: 12px;
  .select {
    display: flex;
    flex-direction: column;
    @include text1;
    a {
      color: var(--o-color-info2);
    }
  }
}

.mask {
  position: fixed;
  top: 88px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
</style>
