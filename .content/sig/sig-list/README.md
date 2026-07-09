# sig/sig-list

SIG 列表页（`/zh/sig/sig-list/`、`/en/sig/sig-list/`）数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，共用同一个 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文数据（含所有板块） |
| `en.yaml` | 英文数据（含所有板块） |
| `images/` | 图片与图标资源（zh/en 共用；raster 图走 URL 管线，SVG 图标走 `?raw` inline 管线） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `banner` | 对象 | 页面顶部 banner 背景图 |
| `welcome_join` | 数组 | 欢迎参与 SIG 卡片（了解运转 / 交流 / 贡献） |
| `about_sig` | 数组 | 关于 SIG 卡片（角色说明 / 会议指南） |
| `application_process` | 数组 | SIG 申请流程六步（寻人→申请→沟通→获批→运作→改进） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：如 `title`、`subtitle`、`path`、`background`，禁止 `title_zh` / `title_en` 后缀
- **主题变体用 `_dark` 后缀**：`about_sig` 的 `icon` / `icon_dark` 为亮/暗 SVG 路径（`./images/xxx.svg?raw` / `./images/xxx-dark.svg?raw`）
- **图片就近存放**：`images/` 下，文件名保留原名
- **zh/en 共用图**：不加后缀，两个 yaml 指向同一文件（banner、卡片背景图、图标均共用）
- **资源管线由 `?raw` 后缀显式控制**：`vite-plugin-content-yaml` 把相对路径 + 图片扩展名的值改写为 `import`——路径带 `?raw`（如 `./images/x.svg?raw`）时 Vite 返回文件内容字符串（由 `InlineSvg` 渲染为 inline SVG，OIcon 全局 `.o-icon svg { width:1em; fill:currentColor }` 提供尺寸/主题色，支持暗黑 currentColor 切换）；不带 `?raw` 时返回带 hash 的资源 URL（用于 `<img>`/背景图）。插件不判断字段名，由 YAML 书写时显式加 `?raw` 决定

## 消费方式

```ts
import sigListContent from '#content/sig/sig-list';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';
import InlineSvg from '~@/components/InlineSvg.vue';

const { locale } = useLocale();
const welcomeJoin = computed(() => sigListContent[locale.value].welcome_join);
// 模板：<OIcon class="icon"><InlineSvg :raw="card.icon" /></OIcon>
// about_sig 暗黑：<InlineSvg :raw="isDark ? card.iconDark : card.icon" />
```

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg` | ✅ | banner 背景图（zh/en 共用，URL 资源，不带 `?raw`） |

### welcome_join

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | ✅ | SVG 路径（带 `?raw`），可选：`operate-sig` / `exchange-sig` / `join-sig`（对应 `./images/<key>.svg?raw`） |
| `title` | ✅ | 卡片标题 |
| `subtitle` | ✅ | 卡片描述（支持 HTML） |

### about_sig

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | ✅ | 亮色 SVG 路径（带 `?raw`） |
| `icon_dark` | ✅ | 暗色 SVG 路径（带 `?raw`） |
| `title` | ✅ | 卡片标题 |
| `subtitle` | ✅ | 卡片描述 |
| `path` | ✅ | 卡片链接（为空字符串则该卡片不显示，如 en 版会议指南） |
| `background` | ✅ | 卡片背景图（zh/en 共用，URL 资源，不带 `?raw`） |

可选 SVG：`role-description` / `role-description-dark` / `sig-meeting` / `sig-meeting-dark`（对应 `./images/<key>.svg?raw`）

> 注：原 `~@/data/sig` 中 `iconDark` 误指向 light 变体 SVG，提取时已修正为对应的 `-dark` 变体文件。

### application_process

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | ✅ | 步骤 SVG 路径（带 `?raw`） |
| `process` | ✅ | 步骤名 |
| `detail` | ✅ | 步骤详情（支持 HTML） |

可选 SVG：`looking-someone` / `apply-for` / `communicate` / `approved` / `operate` / `improve`（对应 `./images/<key>.svg?raw`）
