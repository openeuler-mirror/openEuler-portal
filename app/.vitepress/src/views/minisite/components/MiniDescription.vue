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
  margin-bottom: var(--e-spacing-h2);
  box-shadow: var(--e-shadow-l1);
}
.desc {
  margin: 0 auto;
  background-color: var(--e-color-bg2);
  padding: var(--e-spacing-h2);
  box-sizing: border-box;
  font-size: var(--e-font-size-text);
  .desc-list {
    width: 100%;
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-text);
    @media screen and (max-width: 767px) {
      p {
        margin-bottom: var(--e-spacing-h8);
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        font-weight: 400;
      }
    }
  }
  .more-info {
    p {
      margin: var(--e-spacing-h2) auto var(--e-spacing-h5) 0;
      height: 26px;
      font-size: var(--e-font-size-h7);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h7);
      @media screen and (max-width: 767px) {
        margin: var(--e-spacing-h4) 0 0 0;
        font-size: var(--e-font-size-text);
        font-weight: 500;
        line-height: var(--e-line-height-text);
        height: var(--e-line-height-text);
      }
    }
    ul {
      font-size: var(--e-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-text);
      padding-left: var(--e-spacing-h5);
      list-style: disc;
      li {
        color: var(--e-color-text1);
        font-size: var(--e-font-size-text);
        margin-top: var(--e-spacing-h8);
        span {
          color: var(--e-color-text1);
        }
        @media screen and (max-width: 767px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          font-weight: 400;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: var(--e-spacing-h5);
    font-size: var(--e-font-size-tip);
  }
}
@media screen and (min-width: 1440px) {
  .desc {
    max-width: 1416px;
  }
}
</style>
