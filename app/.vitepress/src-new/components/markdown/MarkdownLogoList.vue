<script lang="ts" setup>
import { OFigure } from '@opensig/opendesign';
import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <!-- 突出贡献单位 -->
  <div class="logo-list">
    <div v-for="(logo, i) in data" :key="i" class="item-logo">
      <OFigure :src="logo.src" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
.item-logo {
  width: calc((100% - 128px) / 5);
  margin: 32px 32px 0 0;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  &:nth-child(5n) {
    margin-right: 0;
  }
  &:nth-child(-n + 5) {
    margin-top: 0;
  }
}
@include respond('<=laptop') {
  .logo-list {
    margin-top: 24px;
  }
  .item-logo {
    width: calc((100% - 96px) / 4);
    &:nth-child(n) {
      margin: 32px 32px 0 0;
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-child(-n + 4) {
      margin-top: 0;
    }
  }
}
@include respond('<=pad') {
  .logo-list {
    margin-top: 16px;
  }
  .item-logo {
    width: calc((100% - 64px) / 3);
    &:nth-child(n) {
      margin: 32px 32px 0 0;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(-n + 3) {
      margin-top: 0;
    }
  }
}
@include respond('<=pad_v') {
  .logo-list {
    margin-top: 12px;
  }
  .item-logo {
    width: calc((100% - 32px) / 2);
    &:nth-child(n) {
      margin: 16px 16px 0 0;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
    &:nth-child(-n + 2) {
      margin-top: 0;
    }
  }
}
</style>
