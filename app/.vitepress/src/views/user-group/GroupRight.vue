<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';

const i18n = useI18n();
const rightI18n = computed(() => {
  return i18n.value.group;
});
</script>
<template>
  <div class="group-right">
    <div class="title">{{ rightI18n.RIGHT }}</div>
    <div class="right-main">
      <OContainer
        v-for="right in rightI18n.RIGHT_DATA"
        :key="right.TITLE"
        class="right-card"
      >
        <div class="right-title">
          {{ right.TITLE }}
        </div>
        <ul class="right-list">
          <li v-for="item in right.LIST" :key="item" class="item">
            <span>{{ item }}</span>
          </li>
        </ul>
      </OContainer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.right-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0;
  grid-column-gap: 24px;
  @media screen and(max-width:768px) {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  .right-card {
    padding: 40px;
    @media screen and(max-width:768px) {
      padding: 16px;
    }
    .right-title {
      position: relative;
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      color: var(--o-color-text1);
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        height: 2px;
        width: 20px;
        background-color: var(--o-color-brand2);
      }
      @media screen and(max-width:768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        &::before {
          width: 16px;
        }
      }
    }
    .right-list {
      display: grid;
      margin-top: 24px;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 24px;
      grid-column-gap: 24px;

      .item {
        position: relative;
        padding: 16px;
        padding-left: 30px;
        color: var(--o-color-text4);
        line-height: var(--o-line-height-text);
        font-size: var(--o-font-size-text);
        background-color: var(--o-color-bg1);
        &::before {
          content: '';
          position: absolute;
          left: 16px;
          width: 6px;
          height: 6px;
          left: 16px;
          top: 24px;
          border-radius: 50%;
          background-color: var(--o-color-brand1);
        }
      }
      @media screen and(max-width:768px) {
        margin-top: 18px;
        .item {
          padding: 8px;
          padding-left: 20px;
          font-size: var(--o-font-size-tip);
          &::before {
            left: 8px;
            width: 4px;
            height: 4px;
            top: 16px;
          }
        }
      }
    }
  }
}
</style>
