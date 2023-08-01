<script setup lang="ts">
import { useAttrs, nextTick, onUnmounted } from 'vue';
import { debounce } from 'lodash';

const props = defineProps({
  listenerScorll: {
    type: Boolean,
    default: false,
  },
});

let optionDom: null | HTMLElement = null;

const debounceEvent = debounce(
  function () {
    if (!optionDom) {
      return false;
    }
    const isBottom =
      optionDom.clientHeight / (optionDom.scrollHeight - optionDom.scrollTop) >=
      0.6;
    if (isBottom) {
      emit('scorll-bottom');
    }
  },
  500,
  {
    trailing: true,
  }
);
function scrollEvent(val: boolean) {
  if (val && props.listenerScorll) {
    nextTick(() => {
      optionDom = document.querySelector(
        '.el-dropdown__popper[aria-hidden="false"] .el-scrollbar .el-scrollbar__wrap '
      );
      if (optionDom) {
        optionDom.addEventListener('scroll', debounceEvent);
      }
    });
  }
}
const emit = defineEmits(['scorll-bottom']);
const attrs = useAttrs();
onUnmounted(() => {
  if (optionDom) {
    optionDom.removeEventListener('scroll', debounceEvent);
  }
});
</script>

<template>
  <ElDropdown
    v-bind="attrs"
    trigger="click"
    class="o-dropdown"
    @visible-change="scrollEvent"
  >
    <slot> </slot>
    <template #dropdown>
      <slot name="dropdown"> </slot>
    </template>
  </ElDropdown>
</template>

<style lang="scss">
.el-dropdown__popper.is-light {
  background-color: var(--o-color-bg2);
  border-radius: 0;
  .el-dropdown-menu__item:not(.is-disabled):focus {
    background-color: var(--o-color-bg3);
  }
  .el-dropdown-menu__item {
    padding: 4px 8px;
  }
}
.o-dropdown {
  --o-dropdown-height: 36px;
  --o-dropdown-border-color: var(--o-color-border1);
  --o-dropdown-font-color: var(--o-color-text1);
  --o-dropdown-font-size: var(--o-font-size-text);
  --o-dropdown-line-height: var(--o-line-height-text);
  --o-dropdown-color-bg: var(--o-color-bg2);
  .o-search {
    margin: 0 var(--o-spacing-h5);
  }
}
.el-dropdown__popper {
  .el-scrollbar {
    .el-dropdown__list {
      .o-dropdown-item {
        content-visibility: auto;
      }
    }
    .empty-option {
      cursor: default;
      display: flex;
      justify-content: center;
      padding: var(--o-spacing-h9) var(--o-spacing-h5);
      color: var(--o-color-text-secondary);
    }

    .search-box {
      position: sticky;
      top: 5px;
      margin-bottom: 5px;
      background-color: var(--o-color-bg2);
      width: 100%;
      z-index: 1;

      .o-search {
        padding: 4px 8px;
        height: 40px;

        .el-input__wrapper {
          box-shadow: 0 0 0 1px var(--o-color-border1) inset;
          &:hover {
            box-shadow: 0 0 0 1px var(--o-color-border1) inset;
          }
          .el-input__prefix-inner {
            font-size: 18px;
          }
        }
      }
      &::before {
        position: absolute;
        content: '';
        height: 5px;
        width: 100%;
        top: -5px;
        background-color: var(--o-color-bg2);
      }
    }
    .is-active {
      font-weight: 700;
      color: var(--o-color-brand1);
    }
  }
}
</style>
