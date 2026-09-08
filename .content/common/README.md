# 通用配置（Common）

全站共用的静态配置数据。locale 无关的数据放在独立 yaml 文件中（按 slug 索引），zh 专属数据放在 `zh.yaml` 中。

## 文件说明

| 文件 | slug | 用途 |
|------|------|------|
| `category.yaml` | `category` | 全站分类标识列表，用于 frontmatter `category` 字段合法值校验 |
| `nav_filter.yaml` | `nav_filter` | 导航语言过滤配置，控制各导航在不同语言下是否显示 |
| `nss.yaml` | `nss` | 隐藏 NSS 浮动按钮的路由列表 |
| `zh.yaml` | `zh` | SEO 关键词配置（zh 专属，en 无对应数据故未创建 `en.yaml`） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `category` | `string[]` | 分类标识数组 |
| `nav_filter` | `NavFilterItemT[]` | 导航过滤配置，每项含 `name`（支持 `/**` 通配）和 `lang` |
| `nss` | `string[]` | 需隐藏 NSS 按钮的路由路径段 |
| `zh` | `Record<string, SeoKeywordItemT[]>` | SEO 关键词配置，按页面 key 分组 |

## 设计原则

- locale 无关数据（category / nav_filter / nss）放在独立 yaml 文件中，不按语言拆分
- locale 专属数据（seo 关键词）放在 `zh.yaml` 中，en 无对应数据故未创建 `en.yaml`
- 字段名一律 snake_case（如 `key_words`、`nav_filter`、`migration_background`）
- 消费方通过 `commonContent[lang]?.<page_key>` 取值，en 页面自动得到 `undefined`

## 消费方式

```ts
import commonContent from '#content/common';

// 分类校验
commonContent.category.indexOf(frontmatter.value.category) !== -1;

// 导航语言过滤
commonContent.nav_filter[i].lang;

// NSS 按钮隐藏判定
commonContent.nss.some((route) => path.includes(route));

// SEO 关键词（locale 取值，en 得到 undefined）
commonContent[lang]?.download;
```

## Schema

### category (string[])

顶层直接为数组，每项为分类标识字符串。

### nav_filter

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 导航路径标识（支持 `name/**` 通配子路径） |
| `lang` | 是 | 允许显示的语言列表 |

### nss (string[])

顶层直接为数组，每项为路由路径段。

### zh (SEO keywords)

| 字段 | 必填 | 说明 |
|------|------|------|
| `level` | 是 | 关键词层级（1/2/3） |
| `key_words` | 是 | 关键词文本 |

zh.yaml 顶层为按页面分组的对象，key 为页面标识（`home`、`download`、`mirror_list`、`blog_list`、`migration_background`、`migration_advantage`、`migration_guidance`、`migration_download`、`migration_case`）。
