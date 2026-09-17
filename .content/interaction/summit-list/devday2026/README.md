# openEuler Developer Day 2026 / 开发者大会 2026

openEuler Developer Day 2026 页面（`/zh/interaction/summit-list/devday2026/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/interaction/summit-list/devday2026` 虚拟模块。en 页面不存在，仅创建 `zh.yaml`。

> 会议议程、介绍、卡片、回顾等数据来自 CMS（`#cms`），不在本数据范围。本 yaml 只包含 banner 配置。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文 banner 配置（bg/bg_mb/text_img/btn/href + live 备用） |
| `images/` | 3 张图片（banner.jpg + banner-mb.jpg + banner-text.png） |

## 数据板块

| 板块 | 类型 | 用途 | 消费组件 |
|------|------|------|---------|
| `banner` | object | 顶部 banner 配置 | `MinisiteBanner.vue` |
| `live` | object | 直播配置（备用，模板当前未使用） | — |

## 设计原则

- **仅 zh**：en 页面不存在
- **字段用基线名**：snake_case（`bg_mb` 由 `bgMb` 转换，`text_img` 由 `textImg` 转换）
- **PNG/JPG 不带 `?raw`**：`<img>` / CSS 背景图消费
- **CMS 数据不在范围**：会议议程等内容来自 `#cms`，本 yaml 只含 banner 静态配置

## 消费方式

```ts
import devdayContent from '#content/interaction/summit-list/devday2026';
const data = devdayContent.zh;
// 模板：<MinisiteBanner :banner-data="data.banner" />
```

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg` | 是 | PC banner 背景图（JPG） |
| `bg_mb` | 是 | 移动端 banner 背景图（JPG） |
| `text_img` | 是 | banner 文字图片（PNG） |
| `btn` | 是 | 按钮文案 |
| `href` | 是 | 按钮链接（观看回放） |

### live

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 直播标题 |
| `url` | 是 | 直播链接 |
