# 页脚（Footer）

全站页脚数据。zh/en 双语拆分存储，共用 `images/` 目录。组件 `src-new/components/AppFooter.vue` 通过 `#content/footer` 虚拟模块按 locale 读取。

## 设计要点：结构对齐 OFooter props

yaml 板块与字段名直接采用 OFooter（`@opendesign-plus/components`）的 props 契约，**纯静态板块导入后直接传给 OFooter，零处理**：

| 板块 | 处理方式 |
|------|---------|
| `info` | 直传 `:info` |
| `friendshipLink` | 直传 `:friendship-link` |
| `footerLogo` | 直传 `:footer-logo` |
| `qrcode` | 直传 `:qrcode` |
| `quickNav` | 需替换 `children.href` 中的 `__VITE_XXX__` 占位符后传用 |
| `footerOption` | 需替换 `children.href` 占位符 + `copyright` 中 `{year}` 后传用（其余字段透传） |
| `footer_bg_img` | 组件按屏宽取 `pc`/`mb` 后传 `:footer-bg-img` |

类型声明（`src-new/@types/content/footer.d.ts`）直接复用组件库导出的 `FooterT`（`Omit` 掉 `simple` 与 `footerBgImg`），组件库 props 变更时数据契约自动同步。

## 环境变量占位符

`quickNav` 与 `footerOption.children` 中的 `href` 支持 `__ENV:VAR__` 占位符（如 `__ENV:VITE_MAIN_DOMAIN_URL__/zh/faq/`）：

- **本项目消费**：`AppFooter.vue` 内的 `resolveEnv` 运行时替换为 `import.meta.env` 中对应变量的值
- **JSON 产物**：`scripts/gen-footer.cjs` 构建时读值烙死（先读 `app/.env` 本地基础，再读 `app/.env.production` 部署基线覆盖）

dev/prod 域名不同，见 `app/.env.development` / `app/.env.production`。支持的变量：

| 占位符 | 环境变量 |
|--------|---------|
| `__ENV:VITE_MAIN_DOMAIN_URL__` | 主站域名 |
| `__ENV:VITE_SERVICE_DATASTAT_URL__` | 数据统计平台 |
| `__ENV:VITE_SERVICE_SOFTWARE_URL__` | 软件中心 |
| `__ENV:VITE_SERVICE_DOCS_URL__` | 文档中心 |
| `__ENV:VITE_SERVICE_FORUM_URL__` | 论坛 |

新增环境变量时，在 `AppFooter.vue` 的 `ENV_MAP` 中同步补充映射。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页脚数据 |
| `en.yaml` | 英文页脚数据 |
| `images/` | 页脚图片（zh/en 共用） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `info` | 对象 | 开放原子基金会介绍（页脚顶部文案、logo、链接） |
| `quickNav` | 数组 | 底部导航（按列分组） |
| `qrcode` | 数组 | 右侧二维码（en 为空数组，不展示） |
| `friendshipLink` | 对象 | 友情链接（板块标题 + 链接列表） |
| `footerLogo` | 对象 | openEuler logo 与联系邮箱 |
| `footerOption` | 对象 | 底部声明区（声明链接、许可证、版权、备案） |
| `footer_bg_img` | 对象 | 页脚背景图（PC/移动端） |

## 其他约定

- zh/en 按文件拆分 locale，字段名与 OFooter props 保持一致
- 图片就近存放在 `images/`，yaml 中以 `./images/xxx` 引用（本项目构建时重写为带 hash 的 URL；JSON 产物改写为 `{VITE_MAIN_DOMAIN_URL}/footer/images/xxx` 完整 URL）
- zh/en 共用图片不加后缀
- `copyright` 中 `{year}` 为年份占位符，运行时替换为当前年份（本项目组件替换；JSON 消费方自行替换）
- 不存布局参数，布局由组件控制

## 姊妹项目消费（public/footer JSON）

构建时 `scripts/gen-footer.cjs`（已串入 `pnpm build`，手动执行 `pnpm gen-data`）生成：

- `public/footer/zh.json` / `public/footer/en.json` — 顶层结构与 yaml 一致（不包 wrapper），env 占位符已烙死，图片路径已改写为**完整 URL**（`{VITE_MAIN_DOMAIN_URL}/footer/images/xxx`，姊妹项目直接使用，无需二次拼接）
- `public/footer/images/` — 图片拷贝产物（不进 git）

姊妹项目（文档中心等）拉取方式：

```ts
// 同域：相对路径；独立子域：官网 nginx 反代 /footer/ 或绝对地址 + CORS
const res = await fetch('/footer/zh.json').catch(() => null);
const data = res && res.ok ? await res.json() : null;
// SSG 预渲染期 fetch 不可用属正常：兜底空数据，客户端 hydrate 后再取
```

消费方后处理自行负责：`{year}` 替换、二维码按需过滤（en 站 `qrcode` 为空数组）。

JSON 产物不进 git（`.gitignore` 已排除 `app/.vitepress/public/footer/`），部署依赖构建流程生成——**任何构建命令前必须先执行 gen 脚本**。

## 消费方式

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { OFooter } from '@opendesign-plus/components';

import footerContent from '#content/footer';
import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();
const { lang } = useData();

const content = computed(() => footerContent[lang.value as 'zh' | 'en']);

// yaml 中 __ENV:VITE_XXX__ 占位符对应的环境变量（值由 Vite 构建时注入）
const ENV_MAP: Record<string, string> = {
  VITE_MAIN_DOMAIN_URL: import.meta.env.VITE_MAIN_DOMAIN_URL,
  VITE_SERVICE_DATASTAT_URL: import.meta.env.VITE_SERVICE_DATASTAT_URL,
  VITE_SERVICE_SOFTWARE_URL: import.meta.env.VITE_SERVICE_SOFTWARE_URL,
  VITE_SERVICE_DOCS_URL: import.meta.env.VITE_SERVICE_DOCS_URL,
  VITE_SERVICE_FORUM_URL: import.meta.env.VITE_SERVICE_FORUM_URL,
};
const resolveEnv = (url: string) =>
  url.replace(/__ENV:([A-Z0-9_]+)__/g, (_, key: string) => ENV_MAP[key] ?? '');

// 仅含变量的板块需要处理，纯静态板块（info/friendshipLink/footerLogo/qrcode）直接传用
const quickNav = computed(() =>
  content.value.quickNav.map((group) => ({
    ...group,
    children: group.children.map((item) => ({
      ...item,
      href: resolveEnv(item.href),
    })),
  }))
);
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
</script>

<template>
  <OFooter
    :info="content.info"
    :quick-nav="quickNav"
    :friendship-link="content.friendshipLink"
    :footer-logo="content.footerLogo"
    :footer-option="footerOption"
    :qrcode="content.qrcode"
    :footer-bg-img="lePadV ? content.footer_bg_img.mb : content.footer_bg_img.pc"
  />
</template>
```

## Schema

完整字段定义见组件库 `FooterT`（`@opendesign-plus/components`，`dist/components/footer/types.d.ts`），此处仅列 yaml 侧的补充约定：

### info / friendshipLink / footerLogo / quickNav / qrcode / footerOption

字段名与 `FooterT` 对应 props 完全一致（`info`→`InfoT`、`friendshipLink`→`FriendshipLinkT`、`footerLogo`→`FooterLogoT`（不使用可选的 `logoMb`）、`quickNav`→`QuickNavT[]`、`qrcode`→`QrcodeT[]`、`footerOption`→`FooterOptionT`）。

### footer_bg_img

| 字段 | 必填 | 说明 |
|------|------|------|
| `pc` | 是 | PC 背景图 |
| `mb` | 是 | 移动端背景图（`lePadV` 时使用） |
