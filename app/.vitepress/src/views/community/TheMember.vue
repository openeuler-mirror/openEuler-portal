<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '@/i18n';

import { useData } from 'vitepress';

import MEMBER_DATA from '@/data/about-us/member-data';
import { useCommon } from '@/stores/common';

const { lang } = useData();

const memberData = computed(() => {
  if (lang.value === 'en') {
    return MEMBER_DATA.en;
  } else {
    return MEMBER_DATA.zh;
  }
});

const activeIndex = ref(0);
// 滚动激活导航
const navRef: any = ref([]);
const handleScrollEvent = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop + 100 > item.offsetTop) {
      activeList.push(index);
    }
  });
  activeIndex.value = activeList[activeList.length - 1];
};

const i18n = useI18n();

const commonStore = useCommon();

onMounted(() => {
  navRef.value = document.querySelectorAll('h2');
  window.addEventListener('scroll', handleScrollEvent);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollEvent);
});
</script>
<template>
  <div class="member">
    <div v-for="line in memberData" :key="line.donorTitle" class="member-line">
      <h2 :id="line.ID" class="member-title">{{ line.donorTitle }}</h2>
      <div class="logo-list">
        <span
          v-for="img in line.logoList"
          :key="img.img_light"
          class="logo"
          :class="img.noIcon ? 'no-icon' : ''"
        >
          <img
            :src="commonStore.theme === 'light' ? img.img_light : img.img_dark"
            loading="lazy"
            alt=""
          />
        </span>
      </div>
    </div>
    <div class="tip">
      <p>{{ i18n.about.TIP1 }}</p>
      <p>{{ i18n.about.TIP2 }}</p>
      <div v-if="lang === 'zh'" class="contact">
        <p>资金捐赠，请联系开放原子开源基金会。</p>
        <p>
          联系人：李扬；电话：010-59258678转8007；邮箱：<a
            href="mailto:liyang@openatom.org"
            >liyang@openatom.org</a
          >。
        </p>
      </div>
    </div>
  </div>
  <ul class="nav-right">
    <li v-for="(item, index) in memberData" :key="item.ID">
      <a :href="'#' + item.ID" :class="activeIndex === index ? 'active' : ''">{{
        item.donorTitle
      }}</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.member {
  display: grid;
  grid-row-gap: 40px;
  max-width: 1062px;

  .member-line {
    .member-title {
      margin-bottom: 16px;
      color: var(--o-color-text1);
      font-weight: 500;
      font-size: var(--o-font-size-h5);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h7);
      }
    }
    .logo-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 24px;
      .logo {
        position: relative;
        max-width: 354px;
        margin: 0px -1px -1px 0px;
        border: 1px solid var(--o-color-division1);
        img {
          width: 100%;
        }
        &::after {
          position: absolute;
          content: '';
          right: -1px;
          top: -1px;
          width: 31px;
          height: 21px;
          background-size: 100% 100%;
          background-image: url('@/assets/category/member/stash_light.png');
        }
      }
      .no-icon {
        &::after {
          display: none;
        }
      }
      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  .tip {
    display: grid;
    grid-row-gap: 16px;
    color: var(--o-color-text1);
    p {
      font-size: 12px;
    }
    .contact {
      display: grid;
      grid-row-gap: 16px;
      margin-top: 20px;
    }
  }
}
.nav-right {
  position: fixed;
  top: calc(10% + 80px);
  right: 0;
  width: 200px;
  z-index: 10;
  &::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 100%;
    left: 0;
    bottom: -50%;
    background-color: var(--o-color-bg4);
    z-index: 0;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
  a {
    position: relative;
    cursor: pointer;
    display: block !important;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    border-left: 1px solid var(--o-color-bg4);
    z-index: 1;
    padding: 8px 12px;
  }
  .active {
    color: var(--o-color-brand1);
    border-left: 1px solid var(--o-color-brand1);
  }
}
.dark {
  .logo-list {
    .logo {
      &::after {
        background-image: url('@/assets/category/member/stash_dark.png') !important;
      }
    }
  }
}
</style>
