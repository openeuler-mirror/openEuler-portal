<script setup lang="ts">
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

const i18n = useI18n();
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
    <div
      v-for="item in i18n.home.HOME_NAV"
      :key="item.LINK"
      class="display-zone-item"
      @click="jumpTo(item.LINK)"
    >
      <div class="display-zone-icon">
        <img
          :src="getImgUrl(item)"
          alt="openEuler"
          class="display-zone-item-icon"
        />
        <img
          :src="getImgUrlHover(item)"
          alt="openEuler"
          class="display-zone-item-icon-hover"
        />
      </div>
      <div class="display-zone-text">
        <h4 class="display-zone-title">
          {{ item.TITLE }}
        </h4>
        <p class="display-zone-description">{{ item.DSSCRIPTIVE }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-display-zone {
  padding: var(--e-spacing-h4);
  position: relative;
  display: grid;
  margin-top: -102px;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  background: var(--e-color-bg2);
  z-index: 2;
  box-shadow: var(--e-shadow-l1);

  .display-zone-item {
    cursor: pointer;
    padding-left: var(--e-spacing-h5);
    display: flex;
    align-items: center;
    border-left: 1px solid var(--e-color-division1);
    .display-zone-item-icon-hover {
      display: none;
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
      margin-left: var(--e-spacing-h5);
      .display-zone-title {
        word-break: break-all;
        color: var(--e-color-text1);
        line-height: var(--e-line-height-text);
        font-weight: 500;
        font-size: var(--e-font-size-h7);
        @media screen and (max-width: 768px) {
          text-align: center;
        }
      }
      // .display-zone-title-en {
      //   font-weight: 400;
      //   color: var(--e-color-text1);
      //   font-size: var(--e-font-size-h7);
      // }
      .display-zone-description {
        line-height: var(--e-line-height-text);
        font-size: var(--e-font-size-text);
        color: var(--e-color-text4);
        text-align: left;
      }
    }
    &:hover {
      @media screen and (min-width: 1100px) {
        .display-zone-item-icon-hover {
          display: block;
        }
        .display-zone-item-icon {
          display: none;
        }
        .display-zone-text {
          .display-zone-title,
          .display-zone-description {
            color: var(--e-color-brand1);
          }
        }
      }
    }
  }
  .display-zone-item:first-child {
    padding: 0;
    border: none;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 0;
    position: relative;
    grid-template-columns: repeat(2, minmax(82px, 1fr));
    column-gap: 60px;
    &::after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 50%;
      content: '';
      width: 1px;
      height: calc(100% - 48px);
      background-color: var(--e-color-division1);
    }
    .display-zone-item {
      padding: 0;
      border: none;
      flex-direction: column;
      .display-zone-icon {
        width: 40px;
      }
      .display-zone-text {
        margin: 0;
        .display-zone-title {
          font-size: var(--e-font-size-text);
        }
        .display-zone-title-en {
          text-align: center;
        }
        .display-zone-description {
          display: none;
          text-align: left;
        }
      }
    }
    .display-zone-item:nth-child(3) {
      border: 0;
    }
    .display-zone-item:nth-child(-n + 2) {
      padding-top: 0;
      padding-bottom: var(--e-spacing-h6);
      border-bottom: 1px solid var(--e-color-division1);
    }
    .display-zone-item:nth-child(2) {
      position: relative;
    }
    .display-zone-item:nth-child(n + 3) {
      padding-top: var(--e-spacing-h6);
    }
  }
}
</style>
