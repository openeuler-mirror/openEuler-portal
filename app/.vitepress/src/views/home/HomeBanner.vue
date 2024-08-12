<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useData } from 'vitepress';
import HOME_CONFIG from '@/data/home';

import useWindowResize from '@/components/hooks/useWindowResize';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import { useCommon } from '@/stores/common';


const { lang } = useData();
const flag = ref();
const onSwiper = (swiper: any) => {
  swiper.el.onmouseout = function () {
    swiper.navigation.nextEl.classList.remove('show');
    swiper.navigation.prevEl.classList.remove('show');
  };
  swiper.el.onmouseover = function () {
    swiper.navigation.nextEl.classList.add('show');
    swiper.navigation.prevEl.classList.add('show');
  };
  flag.value = computed(() => swiper.animating);
};
const windowWidth = ref(useWindowResize());

// 判断语言 banner
const homeBanner = computed(() => {
  if (lang.value === 'en') {
    return HOME_CONFIG.HOMEBANNER.en;
  } else {
    return HOME_CONFIG.HOMEBANNER.zh;
  }
});

// banner跳转事件
const jumpTo = (item: any) => {
  if (flag.value && item.link) {
    if (item.targetTap === 1) {
      window.open(item.link, '_blank');
    } else {
      window.open(item.link, '_self');
    }
  }
};

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <swiper
    class="home-banner"
    :modules="[Autoplay, Pagination, Navigation]"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    @swiper="onSwiper"
  >
    <swiper-slide v-for="(item, index) in homeBanner" :key="item.link">
      <div
        :id="item.id"
        class="banner-panel"
        :class="{ 'is-link': item.link }"
        @click="jumpTo(item)"
      >
        <div
          class="banner-panel-cover"
          :style="{
            backgroundImage: `url(${
              windowWidth < 767 ? item.moBanner : item.pcBanner
            })`,
          }"
        >
          <div
            v-if="item.title?.length"
            class="banner-panel-content flex-column"
            :class="[item.id, isDark ? `${item.id}-dark` : '']"
          >
            <div data-aos="fade-down" class="box">
              <img v-if="item.img" class="text-img" :src="item?.img" alt="" />
              <p
                v-for="title in item.title"
                :key="title"
                :class="item.id === 'eur' ? 'eur' : ''"
                class="title"
              >
                {{ title }}
              </p>
              <p class="desc">
                <span
                  v-for="item2 in item.desc"
                  :key="item2"
                  class="inline-desc"
                  >{{ item2 }}</span
                >
              </p>
            </div>
            <div v-if="item.btn" data-aos="fade-up" class="action">
              <OButton animation class="home-banner-btn">
                {{ item.btn }}
                <template #suffixIcon
                  ><OIcon><IconArrowRight /></OIcon
                ></template>
              </OButton>
            </div>
          </div>
          <img v-else class="isH5show" :src="item.moBanner" alt="openEuler" />

          <div
            v-if="item.id === 'devday'"
            class="img-box"
            :class="windowWidth < 824 ? 'box-mo' : ''"
          >
            <img
              v-if="(item as any).textImg_pc"
              :src="windowWidth < 824 ? (item as any).textImg_mo : (item as any).textImg_pc"
              alt="openEuler"
            />
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
$banner-color: #fff;
html[lang='zh'] {
  .flex-start {
    @media screen and (max-width: 824px) {
      margin: 0;
      padding-top: var(--e-spacing-h3);
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

.annual-report,
.version-release {
  @media screen and (max-width: 768px) {
    justify-content: flex-end !important;
    .o-button {
      display: none;
    }
  }
}

.version {
  .box {
    margin-bottom: 32px;
  }
  @media screen and (max-width: 768px) {
    .box {
      margin-bottom: 0;
    }
    justify-content: flex-end !important;
    .title {
      font-size: var(--e-font-size-h6) !important;
      line-height: 28px;
    }
  }
}

.home-banner {
  height: 480px;
  position: relative;
  .banner-panel {
    position: absolute;
    background-color: var(--e-color-bg2);
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
        font-size: var(--e-font-size-h1);
        line-height: var(--e-line-height-h1);
        // filter: invert(1);
        font-weight: 600;
        @media screen and (max-width: 1439px) {
          font-size: var(--e-font-size-h2);
          line-height: var(--e-line-height-h2);
        }
        @media screen and (max-width: 824px) {
          font-size: var(--e-font-size-h4);
          line-height: var(--e-line-height-h4);
        }
      }
      .box {
        color: $banner-color;
      }
      .text-img {
        max-height: 213px;
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

        font-size: var(--e-font-size-h5);
        font-weight: normal;
        line-height: var(--e-line-height-h5);
        margin-top: var(--e-spacing-h6);
        // filter: invert(1);
        @media screen and (max-width: 1439px) {
          font-size: var(--e-font-size-h6);
          line-height: var(--e-line-height-h6);
        }
        @media screen and (max-width: 824px) {
          margin-top: var(--e-spacing-h9);
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .action {
        margin-top: var(--e-spacing-h3);
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
    .download {
      @media screen and (max-width: 768px) {
        justify-content: flex-end;
        .o-button {
          margin-top: 8px;
        }
      }
    }

    .devday2024 {
      @media screen and (max-width: 768px) {
        justify-content: flex-end;
        padding-bottom: 12px;
      }

      p.title:nth-of-type(1),
      p.title:nth-of-type(3) {
        font-size: var(--e-font-size-h4);
        line-height: var(--e-line-height-h4);
        font-weight: 500;
        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
      }
      p.title:nth-of-type(2) {
        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-h5);
          line-height: var(--e-line-height-h5);
          font-weight: 500;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
      }
      p.title:nth-of-type(3) {
        margin: 8px 0 64px;
        @media screen and (max-width: 768px) {
          margin: 0 0 12px;
        }
      }
      .desc {
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
    }

    .banner-panel-cover {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
    .isH5show {
      display: none;
      object-fit: cover;
      width: 100%;
      @media screen and (max-width: 824px) {
        display: block;
        height: 300px;
      }
    }

    .sig-gathering,
    .sig-gathering-dark {
      .box {
        color: var(--e-color-black);
      }
      .home-banner-btn {
        border-color: var(--e-color-black);
        color: var(--e-color-black);
      }
    }

    @media screen and (max-width: 767px) {
      position: static !important;
      .sig-gathering {
        justify-content: flex-end;
        .box {
          display: none;
        }
      }
    }
  }
  @media screen and (max-width: 1100px) {
    height: 400px;
  }
  @media screen and (max-width: 824px) {
    height: 300px;
  }
  :deep(.swiper-pagination) {
    width: 1416px !important;
    bottom: 84px;
    left: 50% !important;
    transform: translateX(-50%);
    text-align: left;
    .swiper-pagination-bullet {
      width: 40px;
      height: 2px;
      opacity: 1;
      background: rgba(207, 211, 215, 0.6);
      border-radius: 0;
      margin: 0 4px;
    }
    .swiper-pagination-bullet-active {
      background: var(--e-color-yellow5);
      opacity: 1;
    }
    @media screen and (max-width: 1439px) {
      width: 1080px !important;
      padding: 0 16px;
      left: 0 !important;
      transform: translateX(0);
    }
    @media screen and (max-width: 1100px) {
      width: 100% !important;
      bottom: 72px;
      .swiper-pagination-bullet {
        width: 20px !important;
        margin: 0 4px 0 0;
      }
    }
    @media screen and (max-width: 824px) {
      left: 50% !important;
      transform: translateX(-50%);
      text-align: center;
      bottom: 24px;
    }
  }
}

:deep(.swiper-button-prev) {
  width: 32px;
  height: 32px;
  background: rgba(56, 56, 56, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s;
  &:after {
    font-size: 20px;
    color: #fff;
  }
  &.show {
    opacity: 1;
  }
}
:deep(.swiper-button-next) {
  width: 32px;
  height: 32px;
  background: rgba(56, 56, 56, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s;
  &:after {
    font-size: 20px;
    color: #fff;
  }
  &.show {
    opacity: 1;
  }
}
</style>
