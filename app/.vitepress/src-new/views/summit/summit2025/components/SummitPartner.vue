<script setup lang="ts">
import { useData } from 'vitepress';

import { useCommon } from '@/stores/common';

defineProps({
  partnerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const { lang } = useData();

const commonStore = useCommon();
</script>

<template>
  <div class="partner">
    <p class="section-title">{{ partnerData.title }}</p>
    <div v-for="item in partnerData.list" :key="item.title" class="item">
      <p class="item-title">{{ item.title }}</p>
      <div class="logo-list">
        <div v-for="(logo, i) in item.logos" :key="i" class="item-logo">
          <img :src="logo[commonStore.theme]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.partner {
  margin-top: 72px;
  text-align: center;
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h4);
  }
}
.item {
  margin-top: var(--e-spacing-h2);

  .item-logo:nth-child(n+4) {
    margin-top: var(--e-spacing-h3);
  }

  .item-logo:nth-child(4n) {
    margin-left: 0;
  }
}
.item-title {
  font-size: var(--e-font-size-h5);
  line-height: var(--e-line-height-h5);
  font-weight: 500;
}
.logo-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}
.item-logo {
  margin-top: var(--e-spacing-h5);
}
.item-logo + .item-logo {
  margin-left: var(--e-spacing-h3);
}
img {
  width: 354px;
  border-radius: 4px;
}
@media screen and (max-width: 1680px) {
  .item {
    margin-top: var(--e-spacing-h3);

    .item-logo:nth-child(n+4) {
      margin-top: var(--e-spacing-h4);
    }
  }
  .logo-list {
    max-width: 1100px;
  }
  .item-title {
    font-size: var(--e-font-size-h6);
    line-height: var(--e-line-height-h6);
  }
  .item-logo + .item-logo {
    margin-left: var(--e-spacing-h4);
  }
  img {
    width: 284px;
  }
}
@media screen and (max-width: 1200px) {
  .item {
    margin-top: var(--e-spacing-h4);
  }
  .item-title {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
  }
  .logo-list {
    max-width: 720px;
  }
  .item-logo + .item-logo {
    margin-left: var(--e-spacing-h5);
  }
  img {
    width: 226px;
  }
}
@media screen and (max-width: 840px) {
  .item {
    margin-top: var(--e-spacing-h5);

    .item-logo:nth-child(n+4) {
      margin-top: var(--e-spacing-h5);
    }
  }
  .item-title {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
  .logo-list {
    max-width: 490px;
  }
  .item-logo + .item-logo {
    margin-left: 0;
  }
  .item-logo {
    margin-right: var(--e-spacing-h6);
    &:nth-child(3),
    &:last-child {
      margin-right: 0;
    }
  }
  img {
    width: 150px;
  }
}
@media screen and (max-width: 600px) {
  .item {
    margin-top: var(--e-spacing-h6);
    .logo-list {
      justify-content: center;
    }

    .item-logo:nth-child(n+3) {
      margin-top: var(--e-spacing-h6);
    }
  }
  .logo-list {
    justify-content: flex-start;
  }
  .item-logo {
    margin-top: var(--e-spacing-h6);
    &:nth-child(odd):not(:last-child):not(:only-child) {
      margin-right: var(--e-spacing-h6);
    }
  }
}
@media screen and (max-width: 500px) {
  .item-logo {
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
