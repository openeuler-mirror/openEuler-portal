# 品牌规范数据

品牌规范页（`/zh/other/brand/specification/`、`/en/other/brand/specification/`）的静态数据，由 `OPlusYamlContentVitePlugin` 合成为 `#content/other/brand/specification`。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文品牌规范章节 |
| `en.yaml` | English brand specification sections |
| `images/zh/` | 中文规范图片 |
| `images/en/` | English specification images |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 字符串 | 当前语言 banner 图片 |
| `sections` | 数组 | 当前语言品牌规范章节 |

## 设计原则

- 中英文按文件拆分，章节结构保持一致。
- 富文本说明保留原有 HTML 片段，由 `v-dompurify-html` 消费。
- 图片就近存储在 `images/{locale}/`，文件名保持源文件名。
- YAML 仅保存内容和资源引用，不保存布局参数。

## 消费方式

```ts
import specificationContent from '#content/other/brand/specification';

const content = computed(() => specificationContent[locale.value]);
```

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner` | 是 | 当前语言 banner 图片 |
| `sections` | 是 | 品牌规范章节数组 |
| `sections[].title` | 是 | 章节标题 |
| `sections[].desc` | 是 | 富文本说明段落数组 |
| `sections[].img` | 是 | 章节主图 |
| `sections[].img2` | 否 | 第二张章节图片 |
