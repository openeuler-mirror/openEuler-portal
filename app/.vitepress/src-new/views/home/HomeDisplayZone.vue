<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

import displayZoneData from '~@/data/home/display-zone';

const { locale } = useLocale();
const { theme } = storeToRefs(useCommon());
</script>

<template>
  <div class="home-display-zone">
    <a
      v-for="item in displayZoneData"
      :key="item.link[locale]"
      :href="item.link[locale]"
      target="_blank"
      class="display-zone-item"
    >
      <div class="display-zone-icon">
        <img
          :src="item.icon[theme]"
          alt="openEuler"
          class="display-zone-item-icon"
        />
      </div>
      <div class="display-zone-text">
        <h4 class="display-zone-title">
          {{ item.title[locale] }}
        </h4>
        <p class="display-zone-description">{{ item.description[locale] }}</p>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.home-display-zone {
  padding: 16px 72px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 0;
  row-gap: 0;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  z-index: 1;
  @include respond-to('<=pad_v') {
    position: relative;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
    gap: 16px;
    background: transparent;
    .display-zone-item {
      flex-direction: column;
      .display-zone-icon {
        width: 32px;
      }
      .display-zone-text {
        .display-zone-title-en {
          text-align: center;
        }
      }
    }
  }
  @include respond-to('phone') {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }

  .display-zone-item {
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    border-radius: var(--o-radius-xs);
    @include respond-to('<=pad_v') {
      align-items: center;
      padding: 16px;
      background: var(--o-color-fill2);
    }
    .display-zone-item-icon {
      display: block;
      
    }
    .display-zone-icon {
      flex-shrink: 0;
      width: 48px;
      img {
        width: 100%;
      }
    }
    .display-zone-text {
      margin-left: 12px;
      @include respond-to('<=pad_v') {
        text-align: center;
        margin-top: 8px;
        margin-left: 0;
      }
      .display-zone-title {
        color: var(--o-color-info1);
        @include text2;
        font-weight: 500;
      }
      .display-zone-description {
        color: var(--o-color-info2);
        @include tip1;
        text-align: left;
        @include respond-to('<=pad_v') {
          display: none;
        }
      }
      @include hover {
        .display-zone-title,
        .display-zone-description {
          color: var(--o-color-primary1);
        }
      }
    }
  }
}
</style>
