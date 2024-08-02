<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import caseInfoData from '@/data/migration/migration-case';
const lang = useData().lang;
const caseInfo = computed(() => {
  return caseInfoData[lang.value as 'zh' | 'en'];
});
</script>

<template>
  <div class="migration-transplantation">
    <div class="migration-transplantation-content">
      <a
        v-for="item in caseInfo"
        :key="item.label"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="migration-transplantation-card">{{ item.label }}</div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.migration-transplantation {
  margin-top: var(--o-spacing-h2);
  color: var(--o-color-text1);

  .migration-transplantation-desc {
    color: var(--o-color-text1);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 300;
    margin-top: 0;
    margin-bottom: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-bottom: var(--o-spacing-h4);
    }
  }
  .migration-contribution {
    margin-top: var(--o-spacing-h2);
  }

  h1 {
    font-weight: 300;
    text-align: center;
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      margin: 0 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }

  .migration-transplantation-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: var(--o-spacing-h4);
    column-gap: var(--o-spacing-h4);

    @media screen and (max-width: 1280px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .migration-transplantation-card {
      position: relative;
      background-color: var(--o-color-bg2);
      border: 1px solid var(--o-color-brand1);
      padding: 16px 18px;
      font-size: var(--o-font-size-h7);
      line-height: var(--o-font-size-h7);
      font-weight: 500;
      color: var(--o-color-text1);
      cursor: pointer;

      @media screen and (max-width: 768px) {
        background-color: var(--o-color-brand1);
        color: var(--o-color-text2);
        text-align: center;
        padding: 3px 0;
        font-size: var(--o-font-size-text);
        font-weight: 400;
        color: #ffffff;
        line-height: var(--o-line-height-text);
      }
      &::before {
        position: absolute;
        content: '';
        left: -1px;
        top: -1px;
        bottom: 0;
        width: 2px;
        background-color: var(--o-color-brand1);
      }

      &:hover {
        box-shadow: var(--o-shadow-l2_hover);
      }
    }
  }
}
</style>
