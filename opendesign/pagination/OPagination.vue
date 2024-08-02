<script setup lang="ts">
import { ref, Ref, useAttrs, computed, watch, getCurrentInstance } from 'vue';

import useWindowResize from '@/components/hooks/useWindowResize';

import IconChevronLeft from '~icons/app/icon-chevron-left.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';

import { useI18n } from '@/i18n';

const i18n = useI18n();
const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const attrs = useAttrs();

const classNames = computed(() => {
  return `${attrs['poper-class']}`
    ? `${attrs['poper-class']} o-pagination-popper`
    : 'o-pagination-popper';
});

// 移动端
const totalPages = computed(() => {
  return Math.ceil(attrs.total / attrs['page-size']);
});
const page: Ref<HTMLElement | null> = ref(null);
const inputNumber = ref(1);
const emit = defineEmits(['jump-page']);
// 将翻页时间传递给父组件
const turnPage = (option: string) => {
  if (option === 'prev' && inputNumber.value > 1) {
    inputNumber.value -= 1;
    emit('jump-page', inputNumber.value);
    document.documentElement.scrollTop = 0;
  } else if (
    option === 'next' &&
    inputNumber.value < Math.ceil(attrs.total / attrs['page-size'])
  ) {
    inputNumber.value += 1;
    emit('jump-page', inputNumber.value);
    document.documentElement.scrollTop = 0;
  }
};

// 控制组件更新
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const jumpPage = (e: any) => {
  if (e.keyCode === 13 || e.type === 'blur') {
    if (page.value.value) {
      if (parseInt(page.value.value) > attrs.total / attrs['page-size']) {
        inputNumber.value = Math.ceil(attrs.total / attrs['page-size']);
      } else if (!inputNumber.value || inputNumber.value < 1) {
        inputNumber.value = 1;
      } else {
        inputNumber.value = parseInt(page.value.value);
      }
    } else {
      inputNumber.value = 1;
    }

    emit('jump-page', inputNumber.value);

    proxy?.$forceUpdate();
    document.documentElement.scrollTop = 0;
  }
};

watch(
  () => [attrs['current-page'], attrs.total, attrs['page-size']],
  () => {
    if (attrs['current-page'] > Math.ceil(attrs.total / attrs['page-size'])) {
      inputNumber.value = Math.ceil(attrs.total / attrs['page-size']);
      inputNumber.value = inputNumber.value ? inputNumber.value : 1;
      emit('jump-page', inputNumber.value);
    } else {
      inputNumber.value = attrs['current-page'];
    }
  },
  { deep: true }
);
</script>

<template>
  <ElPagination
    v-if="!isMobile"
    class="o-pagination"
    v-bind="attrs"
    :popper-class="classNames"
  >
    <slot></slot>
  </ElPagination>
  <template v-else>
    <div v-if="totalPages > 1" class="pagination-mobile">
      <OIcon
        class="icon-prev"
        :class="attrs['current-page'] === 1 ? 'disable-button' : ''"
      >
        <IconChevronLeft />
      </OIcon>
      <span
        class="prev"
        :class="attrs['current-page'] === 1 ? 'disable-button' : ''"
        @click="turnPage('prev')"
        >{{ i18n.common.PREV }}</span
      >
      <span class="page-number">
        <input
          ref="page"
          :value="inputNumber"
          type="text"
          class="current-page"
          @keypress="jumpPage"
          @blur="jumpPage"
        />
        <span>/{{ Math.ceil(attrs.total / attrs['page-size']) }}</span>
      </span>
      <span
        class="next"
        :class="
          attrs['current-page'] === Math.ceil(attrs.total / attrs['page-size'])
            ? 'disable-button'
            : ''
        "
        @click="turnPage('next')"
        >{{ i18n.common.NEXT }}</span
      >
      <OIcon
        class="icon-next"
        :class="
          attrs['current-page'] === Math.ceil(attrs.total / attrs['page-size'])
            ? 'disable-button'
            : ''
        "
      >
        <IconChevronRight />
      </OIcon>
    </div>
  </template>
</template>

<style lang="scss">
.o-pagination {
  --o-pagination-font-color: var(--o-color-text1);
  --o-pagination-font-color_active: var(--o-color-brand1);
  --o-pagination-bg-color: var(--o-color-text5);
  --o-pagination-bg-color_hover: var(--o-color-brand5);
  --o-pagination-bg-color_selected: var(--o-color-brand5);
  --o-pagination-number-border-color_active: var(--o-color-brand1);

  &.el-pagination {
    justify-content: center;
    @media screen and (max-width: 768px) {
      display: none;
    }
    .el-pagination__sizes {
      margin: 0 var(--o-spacing-h8) 0 0;
    }
    .el-input {
      --el-input-bg-color: var(--o-pagination-bg-color);
      --el-input-text-color: var(--o-pagination-font-color);
    }
    .el-input__wrapper {
      border-radius: 0px;
      box-shadow: none;
      height: 36px;
    }
    .el-pagination__editor {
      justify-content: center !important;
    }
    .el-select {
      --el-select-border-color-hover: none;
      --el-select-input-focus-border-color: none;
      & .el-input .el-select__caret {
        color: var(--o-pagination-font-color);
      }
    }
    .el-select-dropdown__wrap {
      background-color: #000 !important;
    }
    .el-pager li {
      color: var(--o-pagination-font-color);
      background: var(--o-pagination-bg-color);
      border-radius: 0px;
      line-height: 36px;
      height: 36px;
      width: 36px;
      &:hover {
        color: var(--o-color-text2) !important;
        background-color: var(--o-pagination-font-color_active);
      }
    }
    .el-pager li.is-active.number {
      background: var(--o-pagination-font-color_active);
      color: var(--o-color-text2);
      font-weight: 400;
      font-size: var(--o-font-size-text);
    }
    .btn-next,
    .btn-prev {
      width: 36px;
      height: 36px;
      color: var(--o-pagination-font-color);
      border-radius: 0px;
      background: var(--o-pagination-bg-color);
    }
    .btn-prev:disabled {
      background: var(--o-color-text5);
    }
    .btn-next {
      margin-right: var(--o-spacing-h5) !important;
    }
    .btn-next:disabled {
      background: var(--o-color-text5);
    }

    .el-pagination__jump {
      height: 36px;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      line-height: var(--o-line-height-text);
      color: var(--o-color-neutral8);
      border-radius: 0px;
      margin-left: var(--o-spacing-h4);
      .el-input__wrapper {
        flex-grow: 0.273;
      }
    }
  }
}
.o-pagination-popper {
  box-shadow: var(--o-shadow-l3);
  &.el-popper {
    box-shadow: none !important;
    --el-popper-border-radius: none;
    border: none;
    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      color: var(--o-color-text1);

      &:hover {
        color: var(--o-color-brand1);
        background: var(--o-color-bg1);
      }
    }
    .hover {
      color: var(--o-color-brand1);
      background: var(--o-color-bg1);
    }

    .el-select-dropdown__item.selected {
      background-color: var(--o-color-bg1);
    }

    .el-select-dropdown__item.selected {
      font-weight: normal;
      color: var(--o-color-brand1);
    }

    .el-select-dropdown__wrap {
      background-color: var(--o-color-bg2);
    }
  }
}
.pagination-mobile {
  display: none;
  justify-content: center;
  align-items: center;
  font-size: var(--o-font-size-tip);
  .icon-prev {
    margin-right: 8px;
    color: var(--o-color-brand1);
  }
  .page-number {
    margin: 0 28px;
    text-align: center;
    .current-page {
      width: 24px;
      height: 14px;
      text-align: right;
      border: none;
      background-color: transparent;
      color: var(--o-color-brand1);
      &:focus {
        text-align: center;
        outline: 1px solid var(--o-color-brand1);
      }
    }
    span {
      color: var(--o-color-text1);
      display: inline-block;
      width: 16px;
      text-align: left;
    }
  }
  .icon-next {
    margin-left: 8px;
    color: var(--o-color-brand1);
  }
  .next,
  .prev {
    color: var(--o-color-text1);
    line-height: 100%;
    cursor: pointer;
  }
  .disable-button {
    color: var(--o-color-text4);
  }
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
}
</style>
