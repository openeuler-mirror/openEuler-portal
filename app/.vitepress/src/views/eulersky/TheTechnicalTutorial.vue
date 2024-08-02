<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useI18n } from '@/i18n';

import TULTORIAL_LIST from '@/data/euler-sky/tultorial';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';

const i18n = useI18n();

const { lang } = useData();

const technicalTutorialI18n = computed(() => {
  return i18n.value.sky.TECHNICAL_TULTORIAL;
});
const router = useRouter();

function goDetail(path: string) {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(path);
  }
}
</script>
<template>
  <div class="tultorial">
    <AppContent :pc-top="40" :mobile-top="24">
      <BreadCrumbs
        :bread1="technicalTutorialI18n.BREAD1"
        :bread2="technicalTutorialI18n.BREAD2"
        :link1="technicalTutorialI18n.BREAD1_URL"
      />
      <OContainer class="tultorial-container" :level-index="1">
        <h3>{{ technicalTutorialI18n.BREAD2 }}</h3>
        <p class="tultorial-container-introduction">
          {{ technicalTutorialI18n.TULTORIAL_CARD_INTRODUCTION }}
          <a
            :href="`mailto:${technicalTutorialI18n.TULTORIAL_CARD_INTRODUCTION1}`"
            >{{ technicalTutorialI18n.TULTORIAL_CARD_INTRODUCTION1 }}</a
          >
        </p>
      </OContainer>
      <div class="tultorial-main">
        <h2>{{ technicalTutorialI18n.TULTORIAL_CARD_TITLE }}</h2>
        <div class="tultorial-card-list">
          <OContainer
            v-for="item in TULTORIAL_LIST[lang as 'zh' | 'en']"
            :key="item.title"
            @click="goDetail(item.url)"
          >
            <img :src="item.img" alt="" />
            <div class="card-title">
              {{ item.title }}
            </div>
          </OContainer>
        </div>
      </div>
    </AppContent>
  </div>
</template>

<style scoped lang="scss">
.tultorial {
  .tultorial-container {
    margin-top: 40px;
    padding: 40px;
    h3 {
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h5);
      font-size: var(--e-font-size-h5);
    }
    .tultorial-container-introduction {
      margin-top: 16px;
      color: var(--e-color-text1);
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
    @media screen and (max-width: 768px) {
      margin-top: 24px;
      padding: 16px;
      h3 {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h7);
      }
      .tultorial-container-introduction {
        margin-top: 8px;
      }
    }
  }
  .tultorial-main {
    h2 {
      font-size: var(--e-font-size-h3);
      font-weight: 300;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h3);
      width: 100%;
      text-align: center;
      margin-top: var(--e-spacing-h2);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
        margin-top: var(--e-spacing-h4);
      }
    }
    .tultorial-card-list {
      display: grid;
      margin: 0 auto;
      margin-top: 40px;
      grid-template-columns: repeat(4, 1fr);
      grid-row-gap: 24px;
      grid-column-gap: 24px;
      @media screen and (max-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (max-width: 768px) {
        margin-top: 24px;
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
      }
      .o-container {
        cursor: pointer;
        img {
          width: 100%;
        }
        .card-title {
          color: var(--e-color-text1);
          padding: 16px;
          padding-bottom: 40px;
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
            padding: 16px;
          }
        }
      }
    }
  }
}
</style>
