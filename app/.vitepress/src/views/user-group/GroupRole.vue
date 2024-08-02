<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

const i18n = useI18n();
const groupI18n = computed(() => {
  return i18n.value.group;
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>
<template>
  <div class="user-role">
    <div class="title">{{ groupI18n.ROLE }}</div>
    <div class="role-card">
      <OCard
        class="card-item"
        v-for="card in groupI18n.CARD_DATA"
        :key="card.IMG"
        :style="{
          backgroundImage: `url(${isLight ? card.IMG : card.IMGDARK})`,
        }"
      >
        <div class="card-title">
          {{ card.TITLE }}
        </div>
        <p class="desc">{{ card.DESC }}</p>
      </OCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  padding: 0;
}
.role-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  @media screen and(max-width:768px) {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  .card-item {
    padding: 40px;
    background-color: var(--e-color-bg2);
    font-size: var(--e-font-size-h7);
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h6);
    background-position: right bottom;
    background-repeat: no-repeat;
    background-size: 127px 112px;
    box-shadow: none;
    @media screen and (max-width: 1416px) {
      padding: 16px;
      background-size: 76px 67px;
    }
    .card-title {
      color: var(--e-color-text1);
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
      @media screen and (max-width: 1416px) {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }
    .desc {
      margin-top: 8px;
      color: var(--e-color-text3);
      font-size: var(--e-font-size-text);
      max-width: 450px;
      @media screen and (max-width: 1416px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        max-width: 220px;
      }
    }
  }
}
</style>
