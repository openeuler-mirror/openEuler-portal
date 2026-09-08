# 品牌主页数据

品牌主页（`/zh/other/brand/`、`/en/other/brand/`）的静态数据，由 `OPlusYamlContentVitePlugin` 合成为 `#content/other/brand`。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文品牌主页数据 |
| `en.yaml` | English brand page data |
| `images/` | 品牌主页 banner、logo、PPT 封面和主题资源 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 字符串 | 页面 banner 图片 |
| `logo` / `logo_dark` | 字符串 | openEuler 亮色/暗色 logo |
| `strato_virt_logo` / `strato_virt_logo_dark` | 字符串 | StratoVirt 亮色/暗色 logo |
| `guide` | 字符串 | 外部品牌指南链接 |
| `logo_download` | 数组 | openEuler logo 下载资源 |
| `innovation_logo_download` | 数组 | 创新项目 logo 下载资源 |
| `ppt_list` / `ppt_list_en` | 数组 | PPT 模板下载资源 |

## 设计原则

- 中文和英文按文件拆分，字段结构保持一致。
- 字段使用 snake_case，主题变体使用 `_dark` 后缀。
- 项目内图片就近存储在 `images/`；公开下载资源保留原有 `/img/other/brand/` URL。
- 外部品牌指南和 PPT 文件使用原始 URL，不复制远程文件。

## 消费方式

```ts
import brandContent from '#content/other/brand';

const content = computed(() => brandContent[locale.value]);
```

## Schema

### 下载项

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 资源名称 |
| `img` | 是 | 预览图 |
| `list` | 是 | 下载格式列表 |
| `list[].title` | 是 | 格式名称 |
| `list[].url` | 是 | 下载地址 |

### PPT 项

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 模板名称 |
| `img` | 是 | 封面图 |
| `url` | 是 | 下载地址 |
