<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import cityData from '@/data/user-group/city/';
import { useCommon } from '@/stores/common';

const { lang } = useData();
const i18n = useI18n();
const groupData = computed(() => {
  return i18n.value.group;
});

const jumpTo = (path: string) => {
  window.open(
    `/${lang.value}/community/user-group/detail/?name=${encodeURIComponent(
      path
    )}`,
    '_self'
  );
};

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<template>
  <div class="group-right">
    <div class="title">{{ groupData.CITY_TITLE }}</div>
    <div class="right-main">
      <div
        v-for="item in cityData"
        :key="item.name"
        class="city-item"
        @click="jumpTo(item.name)"
      >
        <img :src="isLight ? item.img : item.imgDark" alt="" />
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
    <div class="info">
      <p>没有您所在城市的用户组？</p>
      <a :href="groupData.CITY_LINK" target="_blank" rel="noopener noreferrer"
        >点此申请成立</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  text-align: center;
  margin-top: 24px;
  color: var(--e-color-text1);
  p,
  a {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
}
.right-main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .city-item {
    height: 264px;
    background: var(--e-color-bg2);
    flex: 1;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      height: auto;
      padding: 24px;
    }
    &:hover {
      box-shadow: var(--e-shadow-l1);
    }
    img {
      max-width: 100%;
    }
    .name {
      position: absolute;
      bottom: 16px;
      left: 0;
      width: 100%;
      text-align: center;
      color: var(--e-color-text1);
      font-size: var(--e-font-size-h6);
      line-height: var(--e-line-height-h6);
      @media screen and (max-width: 1100px) {
        bottom: 8px;
      }
    }
  }
}
</style>
