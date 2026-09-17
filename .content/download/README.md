# 下载页（Download）

openEuler 下载页（`/zh/download/`、`/en/download/`）的静态配置数据源。按页面路径组织在 `.content/download/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，图片就近存放在共用 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线输出带 hash 的真实 URL。

> **注意**：download 页面还有 `download.ts`（COMMUNITY_LIST/archMap/SCENARIO_LIST/VERSION_LIST/anchorList）、`download-new.ts`（fileTree/mirrorList）、`download-commercial-release.ts`、`repo-size.ts` 等数据文件**未提取**到 yaml——因为它们包含 `import.meta.env` 运行时变量、`computed`/`i18n` 依赖，或是 API 数据副本，不符合静态配置的提取条件。仅 `get-os`、`get-resource`、`support-service` 三个纯静态配置板块被提取。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版下载数据（3 个板块） |
| `en.yaml` | 英文版下载数据（3 个板块，结构与 zh 一致；`support_service` 缺论坛） |
| `images/` | 共用图片资源（get-os 的 24 个 PNG + get-resource/support-service 的 5 个 SVG） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `community_versions` | 数组 | 首页"社区版本"tab 展示的版本名称列表 | `DownloadCommunity.vue` |
| `get_os` | 数组 | 获取操作系统配置（6 种方式） | `DownloadGetOs.vue` |
| `get_resource` | 数组 | 相关资源（镜像仓 + 社区文档） | `DownloadGetResource.vue` |
| `support_service` | 数组 | 支持与服务（FAQs + 论坛 + Quickissue） | `DownloadSupportService.vue` |

> `get_os` 的 `title`/`id` 也被 `download.ts` 的 `anchorList` 用于生成页内锚点导航。

## 设计原则

- **按文件拆分 locale**：双语字段已拆分到 `zh.yaml` / `en.yaml`，字段名用基线名（无 `_zh`/`_en` 后缀）
- **主题变体用 `_light`/`_dark` 后缀**：亮色/暗色图各存一份，组件按 `theme` 取值后消费
- **图片就近存放**：所有图片在 `images/` 下，yaml 中以 `./images/xxx.ext` 书写（必须带 `./` 前缀）
- **zh/en 共用图不加后缀**；文件名已含 `_light`/`_dark`/`_mo` 后缀的保留原名
- **SVG 消费方式**：作为 OCard `:icon` 组件消费的 SVG 路径带 `?raw`（用 `createSvgIcon` 转换），普通背景图的 SVG 不带 `?raw`
- **不存布局参数**：间距、断点等样式参数保留在组件 SCSS 中

## 消费方式

```ts
import { computed } from 'vue';
import downloadContent from '#content/download';
import { createSvgIcon } from '~@/composables/createSvgIcon';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

// 取当前语言的某个板块
const getResource = computed(() => downloadContent[locale.value].get_resource);

// 主题字段按 theme 取值
// 模板：url(${theme === 'light' ? item.bg_light : item.bg_dark})

// SVG inline 图标消费（OCard :icon，路径带 ?raw）
// 模板：:icon="createSvgIcon(item.icon_light)"
```

## Schema

### community_versions

首页"社区版本"tab 展示的版本名称列表（zh/en 相同，版本名称为通用字符串）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `(数组项)` | 是 | 版本名称字符串（与 `download.ts` 的 `COMMUNITY_LIST` 中 `NAME` 对应） |

### get_os

获取操作系统配置（6 种方式：公有云/容器/Windows/MacOS/虚拟化/树莓派）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 锚点 ID（如 `cloud`、`container`） |
| `bg_light` | 是 | PC 端亮色背景图（PNG，`background-image` 消费，zh/en 共用） |
| `bg_dark` | 是 | PC 端暗色背景图 |
| `bg_mo_light` | 是 | 移动端亮色背景图 |
| `bg_mo_dark` | 是 | 移动端暗色背景图 |
| `title` | 是 | 方式标题 |
| `intro` | 是 | 方式简介 |
| `intro1` | 否 | 安装指引文案（仅 cloud/container 有） |
| `intro_link` | 否 | 安装指引链接 |
| `repeat` | 否 | 布局参数 |
| `links` | 是 | 子链接列表 |
| `links[].href` | 是 | 链接 URL |
| `links[].label` | 是 | 链接文案 |
| `links[].introduce` | 是 | 链接介绍 |

> en 的 `cloud` 只有 4 个 links（缺腾讯云），zh 有 5 个。

### get_resource

相关资源（镜像仓 + 社区文档）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon_light` | 是 | 亮色主题图标（SVG，OCard `:icon` 组件消费，路径带 `?raw`） |
| `title` | 是 | 资源标题 |
| `label` | 是 | 资源描述 |
| `href` | 是 | 资源链接 |

### support_service

支持与服务（FAQs + 论坛 + Quickissue）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon_light` | 是 | 亮色主题图标（SVG，OCard `:icon` 组件消费，路径带 `?raw`） |
| `title` | 是 | 服务标题 |
| `label` | 是 | 服务描述 |
| `href` | 是 | 服务链接 |

> en 缺社区论坛（论坛仅 zh 有），en 的 `support_service` 只有 2 项。
