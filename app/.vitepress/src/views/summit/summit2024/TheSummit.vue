
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useCommon, useCookieStore } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';

import useWindowResize from '@/components/hooks/useWindowResize';

import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

import data_zh from './data/data_zh';
import data_en from './data/data_en';

const { lang } = useData();

const router = useRouter();
const commonStore = useCommon();
const isMobile = computed(() =>
  useWindowResize().value <= 768 ? true : false
);
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);

let summitData: any;

if (lang.value === 'zh') {
  summitData = data_zh;
} else {
  summitData = data_en;
}
</script>
<template>
  <ClientOnly>
    <SummitBanner :banner-data="summitData.banner" />
  </ClientOnly>
  <AppContext>
    <div class="introduce">
      <p>{{ summitData.introduce }}</p>
      <p>{{ summitData.introduce2 }}</p>
      <p v-if="summitData.introduce3">{{ summitData.introduce3 }}</p>
      <ul v-if="summitData.list">
        <li v-for="li in summitData.list">
          {{ li }}
        </li>
      </ul>
      <p v-if="summitData.introduce4">{{ summitData.introduce4 }}</p>
    </div>
    <div class="call-content">
      <a
        v-for="item in summitData.contentList"
        :key="item.link"
        class="content-item"
        :href="item.link"
        target="_blank"
      >
        <div class="card-bg" :style="{ backgroundImage: `url(${isMobile ? item.img_mo : item.img})` }"></div>
        <div v-if="lang === 'zh'" class="cn-title call-title">
          {{ item.name }}
        </div>
        <div
          class="en-title call-title"
          :class="{ 'in-en-lang': lang === 'en' }"
        >
          {{ item.name_en || item.name }}
        </div>
      </a>
    </div>
    <div v-if="lang === 'zh'" class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.list"
          :key="item.link"
          :href="item.link"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.dark .card-bg {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
@mixin mobile {
  @media screen and (max-width: 768px) {
    @content;
  }
}

.introduce {
  font-size: var(--e-font-size-h6);
  line-height: var(--e-line-height-h6);
  color: var(--e-color-text1);
  p {
    margin-top: 24px;
    @include mobile {
      margin-top: 16px;
    }
    &:first-child {
      margin-top: 0;
    }
  }
  ul {
    padding-left: 20px;
    list-style: inherit;
    li {
      margin-top: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
}

.call-content {
  display: grid;
  margin: var(--e-spacing-h1) auto 0 auto;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--e-spacing-h4);
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 270px;
    gap: var(--e-spacing-h4);
    margin: var(--e-spacing-h4) auto 0 auto;
  }
  .content-item {
    position: relative;
    width: 100%;
    display: block;
    height: 352px;
    text-align: center;
    box-shadow: var(--e-shadow-l2);
    @media screen and (max-width: 768px) {
      height: 265px;
    }
    &:hover {
      box-shadow: var(--e-shadow-l2_hover);
      @media screen and (max-width: 1100px) {
        box-shadow: var(--e-shadow-l2);
      }
    }
    .card-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      @media screen and (max-width: 768px) {
        background-position: center bottom;
      }
    }
    .call-title {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: var(--e-color-white);
    }
    .cn-title {
      bottom: 13%;
      font-size: var(--e-font-size-h4);
      font-weight: 600;
      letter-spacing: 4px;
      @media screen and (max-width: 1416px) {
        font-size: var(--e-font-size-h5);
      }
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-h6);
        bottom: 15%;
      }
    }
    .en-title {
      bottom: 5%;
      font-size: var(--e-font-size-h6);
      letter-spacing: 2px;
      @media screen and (max-width: 1416px) {
        font-size: var(--e-font-size-h7);
      }
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-h8);
        bottom: 6%;
        letter-spacing: 1px;
      }
    }
    .in-en-lang {
      bottom: 10%;
    }
  }
}

.previous {
  margin-top: var(--e-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--e-color-text1);
      margin-right: var(--e-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        margin-right: var(--e-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--e-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--e-spacing-h6);
    }
    a {
      font-size: var(--e-font-size-h6);
      line-height: var(--e-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
      & + a {
        margin-top: var(--e-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--e-spacing-h8);
        }
      }
    }
  }
}
</style>
