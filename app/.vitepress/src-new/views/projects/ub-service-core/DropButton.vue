<script setup lang="ts">
import { OButton, ODropdown, ODropdownItem, OIcon, OIconChevronDown } from '@opensig/opendesign';
import IconOutlink from '~icons/yuanrong/icon-outlink.svg';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import type { LocaleT } from '~@/@types/type-locale';

const { isPhone } = useScreen();
const options = [
  { label: '中文', value: 'zh' },
  { label: '英文', value: 'en' },
];

withDefaults(
  defineProps<{
    selectable?: boolean;
    outlink?: boolean;
  }>(),
  {
    selectable: true,
    outlink: false,
  }
);

const { locale } = useLocale();
const emits = defineEmits(['click']);
const click = (lang: LocaleT) => {
  emits('click', lang);
};
</script>

<template>
  <ODropdown v-if="selectable" :trigger="isPhone ? 'click' : 'hover'">
    <OButton :variant="isPhone ? 'outline' : 'text'" color="primary" round="pill" @click="clickBtn">
      <slot></slot>
      <OIcon>
        <OIconChevronDown></OIconChevronDown>
      </OIcon>
    </OButton>
    <template #dropdown>
      <ODropdownItem v-for="item in options" :key="item.value" :value="item.value" @click="click(item.value)" class="btn-dropdown-item">
        <span>
          {{ item.label }}
        </span>
        <OIcon v-if="outlink">
          <IconOutlink></IconOutlink>
        </OIcon>
      </ODropdownItem>
    </template>
  </ODropdown>
  <OButton v-else :variant="isPhone ? 'outline' : 'text'" color="primary" round="pill" @click="click(locale)">
    <slot></slot>
  </OButton>
</template>

<style scoped lang="scss">
.o-dropdown {
  width: fit-content;
}
.o-btn {
  padding-left: 0;
  padding-right: 0;
  --btn-min-width: 4em;
  @include text1;
  @include respond('phone') {
    padding: var(--btn-padding);
    @include text2;
  }
  .o-icon {
    margin-left: var(--o-gap-1);
  }
}
</style>
<style lang="scss">
.btn-dropdown-item {
  display: flex;
  align-items: center;
  .o-icon {
    font-size: 20px;
    margin-left: 4px;
  }
  @include respond('phone') {
    @include text2;
    .o-icon {
      font-size: 16px;
    }
  }
}
</style>