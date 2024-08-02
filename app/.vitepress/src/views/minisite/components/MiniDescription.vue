<script lang="ts" setup>
import { PropType } from 'vue';

interface Info {
  THEME: string;
  BODY: string;
}

defineProps({
  descriptionDesc: {
    type: Array,
    default: function () {
      return [];
    },
  },
  descriptionMore: {
    type: String,
    default: '',
  },
  descriptionInfo: {
    type: Array as PropType<Info[]>,
    default: function () {
      return [];
    },
  },
});
</script>

<template>
  <div class="desc-wraper">
    <div class="desc">
      <div class="desc-list">
        <p v-for="(item, index) in descriptionDesc" :key="index">
          {{ item }}
        </p>
      </div>
      <div v-if="descriptionMore && descriptionInfo" class="more-info">
        <p>{{ descriptionMore }}</p>
        <ul>
          <li v-for="(item, index) in descriptionInfo" :key="index">
            <span>{{ item.THEME }}</span>
            <span>{{ item.BODY }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desc-wraper {
  margin-bottom: var(--o-spacing-h2);
  box-shadow: var(--o-shadow-l1);
}
.desc {
  margin: 0 auto;
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2);
  box-sizing: border-box;
  font-size: var(--o-font-size-text);
  .desc-list {
    width: 100%;
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    @media screen and (max-width: 767px) {
      p {
        margin-bottom: var(--o-spacing-h8);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        font-weight: 400;
      }
    }
  }
  .more-info {
    p {
      margin: var(--o-spacing-h2) auto var(--o-spacing-h5) 0;
      height: 26px;
      font-size: var(--o-font-size-h7);
      font-weight: 400;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h7);
      @media screen and (max-width: 767px) {
        margin: var(--o-spacing-h4) 0 0 0;
        font-size: var(--o-font-size-text);
        font-weight: 500;
        line-height: var(--o-line-height-text);
        height: var(--o-line-height-text);
      }
    }
    ul {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-text);
      padding-left: var(--o-spacing-h5);
      list-style: disc;
      li {
        color: var(--o-color-text1);
        font-size: var(--o-font-size-text);
        margin-top: var(--o-spacing-h8);
        span {
          color: var(--o-color-text1);
        }
        @media screen and (max-width: 767px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          font-weight: 400;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
  }
}
@media screen and (min-width: 1440px) {
  .desc {
    max-width: 1416px;
  }
}
</style>
