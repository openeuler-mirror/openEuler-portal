<script setup lang="ts">
import { useAttrs, nextTick, onMounted, onUnmounted, computed } from 'vue';
import { debounce } from 'lodash';

const attrs = useAttrs();
const props = defineProps({
  listenerScorll: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['scorll-bottom']);

const debounceEvent = debounce(
  function () {
    const isBottom =
      this.scrollHeight - this.scrollTop - 10 <= this.clientHeight;
    if (isBottom) {
      emit('scorll-bottom');
    }
  },
  300,
  {
    trailing: true,
  }
);

const classNames = computed(() => {
  return `${attrs['custom-class']} o-select-dropdown`;
});

let optionDom: null | HTMLElement = null;

// 移动端 输入框无法弹出
function cancalReadOnly(onOff) {
  nextTick(() => {
    if (!onOff) {
      const input = document.querySelector('.el-input__inner');
      if (input) {
        input.removeAttribute('readonly');
      }
    }
  });
}
function scrollEvent(val) {
  cancalReadOnly(val);
  if (val && props.listenerScorll) {
    nextTick(() => {
      optionDom = document.querySelector(
        '.el-select__popper[aria-hidden="false"] .el-select-dropdown .el-select-dropdown__wrap'
      );
      if (optionDom) {
        optionDom.addEventListener('scroll', debounceEvent);
      }
    });
  }
}
onMounted(() => {
  cancalReadOnly(false);
});
onUnmounted(() => {
  if (optionDom) {
    optionDom.removeEventListener('scroll', debounceEvent);
  }
});
</script>

<template>
  <ElSelect
    class="o-select"
    :popper-class="classNames"
    v-bind="attrs"
    @visible-change="scrollEvent"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <slot> </slot>
  </ElSelect>
</template>

<style lang="scss">
.o-select {
  --o-select-font-tip: var(--o-font-size-tip);
  --o-select-font-text: var(--o-color-text4);
  --o-select-color-bg: var(--o-color-bg2);
  --o-select-shadow: var(--o-shadow-l1);
  --o-select-shadow_hover: var(--o-shadow-l2);
  border: none;
  --el-select-border-color-hover: transparent !important;
  &:hover {
    box-shadow: var(--o-select-shadow_hover);
  }
  .el-input__wrapper {
    background-color: var(--o-select-color-bg);
    border-radius: 0;
    box-shadow: var(--o-select-shadow);
    &:hover {
      border: none;
    }
  }
  .el-input__prefix-inner {
    // font-size: var(--o-select-font-tip);
    .o-icon {
      display: flex;
      align-items: center;
    }
  }
  .el-input__suffix {
    height: 40px;
    .el-icon {
      svg {
        color: var(--o-select-font-text);
      }
    }
  }
  @media screen and (max-width: 867px) {
    .el-input {
      height: 34px;
      .el-input__wrapper {
        padding: var(--o-spacing-h8);
        .el-input__inner {
          font-size: var(--o-select-font-tip);
        }
      }
      .el-input__suffix {
        height: 34px;
      }
    }
  }
}
</style>
