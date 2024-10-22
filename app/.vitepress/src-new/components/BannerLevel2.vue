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
  backgroundText: {
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
  illustration: {
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
  <div class="banner-level2" :style="rootStyle">
    <img :src="props.backgroundImage" class="banner-bg" />
    <div class="wrap">
      <div
        class="banner-text"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="800"
      >
        <h1 v-if="title" class="banner-title">{{ title }}</h1>
        <p v-if="subtitle && !slots.default" class="banner-subtitle">
          {{ subtitle }}
        </p>
        <div v-if="slots.default" class="banner-operation">
          <slot></slot>
        </div>
      </div>
      <div
        v-if="illustration"
        class="banner-illustration"
        data-aos="fade-down"
        data-aos-once="true"
        data-aos-duration="800"
      >
        <img :src="illustration" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark {
  .banner-bg,
  .banner-illustration {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
  }

  .banner-level2 {
    background-color: var(--o-color-primary1);
  }
}
.banner-level2 {
  position: relative;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--o-color-primary1);

  .banner-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: fill;
    user-select: none;
  }

  .wrap {
    position: relative;
    max-width: 1504px;
    margin: 0 auto;
    padding: 0 44px;
    display: flex;
    justify-content: space-between;
    min-height: 280px;
    @media screen and (max-width: 1439px) {
      padding: 0 16px;
    }

    @media screen and (max-width: 1080px) {
      min-height: 200px;
    }

    @media screen and (max-width: 768px) {
      min-height: 126px;
    }
    .banner-text {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-top: 86px;
      margin-bottom: 86px;
      max-width: 54%;
      @include respond-to('pad_h') {
        margin-top: 64px;
        margin-bottom: 64px;
      }
      @include respond-to('phone') {
        margin-top: 32px;
        margin-bottom: 32px;
      }

      .banner-text-bg {
        position: absolute;
        top: 0;
        color: var(--o-color-white);
        opacity: 0.14;
        @include display1;
        font-weight: bold;
        user-select: none;
      }
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--o-color-white);
        @include display2;
        margin-top: 32px;
        margin-bottom: 0;
        font-weight: 500;
        @include respond-to('phone') {
          margin-top: 12px;
        }
      }

      .banner-subtitle {
        position: relative;
        margin-top: 6px;
        @include h4;
        color: var(--o-color-white);
        z-index: 1;
      }

      .banner-operation {
        margin-top: 24px;
      }
    }
    .banner-illustration {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 44px;
      object-fit: fill;
      @include respond-to('laptop') {
        right: 16px;
      }
      img {
        user-select: none;
        max-height: 232px;
        @include respond-to('pad_h') {
          max-height: 160px;
        }
        @include respond-to('pad_v') {
          max-height: 94px;
        }
      }
    }
  }
}
</style>
