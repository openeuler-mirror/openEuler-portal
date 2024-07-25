<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

import { OScroller } from '@opensig/opendesign';

import _ from 'lodash';

const props = defineProps({
  className: {
    type: String,
    default: 'h2',
  },
  anchorTitle: {
    type: String,
    default: '',
  },
});

const route = useRoute();

const activeIndex = ref(0);
const anchorList = ref();

const debounceEvent = _.throttle(goAnchor, 300, {
  trailing: true,
});

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
    if (scrollTop <= topArr[i]) {
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
  () => {
    nextTick(() => {
      goAnchor();
    });
  }
);
</script>
<template>
  <div class="faq-anchor-box">
    <div class="title">
      {{ anchorTitle }}
    </div>
    <div class="faq-anchor">
      <a
        v-for="(item, index) in anchorList"
        :key="item.id"
        :href="`#${item.id}`"
        :class="{ 'active-link': index === activeIndex }"
        class="anchor-link"
      >
        <div class="anchor-link-inner" :title="item.innerText">
          {{ item.innerText }}
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  line-height: var(--o-line-height-h7);
  font-size: var(--o-font-size-h7);
  font-weight: 500;
  color: var(--o-color-text1);
}

.o-scroller {
  display: flex;
  position: relative;
  :deep(.o-scroller-container) {
    flex: 1;
    overflow-y: auto;
  }
}

.faq-anchor-box {
  height: fit-content;
  max-height: calc(100vh - 112px - 32px);

  margin-bottom: 32px;
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.faq-anchor {
  margin-top: 24px;
  width: 200px;
  z-index: 10;
  max-height: calc(100vh - 112px - 32px - 50px);
  overflow-y: auto;
  @include scrollbar;
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    width: 3px;
    background: rgba(0, 0, 0, 0.25);
  }
  .anchor-link {
    margin-left: 6px;
    position: relative;
    cursor: pointer;
    display: block !important;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h8);
    font-size: var(--o-font-size-h8);
    z-index: 1;
    padding: 8px 4px;
    border-radius: 8px;
    &::before {
      position: absolute;
      content: '';
      width: 2px;
      top: 0;
      height: 100%;
      left: -6px;
      background-color: var(--o-color-bg4);
      z-index: 1;
    }
    &:hover {
      color: var(--o-color-link2);
    }
    &-inner {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
  .active-link {
    color: var(--o-color-brand1);
    font-weight: 500;
    &:hover {
      color: var(--o-color-brand1);
    }
    &::after {
      position: absolute;
      content: '';
      width: 2px;
      height: 16px;
      top: 50%;
      transform: translateY(-50%);
      left: -6px;
      background-color: var(--o-color-brand1);
      z-index: 1;
      border-radius: 1px;
    }
  }
}
.dark {
  .faq-anchor {
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
    }
    .active-link {
      &:hover {
        color: var(--o-color-brand1);
      }
    }
  }
}
</style>
