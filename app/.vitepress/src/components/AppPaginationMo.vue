<script setup lang="ts">
import { toRefs, ref, getCurrentInstance } from 'vue';
import { useI18n } from '@/i18n';

import IconChevronLeft from '~icons/app/icon-chevron-left.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const { ctx } = getCurrentInstance() as any;
const props = defineProps({
  // 当前页
  currentPage: {
    type: Number,
    default: 0,
  },
  // 总页数
  totalPage: {
    type: Number,
    default: 0,
  },
});
const page: any = ref(null);
const { currentPage, totalPage } = toRefs(props);
const inputNumber = ref(1);
const emit = defineEmits(['turn-page', 'jump-page']);
// 将翻页时间传递给父组件
const turnPage = (option: string) => {
  emit('turn-page', option);
  document.documentElement.scrollTop = 0;
};
// 写在父组件内的上下页翻页事件参考
// function turnPage(option: string) {
//   if (option === 'prev' && currentPage.value > 1) {
//     currentPage.value = currentPage.value - 1;
//   } else if (option === 'next' && currentPage.value < totalPage.value) {
//     currentPage.value = currentPage.value + 1;
//   }
// }
function jumpPage(e: any) {
  if (e.keyCode === 13 || e.type === 'blur') {
    if (page.value.value) {
      inputNumber.value = parseInt(page.value.value);
      if (!inputNumber.value || inputNumber.value < 1) {
        inputNumber.value = 1;
      } else if (inputNumber.value > totalPage.value) {
        inputNumber.value = totalPage.value;
      }
    } else {
      inputNumber.value = 1;
    }
    emit('jump-page', inputNumber.value);
    page.value.blur();
    ctx.$forceUpdate();
  }
}
// 写在父组件内的移动端跳转翻页事件参考
// function jumpPage(page: number) {
// currentPage.value = page
// }
</script>

<template>
  <div class="pagination-mobile">
    <OIcon class="icon-prev" :class="currentPage === 1 ? 'disable-button' : ''">
      <IconChevronLeft />
    </OIcon>
    <span
      class="prev"
      :class="currentPage === 1 ? 'disable-button' : ''"
      @click="turnPage('prev')"
      >{{ i18n.common.PREV }}</span
    >
    <span class="page-number">
      <input
        ref="page"
        :value="currentPage"
        type="text"
        class="current-page"
        @keypress="jumpPage"
        @blur="jumpPage"
      />
      <!-- <span>{{ currentPage }}</span> -->
      <span>/{{ totalPage }}</span>
    </span>
    <span
      class="next"
      :class="currentPage === totalPage ? 'disable-button' : ''"
      @click="turnPage('next')"
      >{{ i18n.common.NEXT }}</span
    >
    <OIcon
      class="icon-next"
      :class="currentPage === totalPage ? 'disable-button' : ''"
    >
      <IconChevronRight />
    </OIcon>
  </div>
</template>

<style scoped lang="scss">
.pagination-mobile {
  display: none;
  justify-content: center;
  align-items: center;
  font-size: var(--e-font-size-tip);
  .icon-prev {
    margin-right: 8px;
    color: var(--e-color-brand1);
  }
  .page-number {
    margin: 0 28px;
    text-align: center;
    .current-page {
      width: 16px;
      height: 14px;
      text-align: right;
      border: none;
      background-color: transparent;
      color: var(--e-color-brand1);
      &:focus {
        text-align: center;
        outline: 1px solid var(--e-color-brand1);
      }
    }
    span {
      color: var(--e-color-text1);
      display: inline-block;
      width: 16px;
      text-align: left;
    }
  }
  .icon-next {
    margin-left: 8px;
    color: var(--e-color-brand1);
  }
  .next,
  .prev {
    color: var(--e-color-text1);
    line-height: 100%;
    cursor: pointer;
  }
  .disable-button {
    color: var(--e-color-text4);
  }
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
}
</style>
