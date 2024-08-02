<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useData, useRouter } from 'vitepress';

import OrgDocAnchor from '@/views/organization/OrgDocAnchor.vue';

const router = useRouter();
const { frontmatter } = useData();

const routeList = router.route.path.split('/');
const activeId = ref(routeList[routeList.length - 2]);

watch(
  () => {
    const routeList = router.route.path.split('/');
    return routeList[routeList.length - 2];
  },
  (val) => {
    activeId.value = val;
  }
);

const isCustomLayout = computed(() => {
  return frontmatter.value['custom-layout'];
});

// 控制右侧锚点导航隐藏
const isHidden = computed(() => {
  return frontmatter.value['anchor'];
});
</script>

<template>
  <!-- 内容区域 -->
  <div class="about-wrapper" :class="{ 'about-markdown': !isCustomLayout }">
    <OrgDocAnchor class="about-anchor" :class="isHidden ? 'is-hidden' : ''" />
    <Content
      class="about-content"
      :class="{ 'custom-layout': isCustomLayout }"
    />
  </div>
</template>

<style lang="scss" scoped>
.about-title {
  font-size: var(--e-font-size-h5);
  line-height: var(--e-line-height-h5);
}

.about-wrapper {
  height: 100%;
  padding: 64px 120px;
  margin-left: 300px;
  background-color: var(--e-color-bg1);

  @media screen and (max-width: 1280px) {
    padding: 64px 60px;
  }

  @media screen and (max-width: 1100px) {
    margin-left: 0px;
    padding: 16px 16px 40px 16px;
  }

  @media (max-width: 768px) {
    padding: var(--e-spacing-h5);
    margin-top: var(--e-spacing-h5);
    margin-bottom: var(--e-spacing-h2);
  }

  .about-anchor {
    // right: 120px;
    // @media screen and (max-width: 1280px) {
    //   right: 0;
    // }
  }
  .is-hidden {
    display: none;
  }
  .about-content {
    max-width: 1380px;
    padding-right: 200px;
    margin: 0 auto;

    @media screen and (max-width: 1100px) {
      padding-right: 0;
    }
    @media screen and (max-width: 768px) {
      background-color: var(--e-color-bg2);
      padding: 24px 16px 16px 16px;
      box-shadow: var(--e-shadow-l1);
    }

    &.custom-layout {
      @media screen and (min-width: 1720px) {
        padding-right: 0;
      }

      @media screen and (max-width: 768px) {
        background-color: var(--e-color-bg1);
        box-shadow: var(--e-shadow-l1);
        padding: 0;
        box-shadow: none;
      }
    }
  }
}
</style>

<style lang="scss">
/**
 *  关于我们---md样式
 **/

.about-markdown {
  --e-color-table: var(--e-color-border2); // 表格边框

  ol,
  ul {
    list-style: inherit;
  }
  a {
    word-break: break-all;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--e-color-text1);
    font-weight: bold;

    a {
      display: none;
    }
  }

  h1 {
    margin-top: 0;
    text-align: center;
  }

  hr {
    margin: var(--e-spacing-h1) 0;
    border: none;
    height: 1px;
    background-color: var(--e-color-division1);
    @media screen and (max-width: 768px) {
      margin: var(--e-spacing-h4) 0;
    }
  }

  h1 {
    margin-bottom: var(--e-spacing-h2);
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      margin: 0 0 var(--e-spacing-h4);
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
    }
  }

  h2 {
    margin-top: var(--e-spacing-h2);
    margin-bottom: var(--e-spacing-h3);
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    @media screen and (max-width: 768px) {
      margin: var(--e-spacing-h4) 0 var(--e-spacing-h5);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }

  h3 {
    margin-top: var(--e-spacing-h3);
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    @media screen and (max-width: 768px) {
      margin: var(--e-spacing-h6) 0;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
  }

  h4 {
    margin-top: var(--e-spacing-h4);
    font-size: var(--e-font-size-h8);
    line-height: var(--e-font-size-h8);
    @media screen and (max-width: 768px) {
      margin-top: var(--e-spacing-h6);
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }

  h5 {
    margin-top: var(--e-spacing-h5);
    font-size: var(--e-font-size-text);
    line-height: var(--e-font-size-text);
  }

  p,
  ul,
  ol {
    margin-top: var(--e-spacing-h8);
    margin-bottom: var(--e-spacing-h8);
    font-size: var(--e-font-size-text);
    font-weight: normal;
    color: var(--e-color-text4);
    line-height: var(--e-line-height-text);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }

  ul,
  ol {
    padding-left: 1em;

    li {
      margin-top: 0.25em;
      &::marker {
        color: var(--e-color-text4);
      }
    }
  }

  table {
    width: 100%;
    font-size: var(--e-font-size-text);
    table-layout: fixed;
    word-break: break-word;
    border-collapse: collapse;
    padding: 0;

    tr {
      height: 36px;
      color: var(--e-color-text4);
      border-bottom: 1px solid var(--e-color-table);

      th {
        font-size: var(--e-font-size-h8);
        background-color: var(--e-color-bg4);
        color: var(--e-color-text1);
      }
    }
  }

  strong {
    color: var(--e-color-text1);
    font-weight: bold;
  }

  img {
    display: inline-block;
    max-width: 100%;
  }

  a[href^='#'] {
    display: none;
  }
  div[class*='language-'] {
    position: relative;
    margin: 8px 0;
    background-color: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      background-color: var(--e-color-bg1);
    }
  }
  [class*='language-'] code,
  [class*='language-'] pre {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: var(--e-color-bg2);
    }

    &::-webkit-scrollbar {
      height: 8px;
      background-color: var(--e-color-bg2);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: var(--e-color-bg4);
    }
  }

  [class*='language-'] pre {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 24px 32px;
    background: 0 0;
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      padding: 12px 24px;
    }
  }

  [class*='language-'] code {
    padding: 0;
    line-height: var(--e-line-height-text);
    font-size: var(--e-font-size-text);
    color: var(--e-color-text1);
  }
}

.about-content {
  & > *:first-child {
    & > *:first-child {
      margin-top: 0 !important;
    }
  }
  .update-time {
    text-align: center;
    margin-top: -40px;
    @media screen and (max-width: 768px) {
      margin-top: -20px;
    }
  }
  .more-info {
    display: block;
    font-weight: normal;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
}

.dark .about-markdown img {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>
