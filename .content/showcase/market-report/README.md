# showcase/market-report

市场研究报告页面数据源。按 skill 文档标准模式组织。无图片资源，故无 `images/` 子目录。

页面 `/showcase/market-report` 仅中文站发布（报告均为中文研究成果，无英文版本），故本目录只提供 `zh.yaml`，类型声明与组件消费均只取 `zh` 键。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 市场研究报告页面中文数据 |

## 数据板块

`zh.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `market_reports` | 数组 | 市场研究报告列表 |

## 设计原则

- **按文件拆分 locale**：仅 `zh.yaml`（页面无英文版）
- **字段用基线名**：`path`、`summary`
- **不存放前端布局参数**（如 pageSize、grid 列数）

## 消费方式

```ts
import marketReportContent from '#content/showcase/market-report';

const whitePaperData = marketReportContent.zh.market_reports;
```

## Schema

### market_reports

| 字段 | 必填 | 说明 |
|------|------|------|
| `path` | ✅ | PDF 下载链接（站点绝对路径，如 `/whitepaper/xxx.pdf`） |
| `summary` | ✅ | 报告摘要标题，用于卡片展示 |
