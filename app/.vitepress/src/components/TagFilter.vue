<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { useI18n } from '@/i18n';
import { debounce } from 'lodash-es';

import IconDown from '~icons/app/icon-chevron-down.svg';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const i18n = useI18n();

const emits = defineEmits(['toggle-click']);
const isDown = ref(false);

const contentHeight = ref('');

const refFilterContent = ref();

const toggle = () => {
  isDown.value = !isDown.value;
  emits('toggle-click', isDown.value);
};

const getFilterContentHeight = () => {
  contentHeight.value =
    refFilterContent.value?.children[0]?.offsetHeight + 'px';
};

const debounceCheckTagsVisibility = debounce(getFilterContentHeight, 500);

onMounted(() => {
  if (props.show) {
    getFilterContentHeight();
    window.addEventListener('resize', debounceCheckTagsVisibility);
  }
});
onUnmounted(() => {
  window.removeEventListener('resize', debounceCheckTagsVisibility);
});
</script>

<template>
  <div class="tag-filter">
    <span class="label">{{ label }}</span>
    <div
      class="tag-filter-box"
      ref="refFilterContent"
      :class="{ max: isDown, 'tag-filter-extend': show }"
    >
      <slot />
    </div>
    <div
      v-if="show"
      class="more"
      :class="{ 'active-more': !isDown }"
      @click="toggle"
    >
      {{ isDown ? i18n.common.EXPAND : i18n.common.RETRACT }}
      <OIcon class="icon" :class="{ active: !isDown }">
        <IconDown />
      </OIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-filter {
  display: grid;
  background: var(--e-color-bg2);
  padding: var(--e-spacing-h6) 0;
  grid-template-columns: 80px auto 60px;
  gap: var(--e-spacing-h4);
  position: relative;
  align-items: baseline;
  --e-filter-width: 60px;

  .label {
    font-size: var(--e-font-size-text);
    color: var(--e-color-text4);
    width: var(--e-filter-width);
    text-align: left;
    line-height: var(--e-line-height-h6);
  }
  .active-more {
    top: inherit;
    bottom: var(--e-spacing-h6);
  }
  .more {
    cursor: pointer;
    display: flex;
    height: fit-content;
    align-items: center;
    position: absolute;
    top: var(--e-spacing-h6);
    right: var(--e-spacing-h4);
    color: var(--e-color-brand1);
    font-size: var(--e-font-size-h8);
    .icon {
      transition: all 0.3s;
      font-size: var(--e-font-size-h5);
      &.active {
        transform: rotate(180deg);
      }
    }
  }
  .tag-filter-box {
    &.max {
      height: 38px;
      overflow: hidden;
    }
  }
  .tag-filter-extend {
    height: 381px;
    height: v-bind('contentHeight');
    transition: height 0.3s ease;
  }
}
</style>
