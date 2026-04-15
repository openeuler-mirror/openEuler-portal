<script setup lang="ts">
import { computed } from 'vue';
import { ORow, OCol, OCard, OLink, OIcon } from '@opensig/opendesign';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import IconAddress from '~icons/app-new/icon-address.svg';
import IconTime from '~icons/app-new/icon-time.svg';

import { useCommon } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';

defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const { lePadV, lePad, leLaptop } = useScreen();

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 24px';
  } else if (leLaptop.value) {
    return '24px 32px';
  }
  return '32px 40px';
});
</script>

<template>
  <div class="minisite-card">
    <p class="floor-title">{{ cardData.title }}</p>
    <ORow :gap="gap" wrap="wrap" class="card-list">
      <OCol v-for="(item, i) in cardData.card_list" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
        <OCard :class="`card-${commonStore.theme}`">
          <template #card>
            <div class="card-content" :class="`card-content-${commonStore.theme}`">
              <p class="card-title">{{ item.title }}</p>
              <div class="card-info">
                <div class="item-info">
                  <OIcon><IconAddress /></OIcon>
                  <span>{{ item.address }}</span>
                </div>
                <div class="item-info">
                  <OIcon><IconTime /></OIcon>
                  <span>{{ item.time }}</span>
                </div>
              </div>
              <p v-for="(desc, d) in item.description" :key="d" class="card-desc">{{ desc }}</p>
              <div class="card-link">
                <OLink color="primary" :href="item.url" target="_blank" hover-underline>
                  <p>{{ item.label }}</p>
                  <template #suffix>
                    <OIcon><IconChevronRight /></OIcon>
                  </template>
                </OLink>
              </div>
            </div>
          </template>
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
  background: linear-gradient(135deg, rgba(var(--o-mixedgray-1), 1), rgba(236, 241, 255, 1) 100%);
}
.card-dark {
  background: linear-gradient(135deg, rgba(var(--o-mixedgray-4), 1), rgba(25, 37, 66, 1) 100%);
}
.card-content {
  padding: 24px;
  height: 294px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  display: flex;
  flex-direction: column;
}
.o-col {
  &:nth-child(2n + 1) {
    .card-content {
      background-image: url('../img/card_bg1_light.png');
    }
    .card-content-dark {
      background-image: url('../img/card_bg1_dark.png');
    }
  }
  &:nth-child(2n) {
    .card-content {
      background-image: url('../img/card_bg2_light.png');
    }
    .card-content-dark {
      background-image: url('../img/card_bg2_dark.png');
    }
  }
}
.card-title {
  color: var(--o-color-info1);
  font-weight: 500;
  margin-bottom: 8px;
  @include h3;
}
.card-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.item-info {
  display: flex;
  align-items: center;
  color: var(--o-color-info1);
  @include tip1;
  .o-icon {
    margin-right: 4px;
  }
}
.item-info + .item-info {
  margin-left: 16px;
}
.card-desc {
  color: var(--o-color-info2);
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

@include respond-to('<=laptop') {
  .card-list {
    margin-top: 24px;
  }
}
@include respond-to('<=pad') {
  .card-list {
    margin-top: 16px;
  }
  .card-content {
    padding: 16px;
    height: 100%;
  }
  .o-icon {
    --icon-size: 16px;
  }
}
@include respond-to('<=pad_v') {
  .card-list {
    margin-top: 12px;
  }
  .card-content {
    padding: 12px;
    height: auto;
  }
  .card-link {
    margin-top: 16px;
  }
}
</style>
