<script lang="ts" setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import { debounce } from 'lodash-es';

import { OIcon } from '@opensig/opendesign';

import IconDown from '~icons/app-new/icon-chevron-down.svg';

const props = defineProps({
  showCollapse: {
    type: Boolean,
    default: false,
  },
  showCollapseMo: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['toggle-click']);
const isDown = ref(false);

props.showCollapseMo ? '' : (isDown.value = true);

const contentHeight = ref('');

const refFilterContent = ref();

const toggle = () => {
  isDown.value = !isDown.value;
  emits('toggle-click', isDown.value);
};

const getFilterContentHeight = () => {
  nextTick(
    () =>
      (contentHeight.value =
        refFilterContent.value?.children[0]?.offsetHeight + 'px')
  );
};

const debounceCheckTagsVisibility = debounce(getFilterContentHeight, 500);

onMounted(() => {
  if (props.showCollapse) {
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
    <div
      class="tag-filter-box"
      ref="refFilterContent"
      :class="{
        max: isDown && showCollapse,
        'tag-filter-extend': showCollapse || showCollapseMo,
        'mo-max': isDown && showCollapseMo,
      }"
    >
      <slot />
    </div>
    <div
      v-if="showCollapse || showCollapseMo"
      class="collapse"
      :class="{ 'show-more': !isDown }"
      @click="toggle"
    >
      {{ isDown ? $t('common.expand') : $t('common.collapse') }}
      <OIcon class="icon" :class="{ active: !isDown }">
        <IconDown />
      </OIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-filter {
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  background-color: var(--o-color-fill2);

  .collapse {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: fit-content;
    height: fit-content;
    @include text1;
    min-width: 60px;
    .icon {
      transition: all 0.3s;
      font-size: var(--o-icon_size-m);
      &.active {
        transform: rotate(180deg);
      }
    }
  }
  .show-more {
    height: 100%;
    align-items: flex-end;
  }
  .tag-filter-box {
    &.max {
      height: 38px;
      overflow: hidden;
    }
    &.mo-max {
      height: 120px;
      overflow: hidden;
    }
  }
  .tag-filter-extend {
    height: v-bind('contentHeight');
    transition: height 0.3s ease;
  }
}
</style>
