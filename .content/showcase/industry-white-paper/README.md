# showcase/industry-white-paper

行业白皮书页面数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据。无页面专属图片，故无 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 行业白皮书页面中文数据 |
| `en.yaml` | 行业白皮书页面英文数据 |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `industry_papers` | 数组 | 行业白皮书列表 |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：`path`、`summary`、`banner`
- **`banner` 为站点级共享资产路径**：`/category/showcase/case-detail-bg.jpg` 被 100+ 个 case 详情页 frontmatter 引用，保留站点绝对路径字符串，不复制到本目录 `images/`（避免站点级资产重复）
- **不存放前端布局参数**（如 pageSize、grid 列数）

## 消费方式

```ts
import industryPaperDataTotal from '#content/showcase/industry-white-paper';
import { useData } from 'vitepress';

type Language = 'zh' | 'en';
const { lang } = useData();
const paperList = industryPaperDataTotal[lang.value as Language].industry_papers;
```

## Schema

### industry_papers

| 字段 | 必填 | 说明 |
|------|------|------|
| `path` | ✅ | PDF 下载链接（站点绝对路径，如 `/whitepaper/xxx.pdf`） |
| `summary` | ✅ | 白皮书摘要标题，用于卡片展示 |
| `banner` | ✅ | 卡片背景图路径（站点级共享资产，站点绝对路径） |

## 备注

`banner` 字段当前在组件 `ShowCaseWhitePaper.vue` 模板中未被消费（卡片背景图在 SCSS 中硬编码），但作为数据结构的一部分予以保留。如需清理，应作为单独的 refactor 任务处理。
