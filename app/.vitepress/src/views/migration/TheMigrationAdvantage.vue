<script setup lang="ts">
import { useData } from 'vitepress';
import seoConfig from '@/data/common/seo';

import advantageInfoData from '@/data/migration/migration-advantage';
import { computed } from 'vue';
const { lang } = useData();
const advantageInfo = computed(() => {
  return advantageInfoData[lang.value as 'zh' | 'en'];
});
</script>

<template>
  <div>
    <SeoBox :seo-data="(seoConfig as any)[lang]?.migrationAdvantage" />
    <div class="advantage-top">{{ advantageInfo.description }}</div>

    <div class="advantage-middle">
      <div v-for="item in advantageInfo.cards" :key="item.text" class="card">
        <img :src="item.url" alt="" />
        <p>{{ item.text }}</p>
      </div>
    </div>

    <div class="advantage-bottom">
      <span>{{ advantageInfo.tips.text_1 }}</span>
      <a :href="'/' + lang + '/migration/contact/'">{{
        advantageInfo.tips.text_2
      }}</a>
      <span>{{ advantageInfo.tips.text_3 }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advantage-top {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--o-color-text4);
  line-height: var(--o-line-height-text);
}

.advantage-middle {
  margin-top: var(--o-spacing-h4);
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: var(--o-spacing-h6);
  }
  .card {
    flex: 1;
    padding: var(--o-spacing-h4) var(--o-spacing-h3);
    background: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    display: flex;
    flex-direction: column;
    // margin-top: var(--o-spacing-h4);
    // @media screen and (max-width: 768px) {
    //   margin: var(--o-spacing-h6);
    // }
    &:nth-child(2) {
      margin: 0 var(--o-spacing-h4);
      @media screen and (max-width: 768px) {
        margin: var(--o-spacing-h6) 0;
      }
    }
    img {
      max-width: 142px;
      align-self: center;
    }
    p {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text4);
      line-height: var(--o-line-height-text);
      margin-top: var(--o-spacing-h4);
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h6);
      }
    }
  }
}

.advantage-bottom {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--o-color-text4);
  line-height: var(--o-line-height-text);
  margin-top: var(--o-spacing-h4);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h6);
  }
}
</style>
