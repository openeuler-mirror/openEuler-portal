# 活动列表页 / Event List

活动列表页（`/zh/interaction/event-list/`、`/en/interaction/event-list/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/interaction/event-list` 虚拟模块。

> 年度规划数据来自 `#content/activity`（已独立提取），不在本数据范围。本 yaml 只包含活动申请步骤配置。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文活动申请步骤（5 步） |
| `en.yaml` | 英文（空数组，活动申请板块仅 zh 显示） |
| `images/` | 5 张图片（3 步骤背景 PNG + 2 材料 JPG） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `apply_steps` | array | 活动申请步骤列表（5 步，en 为空数组） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml`（5 项）/ `en.yaml`（空数组 `[]`）
- **字段用基线名**：snake_case（`list_data` 由 `listData` 转换）
- **HTML 内联**：`desc` 中的邮箱链接以 `<a>` 标签内联，yaml 用单引号包裹，组件用 `v-dompurify-html` 渲染
- **PNG/JPG 不带 `?raw`**：`<img>` 消费
- **图片 zh/en 共用**：步骤背景和材料图片不分语言（en 虽为空数组，但图片已就位供将来使用）

## 消费方式

```ts
import { computed } from 'vue';
import eventListContent from '#content/interaction/event-list';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const applySteps = computed(() => eventListContent[locale.value].apply_steps);
// 模板：v-if="locale === 'zh'" / applySep3.list_data
```

## Schema

### apply_steps[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `img` | 否 | 步骤背景图（PNG，`./images/xxx.png`） |
| `title` | 是 | 步骤标题 |
| `desc` | 否 | 步骤描述（可能含 HTML `<a>` 链接） |
| `href` | 否 | 按钮链接 |
| `btn` | 否 | 按钮文案 |
| `material1` | 否 | 材料 1 图片（JPG） |
| `material2` | 否 | 材料 2 图片（JPG） |
| `list_data` | 否 | 材料列表（每项含 `title`/`desc?`/`href?`） |
