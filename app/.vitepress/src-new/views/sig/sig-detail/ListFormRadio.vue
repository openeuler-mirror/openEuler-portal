<script lang="ts" setup>
import { toRefs, ref } from 'vue';

import { ORadioGroup, ORadio, OToggle } from '@opensig/opendesign';
const props = defineProps({
  option: {
    type: Array as () => any[],
    default: () => [] as any[],
  },
});
const { option } = toRefs(props);

const changeRadio = (item: any, list: any) => {
  item.active = list.value;
  emits('get-contribute-info', item);
};

const emits = defineEmits(['get-contribute-info']);

// 动态计算参数赋值
const form = ref(
  option.value.reduce((pre: any, next: any) => {
    pre[next.id] = next.active;
    return pre;
  }, {})
);
</script>

<template>
  <div v-for="(item, index) in option" :key="item.id">
    <div class="group">
      <p class="label">{{ item.label }}</p>
      <ORadioGroup v-model="form[item.id]">
        <ORadio
          v-for="list in item.list"
          class="list-radio"
          :key="list.id"
          :label="list.value"
          @change="changeRadio(item, list)"
        >
          <template #radio="{ checked }">
            <OToggle :checked="checked">{{ list.label }}</OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
    </div>
  </div>
  <div class="search-box">
    <slot name="searchInput"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
