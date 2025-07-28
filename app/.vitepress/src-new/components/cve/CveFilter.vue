<script setup lang="ts">
import { type PropType } from 'vue';
import { OToggle, ORadioGroup, ORadio } from '@opensig/opendesign';

import { useVModel } from '@vueuse/core';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

interface FilterOptionT {
  label: {
    zh: string;
    en: string;
  };
  value: string;
  class?: string;
}
const props = defineProps({
  // tag类型标题
  typeTitle: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<Array<FilterOptionT>>,
    required: true,
  },
  // 选中的tag
  modelValue: {
    type: String,
  },
});

const emits = defineEmits<{
  (e: 'update:modelValue', val: string | undefined): void;
}>();

const clearChecked = (checked: boolean) => {
  if (checked) {
    emits('update:modelValue', '');
  }
};

const { lePadV } = useScreen();
const { isZh } = useLocale();
const radioModelValue = useVModel(props, 'modelValue', emits);

const onChange = (option: FilterOptionT) => {
  emits('update:modelValue', option.value);
};
</script>

<template>
  <div class="cve-filter">
    <p class="filter-title">{{ typeTitle }}</p>
    <ORadioGroup
      v-model="radioModelValue"
      :style="{ gap: lePadV ? '4px 4px' : '16px 8px' }"
    >
      <ORadio
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
        @change="onChange(option)"
      >
        <template #radio="{ checked }">
          <OToggle
            @click="clearChecked(checked)"
            :class="[option.class, { active: checked }]"
            :checked="checked"
          >
            {{ isZh ? option.label.zh : option.label.en }}
          </OToggle>
        </template>
      </ORadio>
    </ORadioGroup>
  </div>
</template>

<style lang="scss" scoped>
.cve-filter {
  display: flex;
  align-items: flex-start;
}

.filter-title {
  min-width: 64px;
  color: var(--o-color-info1);
  font-weight: 500;
  margin-right: 32px;
  margin-top: 4px;
  @include text1;
}

.o-toggle {
  --toggle-size: 32px;
  --toggle-padding: 3px 15px;
  --toggle-radius: 4px;
  max-height: 32px;
  color: var(--o-color-info1);
  border: 1px solid var(--o-color-control2-light);
  --toggle-bg-color: var(--o-color-control2-light);
  --toggle-bg-color-hover: var(--o-color-control3-light);
  @include text1;
}
.o-radio + .o-radio {
  margin-left: 0;
}

.active {
  background-color: transparent;
  color: var(--o-color-primary1);
  border: 1px solid var(--o-color-primary1);
}

@include respond-to('<=pad_v') {
  .filter-title {
    min-width: 48px;
    margin-right: 16px;
    margin-top: 5px;
  }
  .o-toggle {
    --toggle-size: auto;
    --toggle-padding: 4px 8px;
    max-height: auto;
  }
}
</style>
