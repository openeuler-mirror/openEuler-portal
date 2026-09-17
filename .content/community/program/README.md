# Call for X 计划 / Call for X

openEuler Call for X 计划页（`/zh/community/program/`、`/en/community/program/`）的静态配置数据源。按页面路径组织在 `.content/community/program/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，图片就近存放在共用 `images/` 子目录，由 `OPlusYamlContentVitePlugin` 合成为 `#content/community/program` 虚拟模块。

> 组件 UI 资源（banner 背景图、插画 `euler-sky.png`、卡片圆角底图 `round-bg.png`、UI 图标 `icon-arrow-right.svg`）保留在组件 import 中，不在数据范围。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版计划页数据（4 张卡片 + 活动征集） |
| `en.yaml` | 英文版计划页数据（2 张卡片，无活动征集） |
| `images/` | 4 张卡片背景图（bg-1.png ~ bg-4.png） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `banner_title` | string | banner 标题 | `TheEulerSky.vue` |
| `banner_introduction` | string | banner 副标题 | `TheEulerSky.vue` |
| `plan_introduce` | string | 计划介绍正文 | `TheEulerSky.vue` |
| `view_more` | string | "查看更多"按钮文案 | `TheEulerSky.vue` |
| `card_data` | array | 计划卡片列表 | `TheEulerSky.vue` |
| `event_collection` | string | 活动征集标题（仅 zh） | `TheEulerSky.vue` |
| `event_collection1` | string | 活动征集按钮文案（仅 zh） | `TheEulerSky.vue` |
| `event_collection_url` | string | 活动征集链接（仅 zh） | `TheEulerSky.vue` |

## 设计原则

- **按文件拆分 locale**：双语数据拆分到 `zh.yaml` / `en.yaml`，字段用基线名（snake_case，由原大写下划线 `BANNER_TITLE` 转换而来）
- **zh/en 卡片数不同**：zh 4 张卡片，en 2 张卡片
- **活动征集仅 zh**：`event_collection` / `event_collection1` / `event_collection_url` 仅出现在 zh.yaml，en.yaml 不含；组件用 `v-if="homeI18n.event_collection"` 判断是否渲染，类型声明中标记为可选字段
- **换行符保留**：`event_collection` 含 `\n` 换行符（配合组件 `white-space: pre-wrap` 渲染换行），YAML 中用双引号包裹以使 `\n` 作为换行转义生效
- **中文弯引号**：`plan_introduce` 与 `event_collection` 中的 `"openEuler Call for X 计划"` 使用中文弯引号（U+201C/U+201D），YAML 中原样保留不转义
- **图片就近存放**：卡片背景图 PNG 在 `images/` 下，yaml 中以 `./images/bg-x.png` 书写，由插件接入 Vite 资源管线输出带 hash 的真实 URL
- **不存布局参数**：卡片样式、栅格、间距保留在组件 `<style>` 中

## 消费方式

```ts
import programContent from '#content/community/program';
import { useData } from 'vitepress';

const { lang } = useData();
const homeI18n = computed(() => programContent[lang.value as 'zh' | 'en']);

// 模板
// {{ homeI18n.banner_title }}
// {{ homeI18n.plan_introduce }}
// v-for="item in homeI18n.card_data" / item.title / item.url / item.img
// v-if="homeI18n.event_collection" / {{ homeI18n.event_collection }}
// {{ homeI18n.view_more }}
```

## Schema

### 顶层

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner_title` | 是 | banner 标题 |
| `banner_introduction` | 是 | banner 副标题 |
| `plan_introduce` | 是 | 计划介绍正文 |
| `view_more` | 是 | "查看更多"按钮文案 |
| `card_data` | 是 | 计划卡片列表 |
| `event_collection` | 否 | 活动征集标题（仅 zh，含 `\n` 换行） |
| `event_collection1` | 否 | 活动征集按钮文案（仅 zh） |
| `event_collection_url` | 否 | 活动征集链接（仅 zh） |

### card_data[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 卡片标题 |
| `url` | 是 | 卡片跳转链接 |
| `img` | 是 | 卡片背景图（PNG） |
