<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

import { useThrottleFn } from '@vueuse/core';

const props = defineProps({
  className: {
    type: String,
    default: 'h2',
  },
});

const route = useRoute();

const activeIndex = ref(0);
const anchorList = ref();

const throttleFnEvent = useThrottleFn(goAnchor, 300, true);

function goAnchor() {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  anchorList.value = document.querySelectorAll(props.className);

  const topArr: number[] = [];
  anchorList.value = Array.from(anchorList.value).filter((item: any) => {
    return item.className !== 'for-seo'
      ? topArr.push(item.offsetTop + item.clientHeight)
      : '';
  });
  for (let i = 0; i < topArr.length; i++) {
    if (scrollTop - 100 <= topArr[i]) {
      activeIndex.value = i;
      break;
    }
  }
}

onMounted(() => {
  goAnchor();
  window.addEventListener('scroll', throttleFnEvent);
});
onUnmounted(() => {
  window.removeEventListener('scroll', throttleFnEvent);
});
watch(
  () => {
    return route.path;
  },
  () => {
    nextTick(() => {
      goAnchor();
    });
  }
);
</script>
<template>
  <div class="md-anchor">
    <a
      v-for="(item, index) in anchorList"
      :key="item.id"
      :href="`#${item.id}`"
      :class="{ 'active-link': index === activeIndex }"
      class="anchor-link"
    >
      <div class="anchor-link-inner">
        {{
          item.id.split('-').splice(1, item.id.split('-').length).join('-') ||
          item.id
        }}
      </div>
    </a>
  </div>
</template>

<style lang="scss">
.md-anchor {
  position: fixed;
  top: calc(10% + 80px);
  right: 0;
  width: 200px;
  z-index: 10;
  &::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 100%;
    left: 0;
    bottom: -50%;
    background-color: var(--e-color-bg4);
    z-index: 0;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .anchor-link {
    position: relative;
    cursor: pointer;
    display: block !important;
    color: var(--e-color-text4);
    line-height: var(--e-line-height-text);
    font-size: var(--e-font-size-text);
    border-left: 1px solid var(--e-color-bg4);
    z-index: 1;
    &:hover {
      color: var(--e-color-brand1);
    }
    &-inner {
      padding: 8px var(--e-spacing-h6);
    }
  }
  .active-link {
    color: var(--e-color-brand1);
    border-left: 1px solid var(--e-color-brand1);
  }
}
</style>
