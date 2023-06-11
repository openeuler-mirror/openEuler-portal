<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useData } from 'vitepress';
import HOME_CONFIG from '@/data/home';

import useWindowResize from '@/components/hooks/useWindowResize';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const { lang } = useData();
const flag = ref();
const onSwiper = (swiper: any) => {
  swiper.el.onmouseout = function () {
    swiper.navigation.$nextEl.removeClass('show');
    swiper.navigation.$prevEl.removeClass('show');
  };
  swiper.el.onmouseover = function () {
    swiper.navigation.$nextEl.addClass('show');
    swiper.navigation.$prevEl.addClass('show');
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
</script>

<template>
  <swiper
    class="home-banner"
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
    <swiper-slide v-for="item in homeBanner" :key="item.link">
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
            :class="item.id === 'download' ? 'download' : ''"
          >
            <div data-aos="fade-down" class="box">
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
.eur {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.download {
  .title {
    color: var(--o-color-black);
  }
  .desc {
    color: var(--o-color-black);
  }
  .o-button {
    border: 1px solid var(--o-color-black);
    color: var(--o-color-black);
  }
}
#euler-sky {
  @media screen and (max-width: 768px) {
    .banner-panel-content {
      display: none;
    }
    .o-button {
      display: none;
    }
  }
}

.home-banner {
  height: 480px;
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
        // filter: invert(1);
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

      .desc {
        @media screen and (min-width: 1439px) {
          // max-width: 500px;
        }
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
        // filter: invert(1);
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
      .new-edition {
        margin-top: 230px;
        display: flex;
        justify-content: center;
        transition: none;
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
      background: var(--o-color-yellow5);
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
