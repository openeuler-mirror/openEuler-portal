<script setup lang="ts">
import { ref, useAttrs } from 'vue';

const attrs = useAttrs();
const inputRef = ref();

defineExpose({
  inputRef,
});
</script>

<template>
  <ElInput ref="inputRef" class="o-search" v-bind="attrs">
    <template #prefix>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M14.667 4c5.891 0 10.667 4.776 10.667 10.667 0 2.464-0.836 4.734-2.239 6.54l4.448 4.45-1.886 1.886-4.451-4.448c-1.806 1.404-4.075 2.239-6.54 2.239-5.891 0-10.667-4.776-10.667-10.667s4.776-10.667 10.667-10.667zM14.667 6.667c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
        ></path>
      </svg>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </ElInput>
</template>

<style lang="scss">
.o-search {
  --e-search-height: 36px;
  --e-search-border-color: var(--e-color-border);
  --e-search-font-color: var(--e-color-text1);
  --e-search-font-size: var(--e-font-size-text);
  --e-search-line-height: var(--e-line-height-text);
  --e-search-color-bg: var(--e-color-bg2);
  --e-search-shadow: var(--e-shadow-l1);

  &.el-input {
    font-size: var(--e-font-size-text);
    line-height: var(--e-search-font-size);

    .el-input__wrapper {
      border-radius: 0;
      padding: 1px 8px;
      background-color: var(--e-search-color-bg);
      box-shadow: var(--e-search-shadow);
      .el-input__prefix-inner {
        font-size: var(--e-font-size-h5);
        line-height: var(--e-line-heihgt-h5);
        color: var(--e-color-text4);
      }

      svg {
        width: 1em;
        height: 1em;
        color: currentColor;
        vertical-align: top;
      }

      .el-input__inner {
        height: var(--e-search-height);
        line-height: var(--e-search-font-size);
        color: var(--e-search-font-color);
      }
    }
  }
}
</style>
