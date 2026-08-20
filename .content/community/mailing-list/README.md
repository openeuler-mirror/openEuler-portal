# 邮件列表页 / Mailing List

邮件列表页（`/zh/community/mailing-list/`、`/en/community/mailing-list/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/community/mailing-list` 虚拟模块。

> 邮件列表数据来自 API（`getAllMailing`），不在本数据范围。本 yaml 只包含订阅流程步骤配置。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文订阅流程步骤（4 步） |
| `en.yaml` | 英文订阅流程步骤（4 步） |
| `images/` | 4 张步骤示意图 PNG（zh/en 共用） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `subscription_process` | array | 订阅流程步骤列表（4 步，按页面从左到右视觉顺序） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **img zh/en 共用**：步骤示意图不分语言，4 张 PNG 不加 `_zh`/`_en` 后缀
- **HTML 内联**：`detail` 中的链接以 `<a>` 标签内联，yaml 用单引号包裹，组件用 `v-dompurify-html` 渲染
- **PNG 不带 `?raw`**：`OFigure` / `<img>` 消费

## 消费方式

```ts
import { computed } from 'vue';
import mailingListContent from '#content/community/mailing-list';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const subscriptionProcess = computed(
  () => mailingListContent[locale.value].subscription_process
);
// 模板：v-for="(item, i) in subscriptionProcess" / {{ item.title }} / v-dompurify-html="item.detail"
```

## Schema

### subscription_process[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 步骤标题 |
| `detail` | 是 | 步骤描述（可能含 HTML `<a>` 链接） |
| `img` | 是 | 步骤图片（`./images/stepN.png`） |
