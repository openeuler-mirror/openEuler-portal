<script setup lang="ts">
import { OFigure, OLink } from '@opensig/opendesign';
import type { PropType } from 'vue';

import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

export interface PublisherT {
  logo_light: string;
  logo_dark: string;
  href: string;
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
</script>

<template>
  <div v-if="data.length > 0" class="swiper">
    <div class="swiper-list" :class="{ 'swiper-reverse': reverseDirection }">
      <div v-for="(item, i) in data" :key="i" class="swiper-item">
        <OLink
          :href="item.href"
          target="_blank" rel="noopener noreferrer"
          :hover-underline="false"
          v-analytics.bubble="{
            target: item.href,
          }"
        >
          <div class="swiper-card">
            <OFigure :src="theme === 'light' ? item.logo_light : item.logo_dark" />
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
  animation: marque 300s linear infinite;
  @include respond('>phone') {
    @include hover {
      animation-play-state: paused;
    }
  }
}
.swiper-reverse {
  animation: marquere 300s linear infinite;
}

.swiper-item {
  display: flex;
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

:deep(.o-link) {
  .o-link-label {
    display: flex;
  }
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

@include respond('phone') {
  .swiper-card {
    width: 160px;
    margin-right: 12px;
  }
}
</style>
