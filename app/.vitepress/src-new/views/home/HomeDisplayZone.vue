<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { computed } from 'vue';
import displayZoneData from '~@/data/home/display-zone';

const commonStore = useCommon();

const jumpTo = (path: string) => {
  window.open(path, '_blank');
};

const getImgUrl = computed(() => (item: { IMG_DARK: string; IMG: string }) => {
  return commonStore.theme === 'dark' ? item.IMG_DARK : item.IMG;
});

const getImgUrlHover = computed(
  () => (item: { IMG_DARK_HOVER: string; IMG_HOVER: string }) => {
    return commonStore.theme === 'dark' ? item.IMG_DARK_HOVER : item.IMG_HOVER;
  }
);
</script>

<template>
  <div class="home-display-zone" data-aos="fade-up">
    <a
      v-for="item in displayZoneData"
      :key="item.link.zh"
      :href="item.link.zh"
      class="display-zone-item"
    >
      <div class="display-zone-icon">
        <img
          :src="item.icon.light"
          alt="openEuler"
          class="display-zone-item-icon"
        />
      </div>
      <div class="display-zone-text">
        <h4 class="display-zone-title">
          {{ item.title.zh }}
        </h4>
        <p class="display-zone-description">{{ item.description.zh }}</p>
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
  @include respond-to('<=laptop') {
    row-gap: 24px;
    position: relative;
    grid-template-columns: repeat(2, 1fr);
    .display-zone-item {
      flex-direction: column;
      .display-zone-icon {
        width: 32px;
      }
      .display-zone-text {
        margin: 0;
        .display-zone-title-en {
          text-align: center;
        }
      }
    }
  }
  @include respond-to('phone') {
    gap: 12px;
    padding: 0;
    background: transparent;
  }

  .display-zone-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: var(--o-radius-xs);
    @include respond-to('phone') {
      padding: 16px;
      background: var(--o-color-fill2);
    }
    .display-zone-item-icon {
      display: block;
    }
    .display-zone-icon {
      width: 48px;
      img {
        width: 100%;
      }
    }
    .display-zone-text {
      margin-left: 12px;
      @include respond-to('<=laptop') {
        text-align: center;
      }
      .display-zone-title {
        word-break: break-all;
        color: var(--o-color-info1);
        @include text2;
        font-weight: 500;
      }
      .display-zone-description {
        color: var(--o-color-info2);
        @include tip1;
        text-align: left;
        @include respond-to('phone') {
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
