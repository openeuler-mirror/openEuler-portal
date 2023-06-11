<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import AOS from 'aos';

import oevpList from '@/data/euler-sky/oevp';

import { useCommon } from '@/stores/common';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';
import IconHome from '~icons/app/icon-home.svg';

const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const oevpListData = oevpList.sort((a, b) => {
  return a.name.localeCompare(b.name, 'zh');
});

const i18n = useI18n();
const oevpI18n = computed(() => {
  return i18n.value.sky.JOIN_OEVP;
});
const router = useRouter();

function goDetail(url: string) {
  router.go(url);
}
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <div class="oevp">
    <AppContent :pc-top="40" :mobile-top="24">
      <BreadCrumbs
        :bread1="oevpI18n.BREAD1"
        :bread2="oevpI18n.BREAD2"
        :link1="oevpI18n.BREAD1_URL"
      />
      <OContainer class="oevp-container" :level-index="1">
        <div class="container-left word-style">
          <h3>{{ oevpI18n.CARD_TITLE }}</h3>
          <p class="oevp-container-introduction">
            {{ oevpI18n.CARD_INTRODUCTION }}
          </p>
        </div>
        <OButton animation type="primary" @click="goDetail(oevpI18n.JOIN_URL)">
          {{ oevpI18n.JOIN_BTN }}
        </OButton>
      </OContainer>
      <div class="oevp-list">
        <h2>{{ oevpI18n.OEVP_TITLE }}</h2>
        <div class="oevp-card-list">
          <OContainer
            v-for="item in oevpListData"
            :key="item.name"
            class="card-item"
            data-aos="fade-up"
          >
            <img class="avator" :src="item.avator" />
            <span class="name">{{ item.name }}</span>
            <span class="company">{{ item.company }}</span>
            <div class="label-list">
              <span v-for="label in item.labels" :key="label" class="label">{{
                label
              }}</span>
            </div>
            <span class="base"
              ><OIcon><IconHome /></OIcon>{{ item.base }}</span
            >
          </OContainer>
        </div>
        <p class="tip">{{ oevpI18n.TIP }}</p>
      </div>
      <div class="oevp-list">
        <h2>{{ oevpI18n.EQUITY_TITLE }}</h2>
        <OContainer
          class="equity-container"
          data-aos="fade-up"
          :level-index="1"
        >
          <div class="oevp-equity-list">
            <div
              v-for="item in oevpI18n.EQUITY_LIST"
              :key="item.TITLE"
              class="card-item"
            >
              <img v-if="!isDark" :src="item.IMG" alt="" />
              <img v-else :src="item.IMG_DARK" alt="" />
              <p class="item-title">{{ item.TITLE }}</p>
            </div>
          </div>
        </OContainer>
      </div>
      <div class="oevp-list">
        <h2>{{ oevpI18n.BECOME_OEVP_TITLE }}</h2>
        <OContainer class="join-container" data-aos="fade-up" :level-index="1">
          <p v-for="item in oevpI18n.BECOME_OEVP_LIST" :key="item.TITLE">
            {{ item }}
          </p>
        </OContainer>
      </div>
    </AppContent>
  </div>
</template>

<style scoped lang="scss">
.word-style {
  color: var(--o-color-text1);
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
}
.oevp {
  .oevp-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    padding: 40px;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    h3 {
      line-height: var(--o-line-height-h5);
      font-size: var(--o-font-size-h5);
    }
    .o-button {
      margin-left: 50px;
      max-height: 40px;
      white-space: nowrap;
      color: var(--o-color-white);
      @media screen and (max-width: 768px) {
        margin-left: 0;
        margin-top: 12px;
        padding: 4px 16px;
        font-size: var(--o-font-size-text);
      }
    }
    .oevp-container-introduction {
      margin-top: 16px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    @media screen and (max-width: 768px) {
      margin-top: 24px;
      padding: 16px;
      h3 {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
      .oevp-container-introduction {
        margin-top: 8px;
      }
    }
  }
  .oevp-list {
    h2 {
      margin-top: var(--o-spacing-h2);
      font-size: var(--o-font-size-h3);
      font-weight: 300;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h3);
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-top: var(--o-spacing-h4);
      }
    }
    .oevp-card-list {
      display: grid;
      margin-top: 40px;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 24px;
      @media screen and (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (max-width: 768px) {
        margin-top: 24px;
        grid-template-columns: 1fr;
      }
      .card-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
        .avator {
          width: 100px;
        }
        .name {
          margin-top: 8px;
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          color: var(--o-color-brand1);
        }
        .company {
          margin-top: 6px;
          color: var(--o-color-text4);
        }
        .label-list {
          display: flex;
          margin-top: 20px;
          justify-content: center;
          flex-wrap: wrap;
          .label {
            margin: 0 4px 4px 0;
            padding: 4px 8px;
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            background-color: var(--o-color-bg1);
          }
        }
        .base {
          display: flex;
          align-items: center;
          margin-top: 8px;
          color: var(--o-color-text4);
          .o-icon {
            font-size: var(--o-font-size-h8);
            margin-right: 8px;
          }
        }
        &:hover {
          box-shadow: var(--o-shadow-l2_hover);
        }
      }
    }
    .tip {
      margin-top: 40px;
      color: var(--o-color-text1);
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h4);
        font-size: var(--o-font-size-text);
      }
    }
    .equity-container {
      color: var(--o-color-text1);
      margin-top: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      @media screen and (max-width: 768px) {
        margin-top: 24px;
      }
      .oevp-equity-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 40px;
        margin: 0 auto;
        padding: 40px;
        width: 100%;
        max-width: 744px;
        @media screen and (max-width: 768px) {
          padding: 16px;
          justify-content: space-around;
        }

        .card-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          min-width: 74px;
          img {
            width: 48px;
            height: 48px;
          }
          .item-title {
            margin-top: 12px;
            font-size: var(--o-font-size-h7);
            @media screen and (max-width: 768px) {
              font-size: var(--o-font-size-text);
            }
          }
        }
      }
    }
    .join-container {
      margin-top: 40px;
      padding: 40px;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      @media screen and (max-width: 768px) {
        margin-top: 24px;
        padding: 16px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
  }
}
</style>
