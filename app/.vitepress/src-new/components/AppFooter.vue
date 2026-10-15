<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import { OFooter } from '@opendesign-plus/components';

import footerContent from '#content/footer';
import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();
const { lang } = useData();

const content = computed(() => footerContent[lang.value as 'zh' | 'en']);

// yaml 中 __ENV:VITE_XXX__ 占位符对应的环境变量（值由 Vite 构建时注入，dev/prod 域名不同）
const ENV_MAP: Record<string, string> = {
  VITE_MAIN_DOMAIN_URL: import.meta.env.VITE_MAIN_DOMAIN_URL,
  VITE_SERVICE_DATASTAT_URL: import.meta.env.VITE_SERVICE_DATASTAT_URL,
  VITE_SERVICE_SOFTWARE_URL: import.meta.env.VITE_SERVICE_SOFTWARE_URL,
  VITE_SERVICE_DOCS_URL: import.meta.env.VITE_SERVICE_DOCS_URL,
  VITE_SERVICE_FORUM_URL: import.meta.env.VITE_SERVICE_FORUM_URL,
};

const resolveEnv = (url: string) =>
  url.replace(/__ENV:([A-Z0-9_]+)__/g, (_, key: string) => ENV_MAP[key] ?? '');

// 仅处理含变量的板块：quickNav.children.href 替换 __ENV:VITE_XXX__ 占位符
const quickNav = computed(() =>
  content.value.quickNav.map((group) => ({
    ...group,
    children: group.children.map((item) => ({
      ...item,
      href: resolveEnv(item.href),
    })),
  }))
);

// footerOption.children.href 替换 __ENV:VITE_XXX__、copyright 替换 {year}，其余字段原样透传
const footerOption = computed(() => ({
  ...content.value.footerOption,
  copyright: content.value.footerOption.copyright.replace(
    '{year}',
    String(new Date().getFullYear())
  ),
  children: content.value.footerOption.children.map((item) => ({
    ...item,
    href: resolveEnv(item.href),
  })),
}));

const footerBg = computed(() => {
  if (lePadV.value) {
    return content.value.footer_bg_img.mb;
  }
  return content.value.footer_bg_img.pc;
});
</script>

<template>
  <footer id="tour_footer" class="footer">
    <OFooter
      :info="content.info"
      :quick-nav="quickNav"
      :friendship-link="content.friendshipLink"
      :footer-logo="content.footerLogo"
      :footer-option="footerOption"
      :qrcode="content.qrcode"
      :footer-bg-img="footerBg"
    />
  </footer>
</template>

<style lang="scss" scoped>

</style>
