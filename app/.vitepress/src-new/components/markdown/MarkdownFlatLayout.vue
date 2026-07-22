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
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px;
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
  text-align: center;
}
.flat-list {
  .o-col {
    margin-top: 32px;
    &:nth-child(-n + 2) {
      margin-top: 0px;
    }
    // 奇数列（左边项目）都有右边框
    &:nth-child(odd) {
      padding-right: 16px;
    
      &:last-child:not(:nth-child(2)) {
        // 如果是奇数个项目时的最后一个（独占一行）
        flex: 0 0 100%;
      }
    }
    &:nth-child(even) {
      padding-left: 16px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 0;
        width: 1px;
        height: calc(100% - 30px);
        background-color: var(--o-color-control4);
      }
    }
  }
}

@include respond('<=laptop') {
  .flat {
    padding: 24px;
  }
}

@include respond('<=pad') {
  .flat {
    padding: 16px;
  }
  .item-desc {
    margin-top: 8px;
  }
}

@include respond('<=pad_v') {
  .flat {
    padding: 12px;
  }
  .flat-item {
    margin-left: 0;
    margin-top: 0;
    display: flex;
    flex-direction: column;
  }
  .flat-list {
    .o-col {
      padding: 0 !important;
      &::before {
        display: none;
      }
    }
    .o-col + .o-col {
      margin-top: 12px;
    }
  }
}
</style>