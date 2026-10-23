<script lang="ts" setup>
import { computed } from 'vue';
import { OCard, OFigure } from '@opensig/opendesign';

import { useCommon } from '@/stores/common';

const props = defineProps({
  callforData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();

type ThemeT = 'light' | 'dark';

const theme = computed<ThemeT>(() => (commonStore.theme === 'dark' ? 'dark' : 'light'));

// 卡片背景：各端共用一份
const cardBg = computed(() => {
  const data = props.callforData as Record<string, Record<string, string>> | null;
  if (!data) return '';
  return data.bg?.[theme.value] ?? '';
});

// 封面宽高比（与背景图 624×300 一致）
const CARD_RATIO = 624 / 300;
</script>

<template>
  <div class="callfor">
    <OCard
      v-for="(item, i) in callforData.list"
      :key="i"
      class="callfor-card"
      hoverable
      :href="item.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #cover>
        <OFigure class="card-figure" :src="cardBg" :ratio="CARD_RATIO" fit="cover">
          <div class="card-content">
            <p class="card-title">{{ item.title }}</p>
            <p class="card-sub">{{ item.sub }}</p>
          </div>
        </OFigure>
      </template>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
.callfor {
  display: flex;
  gap: var(--o-gap-6);
  margin-bottom: var(--o-gap-10);
}

// <=840px：两列网格
@include respond('<=pad_v') {
  .callfor {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: var(--o-gap-7);
  }
}

// <=600px：单列纵排，卡片限宽 400px，容器宽于 400px 时水平居中
@include respond('phone') {
  .callfor {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .callfor-card {
    width: 100%;
    max-width: 400px;
  }
}

.callfor-card {
  flex: 1;
  min-width: 0;
  // 封面图铺满卡片（与 openEuler 主题定制值一致）
  --card-cover-padding: 0;
  // 设计要求外层容器 4px 圆角；背景透明，避免圆角裁切缝隙露出卡片底色角
  border-radius: 4px;
  overflow: hidden;
  background-color: transparent;
}

.card-figure {
  width: 100%;
  // 传入图片宽于卡片比例时从左侧开始裁切，保住右侧主视觉
  --figure-position: right center;
  // 图片自身按 4px 圆角裁切，与外层容器圆角保持一致
  border-radius: 4px;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;

  .card-title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include display3;
  }

  .card-sub {
    max-width: 82%;
    margin-top: 16px;
    color: var(--o-color-info2);
    @include text1;

    @include respond('<=pad_v') {
      margin-top: 12px;
    }
  }
}
</style>
