<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import AOS from 'aos';

import useWindowResize from '@/components/hooks/useWindowResize';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
onMounted(() => {
  AOS.init({
    duration: 800,
  });
});

const { lang } = useData();
const windowWidth = ref(useWindowResize());

function handleClick(link: string, target: string = '_blank') {
  if (!link) {
    return;
  }
  window.open(link, target);
}
</script>

<template>
  <div class="home-banner">
    <div class="banner-panel">
      <div class="banner-panel-cover">
        <div
          v-if="bannerData?.title?.length"
          class="banner-panel-content flex-end"
        >
          <div data-aos="fade-down" class="box">
            <img class="text-img" :src="bannerData?.img" alt="" />
            <p v-for="title in bannerData.title" :key="title" class="title">
              {{ title }}
            </p>
            <p class="desc">
              <span
                v-for="item2 in bannerData?.desc"
                :key="item2"
                class="inline-desc"
                >{{ item2 }}</span
              >
            </p>
          </div>
          <div
            v-if="bannerData.btn && lang === 'zh'"
            data-aos="fade-up"
            class="action"
          >
            <OButton
              animation
              class="home-banner-btn"
              @click="handleClick(bannerData.link, bannerData.targetTap)"
            >
              {{ bannerData.btn }}
              <template #suffixIcon
                ><OIcon><IconArrowRight /></OIcon
              ></template>
            </OButton>
          </div>
        </div>
        <img
          v-else
          class="is-show-mo"
          :src="bannerData.moBanner"
          alt="openEuler"
        />

        <div class="img-box" :class="windowWidth < 824 ? 'box-mo' : ''">
          <img
            v-if="(bannerData as any).textImg_pc"
            :src="windowWidth < 824 ? (bannerData as any).textImg_mo : (bannerData as any).textImg_pc"
            alt="openEuler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$banner-color: #fff;
html[lang='zh'] {
  .flex-start {
    @media screen and (max-width: 824px) {
      margin: 0;
      padding-top: var(--o-spacing-h3);
      height: 100%;
    }
  }
}
.dark .banner-panel-cover {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.home-banner-btn {
  border-color: $banner-color;
  color: $banner-color;
  @media screen and (max-width: 824px) {
    padding: 5px 12px 5px 16px;
    line-height: 22px;
    font-size: 14px;
  }
}

.home-banner {
  height: 380px;
  position: relative;
  .banner-panel {
    position: absolute;
    background-color: var(--o-color-bg2);
    display: flex;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: all 0.3s;

    &.is-link {
      cursor: pointer;
    }
    .banner-panel-content {
      box-sizing: border-box;
      max-width: 1504px;
      margin: 0 auto;
      padding: 0 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      color: #fff;
      .title {
        font-size: var(--o-font-size-h1);
        line-height: var(--o-line-height-h1);
        font-weight: 600;
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
        }
        @media screen and (max-width: 824px) {
          font-size: var(--o-font-size-h4);
          line-height: var(--o-line-height-h4);
        }
      }
      .box {
        color: $banner-color;
      }
      .text-img {
        max-height: 186px;
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
      .desc {
        .inline-desc {
          &:nth-child(2) {
            padding-left: 30px;
            @media screen and (max-width: 768px) {
              padding: 0;
              display: block;
            }
          }
        }

        font-size: var(--o-font-size-h5);
        font-weight: normal;
        line-height: var(--o-line-height-h5);
        margin-top: var(--o-spacing-h6);
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
        @media screen and (max-width: 824px) {
          margin-top: var(--o-spacing-h9);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .action {
        margin-top: var(--o-spacing-h3);
        .o-icon {
          @media screen and (max-width: 824px) {
            font-size: 16px;
          }
        }
        @media screen and (max-width: 824px) {
          margin-top: 0;
        }
      }

      @media screen and (max-width: 1440px) {
        padding: 0 16px;
      }
      @media screen and (max-width: 824px) {
        padding: 72px 16px 50px;
        justify-content: space-between;
        box-sizing: border-box;
        text-align: center;
      }
    }
    .flex-end {
      @media screen and (max-width: 768px) {
        padding-bottom: 20px;
        justify-content: flex-end;
      }
    }

    .banner-panel-cover {
      background-image: url(../img/banner_pc.jpg);
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      @media screen and(max-width:768px) {
        background-image: url(../img/banner_mo.png);
      }
    }
    .is-show-pc {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .is-show-mo {
      display: none;
      object-fit: cover;
      width: 100%;
      @media screen and (max-width: 824px) {
        display: block;
        height: 300px;
      }
    }

    @media screen and (max-width: 767px) {
      position: static !important;
    }
  }
  @media screen and (max-width: 1100px) {
    height: 400px;
  }
  @media screen and (max-width: 824px) {
    height: 300px;
  }
}
html[lang='en'] {
  .home-banner {
    .banner-panel {
      .flex-end {
        .title {
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
          @media screen and (max-width: 824px) {
            font-size: var(--o-font-size-h5);
            line-height: var(--o-line-height-h5);
          }
        }
        @media screen and (max-width: 768px) {
          padding-bottom: 6px;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
