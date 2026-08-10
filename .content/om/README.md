# 运维专区（OM Zone）

openEuler 运维专区页面（`/zh/om/`）的静态配置数据源。仅中文（无对应 en 页面）。数据目录 `.content/om/` 下存放 `zh.yaml` + 共用 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线输出带 hash 的真实 URL。`#content/om` 虚拟模块的默认导出为 `{ zh }`。

## 文件说明

| 文件 / 目录 | 用途 |
|------------|------|
| `zh.yaml` | 中文版运维专区数据（6 个板块） |
| `images/` | 图片资源（二维码图等，扁平存放） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `help_contents` | 数组 | 帮助咨询文案（3 条提示文字） | `OMZone.vue` |
| `qr_codes` | 数组 | 二维码配置（公众号 + 小助手） | `OMZone.vue` |
| `om_set` | 数组 | 运维全集配置（3 个分组：系统运维 / 故障处理 / 运维支撑） | `OMZone.vue` → `OmCard.vue` |
| `features_download_url` | 字符串 | OSMind 关键特性与价值 PDF 下载地址 | `OMZone.vue` |
| `guide_download_url` | 字符串 | OSMind 安装使用手册下载地址 | `OMZone.vue` |
| `tools_url` | 对象 | ITServiceTools 工具下载链接（base 基础能力 + feature 高级运维组件） | `OMZone.vue` |

## 设计原则

- **按文件拆分 locale**：仅 `zh.yaml`（无 en 页面），字段用基线名（snake_case，无 `_zh`/`_en` 后缀）
- **图片就近存放**：所有图片在 `images/` 下，yaml 中以 `./images/xxx.ext` 书写（必须带 `./` 前缀）
- **不存布局参数**：间距、断点等样式参数保留在组件 SCSS 中；`height`/`width` 为业务语义（标题高度、卡片宽度），非布局参数
- **URL 含特殊字符**：含 `%`、`:` 等的 URL 用单引号包裹

## 消费方式

```ts
import { computed } from 'vue';
import omContent from '#content/om';

// 模板 v-for 使用 computed（自动解包）
const helpContents = computed(() => omContent.zh.help_contents);
const qrCodes = computed(() => omContent.zh.qr_codes);
const OMSet = computed(() => omContent.zh.om_set);

// 脚本函数直接消费，用直接访问（非 computed）
const featuresDownloadUrl = omContent.zh.features_download_url;
const guideDownloadUrl = omContent.zh.guide_download_url;
const toolsUrl = omContent.zh.tools_url;
```

## Schema

### help_contents

| 字段 | 必填 | 说明 |
|------|------|------|
| (数组项) | 是 | 帮助提示文字 |

### qr_codes

| 字段 | 必填 | 说明 |
|------|------|------|
| `value` | 是 | 二维码图片路径（相对 yaml，`./images/xxx.png`） |
| `label` | 是 | 二维码下方标签文字 |

### om_set

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 分组标题 |
| `height` | 是 | 标题高度（px） |
| `card_list` | 是 | 分组下的卡片列表 |

### om_set.card_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 卡片标题 |
| `width` | 是 | 卡片宽度（px） |
| `items` | 是 | 卡片下的条目列表 |

### features_download_url / guide_download_url

| 字段 | 必填 | 说明 |
|------|------|------|
| (字符串) | 是 | 文件下载 URL |

### tools_url

| 字段 | 必填 | 说明 |
|------|------|------|
| `base` | 是 | 基础能力工具列表 |
| `feature` | 是 | 高级运维组件工具列表 |

### tools_url.base[] / tools_url.feature[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 文件名 |
| `url` | 是 | 下载地址 |
