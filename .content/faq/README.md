# FAQ 页面 / FAQ Pages

FAQ 页面（`/zh/faq/`、`/en/faq/` 及其 6 个子页面）布局组件 `LayoutFAQ.vue` 使用的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/faq` 虚拟模块。

> **注意**：FAQ 页面的主体内容（问答正文）是 Markdown，由 VitePress `<Content />` 渲染，不在本数据文件范围内。本 yaml 只包含布局组件共用的侧边栏标题、页内目录标题与分类导航。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文布局数据（侧边栏标题 + 页内目录标题 + 6 项分类导航） |
| `en.yaml` | 英文布局数据（同结构） |

> 本页数据为纯文本，无图片资源，故无 `images/` 子目录。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `faq_title` | string | 侧边栏标题（所有 FAQ 子页面共用） |
| `page_content` | string | 页内目录（DocAnchor）标题 |
| `toc` | array | 侧边栏分类导航（6 项，链接到各 FAQ 子页面） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：snake_case（`faq_title` / `page_content`），由 camelCase 转换而来，无 `_zh` / `_en` 后缀
- **所有 FAQ 子页面共用**：`LayoutFAQ.vue` 是 6 个 FAQ 子页面（`/zh/faq/`、`/zh/faq/system-management/` 等）的布局组件，数据提取到 faq 第一层目录
- **空 link 表示当前页**：`toc[0].link` 为空字符串，对应主页面 `/zh/faq/`；其余为子页面路径段

## 消费方式

```ts
import { computed } from 'vue';
import { useData } from 'vitepress';
import faqContent from '#content/faq';

const { lang } = useData();
const faqInfo = computed(() => faqContent[lang.value as 'zh' | 'en']);
// 模板：{{ faqInfo.faq_title }} / {{ faqInfo.page_content }} / v-for="item in faqInfo.toc"
```

## Schema

### 顶层

| 字段 | 必填 | 说明 |
|------|------|------|
| `faq_title` | 是 | 侧边栏标题 |
| `page_content` | 是 | 页内目录标题 |
| `toc` | 是 | 分类导航列表 |

### toc[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `label` | 是 | 分类标签 |
| `link` | 是 | 分类链接（空字符串表示当前主页，其余为子页面路径段） |
