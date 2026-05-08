<script lang="ts" setup>
import { watch } from 'vue';
import { OTable, OLink } from '@opensig/opendesign';
import { useLocale } from '~@/composables/useLocale';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
});

watch(
  () => props.data,
  (val) => {
    console.log(val);
  }, {
    deep: true,
    immediate: true,
  }
);
</script>
<template>
  <OTable
    :columns="data[0].columns"
    :data="data[0].data"
  >
    <template v-for="column in data[0].columns" #[`td_${column}`]="{ row }">
      <OLink
        v-if="Array.isArray(row[column])"
        :key="`${column}_link`"
        color="primary"
        variant="text"
        :href="row[column][0]"
      >
        {{ row[column][0] }}
      </OLink>
      <p v-else :key="`${column}_text`">
        {{ row[column] }}
      </p>
    </template>
  </OTable>
</template>

<style scoped lang="scss">
.view-docs {
  :deep(.section-wrapper) {
    position: relative;
    
    // 添加覆盖整个宽度的伪元素作为背景
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100vw;
      height: 100%;
      // background-image: url('~@/assets/category/intelligence-boom/bottom_background.png');
      background-repeat: no-repeat;
      background-size: 100vw auto;
      background-position: center bottom;
      z-index: 0;
      pointer-events: none;

      @include respond-to('<=pad') {
        background-image: unset;
      }
    }
    
    .section-body {
      display: flex;
      justify-content: center;
      position: relative;
    }
  }

  &.view-dark {
    :deep(.section-wrapper) {
      &::before {
        background-image: unset;
      }
    }
  }
}
</style>