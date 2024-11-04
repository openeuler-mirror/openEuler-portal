<script setup lang="ts">
import { OFigure, OLink } from '@opensig/opendesign';
import type { PropType } from 'vue';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

export interface PublisherT {
  logo: {
    [key: string]: string;
  };
  href: string;
  href_en?: string;
}

defineProps({
  // 轮播数据
  data: {
    type: Array as PropType<PublisherT[]>,
    default: () => {
      [];
    },
  },
  // 反向轮播
  reverseDirection: {
    type: Boolean,
    default: false,
  },
});

const { theme } = storeToRefs(useCommon());
const { isEn } = useLocale();
</script>

<template>
  <Swiper
    :modules="[Autoplay]"
    slides-per-view="auto"
    :space-between="0"
    :autoplay="{
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: reverseDirection,
      pauseOnMouseEnter: true,
    }"
    :noSwiping="true"
    :free-mode="true"
    :speed="8000"
    :loop="true"
  >
    <SwiperSlide v-for="(item, i) in data" :key="i">
      <slot :item="item">
        <OLink
          :href="isEn ? (item.href_en ? item.href_en : item.href) : item.href"
          target="_blank"
        >
          <div class="box">
            <OFigure :src="item.logo[theme]" />
          </div>
        </OLink>
      </slot>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.box {
  width: 269px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.o-figure {
  width: 100%;
  border-radius: var(--o-radius-xs);
}
:deep(.swiper-wrapper) {
  -webkit-transition-timing-function: linear;
  -moz-transition-timing-function: linear;
  -ms-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
}
:deep(.swiper-slide) {
  width: auto;
  height: auto;
}

@include respond-to('phone') {
  .box {
    width: 160px;
    margin-right: 12px;
  }
}
</style>
