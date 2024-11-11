<script setup lang="ts">
import AOS from 'aos';
import { computed, onMounted } from 'vue';
import { getPersonTitle } from '../utils';

const props = defineProps({
  lecturerList: {
    type: Object,
    required: true,
    default: () => null,
  },
  shape: {
    type: String,
    default: 'circle',
  },
  webColumnsNum: {
    type: Number,
    default: 4,
  },
  mobileColumnsNum: {
    type: Number,
    default: 2,
  },
});
const summitStyle = computed(() => {
  return {
    '--shape': props.shape,
    '--webColumnsNum':
      props.webColumnsNum < 1
        ? 4
        : props.webColumnsNum > 8
        ? 8
        : props.webColumnsNum,
    '--mobileColumnsNum':
      props.mobileColumnsNum < 1
        ? 1
        : props.mobileColumnsNum > 2
        ? 2
        : props.mobileColumnsNum,
  };
});
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
});
</script>

<template>
  <div class="lecturer-list" :style="(summitStyle as any)">
    <template v-for="item in lecturerList" :key="item.NAME">
      <div data-aos="fade-zoom-in" class="lecturer-list-item">
        <slot name="img">
          <div
            :class="
              summitStyle['--shape'] === 'square'
                ? 'lecturer-list-item-square'
                : 'lecturer-list-item-circle'
            "
          >
            <img :src="item.img" />
          </div>
        </slot>
        <slot name="name">
          <p>{{ item.name }}</p>
        </slot>
        <slot name="title">
          <div
            v-for="titleItem in getPersonTitle(item.title)"
            :key="titleItem"
            class="lecturer-list-item-title"
          >
            <p>{{ titleItem }}</p>
          </div>
        </slot>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.lecturer-list {
  margin: var(--e-spacing-h2) auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  @media (max-width: 1416px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }
  .lecturer-list-item {
    @media (max-width: 780px) {
      width: 100%;
      margin: 0 auto;
    }
    .lecturer-list-item-square {
      display: block;
      height: 130px;
      width: 130px;
      overflow: hidden;
      position: relative;
      left: 10%;
      img {
        width: 190px;
        height: 190px;
        position: relative;
        bottom: 20%;
        right: 25%;
      }
    }
    .lecturer-list-item-circle {
      img {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
        background-color: var(--e-color-white);
        @media (max-width: 780px) {
          width: 95px;
          height: 95px;
        }
      }
    }
    p {
      font-size: var(--e-spacing-h5);
      color: var(--e-color-brand1);
      text-align: center;
      margin-top: 8px;
      @media (max-width: 780px) {
        margin-top: 6px;
      }
    }
    .lecturer-list-item-title {
      margin-bottom: var(--e-spacing-h8);
      &:nth-last-of-type(1) {
        margin-bottom: var(--e-spacing-h4);
      }
      p {
        color: var(--e-color-text1);
        font-size: var(--e-font-size-text);
        font-weight: 400;
        line-height: var(--e-line-height-text);
        @media (max-width: 780px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
      @media (max-width: 780px) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
