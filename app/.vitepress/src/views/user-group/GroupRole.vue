<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';

const i18n = useI18n();
const groupI18n = computed(() => {
  return i18n.value.group;
});
</script>
<template>
  <div class="user-role">
    <div class="title">{{ groupI18n.ROLE }}</div>
    <div class="role-card">
      <OCard
        class="card-item"
        v-for="card in groupI18n.CARD_DATA"
        shadow="hover"
        :key="card.IMG"
        :style="{ backgroundImage: `url(${card.IMG})` }"
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  @media screen and(max-width:768px) {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  .card-item {
    padding: 40px;
    background-color: var(--o-color-bg2);
    font-size: var(--o-font-size-h7);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h6);
    background-position: right bottom;
    background-repeat: no-repeat;
    background-size: 206px 150px;
    box-shadow: var(--o-shadow-l2);
    @media screen and (max-width: 1416px) {
      padding: 16px;
      background-size: 150px 110px;
    }
    .card-title {
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      @media screen and (max-width: 1416px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .desc {
      margin-top: 8px;
      color: var(--o-color-text3);
      font-size: var(--o-font-size-text);
      max-width: 200px;
      @media screen and (max-width: 1416px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        max-width: 160px;
      }
    }
  }
}
</style>
