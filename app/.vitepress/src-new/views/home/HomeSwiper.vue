<script setup lang="ts">
import { OFigure, OLink } from '@opensig/opendesign';
import type { PropType } from 'vue';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

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
  <div v-if="data.length > 0" class="swiper">
    <div class="swiper-list" :class="{ 'swiper-reverse': reverseDirection }">
      <div v-for="(item, i) in data" :key="i" class="swiper-item">
        <OLink
          :href="isEn ? (item.href_en ? item.href_en : item.href) : item.href"
          target="_blank"
        >
          <div class="swiper-card">
            <OFigure :src="item.logo[theme]" />
          </div>
        </OLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}
.swiper-list {
  display: flex;
  animation: marque 100s linear infinite;
  @include respond-to('>phone') {
    @include hover {
      animation-play-state: paused;
    }
  }
}
.swiper-reverse {
  animation: marquere 100s linear infinite;
}

.swiper-card {
  width: 269px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  margin-right: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  pointer-events: auto;
}
.o-figure {
  width: 100%;
  border-radius: var(--o-radius-xs);
}

@keyframes marque {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes marquere {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

@include respond-to('phone') {
  .swiper-card {
    width: 160px;
    margin-right: 12px;
  }
}
</style>
