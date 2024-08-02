<script setup lang="ts">
import AOS from 'aos';
import { computed, onMounted } from 'vue';

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
    <div
      v-for="item in lecturerList"
      :key="item.NAME"
      data-aos="fade-zoom-in"
      class="lecturer-list-item"
    >
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
          v-for="titleItem in item.position"
          :key="titleItem"
          class="lecturer-list-item-title"
        >
          <p>{{ titleItem }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.lecturer-list {
  margin: var(--o-spacing-h2) auto;
  display: flex;
  flex-wrap: wrap;
  // grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  @media (max-width: 780px) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
  &-item {
    width: 354px;
    @media (max-width: 780px) {
      width: 100%;
      margin: 0 auto;
    }
    &-square {
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
    &-circle {
      img {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        display: block;
        @media (max-width: 780px) {
          width: 95px;
          height: 95px;
        }
      }
    }
    // &:nth-of-type(1){
    //   margin-top: 20px;
    // }
    p {
      font-size: var(--o-spacing-h5);
      color: var(--o-color-brand1);
      text-align: center;
      margin-top: 8px;
      @media (max-width: 780px) {
        margin-top: 6px;
      }
    }
    &-title {
      margin-bottom: var(--o-spacing-h8);
      &:nth-last-of-type(1) {
        margin-bottom: var(--o-spacing-h4);
      }
      p {
        color: var(--o-color-text1);
        font-size: var(--o-font-size-text);
        font-weight: 400;
        line-height: var(--o-line-height-text);
        @media (max-width: 780px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      @media (max-width: 780px) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
