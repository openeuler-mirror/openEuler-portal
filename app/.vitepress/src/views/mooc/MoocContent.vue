<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/i18n';

import IconArrowRight1 from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();

const pathTarget = computed(() => (path: string) => {
  return path.startsWith('https') ? '_blank' : '_self';
});
</script>

<template>
  <div class="mooc-content">
    <OContainer
      v-for="item in i18n.mooc.MOOC.MOOC_COURSE"
      :key="item.id"
      class="mooc-item"
    >
      <div class="box">
        <h3>{{ item.TITLE }}</h3>
        <p>{{ item.DESC }}</p>
        <div class="btn">
          <a
            v-for="subitem in item.CHILDREN"
            :key="subitem.NAME"
            :href="subitem.PATH"
            :target="pathTarget(subitem.PATH)"
          >
            <OButton size="mini" type="text" animation>
              <span>{{ subitem.NAME }}</span>
              <OIcon>
                <IconArrowRight1 />
              </OIcon>
            </OButton>
          </a>
        </div>
      </div>
      <div class="cover">
        <img :src="item.IMG" alt="" />
      </div>
    </OContainer>
  </div>
</template>

<style lang="scss" scoped>
.mooc-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 1360px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .mooc-item {
    display: flex;
    min-height: 192px;
    padding: var(--o-spacing-h2);
    background-image: url(@/assets/category/mooc/mooc2.png);
    background-repeat: no-repeat;
    background-position: 132% center;
    background-size: contain;
    @media (max-width: 760px) {
      padding: var(--o-spacing-h5);
      min-height: auto;
    }
    .cover {
      max-width: 130px;
      margin: -10px;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;

      h3 {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      p {
        font-size: var(--o-font-size-text);
        line-height: 22px;
        color: var(--o-color-text4);
        @media (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      .btn {
        display: flex;
        margin-top: var(--o-spacing-h5);
        @media (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
        .o-button {
          margin-right: 24px;
          padding: 0;
          font-size: var(--o-font-size-text);
          text-align: left;

          @media (max-width: 768px) {
            margin-right: 16px;
          }
          > :deep(span) {
            display: flex;
            align-items: center;
          }
          .o-icon {
            font-size: 12px;
            margin-left: 8px;
            transition: all 0.3s;
            color: var(--o-color-brand1);
          }
          &:hover .o-icon {
            transform: translateX(3px);
          }
        }
      }
    }
  }
}
</style>
