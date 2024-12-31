<script setup lang="ts">
import {
  OButton,
  OCarousel,
  OCarouselItem,
  OFigure,
} from '@opensig/opendesign';
import { computed, ref } from 'vue';

import { useLocale } from '~@/composables/useLocale';

import banner from '~@/data/home/banner';
import { useScreen } from '~@/composables/useScreen';

// TODO:风格切换代码待整改
import { useCommon } from '@/stores/common';
import ContentWrapper from '~@/components/ContentWrapper.vue';
const commonStore = useCommon();
const isLight = computed(() => {
  return commonStore.theme === 'light';
});

const { locale } = useLocale();
const { isPhone, isPad, gtPad } = useScreen();

const bannerInfo = computed(() => {
  const info = banner[locale.value as 'zh' | 'en'];
  for (let i = 0, len = info.length; i < len; i++) {
    const item = info[i];

    let themeInfo;

    if (item.light && isLight.value) {
      themeInfo = item.light;
    }

    if (item.dark && !isLight.value) {
      themeInfo = item.dark;
    }

    if (themeInfo) {
      Object.keys(themeInfo).forEach((key) => {
        item[key] = themeInfo[key];
      });
    } else {
      item.withStickyBg = true;
    }

    if (gtPad.value) {
      item.bg = item.bg_pc;
    } else if (isPad.value) {
      item.bg = item.bg_pad;
    } else {
      item.bg = item.bg_mb;
    }
  }

  return info;
});

// 主题切换
const theme = ref('');
const onBeforeChange = (idx: number) => {
  setTimeout(() => {
    theme.value = bannerInfo.value[idx].bg_theme ?? 'light';
  }, 100);
};

// banner跳转
const onClick = (href) => {
  if (href) {
    window.open(href);
  }
};
</script>

<template>
  <div class="home-banner">
    <OCarousel
      v-if="!isPhone"
      class="banner-carousel"
      effect="toggle"
      active-class="current-slide"
      indicator-click
      :auto-play="false"
      :data-o-theme="theme"
      @before-change="onBeforeChange"
    >
      <OCarouselItem
        v-for="(info, index) in bannerInfo"
        :key="index"
        class="banner-item"
        :class="`banner-item${index}`"
      >
        <OFigure
          class="banner-bg"
          :src="info.bg"
          :class="{
            'with-sticky-bg': info.withStickyBg,
            'in-dark': !isLight,
            'cursor-pointer': info.href && !info.btn,
          }"
          @click="onClick(info.href)"
        >
          <ContentWrapper class="banner-wrapper">
            <div class="banner-content">
              <!-- 标题 -->
              <div class="banner-title" v-if="info.title && info.title.length">
                <p v-for="(title, i) in info.title">{{ title }}</p>
              </div>
              <!-- 操作按钮 -->
              <div v-if="info.btn" class="banner-opts">
                <OButton :href="info.href" target="_blank" size="large">
                  {{ info.btn }}
                </OButton>
              </div>

              <img
                v-if="!isPhone && info.attach"
                :src="info.attach"
                class="banner-attach"
              />
            </div>
          </ContentWrapper>
        </OFigure>
      </OCarouselItem>
    </OCarousel>

    <OCarousel
      v-if="isPhone"
      class="banner-carousel"
      effect="gallery"
      indicator-click
      :data-o-theme="theme"
      arrow="never"
      :auto-play="true"
      @before-change="onBeforeChange"
    >
      <OCarouselItem
        v-for="(info, index) in bannerInfo"
        class="banner-item"
        :class="`banner-item${index}`"
      >
        <ContentWrapper class="banner-wrapper">
          <OFigure
            class="banner-bg"
            :src="info.bg"
            @click="onClick(info.href)"
          />
        </ContentWrapper>
      </OCarouselItem>
    </OCarousel>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  overflow: hidden;
  --banner-height: 480px;
  height: var(--banner-height);

  @include respond-to('<=pad') {
    --banner-height: 360px;
  }

  @include respond-to('phone') {
    margin-top: 16px;

    --banner-height: calc(
      (100vw - 2 * var(--layout-content-padding)) / 936 * 552 + 16px
    );
  }
}

.banner-carousel {
  width: 100%;
  height: 100%;
  @include respond-to('>pad_v') {
    --carousel-indicator-offset: 53px;
  }

  @include respond-to('<=pad_v') {
    --carousel-indicator-offset: 1px;
  }

  :deep(.o-carousel-indicator-bar) {
    height: 24px;
  }
}

.banner-item {
  width: 100%;
  height: 100%;
}

.banner-bg {
  width: 100%;
  height: 100%;

  :deep(.o-figure-img) {
    width: 100%;
    height: 100%;
  }

  @include respond-to('phone') {
    --figure-radius: 4px;
  }
}

.banner-wrapper {
  height: 100%;
}

.banner-content {
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.banner-title {
  @include display1;
  color: var(--o-color-info1);
  --d: 10px;
}

.banner-opts {
  margin-top: 24px;
  --d: 20px;
}

@keyframes fade-up {
  from {
    transform: translateY(var(--d));
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.current-slide {
  .banner-title {
    animation: fade-up 400ms ease-in;
  }
  .banner-opts {
    animation: fade-up 400ms ease-in;
  }
}

.in-dark.with-sticky-bg {
  :deep(.o-figure-img) {
    @include img-in-dark;
  }
}
.cursor-pointer {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
// 定制修改item1
.banner-item0 {
  .banner-attach {
    height: 200px;

    @include respond-to('pad') {
      height: 160px;
    }
  }
}

.banner-item1 {
  .banner-attach {
    height: 156px;

    @include respond-to('pad') {
      height: 120px;
    }
  }
}

// 定制修改item2
.banner-item2 {
  .banner-content {
    width: 100%;
    justify-content: center;
  }
  .banner-attach {
    height: 38%;
    margin-top: -60px;
    object-fit: contain;
  }
}

// 定制修改item2
.banner-item2 {
}

// 定制修改item3
.banner-item3 {
}
</style>
