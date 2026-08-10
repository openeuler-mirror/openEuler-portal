# 贡献攻略（Contribution）

openEuler 贡献攻略页（`/zh/community/contribution/`、`/en/community/contribution/`）的静态配置数据源。按页面路径组织在 `.content/community/contribution/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，图片就近存放在共用 `images/` 子目录。

> **注意**：配置型数据（图片路径、链接列表、PDF URL）已从 i18n 文件提取到 yaml。翻译文案（`LOOK_DESC`/`LOOK_MAP`/`PRINT_MAP`）仍保留在 `i18n/contribution/` 中，由 vue-i18n 管理。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版贡献攻略配置（4 张背景图 + PDF URL + 39 项链接列表） |
| `en.yaml` | 英文版贡献攻略配置（4 张背景图 + PDF URL + 33 项链接列表） |
| `images/` | 8 张贡献地图背景图（zh/en 差异化 × 亮色/暗色 × PC/移动端） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `background_img_light` / `background_img_dark` | 字符串 | PC 端贡献地图背景图（亮色/暗色） | `ContributionMap.vue` |
| `background_img_h5_light` / `background_img_h5_dark` | 字符串 | 移动端贡献地图背景图 | `ContributionMap.vue` |
| `download_pdf_url` | 字符串 | 贡献攻略地图 PDF 下载链接 | `ContributionMap.vue` |
| `link_list` | 数组 | 贡献地图热点链接列表（与地图定位区域一一对应） | `ContributionMap.vue` |

## 设计原则

- **按文件拆分 locale**：配置数据已拆分到 `zh.yaml` / `en.yaml`
- **zh/en 差异化图片**：背景图按语言不同（文件名含 `_zh`/`_en` 后缀）
- **亮色/暗色变体**：用 `_light`/`_dark` 后缀区分
- **PNG 不带 `?raw`**：背景图用 `<img>` 消费
- **翻译文案保留在 i18n**：`LOOK_DESC`/`LOOK_MAP`/`PRINT_MAP` 是 vue-i18n 翻译 key，不从 yaml 读取
- **zh/en link_list 长度不同**：zh 39 项，en 33 项（en 缺少部分无英文对应的链接）

## 消费方式

```ts
import contributionContent from '#content/community/contribution';
import { useData } from 'vitepress';

const { lang } = useData();
const contributionConfig = computed(
  () => contributionContent[lang.value as 'zh' | 'en']
);

// 模板中直接使用
// <img :src="contributionConfig.background_img_light" />
// <a :href="contributionConfig.download_pdf_url">{{ i18n.contribution.PRINT_MAP }}</a>
// v-for="item in contributionConfig.link_list" @click="goLink(item.url, item.blank)"
```

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `background_img_light` | 是 | PC 端亮色背景图（PNG，`<img>` 消费） |
| `background_img_dark` | 是 | PC 端暗色背景图 |
| `background_img_h5_light` | 是 | 移动端亮色背景图 |
| `background_img_h5_dark` | 是 | 移动端暗色背景图 |
| `download_pdf_url` | 是 | PDF 下载链接（相对站点根目录） |
| `link_list` | 是 | 热点链接列表 |
| `link_list[].url` | 是 | 链接地址（可能含 URL 编码或锚点） |
| `link_list[].blank` | 是 | 是否新窗口打开 |
