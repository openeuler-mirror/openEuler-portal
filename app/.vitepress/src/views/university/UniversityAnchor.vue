<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  navRef: {
    type: Array,
    default: () => {
      return [];
    },
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});
const navList = computed(() => {
  const titleList: any = [];
  props.navRef.forEach((item: any) => {
    if (item && item.id) {
      titleList.push(item.id);
    }
  });
  return titleList;
});
</script>

<template>
  <ul class="nav-right">
    <li v-for="(item, index) in navList" :key="item">
      <a :href="'#' + item" :class="activeIndex === index ? 'active' : ''">{{
        item
      }}</a>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.nav-right {
  position: fixed;
  top: calc(10% + 80px);
  right: 0;
  width: 200px;
  z-index: 10;
  @media screen and (max-width: 1880px) {
    display: none;
  }
  a {
    position: relative;
    cursor: pointer;
    display: block !important;
    color: var(--e-color-text4);
    line-height: var(--e-line-height-text);
    font-size: var(--e-font-size-text);
    border-left: 1px solid var(--e-color-bg4);
    z-index: 1;
    padding: 8px 12px;
    &:hover {
      color: var(--e-color-brand1);
    }
  }
  .active {
    color: var(--e-color-brand1);
    // border-left: 1px solid var(--e-color-brand1);
    &::before{
      position: absolute;
      left: -1px;
      top:50%;
      transform: translate(-50%,-50%);
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--e-color-brand1);
    }
  }
}
</style>
