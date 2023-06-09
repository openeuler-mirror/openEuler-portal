<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import siteList from '@/data/euler-sky/site';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';

import bg_4 from '@/assets/category/euler-sky/bg-4.png';

const i18n = useI18n();
const siteI18n = computed(() => {
  return i18n.value.sky.SITE_RESOURCES;
});
const router = useRouter();

function goDetail(url: string) {
  router.go(url);
}
</script>
<template>
  <div class="infra">
    <AppContent :pc-top="40" :mobile-top="24">
      <BreadCrumbs
        :bread1="siteI18n.BREAD1"
        :bread2="siteI18n.BREAD2"
        :link1="siteI18n.BREAD1_URL"
      />
      <OContainer class="site-container" :level-index="1">
        <div class="container-left word-style">
          <h3>{{ siteI18n.CARD_TITLE }}</h3>
          <p class="site-container-introduction">
            {{ siteI18n.CARD_INTRODUCTION }}
          </p>
        </div>
        <OButton
          animation
          type="primary"
          @click="goDetail(siteI18n.APPLY_SITE_URL)"
        >
          {{ siteI18n.BTN_TEXT }}
        </OButton>
      </OContainer>
      <div class="site-list">
        <h2>{{ siteI18n.SITE_TITLE }}</h2>
        <div class="site-card-list">
          <OContainer
            v-for="item in siteList"
            :style="{ backgroundImage: `url(${bg_4})` }"
            :key="item.scale"
          >
            <div class="container-text">
              <div class="label-line">
                <span class="label"> {{ siteI18n.COMPANY }}</span>
                <span class="text-info">{{ item.company }}</span>
              </div>
              <div class="label-line">
                <span class="label">{{ siteI18n.SCALE }}</span>
                <span class="text-info">{{ item.scale }}</span>
              </div>
              <div class="label-line">
                <span class="label">{{ siteI18n.CITY }}</span>
                <span class="text-info">{{ item.base }}</span>
              </div>
              <div class="label-line">
                <span class="label">{{ siteI18n.TYPE }}</span>
                <span class="text-info">{{ item.type }}</span>
              </div>
            </div>
          </OContainer>
        </div>
        <p class="tip">{{ siteI18n.TIP }}</p>
      </div>
      <OContainer class="apply-container word-style" :level-index="1">
        <h3>{{ siteI18n.APPLY_SITE_TITLE }}</h3>
        <p class="apply-container-introduction">
          {{ siteI18n.APPLY_SITE_INTRODUCTION }}
          <a :href="`mailto:${siteI18n.APPLY_SITE_INTRODUCTION1}`">{{
            siteI18n.APPLY_SITE_INTRODUCTION1
          }}</a>
        </p>
      </OContainer>
    </AppContent>
  </div>
</template>

<style scoped lang="scss">
.word-style {
  color: var(--o-color-text1);
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
}
.site-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 40px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 24px;
    padding: 16px;
    h3 {
      line-height: var(--o-line-height-h7);
      font-size: var(--o-font-size-h7);
    }
  }
  .site-container-introduction {
    margin-top: 16px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }

  h3 {
    line-height: var(--o-line-height-h5);
    font-size: var(--o-font-size-h5);
    @media screen and (max-width: 768px) {
      line-height: var(--o-line-height-h7);
      font-size: var(--o-font-size-h7);
    }
  }
  .o-button {
    color: var(--o-color-white);
    margin-left: 50px;
    max-height: 40px;
    white-space: nowrap;
    @media screen and (max-width: 768px) {
      margin-left: 0;
      margin-top: 12px;
      padding: 4px 16px;
      font-size: var(--o-font-size-text);
    }
  }
}
.apply-container {
  margin-top: 40px;
  padding: 40px;
  h3 {
    line-height: var(--o-line-height-h5);
    font-size: var(--o-font-size-h5);
  }
  .apply-container-introduction {
    margin-top: 16px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  @media screen and (max-width: 768px) {
    margin-top: 24px;
    padding: 16px;
    h3 {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
    .apply-container-introduction {
      margin-top: 8px;
    }
  }
}
.site-list {
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
  .site-card-list {
    display: grid;
    margin-top: 40px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    @media screen and (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 768px) {
      margin-top: 24px;
      grid-template-columns: 1fr;
    }
    .o-container {
      padding: 40px;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      background-position: right bottom;
      background-repeat: no-repeat;
      background-size: 160px auto;
      @media screen and (max-width: 768px) {
        padding: 16px;
        height: 144px;
        font-size: var(--o-font-size-text);
        background-size: 150px 100px;
      }
      .label-line {
        display: flex;
      }
      .label {
        display: inline-block;
        min-width: 70px;
        text-align: right;
        color: var(--o-color-text4);
      }
      .text-info {
        display: inline-block;
      }
      .company {
        margin-top: 24px;
      }
    }
  }
}
</style>
