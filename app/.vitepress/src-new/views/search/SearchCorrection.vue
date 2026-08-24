<script lang="ts" setup>
import { oaReport } from '@opendesign-plus/plugins/analytics';

const props = defineProps({
  size: {
    type: String,
    default: '',
  },
  corrected: {
    type: String,
    default: '',
  },
  original: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['select']);

const handleClick = () => {
  oaReport(
    'click',
    {
      module: 'search_result',
      content: props.original,
      type: 'correction_original',
      target: props.original,
    },
    'search_portal'
  );
  emit('select', props.original);
};
</script>

<template>
  <i18n-t
    v-if="corrected && corrected !== original"
    keypath="search.correctionTip"
    tag="div"
    class="search-correction"
    :class="size"
  >
    <template #corrected>
      <span class="correction-key">{{ corrected }}</span>
    </template>
    <template #original>
      <span class="correction-key correction-link" @click="handleClick">{{ original }}</span>
    </template>
  </i18n-t>
</template>

<style lang="scss" scoped>
.search-correction {
  @include text1;
  color: var(--o-color-info2);
  &.medium {
    padding: 24px;
    background: var(--o-color-fill1);
    margin: 40px 0 0;
    border-radius: var(--o-radius-xs);
    @include respond('<=pad') {
      margin: 24px 0;
      border-radius: 8px;
    }
    @include respond('<=pad_v') {
      padding: 16px;
      margin: 24px 0 0;
    }
    @include respond('phone') {
      background: var(--o-color-fill2);
      margin: 0 0 12px;
    }
  }
  .correction-key {
    color: var(--o-color-info1);
  }
  .correction-link {
    cursor: pointer;
  }
}
</style>
