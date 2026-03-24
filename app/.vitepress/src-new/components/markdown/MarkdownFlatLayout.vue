<script setup>
import { ref, computed } from 'vue';
import { ORow, OCol } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
});

const infos = computed(() => {
  const result = [];
  
  for (let i = 0; i < props.data.length; i += 2) {
    if (i + 1 < props.data.length) {
      const cardInfo = {
        title: props.data[i].content,
        description: props.data[i + 1].content,
      };
      result.push(cardInfo);
    }
  }
  
  return result;
});
</script>

<template>
  <div class="flat">
    <ORow gap="0 0" wrap="wrap" class="flat-list">
      <OCol :flex="lePadV ? '0 0 100%' : '0 0 50%'" v-for="(card, index) in infos" :key="index">
        <div class="flat-item">
          <p class="item-title">{{ card.title }}</p>
          <p class="item-desc">{{ card.description }}</p>
        </div>
      </OCol>
    </ORow>
  </div>
</template>

<style lang="scss" scoped>
.flat {
  --o-gap-section: 72px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px;

  @include respond-to('<=laptop') {
    --o-gap-section: 56px;
  }
  @include respond-to('pad_h') {
    --o-gap-section: 40px;
  }
  @include respond-to('<=pad_v') {
    --o-gap-section: 32px;
  }
}

.item-title {
  font-weight: 500;
  @include h3;
}
.item-desc {
  margin-top: 12px;
  color: var(--o-color-info3);
  @include text1;
}

.flat-item {
  margin-left: 16px;
  margin-top: 1px;
}
.flat-list {
  .o-col {
    padding: 16px;
    &:not(:nth-last-child(-n+2)) {
      border-bottom: 1px solid var(--o-color-control4);
    }
    // 奇数列（左边项目）都有右边框
    &:nth-child(odd) {
      border-right: 1px solid var(--o-color-control4);
    
      &:last-child:not(:nth-child(2)) {
        // 如果是奇数个项目时的最后一个（独占一行）
        border-right: none;
        flex: 0 0 100%;
      }
    }
  }
}

@include respond-to('pad_h') {
  .item-desc {
    margin-top: 8px;
  }
  .flat-list {
    .o-col {
      padding: 8px;
    }
  }
}

@include respond-to('<=pad_v') {
  .flat-item {
    margin-left: 0;
    margin-top: 0;
    display: flex;
    flex-direction: column;
  }
  .item-desc {
    margin-top: 8px;
  }
  .flat-list {
    .o-col {
      padding: 12px;
      &:nth-child(odd) {
        border-right: none;
      }
      &:nth-last-child(2) {
        border-bottom: 1px solid var(--o-color-control4);
      }
    }
  }
}
</style>