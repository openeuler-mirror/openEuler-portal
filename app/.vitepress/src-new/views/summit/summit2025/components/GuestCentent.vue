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

const getPersonTitle = (title: string) => {
  if (!title.trim()) {
    return [];
  }
  if (title.includes(';')) {
    return title.split(';');
  } else if (title.includes('；')) {
    return title.split('；');
  } else if (title.includes('\n')) {
    return title.split('\n');
  } else {
    return [title];
  }
};

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
          <div :class="`lecturer-list-item-${shape}`">
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
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  .lecturer-list-item {
    width: 25%;
    @include respond('<=laptop') {
      width: calc(100% / 3);
    }
    @include respond('<=pad_v') {
      width: 50%;
    }
    .lecturer-list-item-square {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 130px;
      width: 130px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 190px;
      }
    }
    .lecturer-list-item-circle {
      img {
        width: 120px;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
        background-color: var(--o-color-white);
        @include respond('<=pad_v') {
          width: 95px;
        }
      }
    }
    p {
      color: var(--o-color-link1);
      text-align: center;
      margin-top: 8px;
      @include text1;
      @media (max-width: 780px) {
        margin-top: 6px;
      }
    }
    .lecturer-list-item-title {
      margin-bottom: 8px;
      &:nth-last-of-type(1) {
        margin-bottom: 24px;
      }
      p {
        color: var(--o-color-info1);
        font-weight: 400;
        @include tip1;
      }
      @media (max-width: 780px) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
