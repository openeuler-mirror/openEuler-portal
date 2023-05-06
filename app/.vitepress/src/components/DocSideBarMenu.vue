<script lang="ts" setup>
import { computed, ref } from 'vue';
import IconArrowTraingleRight from '~icons/app/icon-arrow-traingle-right.svg';

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
  activeId: {
    type: String,
    default: '',
  },
});

const isActive = computed(() => {
  return props.info.children.some((item: any) => {
    return item.link === props.activeId;
  });
});

const isOpen = ref(isActive.value);

const isOpenSecond = ref(false);

const emit = defineEmits(['item-click']);

const toggleVisible = (flag: boolean | undefined) => {
  if (flag === undefined) {
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = flag;
  }
};
const toggleVisibleSecond = (flag: boolean | undefined) => {
  if (flag === undefined) {
    isOpenSecond.value = !isOpenSecond.value;
  } else {
    isOpenSecond.value = flag;
  }
};
// 导航点击事件
const clickMenuItem = (id: string) => {
  emit('item-click', id);
};
</script>

<template>
  <div class="sidebar-menu" :class="{ open: isOpen }">
    <div
      class="menu-title"
      :class="{ open: isOpen, active: isActive }"
      @click="toggleVisible(!isOpen)"
    >
      {{ info.label }}
      <OIcon class="menu-title-icon"> <IconArrowTraingleRight /></OIcon>
    </div>
    <transition name="menu">
      <ul class="menu-list">
        <li
          v-for="item in info.children"
          :key="item.link"
          class="menu-item"
          :class="{ active: activeId.includes(item.link), open: isOpenSecond }"
          @click.stop="clickMenuItem(item.link)"
        >
          <div
            @click="item.children ? toggleVisibleSecond(!isOpenSecond) : ''"
            :class="{
              open: isOpenSecond,
              active: isActive,
              secondary: item.children,
            }"
          >
            {{ item.label }}
            <OIcon class="menu-title-icon" v-if="item.children">
              <IconArrowTraingleRight
            /></OIcon>
          </div>

          <ul class="menu-list">
            <li
              v-for="subItem in item.children"
              :key="subItem.link"
              class="menu-item"
              :class="{ active: activeId[1] === subItem.link }"
              @click.stop="clickMenuItem(subItem.link)"
            >
              {{ subItem.label }}
            </li>
          </ul>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-menu {
  position: relative;
  color: var(--o-color-white);

  .menu-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    font-size: var(--o-font-size-text);
    height: 70px;
    line-height: 70px;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 0;
      width: calc(100% - 80px);
      height: 1px;
      // background-color: #e5e5e5;
      background-color: #ffffff;
      opacity: 0.1;
      content: '';
    }

    &-icon {
      font-size: var(--o-font-size-h5);
      transform: rotate(0);
      transition: 0.3s transform cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:hover {
      color: var(--o-color-yellow5);
    }

    &.active {
      color: var(--o-color-yellow5);
    }

    &.open {
      .menu-title-icon {
        transform: rotate(90deg);
      }
    }
  }

  .menu-list {
    overflow-y: hidden;
    transform-origin: top;
    transition: all 0.3s;
    background-color: var(--o-color-kleinblue4);
    padding: 0 40px;
    transform: scaleY(0);

    .menu-item {
      cursor: pointer;
      height: min-content;
      // overflow-y: hidden;
      align-items: center;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      .secondary {
        display: flex;
        justify-content: space-between;
      }
      .menu-list {
        position: absolute;
        z-index: -1;
        padding: 0 16px;
      }

      &:first-child {
        margin-top: 32px;
      }

      &:last-child {
        margin-bottom: 32px;
      }

      & + .menu-item {
        margin-top: var(--o-spacing-h4);
      }

      &:hover {
        color: var(--o-color-yellow5);
      }

      &.active {
        color: var(--o-color-yellow5);
      }
    }
    .open {
      .menu-list {
        position: relative;

        transform: scaleY(1);
      }
      .menu-title-icon {
        transform: rotate(90deg);
      }
    }
  }
  &.open {
    & > .menu-list {
      transform: scaleY(1);
    }
  }
}
</style>
