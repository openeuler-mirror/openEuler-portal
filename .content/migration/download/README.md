# 迁移下载页 / Migration Download

迁移下载页（`/zh/migration/download/`、`/en/migration/download/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/migration/download` 虚拟模块。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（x2openEuler 工具介绍 + 5 个版本） |
| `en.yaml` | 英文页面数据（5 个版本） |

> 本页数据为纯文本与链接，无图片资源，故无 `images/` 子目录。模板内的装饰图片（`download-card-left.png` / `download-card-right.png`）与 UI 图标（`icon-arrow-right.svg` / `icon-download.svg`）属于组件 UI 资源，不在数据文件范围内。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `name` | string | 工具名称（x2openEuler） |
| `description` | string | 工具描述 |
| `version_list` | array | 版本列表（5 项，按页面从上到下视觉顺序） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：snake_case（`version_list` / `source_links` / `soft_links`），无 `_zh` / `_en` 后缀，与 migration 主页 yaml 风格一致
- **link 与 soft_links 互斥**：`source_links[]` 项中，`link`（普通跳转）与 `soft_links`（下拉软件包列表）二选一
- **保留末尾空格**：`soft_links[].name` 中的 `x86_64 ` / `aarch64 ` / `upgrade-for6 ` 末尾空格为原数据约定，yaml 中用单引号包裹以保留

## 消费方式

```ts
import { computed } from 'vue';
import { useData } from 'vitepress';
import migrationDownloadContent from '#content/migration/download';

const { lang } = useData();
const downloadInfo = computed(
  () => migrationDownloadContent[lang.value as 'zh' | 'en']
);
// 模板：{{ downloadInfo.name }} / v-for="item in downloadInfo.version_list" / item.source_links / buttons.soft_links
```

## Schema

### 顶层

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 工具名称 |
| `description` | 是 | 工具描述 |
| `version_list` | 是 | 版本列表 |

### version_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `version` | 是 | 版本号 |
| `source_links` | 是 | 按钮列表 |

### version_list[].source_links[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 按钮名 |
| `link` | 否 | 按钮链接（普通跳转，与 `soft_links` 互斥） |
| `soft_links` | 否 | 软件包链接列表（下拉选项，与 `link` 互斥） |

### version_list[].source_links[].soft_links[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 软件包名（可能含末尾空格） |
| `link` | 是 | 软件包链接 |
