<script setup lang="ts">
import { ORow, OCol, OCard, OLink, OIcon, OFigure } from '@opensig/opendesign';

import IconOutLink from '~icons/yuanrong/icon-outlink.svg';

import { useCommon } from '@/stores/common';

defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => null,
  },
  img: {
    type: String,
    default: '',
  }
});

const commonStore = useCommon();
</script>

<template>
  <div class="minisite-card-long">
    <p class="floor-title">{{ cardData.title }}</p>
    <ORow gap="0 0" wrap="wrap" class="card-list">
      <OCol v-for="(item, i) in cardData.card_list" :key="i" flex="0 0 100%">
        <OCard :class="`card-${commonStore.theme}`">
          <div class="card-content">
            <p class="card-title">{{ item.title }}</p>
            <p v-for="(desc, d) in item.description" :key="d" class="card-desc">{{ desc }}</p>
            <p class="card-time">{{ item.time }}</p>
            <div class="card-link">
              <OLink color="primary" :href="item.url" target="_blank" hover-underline>
                <p>{{ item.label }}</p>
                <template #suffix>
                  <OIcon><IconOutLink /></OIcon>
                </template>
              </OLink>
            </div>
          </div>
          <div class="card-img">
            <OFigure :src="img" />
          </div>
        </OCard>
      </OCol>
    </ORow>
  </div>
</template>

<style scoped lang="scss">
.card-list {
  margin-top: 40px;
}
.o-card {
  background-image: url('../img/card-left.png'), url('../img/card-right.png');
  background-size: contain, contain;
  background-repeat: no-repeat, no-repeat;
  background-position: top left, right bottom;
  :deep(.o-card-content) {
    height: 192px;
    display: flex;
    justify-content: space-between;
  }
}
.card-dark {
  background-image: url('../img/card_bg3_dark.png');
  background-position: right bottom;
}
.card-content {
  display: flex;
  flex-direction: column;
}
.card-title {
  color: var(--o-color-info1);
  font-weight: 500;
  margin-bottom: 16px;
  @include h3;
}
.card-desc {
  color: var(--o-color-info2);
  @include text1;
}
.card-time {
  color: var(--o-color-info2);
  margin-top: 16px;
  @include text1;
}
.card-link {
  margin-top: auto;
}
.o-link {
  padding: 8px 0;
  @include text1;
}
.o-icon {
  --icon-size: 24px;
}
.card-img {
  margin-left: 32px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.o-figure {
  height: 136px;
}

@include respond-to('<=laptop') {
  .card-list {
    margin-top: 24px;
  }
  .o-card {
    :deep(.o-card-content) {
      height: 180px;
    }
  }
  .o-figure {
    height: 110px;
  }
}
@include respond-to('<=pad') {
  .card-list {
    margin-top: 16px;
  }
  .o-icon {
    --icon-size: 16px;
  }
}
@include respond-to('<=pad_v') {
  .card-list {
    margin-top: 12px;
  }
  .o-card {
    --card-main-padding: 12px;
    :deep(.o-card-content) {
      height: auto;
    }
  }
  .card-time {
    margin-top: 12px;
  }
  .card-img {
    margin-left: 16px;
  }
  .o-figure {
    height: 96px;
  }
}
</style>
