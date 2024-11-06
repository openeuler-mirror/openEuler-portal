<script lang="ts" setup>
import { ref } from 'vue';
import { useData } from 'vitepress';

const { lang } = useData();

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
    required: true,
  },
  defaultValue: {
    type: String,
  },
  field: {
    type: String,
    default: '',
    required: true,
  },
});

const emits = defineEmits(['item-change']);
function changeItem(value: any) {
  if (props.defaultValue === value[props.field]) return;
  emits('item-change', value.id || value);
  isMenu.value = false;
}

const isMenu = ref(false);
const showSub = () => {
  isMenu.value = true;
};
const hideSub = () => {
  isMenu.value = false;
};
</script>

<template>
  <div
    class="menu"
    @mouseenter="showSub()"
    @mouseleave="hideSub()"
  >
    <span class="menu-link" :class="{ 'no-state': data.length < 2 }">
      <slot name="title"></slot>
    </span>
    <div v-if="isMenu && data.length > 1" class="menu-list" :class="lang">
      <div
        v-for="item in data"
        :key="item[field]"
        class="item"
        :class="{ active: (defaultValue && defaultValue === item[field]) }"
        @click="changeItem(item)"
      >
        <slot name="item" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: relative;
  height: 100%;

  .menu-link {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    cursor: pointer;
    height: 100%;
    @include tip1;
    &.no-state {
      cursor: default;
    }
  }
  .menu-list {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%);
    background: var(--o-color-fill2);
    cursor: pointer;
    z-index: 999;
    box-shadow: var(--o-shadow-1);
    border-radius: var(--o-radius_control-xs);
    padding: var(--o-gap-1);
    width: 136px;

    &.en {
      width: 158px;
    }
    
    .item {
      @include text1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: var(--o-color-info1);
      border-radius: 2px;
      &:last-child {
        border-bottom: 0 none;
      }

      &.active {
        color: var(--o-color-primary1);
        cursor: default;
      }
      &:hover {
        color: var(--o-color-primary1);
        background: var(--o-color-control2-light);
      }
    }
  }
}
</style>
