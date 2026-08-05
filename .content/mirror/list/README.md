# 镜像站列表（Mirror List）

openEuler 镜像站列表页（`/zh/mirror/list/`、`/en/mirror/list/`）的静态配置数据源。按页面路径组织在 `.content/mirror/list/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线。

> **注意**：镜像站列表数据本身来自 API（`getAllMirror`），不在 yaml 中。此处仅提取页面中的静态配置（地区筛选选项、rsync 命令、版本大小列表）。所有数据 zh/en 相同（版本名、地区代码、命令字符串均通用），两个文件内容一致。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文版镜像站列表页静态配置（3 个板块） |
| `en.yaml` | 英文版镜像站列表页静态配置（与 zh 内容一致） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `area_arr` | 数组 | 地区筛选选项（Asia/Europe/North America） | `MirrorList.vue` |
| `rsync_code` | 字符串 | rsync 同步命令 | `MirrorList.vue` |
| `repo_size` | 数组 | 镜像仓版本大小列表（29 项） | `MirrorSize.vue` |

## 设计原则

- **按文件拆分 locale**：数据已拆分到 `zh.yaml` / `en.yaml`，字段名用基线名
- **zh/en 数据相同**：所有数据均为通用值（版本名、地区代码、命令字符串），两个文件内容一致
- **不存布局参数**：分页、表格列配置等保留在组件中
- **不存 i18n key**：表格列标题等使用 `t()` 的 i18n key 保留在组件中
- **镜像列表数据来自 API**：`getAllMirror` 返回的镜像站数据不在 yaml 中

## 消费方式

```ts
import mirrorListContent from '#content/mirror/list';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

// 取板块数据
const areaArr = computed(() => mirrorListContent[locale.value].area_arr);
const rsyncCode = computed(() => mirrorListContent[locale.value].rsync_code);
const repoData = computed(() => mirrorListContent[locale.value].repo_size);
```

## Schema

### area_arr

地区筛选选项。

| 字段 | 必填 | 说明 |
|------|------|------|
| `value` | 是 | 地区代码（如 `AS`、`EU`、`NA`） |
| `label` | 是 | 地区名称（英文，zh/en 共用） |

### rsync_code

rsync 同步命令字符串（zh/en 共用，单值）。

### repo_size

镜像仓版本大小列表。

| 字段 | 必填 | 说明 |
|------|------|------|
| `release` | 是 | 版本名称（如 `openEuler 24.03 LTS SP3`） |
| `size` | 是 | 镜像大小（如 `456 GB`） |
