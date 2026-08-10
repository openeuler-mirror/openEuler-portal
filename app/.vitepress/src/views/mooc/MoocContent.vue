<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import moocContent from '#content/learn/mooc';

import IconArrowRight1 from '~icons/app/icon-arrow-right.svg';

const { lang } = useData();

const moocCourse = computed(() => moocContent[lang.value as 'zh' | 'en'].mooc_course);

const pathTarget = computed(() => (path: string) => {
  return path.startsWith('https') ? '_blank' : '_self';
});
</script>

<template>
  <div class="mooc-content">
    <OContainer
      v-for="item in moocCourse"
      :key="item.id"
      class="mooc-item"
    >
      <div class="box">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <div class="btn">
          <a
            v-for="subitem in item.children"
            :key="subitem.name"
            :href="subitem.path"
            :target="pathTarget(subitem.path)"
          >
            <OButton size="mini" type="text" animation>
              <span>{{ subitem.name }}</span>
              <OIcon>
                <IconArrowRight1 />
              </OIcon>
            </OButton>
          </a>
        </div>
      </div>
      <div class="cover">
        <img :src="item.img" alt="" />
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
    padding: var(--e-spacing-h2);
    background-image: url(@/assets/category/mooc/mooc2.png);
    background-repeat: no-repeat;
    background-position: 132% center;
    background-size: contain;
    @media (max-width: 760px) {
      padding: var(--e-spacing-h5);
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
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        color: var(--e-color-text1);
        font-weight: 500;
        @media (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      p {
        font-size: var(--e-font-size-text);
        line-height: 22px;
        color: var(--e-color-text4);
        @media (max-width: 768px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
      .btn {
        display: flex;
        margin-top: var(--e-spacing-h5);
        @media (max-width: 768px) {
          margin-top: var(--e-spacing-h8);
        }
        .o-button {
          margin-right: 24px;
          padding: 0;
          font-size: var(--e-font-size-text);
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
            color: var(--e-color-brand1);
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
