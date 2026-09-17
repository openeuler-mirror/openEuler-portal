# 商业发行版（Commercial Release）

openEuler 商业发行版下载页（`/zh/download/commercial-release/`、`/en/download/commercial-release/`）的静态配置数据源。按页面路径组织在 `.content/download/commercial-release/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文版商业发行版数据（28 项） |
| `en.yaml` | 英文版商业发行版数据（10 项，en 是 zh 子集非翻译对应） |

> 本页面无图片资源，所有数据均为文案与链接。

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `commercial_release` | 数组 | 商业发行版列表（按发布时间倒序） | `TheCommercialRelease.vue` |

## 设计原则

- **按文件拆分 locale**：双语数据已拆分到 `zh.yaml` / `en.yaml`，字段名保留原大写命名（`NAME`、`DESC` 等）与组件消费一致
- **zh/en 独立维护**：en 不是 zh 的翻译对应，是独立子集（zh 28 项，en 10 项）
- **无图片资源**：所有数据均为文案、链接和架构信息
- **不存布局参数**：分页、筛选等 UI 逻辑保留在组件中

## 消费方式

```ts
import commercialReleaseData from '#content/download/commercial-release';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const localeCommercialReleaseData = computed(
  () => commercialReleaseData[locale.value].commercial_release
);
```

## Schema

### commercial_release

| 字段 | 必填 | 说明 |
|------|------|------|
| `NAME` | 是 | 发行版名称 |
| `DOWNLOAD_URL` | 是 | 下载链接 |
| `DESC` | 否 | 发行版描述（en 部分项为空字符串，iSoftServerOS 无 DESC） |
| `MANUFACTURER` | 是 | 厂商名称 |
| `PUBLISH_DATE` | 是 | 发布日期（如 `2026/06`，可为空字符串） |
| `DETAILED_LINK` | 否 | 架构详情链接数组（V10 无此字段） |
| `DETAILED_LINK[].LINK` | 否 | 架构专属下载链接（部分项仅有 ARCH 无 LINK） |
| `DETAILED_LINK[].ARCH` | 是 | 支持的架构（如 `x86_64`、`AArch64`、`LoongArch64`） |
| `LTS` | 否 | 是否为 LTS 版本（仅 HopeEdge 有 `false`） |
