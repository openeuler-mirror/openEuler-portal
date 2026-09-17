# 月刊页 / Monthly Bulletins

月刊页（`/zh/monthly-bulletins/`、`/en/monthly-bulletins/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/monthly-bulletins` 虚拟模块。

> 月刊列表在运行时与 API 返回的新闻数据合并显示（`newsCardData.value.unshift(...bulletins)`）。本 yaml 只包含静态月刊配置，API 数据不在范围。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文月刊列表（3 项） |
| `en.yaml` | 英文月刊列表（3 项） |

> 本页数据为纯文本与链接，`banner` 是站内 public 路径（`/img/banners/xxx.jpg`），无需复制到 `images/`。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `bulletins` | array | 月刊列表（按日期倒序） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：原数据已是 snake_case（`banner`/`archives`/`author`/`date`/`lang`/`title`/`summary`/`tags`/`path`），无需转换
- **banner 为 public 路径**：`/img/banners/xxx.jpg` 是站内 public 目录绝对路径，非 `~@/assets/` import，yaml 中直接写原路径
- **与 API 数据合并**：组件运行时将 yaml 数据 `unshift` 到 API 返回的新闻列表前

## 消费方式

```ts
import monthlyBulletinsContent from '#content/monthly-bulletins';
// 组件中：newsCardData.value.unshift(...monthlyBulletinsContent[lang.value as 'zh' | 'en'].bulletins);
```

## Schema

### bulletins[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner` | 是 | banner 图片路径（站内 public 路径） |
| `archives` | 是 | 归档日期（YYYY-MM） |
| `author` | 是 | 作者数组 |
| `date` | 是 | 发布日期（YYYY-MM-DD） |
| `lang` | 是 | 语言（`zh` / `en`） |
| `title` | 是 | 标题 |
| `summary` | 是 | 摘要 |
| `tags` | 是 | 标签数组 |
| `path` | 是 | PDF/页面路径 |
