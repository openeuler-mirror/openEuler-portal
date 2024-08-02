<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { IObject } from './interface';
const props = defineProps({
  option: {
    type: Array as () => IObject[],
    default: () => [] as IObject[],
  },
});
const { option } = toRefs(props);

const changeRadio = (item: IObject, list: IObject) => {
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
    <div v-if="index" class="line"></div>
    <div class="group">
      <p class="label">{{ item.label }}</p>
      <el-radio-group v-model="form[item.id]">
        <el-radio
          v-for="list in item.list"
          :key="list.id"
          border
          :label="list.value"
          class="list-radio"
          @change="changeRadio(item, list)"
          >{{ list.label }}</el-radio
        >
      </el-radio-group>
    </div>
  </div>
  <div class="search-box">
    <slot name="searchInput"></slot>
  </div>
</template>

<style lang="scss" scoped>
:deep(.list-radio) {
  // TODO:样式重叠
  border-radius: 0 !important;
  margin-right: 12px;
  border: 1px solid transparent !important;
  height: 28px !important;
  padding: 0 12px !important;

  .el-radio__label {
    color: var(--o-color-neutral5) !important;
    font-weight: normal !important;
    padding: 0 !important;
  }

  .el-radio__input {
    display: none;
  }

  &.is-checked {
    .el-radio__label {
      color: var(--o-color-brand1) !important;
    }
  }
  &.is-checked {
    border-color: var(--o-color-brand1) !important;
  }
}

.line {
  border-bottom: 1px solid var(--o-color-division1);
  margin-bottom: 18px;
}
.group {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  .label {
    // width:88px;
    margin-right: 24px;
  }
}
.search-box {
  margin-left: 85px;
}
</style>
