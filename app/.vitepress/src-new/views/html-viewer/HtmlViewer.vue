<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, nextTick, ref } from 'vue';
import { useData } from 'vitepress';
import { OButton, OMenu, OSubMenu, OMenuItem } from '@opensig/opendesign';

import { useLocale } from '~@/composables/useLocale';
import type { TocItem } from '~@/utils/cleanHtml';
import logoLight from '~@/assets/category/header/logo.svg';
import logoDark from '~@/assets/category/header/logo_dark.svg';

const { t } = useLocale();
const { frontmatter } = useData();

const isDark = ref(false);
let themeObserver: MutationObserver | null = null;

onMounted(() => {
  const el = document.documentElement;
  const updateTheme = () => {
    isDark.value = el.getAttribute('data-o-theme')?.includes('dark') ?? false;
  };
  updateTheme();
  themeObserver = new MutationObserver(updateTheme);
  themeObserver.observe(el, { attributes: true, attributeFilter: ['data-o-theme'] });
});

const logoUrl = computed(() => (isDark.value ? logoDark : logoLight));

const props = defineProps<{
  htmlContent: { content: string; toc: TocItem[] };
  pdfPath?: string;
}>();

const resolvedPdfPath = computed(
  () => props.pdfPath || (frontmatter.value.pdfPath as string) || ''
);

const resolvedContent = computed(() => props.htmlContent.content);
const toc = computed<TocItem[]>(() => props.htmlContent.toc || []);

const activeId = ref('');
const expandedIds = ref<string[]>([]);
let observer: IntersectionObserver | null = null;
let scrollSpyPaused = false;
let scrollSpyResumeTimer: number | null = null;
const SCROLL_SPY_RESUME_DELAY = 200;

/**
 * 点击 TOC 项后直接跳转（非平滑滚动）到对应标题位置。
 * 跳转前暂停 ScrollSpy，跳转后延迟 SCROLL_SPY_RESUME_DELAY ms 再解锁，
 * 确保 IntersectionObserver 在跳转期间积攒的回调不会逐个高亮途经标题。
 */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const viewer = document.querySelector('.html-viewer');
    const headerHeight = viewer
      ? parseInt(getComputedStyle(viewer).getPropertyValue('--viewer-header-height')) || 72
      : 72;
    const targetY = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
    scrollSpyPaused = true;
    document.documentElement.scrollTop = targetY;
    if (scrollSpyResumeTimer !== null) clearTimeout(scrollSpyResumeTimer);
    scrollSpyResumeTimer = window.setTimeout(() => {
      scrollSpyPaused = false;
      scrollSpyResumeTimer = null;
    }, SCROLL_SPY_RESUME_DELAY);
  }
  highlightToc(id);
}

function highlightToc(id: string) {
  activeId.value = id;
  const parent = toc.value.find((h) => h.children?.some((c) => c.id === id));
  const expandId = parent
    ? parent.id
    : toc.value.find((h) => h.id === id && h.children?.length)?.id ?? '';
  if (expandId && !expandedIds.value.includes(expandId)) {
    expandedIds.value = [...expandedIds.value, expandId];
  }
}

function setupScrollSpy() {
  const headings = document.querySelectorAll<HTMLElement>('.viewer-body :is(h2, h3)[id]');
  if (!headings.length) return;
  observer = new IntersectionObserver(
    (entries) => {
      if (scrollSpyPaused) return;
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) {
        const id = visible[0].target.id;
        if (id) highlightToc(id);
      }
    },
    { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
  );
  headings.forEach((h) => observer!.observe(h));
}

onMounted(() => {
  nextTick(() => setupScrollSpy());
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  themeObserver = null;
  if (scrollSpyResumeTimer !== null) clearTimeout(scrollSpyResumeTimer);
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <div class="html-viewer">
    <div class="viewer-header">
      <div class="viewer-header-content">
        <img :src="logoUrl" class="viewer-logo" alt="openEuler" />
        <span class="viewer-notice">{{ t('showcase.htmlViewerNotice') }}</span>
        <OButton
          v-if="resolvedPdfPath"
          :href="resolvedPdfPath"
          color="primary"
          variant="solid"
          size="small"
          round="pill"
          target="_blank"
          rel="noopener noreferrer"
          class="download-btn"
        >
          {{ t('showcase.downloadPaperPdf') }}
        </OButton>
      </div>
    </div>
    <div class="viewer-content">
      <OMenu
        v-if="toc.length"
        v-model="activeId"
        v-model:expanded="expandedIds"
        class="viewer-toc"
        arrow-position="left"
        @change="scrollToId"
      >
        <template v-for="h in toc" :key="h.id">
          <OSubMenu v-if="h.children?.length" :value="h.id">
            <template #title>{{ h.text }}</template>
            <OMenuItem
              v-for="child in h.children"
              :key="child.id"
              :value="child.id"
            >{{ child.text }}</OMenuItem>
          </OSubMenu>
          <OMenuItem v-else :value="h.id">{{ h.text }}</OMenuItem>
        </template>
      </OMenu>
      <article class="viewer-body" v-html="resolvedContent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.html-viewer {
  --viewer-header-height: 72px;
  position: relative;

  @include respond('<=laptop_s') {
    --viewer-header-height: 64px;
  }

  @include respond('<=pad') {
    --viewer-header-height: 68px;
  }
}

.viewer-header {
  --header-content-max-width: 1488px;
  --header-content-padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  min-height: var(--viewer-header-height);
  background-color: var(--o-color-fill2);
  box-shadow: var(--o-shadow-1);
  backdrop-filter: blur(5px);

  @include respond('<=laptop') {
    --header-content-max-width: 100%;
    --header-content-padding: 64px;
  }

  @include respond('<=laptop_s') {
    --header-content-padding: 40px;
  }

  @include respond('<=pad') {
    --header-content-padding: 32px;
  }
}

.viewer-header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: var(--viewer-header-height);
  max-width: var(--header-content-max-width);
  margin: 0 auto;
  padding: 0 var(--header-content-padding);
}

.viewer-logo {
  height: 32px;
  width: auto;
  flex-shrink: 0;
  margin-right: var(--o-gap-5);

  @include respond('<=pad_v') {
    display: none;
  }
}

.viewer-notice {
  flex: 1;
  font-size: 14px;
  color: var(--o-color-info2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include respond('<=pad') {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}

.download-btn {
  flex-shrink: 0;
  margin-left: var(--o-gap-4);
}

.viewer-content {
  --content-max-width: 1488px;
  --toc-width: 200px;
  position: relative;
  margin-top: calc(var(--viewer-header-height) + 20px);
  display: flex;
  gap: var(--o-gap-5);
  padding-left: 40px;
  padding-right: 40px;

  @include respond('<=pad') {
    display: block;
    padding-left: 16px;
    padding-right: 16px;
  }
}

.viewer-toc {
  position: sticky;
  top: calc(var(--viewer-header-height) + 20px);
  align-self: flex-start;
  flex-shrink: 0;
  width: var(--toc-width);
  max-height: calc(100vh - var(--viewer-header-height) - 40px);
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  word-break: break-word;
  --menu-width: 100%;
  --menu-bg-color: transparent;
  --menu-base-indent: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  @include respond('>pc') {
    position: fixed;
    left: max(0px, calc(50vw - var(--content-max-width) / 2 - var(--o-gap-5) - var(--toc-width)));
  }

  @include respond('<=pad') {
    display: none;
  }
}

.viewer-body {
  flex: 1;
  min-width: 0;
  max-width: var(--content-max-width);
  padding: 40px 40px;

  @include respond('>pc') {
    margin: 0 auto;
  }
  background-color: var(--o-color-fill2);
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;
  line-height: var(--doc-line-height, 1.8);
  color: var(--o-color-info1);
  overflow-x: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-radius: var(--o-radius-xs);

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    text-indent: 0;
    margin-left: 0;
    scroll-margin-top: calc(var(--viewer-header-height) + 20px);
  }

  :deep(h1) {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 2.5rem 0 2rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid var(--o-color-primary1);
    line-height: 1.4;
  }

  :deep(h2) {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-size: 22px;
    font-weight: bold;
    color: var(--o-color-primary1);
    margin: 2.2rem 0 1rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid var(--o-color-control4);
    line-height: 1.4;
  }

  :deep(h3) {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: var(--o-color-info1);
    margin: 1.8rem 0 0.8rem;
    line-height: 1.5;
  }

  :deep(h4) {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: var(--o-color-info1);
    margin: 1.5rem 0 0.6rem;
    line-height: 1.5;
  }

  :deep(h5) {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-size: 17px;
    font-weight: bold;
    color: var(--o-color-info1);
    margin: 1.2rem 0 0.5rem;
    line-height: 1.5;
  }

  :deep(h6) {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: var(--o-color-info2);
    margin: 1rem 0 0.4rem;
    line-height: 1.5;
  }

  :deep(p) {
    @include text1;
    line-height: var(--doc-line-height, 1.8);
    text-indent: 2em;
    margin: 0;
    text-align: justify;
  }

  :deep(.table-wrap) {
    overflow-x: auto;
    margin: 1rem 0;
    -webkit-overflow-scrolling: touch;
  }

  :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem auto;
    font-size: 13px;
  }

  :deep(th),
  :deep(td) {
    border: 1px solid var(--o-color-control1);
    padding: 6px 10px;
    text-align: left;
    vertical-align: top;
  }

  :deep(th) {
    background-color: var(--o-color-fill2);
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
    font-weight: bold;
    text-align: center;
  }

  :deep(tr:nth-child(even)) {
    background-color: var(--o-color-fill3);
  }

  :deep(td p),
  :deep(th p) {
    font-size: 13px;
    text-indent: 0;
    margin: 0.2rem 0;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 2em;
    margin: 0.5rem 0;
  }

  :deep(li) {
    margin-bottom: 0.3rem;
  }

  :deep(li p) {
    text-indent: 0;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem auto;
    background-color: var(--o-color-white);
    padding: 1px;
  }

  :deep(code) {
    font-family: var(--doc-font-mono, 'Consolas', 'Courier New', monospace);
    background: var(--o-color-fill3);
    padding: 1px 4px;
    border-radius: 2px;
    font-size: 0.9em;
  }

  :deep(pre) {
    font-family: var(--doc-font-mono, 'Consolas', 'Courier New', monospace);
    background: var(--o-color-fill3);
    padding: 12px 16px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.5;
    margin: 0.8rem 0;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
  }

  :deep(pre code) {
    background: none;
    padding: 0;
  }

  :deep(blockquote) {
    border-left: 3px solid var(--o-color-primary1);
    margin: 0.8rem 0;
    padding: 0.5rem 1rem;
    color: var(--o-color-info2);
    background: var(--o-color-fill2);
  }

  :deep(blockquote p) {
    text-indent: 0;
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid var(--o-color-control4);
    margin: 1.5rem 0;
  }

  @include respond('<=pad_v') {
    padding: 24px 16px;
  }
}
</style>
