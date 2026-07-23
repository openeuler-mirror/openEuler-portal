<script lang="ts" setup>
import { onMounted, onUnmounted, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vitepress';

import { getUrlParam } from '@/shared/utils';
import { useOeep } from '@/stores/oeep';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import MarkdownRender from '@/components/MarkdownRender.vue';
import OeepAnchor from './OeepAnchor.vue';

const router = useRouter();

const CANONICAL_OEEP_MAP: Record<string, string> = {
  'oEEP-0025': '/zh/community/ai-coding-assistants/',
};

const canonicalId = 'oeep-canonical-link';

function updateCanonical() {
  const name = getUrlParam('name') || '';
  const key = Object.keys(CANONICAL_OEEP_MAP).find((k) => name.includes(k));
  const existing = document.getElementById(canonicalId);
  if (!key) {
    if (existing) existing.remove();
    return;
  }
  const href = `${window.location.origin}${CANONICAL_OEEP_MAP[key]}`;
  if (existing) {
    existing.setAttribute('href', href);
  } else {
    const link = document.createElement('link');
    link.id = canonicalId;
    link.rel = 'canonical';
    link.href = href;
    document.head.appendChild(link);
  }
}

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
  nextTick(() => {
    useOeep().setMarkDownData();
    updateCanonical();
  });
}

// fix 线上watch 不触发问题
window.onpopstate = function () {
  nextTick(() => {
    useOeep().setMarkDownData();
    updateCanonical();
  });
};

const breadTitle = () => {
  const arr = decodeURI(getUrlParam('name'))?.split(' ');
  const text = arr.slice(1).join(' ');

  return text;
};

onMounted(() => {
  if (!getUrlParam('name')) {
    router.go('/zh/oEEP/?name=oEEP-0000%20oEEP%20%20索引');
    return;
  }
  useOeep().setMarkDownData();
  updateCanonical();
  nextTick(() => {
    openSelf();
  });
});

onUnmounted(() => {
  const existing = document.getElementById(canonicalId);
  if (existing) existing.remove();
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
      :bread2="breadTitle()"
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
  overflow-x: auto;
  @media screen and (max-width: 1520px) {
    width: calc(100% - 32px);
  }
  :deep(table) {
    table-layout: auto;
    th,
    td {
      padding-right: 32px;
      max-width: 30%;
      min-width: 144px;
      text-align: left !important;
      @media screen and (max-width: 768px) {
        padding: 0 4px;
      }
    }
    tr {
      td {
        &:nth-child(4) {
          white-space: pre-wrap;
        }
        &:nth-child(5) {
          min-width: 150px;
        }
      }
    }
  }
}
</style>
