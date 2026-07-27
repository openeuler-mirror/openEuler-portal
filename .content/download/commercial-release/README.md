# download/commercial-release

商业发行版列表页（`/zh/download/commercial-release/`、`/en/download/commercial-release/`）数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，zh/en 内容各自独立（非互译关系），共用同一个 `images/` 子目录（当前数据均为外链 URL，无本地图片资源）。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文商业发行版卡片数据 |
| `en.yaml` | 英文商业发行版卡片数据 |
| `images/` | 图片资源（zh/en 共用；当前数据仅含外链 URL，暂无本地图片） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `commercial_release_list` | 数组 | 商业发行版卡片列表（按厂商发布时间倒序排列） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名（snake_case）**：如 `name`、`download_url`、`desc`、`manufacturer`、`publish_date`、`lts`、`detailed_link`，禁止 `NAME` / `DOWNLOAD_URL` 等 UPPER_CASE 后缀
- **字段就近存放**：`images/` 下，文件名保留原名（当前数据均无本地图片）
- **可选字段省略**：`desc` / `detailed_link` / `lts` 缺失时不写键（d.ts 中标为可选），`publish_date` 为空时写空字符串 `''`

## 消费方式

```ts
import commercialReleaseData from '#content/download/commercial-release';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';

const { locale } = useLocale();
const releaseList = computed(
  () => commercialReleaseData[locale.value].commercial_release_list
);
// 局部类型推导（d.ts 已声明 CommercialReleaseItemT / DetailedLinkItemT）
type CommercialReleaseItemT =
  (typeof commercialReleaseData.zh.commercial_release_list)[number];
```

## Schema

### commercial_release_list

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 发行版名称 |
| `download_url` | ✅ | 下载链接（厂商官网或镜像站 URL） |
| `desc` | ❌ | 发行版描述（en `Kylinsec` / `iSoftServerOS-Kunpeng-5.1` 缺失） |
| `manufacturer` | ✅ | 厂商名称 |
| `publish_date` | ✅ | 发布日期（格式 `YYYY/MM` 或 `YYYY/MM/DD`，可为空字符串 `''`） |
| `lts` | ❌ | 是否 LTS 版本（布尔；仅 zh `HopeEdge` 显式写 `false`） |
| `detailed_link` | ❌ | 架构链接列表（zh `银河麒麟高级服务器操作系统V10`、`同源OS 8.1欧拉发行版` 缺失） |

#### detailed_link 子项

| 字段 | 必填 | 说明 |
|------|------|------|
| `link` | ❌ | 架构对应的具体下载链接（缺失表示无独立架构镜像，仅 `download_url` 入口） |
| `arch` | ✅ | 处理器架构：`x86_64` / `AArch64` / `LoongArch64` / `sw_64` / `RISC-V` |
