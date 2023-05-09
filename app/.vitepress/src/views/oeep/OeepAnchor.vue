<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import { useOeep } from '@/stores/oeep';

import _ from 'lodash';

const props = defineProps({
  className: {
    type: String,
    default: 'h2',
  },
});

const route = useRoute();

const activeIndex = ref(0);
const anchorList = ref<HTMLDivElement[]>();

const debounceEvent = _.throttle(goAnchor, 300, {
  trailing: true,
});

function goAnchor() {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const nodeList = document.querySelectorAll(
    props.className
  ) as NodeListOf<HTMLDivElement>;

  const topArr: number[] = [];
  anchorList.value = Array.from(nodeList).filter((item: any) => {
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
  window.addEventListener('scroll', debounceEvent);
});
onUnmounted(() => {
  window.removeEventListener('scroll', debounceEvent);
});
watch(
  () => {
    return route.path;
  },
  (val) => {
    if (!val.includes('oEEP')) {
      useOeep().setMarkDownData(true);
    }
    nextTick(() => {
      goAnchor();
    });
  }
);
watch(
  () => {
    return useOeep().markdownData;
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
        {{ item.innerText.replace(':', '').replace('：', '') }}
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
    background-color: var(--o-color-bg4);
    z-index: 0;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .anchor-link {
    position: relative;
    cursor: pointer;
    display: block !important;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    border-left: 1px solid var(--o-color-bg4);
    z-index: 1;
    &:hover {
      color: var(--o-color-brand1);
    }
    &-inner {
      padding: 8px var(--o-spacing-h6);
    }
  }
  .active-link {
    color: var(--o-color-brand1);
    border-left: 1px solid var(--o-color-brand1);
  }
}
</style>
