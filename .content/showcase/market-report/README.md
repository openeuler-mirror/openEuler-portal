# 市场研究报告页 / Market Report

市场研究报告页（`/zh/showcase/market-report/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/showcase/market-report` 虚拟模块。en 页面不存在，仅创建 `zh.yaml`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（市场研究报告列表） |

> 本页数据为纯文本与链接，无图片资源，故无 `images/` 子目录。组件 UI 资源（banner、插画）保留在组件 import 中。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `market_report` | array | 市场研究报告列表 |

## 设计原则

- **仅 zh**：en 页面不存在
- **字段用基线名**：`path` / `summary`，无 `_zh` / `_en` 后缀
- **无图片资源**：数据为纯文本与 PDF 链接

## 消费方式

```ts
import { computed } from 'vue';
import marketReportContent from '#content/showcase/market-report';

const marketReportData = computed(() => marketReportContent.zh.market_report);
// 模板：v-for="item in randerPaperList" / {{ item.summary }} / :href="item.path"
```

## Schema

### market_report[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `path` | 是 | PDF 文件路径（相对站点根目录） |
| `summary` | 是 | 报告标题 |
