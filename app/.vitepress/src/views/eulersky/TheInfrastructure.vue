<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import contributionData from '@/data/euler-sky/infra';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';

const i18n = useI18n();

const commonStore = useCommon();

const infraI18n = computed(() => {
  return i18n.value.sky.INFRA;
});
</script>
<template>
  <div class="infra">
    <AppContent :pc-top="40" :mobile-top="24">
      <BreadCrumbs
        :bread1="infraI18n.BREAD1"
        :bread2="infraI18n.BREAD2"
        :link1="infraI18n.BREAD1_URL"
      />
      <OContainer class="infra-container" :level-index="1">
        <div class="container-left word-style">
          <h3>{{ infraI18n.CARD_TITLE }}</h3>
          <p class="infra-container-introduction">
            {{ infraI18n.CARD_INTRODUCTION }} <br />
          </p>
        </div>
        <a
          :href="infraI18n.GUIDELINES_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OButton animation type="primary">
            {{ infraI18n.GUIDELINES }}
          </OButton>
        </a>
      </OContainer>
      <div class="contribution">
        <p class="contribution-title">{{ infraI18n.CONTRIBUTION_TITLE }}</p>
        <div class="contribution-list">
          <div
            v-for="item in contributionData"
            :key="item.LIGHT"
            class="contribution-item"
            alt=""
          >
            <img
              :src="commonStore.theme === 'light' ? item.LIGHT : item.DARK"
              alt=""
            />
          </div>
        </div>
        <p class="tip">{{ infraI18n.TIP }}</p>
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
.infra {
  .infra-container {
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
    .infra-container-introduction {
      color: var(--o-color-text4);
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
      .infra-container-introduction {
        margin-top: 8px;
      }
    }
  }
  .contribution {
    margin-top: 40px;
    .contribution-title {
      color: var(--o-color-text4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .contribution-list {
      margin-top: 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      .contribution-item {
        display: flex;
        max-width: 354px;
        margin: 0px -1px -1px 0px;
        border: 1px solid var(--o-color-division1);
        img {
          width: 100%;
        }
      }
    }
    .tip {
      margin-top: 24px;
      font-size: var(--o-font-size-tip);
      color: var(--o-color-text1);

      @media screen and (max-width: 768px) {
        margin-top: 12px;
      }
    }
    @media screen and (max-width: 768px) {
      margin-top: 24px;
      .contribution-list {
        margin-top: 12px;
      }
    }
  }
}
</style>
