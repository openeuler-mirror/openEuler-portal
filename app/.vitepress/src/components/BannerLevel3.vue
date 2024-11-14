<script setup lang="ts">
import { computed, CSSProperties, onMounted } from 'vue';
import AOS from 'aos';

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
});

const rootStyle = computed(() => {
  const result: CSSProperties = {};
  // if (props.backgroundImage) {
  //   result.backgroundImage = `url(${props.backgroundImage})`;
  // }

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
        <h1
          v-if="title"
          class="banner-title"
          :class="{ 'margin-top-0': !backgroundText }"
        >
          {{ title }}
        </h1>
        <p v-if="subtitle" class="banner-subtitle">{{ subtitle }}</p>
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
    background-color: var(--e-color-kleinblue4);
  }
}
.banner-level3 {
  position: relative;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--e-color-kleinblue6);

  .banner-bg {
    position: absolute;
    height: 100%;
    width: 100vw;
    object-fit: fill;
    user-select: none;
  }
  .wrap {
    max-width: var(--layout-content-max-width);
    padding-left: var(--layout-content-padding);
    padding-right: var(--layout-content-padding);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 160px;

    @media screen and (max-width: 768px) {
      min-height: 126px;
    }
    .banner-text {
      position: relative;
      width: 50%;
      .banner-text-bg {
        position: absolute;
        color: var(--e-color-white);
        opacity: 0.14;
        font-size: var(--e-font-size-h3);
        line-height: var(--e-line-height-h3);
        font-weight: bold;

        @media screen and (max-width: 1080px) {
          font-size: var(--e-font-size-h4);
          line-height: var(--e-line-height-h4);
        }

        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-h6);
          line-height: var(--e-line-height-h6);
        }
      }
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--e-color-white);
        font-size: var(--e-font-size-h3);
        line-height: var(--e-line-height-h3);
        margin-top: var(--e-spacing-h5);
        margin-bottom: 0;
        font-weight: bold;

        &.margin-top-0 {
          margin-top: 0 !important;
        }

        @media screen and (max-width: 1080px) {
          font-size: var(--e-font-size-h4);
          line-height: var(--e-line-height-h4);
        }

        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-h6);
          line-height: var(--e-line-height-h6);
          margin-top: var(--e-spacing-h6);
        }
      }

      .banner-subtitle {
        position: relative;
        z-index: 1;
        color: var(--e-color-white);
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        margin-top: var(--e-spacing-h10);

        @media screen and (max-width: 1080px) {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
        }

        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
    }
  }
}
</style>
