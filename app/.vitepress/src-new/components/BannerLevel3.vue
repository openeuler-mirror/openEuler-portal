<script setup lang="ts">
import { computed, CSSProperties, onMounted, useSlots } from 'vue';
import AOS from 'aos';

const slots = useSlots();

const props = defineProps({
  backgroundImage: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
});

const rootStyle = computed(() => {
  const result: CSSProperties = {};
  if (props.backgroundColor) {
    result.backgroundColor = props.backgroundColor;
  }
  return result;
});

onMounted(() => {
  AOS.init();
});
</script>

<template>
  <div class="banner-level3" :style="rootStyle">
    <img :src="props.backgroundImage" class="banner-bg" />
    <div class="wrap">
      <div
        class="banner-text"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="800"
      >
        <h1 v-if="title" class="banner-title">{{ title }}</h1>
        <p v-if="subtitle" class="banner-subtitle">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark {
  .banner-bg {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
  }
  .banner-level3 {
    background-color: var(--o-color-primary1);
  }
}
.banner-level3 {
  position: relative;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--o-color-primary1);

  .banner-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    user-select: none;
  }

  .wrap {
    position: relative;
    max-width: var(--layout-content-max-width);
    padding: 0 var(--layout-content-padding);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 140px;
    .banner-text {
      margin-top: 40px;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      position: relative;
      max-width: 54%;
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--o-color-white);
        @include h1;
        line-height: var(--o-font_size-h1);
        margin-bottom: 0;
        font-weight: 500;
      }

      .banner-subtitle {
        position: relative;
        margin-top: 12px;
        @include text1;
        color: var(--o-color-white);
        z-index: 1;
      }

    }

    @media screen and (max-width: 1200px) {
      height: 100px;
    }
    @media screen and (max-width: 840px) {
      height: 100px;
    }
  }
}
</style>
