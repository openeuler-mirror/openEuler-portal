<script lang="ts" setup>
import { onMounted, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vitepress';

import { getUrlParam } from '@/shared/utils';
import { useOeep } from '@/stores/oeep';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import MarkdownRender from '@/components/MarkdownRender.vue';
import OeepAnchor from './OeepAnchor.vue';

const router = useRouter();

const markdownData = computed(() => {
  return useOeep().markdownData;
});

function openSelf() {
  const links = document.querySelectorAll('.markdown a');
  links.forEach((link) => {
    let href = link.getAttribute('href');
    if (!href?.includes('http') && !href?.includes('#')) {
      // 如果 href 不包含 'http'，则阻止默认行为
      link.setAttribute('href', href?.replace('.md', '') || '');

      link.addEventListener('click', (e) => {
        e.preventDefault();
        href = href?.includes('name=') ? href.replace('.md', '') : href;
        handleGo(href);
      });
    }
  });
}

function handleGo(url: string | null) {
  if (!url) {
    return false;
  }
  router.go(url);
  // fix 线上watch 不触发问题
  nextTick(() => {
    useOeep().setMarkDownData();
  });
}

// fix 线上watch 不触发问题
window.onpopstate = function () {
  nextTick(() => {
    useOeep().setMarkDownData();
  });
};

onMounted(() => {
  useOeep().setMarkDownData();
  nextTick(() => {
    openSelf();
  });
});

watch(
  () => useOeep().statementHtml,
  () => {
    nextTick(() => {
      openSelf();
    });
  }
);
</script>
<template>
  <div v-if="markdownData">
    <BreadCrumbs
      v-show="!getUrlParam('name')?.includes('oEEP-0000')"
      class="bread"
      bread1="oEEP-index"
      :bread2="decodeURI(getUrlParam('name'))?.split(' ')[0]"
      :link1="`/zh/oEEP/?name=oEEP-0000%20oEEP%20%20索引`"
      @click="handleGo(`/zh/oEEP/?name=oEEP-0000%20oEEP%20%20索引`)"
    />
    <MarkdownRender
      class="markdown oeep-markdown"
      :statement="markdownData"
    ></MarkdownRender>
    <OeepAnchor
      class="oeep-anchor"
      :class="getUrlParam('name')?.includes('oEEP-0000') ? 'index-anchor' : ''"
    />
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 500px;
}
.bread {
  padding-top: 40px;
  padding-left: 44px;
  padding-right: 44px;
  max-width: 1504px;
  margin: 0 auto;
  width: calc(100% - 252px);

  @media screen and (max-width: 1520px) {
    width: 100%;
  }
  @media (max-width: 1439px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding-top: 16px;
  }
}
.oeep-anchor {
  top: 180px;
  @media screen and (max-width: 1820px) {
    width: 150px;
  }
  @media screen and (max-width: 1520px) {
    display: none;
  }
}
.index-anchor {
  top: 120px;
}
.oeep-markdown {
  width: calc(100% - 340px);
  @media screen and (max-width: 1520px) {
    width: calc(100% - 32px);
  }
  :deep(table) {
    table-layout: auto;
    th,
    td {
      padding-right: 32px;
      max-width: 30%;
      @media screen and (max-width: 768px) {
        padding: 0 4px;
      }
    }
  }
}
</style>
