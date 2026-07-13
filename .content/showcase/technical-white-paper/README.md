# showcase/technical-white-paper

技术白皮书页面数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据。无图片资源，故无 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 技术白皮书页面中文数据（含所有白皮书条目） |
| `en.yaml` | 技术白皮书页面英文数据（含所有白皮书条目；SP4 待提供，源文件内以 TODO 注释保留占位） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `white_papers` | 数组 | 技术白皮书列表，按版本倒序排列 |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：`path`、`summary`
- **不存放前端布局参数**（如 pageSize、grid 列数）
- **待提供条目以源文件注释保留**：en 的 SP4 条目 PDF 未发布，在 `en.yaml` 内以 `#` 注释保留占位，待 PDF 到手后取消注释

## 消费方式

```ts
import technicalDataTotal from '#content/showcase/technical-white-paper';
import { useData } from 'vitepress';
import type Language from '...';

const { lang } = useData();
const technicalData = technicalDataTotal[lang.value as Language].white_papers;
```

## Schema

### white_papers

| 字段 | 必填 | 说明 |
|------|------|------|
| `path` | ✅ | PDF 下载链接（站点绝对路径，如 `/whitepaper/xxx.pdf`） |
| `summary` | ✅ | 白皮书摘要标题，用于卡片展示 |
