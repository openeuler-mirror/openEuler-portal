# NestOS

NestOS 页面（`/zh/nestos/`）的静态配置数据源。按页面路径组织在 `.content/nestos/` 下。**仅 zh 版本**（en 页面不存在），图片就近存放在 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线输出带 hash 的真实 URL。

## 文件说明

| 文件 / 目录 | 用途 |
|------------|------|
| `zh.yaml` | 中文版 NestOS 数据（5 个板块） |
| `images/` | 图片资源（2 个合作伙伴 Logo + 14 张功能详情页架构图） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `features` | 数组 | 功能特性卡片（6 项，i18n key + slug） | `NestOSFeatures.vue` |
| `partners` | 数组 | 合作伙伴（2 项，名称 + Logo + 链接） | `NestOSPartner.vue` |
| `performance_x_list` | 数组 | 性能对比图表 X 轴标签 | `NestOSPerformance.vue` |
| `performance_y_list` | 数组 | 性能对比图表 Y 轴系列数据 | `NestOSPerformance.vue` |
| `performance_comparison_url` | 字符串 | 性能对比测试说明文档链接 | `NestOSPerformance.vue` |
| `mirror_versions` | 数组 | 镜像下载版本列表（9 组，x86/ARM 双架构） | `NestOSResources.vue` |
| `doc_links` | 数组 | 文档链接（1 项，i18n key + 链接） | `NestOSResources.vue` |
| `other_links` | 数组 | 其他链接（1 项，i18n key + 链接） | `NestOSResources.vue` |
| `feature_map` | 对象 | 功能详情页内容（6 个功能，按 slug 索引） | `NestOSFeatureDetail.vue` |

## 设计原则

- **仅 zh 版本**：en 页面不存在，只维护 `zh.yaml`，类型声明与组件消费只取 `zh`
- **i18n key 保留原文**：`title_key` / `desc_key` 字段存储 i18n key（如 `nestos.feature1Title`），由组件通过 `t()` 翻译
- **图片就近存放**：所有图片在 `images/` 下，yaml 中以 `./images/xxx.ext` 书写（必须带 `./` 前缀）
- **字段命名 snake_case**：YAML 字段统一使用 snake_case（如 `title_key`、`date_title`、`x86_list`）
- **不存布局参数**：间距、断点等样式参数保留在组件 SCSS 中

## 消费方式

```ts
import { computed } from 'vue';
import nestosContent from '#content/nestos';

// 取某个板块
const features = computed(() => nestosContent.zh.features);

// 功能详情页按 slug 索引
const featureMap = computed(() => nestosContent.zh.feature_map);
const feature = computed(() => featureMap.value[props.featureSlug]);
```

## Schema

### features

功能特性卡片，展示 6 项核心功能。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title_key` | 是 | 标题 i18n key |
| `desc_key` | 是 | 描述 i18n key |
| `slug` | 是 | 功能详情页 slug（对应 `feature_map` 的 key） |

### partners

合作伙伴展示。

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 合作伙伴名称（用于 CSS class） |
| `logo` | 是 | Logo 图片路径（`./images/xxx.png`） |
| `href` | 是 | 合作伙伴链接 |

### performance_x_list

性能对比图表 X 轴标签数组（字符串）。

### performance_y_list

性能对比图表 Y 轴系列数据。

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 系列名称 |
| `type` | 是 | 图表类型（`line`） |
| `data` | 是 | 数值数组 |
| `line_style` | 否 | 线型样式（`type: dotted` 表示虚线） |

### performance_comparison_url

性能对比测试说明文档链接（字符串）。

### mirror_versions

镜像下载版本列表，按版本分组。

| 字段 | 必填 | 说明 |
|------|------|------|
| `date_title` | 是 | 版本标题 |
| `x86_list` | 是 | x86 架构包列表 |
| `arm_list` | 是 | ARM 架构包列表 |
| `x86_list[].name` / `arm_list[].name` | 是 | 包名称 |
| `x86_list[].path` / `arm_list[].path` | 是 | 下载路径 |

### doc_links

文档链接。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title_key` | 是 | 标题 i18n key |
| `href` | 是 | 文档链接 |

### other_links

其他链接。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title_key` | 是 | 标题 i18n key |
| `href` | 是 | 链接 |

### feature_map

功能详情页内容，key 为功能 slug，值为功能详情。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title_key` | 是 | 标题 i18n key |
| `desc_key` | 是 | 描述 i18n key |
| `sections` | 是 | 章节列表 |

#### sections[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `type` | 是 | 章节类型（`text` / `heading` / `list` / `code` / `image` / `link`） |
| `content` | 否 | 文本内容（`text` / `heading` / `code` / `link` 类型） |
| `items` | 否 | 列表项数组（`list` 类型） |
| `src` | 否 | 图片路径（`image` 类型，`./images/xxx.png`） |
| `href` | 否 | 链接（`link` 类型） |
