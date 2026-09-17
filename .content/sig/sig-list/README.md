# SIG 列表（SIG List）

openEuler SIG 列表页（`/zh/sig/sig-list/`、`/en/sig/sig-list/`）的静态配置数据源。按页面路径组织在 `.content/sig/sig-list/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，图片就近存放在共用 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版 SIG 列表页数据（3 个板块） |
| `en.yaml` | 英文版 SIG 列表页数据（结构与 zh 一致；`about_sig` 第 2 项 en 字段为空） |
| `images/` | 共用图片资源（11 个 SVG 图标 + 2 个 PNG 背景图） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `welcome_join` | 数组 | 欢迎加入 SIG 三步曲 | `SigWelcomeJoin.vue` |
| `about_sig` | 数组 | 关于 SIG 卡片（角色说明 + 会议指南） | `SigAbout.vue` |
| `application_process` | 数组 | 成立 SIG 申请流程（6 步） | `SigAbout.vue` |

## 设计原则

- **按文件拆分 locale**：双语字段已拆分到 `zh.yaml` / `en.yaml`，字段用基线名
- **SVG inline 图标**：路径带 `?raw`，组件用 `createSvgIcon` 转换为 Vue 组件消费
- **PNG 背景图**：路径不带 `?raw`，`<img>` 消费
- **icon 不区分主题**：原数据中 `about_sig` 的 `icon`/`iconDark` 引用同一 SVG 文件，简化为单个 `icon` 字段
- **en 空数据**：`about_sig` 第 2 项（SIG 会议指南）的 en 字段为空字符串，组件用 `v-if="card.path"` 过滤不显示
- **含 HTML 文案**：`subtitle`/`detail` 可能含内联 `<a>` 标签，用单引号包裹
- **不存布局参数**：分页、样式保留在组件中

## 消费方式

```ts
import sigListContent from '#content/sig/sig-list';
import { createSvgIcon } from '~@/composables/createSvgIcon';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

// 取板块数据
const welcomeJoin = computed(() => sigListContent[locale.value].welcome_join);

// SVG inline 图标消费（模板传参处包裹）
// <component :is="createSvgIcon(card.icon)" />
```

## Schema

### welcome_join

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | 是 | 步骤图标（SVG，`?raw`，`createSvgIcon` 消费） |
| `title` | 是 | 步骤标题 |
| `subtitle` | 是 | 步骤描述（可能含 HTML 内联链接） |

### about_sig

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | 是 | 卡片图标（SVG，`?raw`，`createSvgIcon` 消费） |
| `title` | 是 | 卡片标题（en 第 2 项为空） |
| `subtitle` | 是 | 卡片描述（en 第 2 项为空） |
| `path` | 是 | 卡片链接（en 第 2 项为空，组件 `v-if` 过滤） |
| `backgroud` | 是 | 卡片背景图（PNG，`<img>` 消费，zh/en 共用） |

### application_process

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | 是 | 步骤图标（SVG，`?raw`，`createSvgIcon` 消费） |
| `process` | 是 | 步骤名称 |
| `detail` | 是 | 步骤详情（可能含 HTML 内联链接） |
