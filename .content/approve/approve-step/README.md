# OSV 技术测评步骤页 / OSV Assessment Step

OSV 技术测评步骤页（`/zh/approve/approve-step/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/approve/approve-step` 虚拟模块。en 页面不存在，仅创建 `zh.yaml`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（面包屑 + banner + 7 步测评流程） |

> 本页数据均为文本/链接，无图片资源，故无 `images/` 子目录。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `breadcrumb` | object | 面包屑返回文案（点击返回上一级） |
| `banner` | object | 页面顶部 banner 标题 |
| `process` | object | 测评流程板块（标题 + 7 个步骤） |

## 设计原则

- **仅 zh**：en 页面不存在，禁止编造 en 数据
- **字段用基线名**：小写下划线命名（`text_1` / `link_1` / `link_text` / `text_lits` 等），无 `_zh` / `_en` 后缀
- **链接按位置消费**：`link_1` / `link_2` 可能为 URL 或邮箱，组件按步骤位置决定是否加 `mailto:` 前缀（保持与原 i18n 消费逻辑一致）
- **HTML 内联**：文案中的链接以原生 `<a>` 标签在模板中渲染，yaml 仅存纯文本与 URL/邮箱
- **板块按视觉顺序**：breadcrumb → banner → process（从上到下）

## 消费方式

```ts
import { computed } from 'vue';
import approveStepContent from '#content/approve/approve-step';

const content = computed(() => approveStepContent.zh);
// 模板：{{ content.breadcrumb.text }} / {{ content.banner.title }} / {{ content.process.steps[i].xxx }}
```

## Schema

### breadcrumb

| 字段 | 必填 | 说明 |
|------|------|------|
| `text` | 是 | 面包屑返回文案（如 "OSV技术测评列表"） |

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | banner 标题 |

### process

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 流程板块标题 |
| `steps` | 是 | 步骤列表（7 项，按页面从上到下顺序） |

### process.steps[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 步骤编号（'01' ~ '07'） |
| `title` | 是 | 步骤标题 |
| `text_1` | 是 | 步骤描述片段 1 |
| `link_1` | 否 | 链接 1（URL 或邮箱，组件按步骤位置决定是否加 `mailto:` 前缀） |
| `link_text` | 否 | 链接显示文本（仅步骤 5，覆盖 `link_1` 的默认显示） |
| `text_2` | 否 | 步骤描述片段 2 |
| `text_3` | 否 | 步骤描述片段 3 |
| `link_2` | 否 | 链接 2（URL 或邮箱） |
| `text_lits` | 否 | 列表项数组（仅步骤 7） |
| `text_4` | 否 | 步骤描述片段 4（仅步骤 7） |
