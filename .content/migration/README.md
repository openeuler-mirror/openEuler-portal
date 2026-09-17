# 迁移门户页 / Migration Portal

迁移门户页（`/zh/migration/`、`/en/migration/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/migration` 虚拟模块。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据 |
| `en.yaml` | 英文页面数据 |
| `images/` | 所有图片资源（zh/en 共用，32 个文件） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `advantage` | object | 我们的优势：左右卡片 + 四宫格优势列表 |
| `download` | object | 快速下载：工具信息 + 下载按钮 |
| `instruction` | object | 轻松上手：四步迁移流程 + 背景图 |
| `path` | object | 迁移路径：PC 流程图 + 移动端步骤 |
| `case` | object | 政企案例：案例列表 + 按钮 |
| `guide` | object | 移植指南：指南链接 + 按钮 |
| `help` | object | 帮助咨询：提示文案 + 二维码 |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：双语已按文件拆分，无 `_zh` / `_en` 后缀
- **主题变体**：亮色/暗色用 `_light` / `_dark` 后缀（如 `img_light`、`img_dark`、`icon_light`、`icon_dark`）
- **图片就近存放**：所有图片放在 `./images/`，文件名保留原名
- **zh/en 共用图**：不加后缀（如 `portal-advantage-left.png`）
- **zh/en 差异化图**：保留原文件名指示（如 zh 用 `portal-path-content.png`，en 用 `implementation.png`）
- **图片路径**：以 `./images/xxx.ext` 形式书写，带 `./` 前缀

## 消费方式

```ts
import migrationContent from '#content/migration';
import { useData } from 'vitepress';

const { lang } = useData();
const portalInfo = computed(() => migrationContent[lang.value as 'zh' | 'en']);
```

## Schema

### advantage

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| card_top_left.url | 是 | 左卡片图片 |
| card_top_left.title_01 | 是 | 左卡片标题1 |
| card_top_left.title_02 | 是 | 左卡片标题2 |
| card_top_left.description | 是 | 左卡片描述 |
| transition_right | 是 | 右向过渡箭头图片 |
| transition_down | 是 | 下向过渡箭头图片 |
| card_top_right.url | 是 | 右卡片图片 |
| card_top_right.title_01 | 是 | 右卡片标题1 |
| card_top_right.title_02 | 是 | 右卡片标题2 |
| card_top_right.description | 是 | 右卡片描述 |
| benefit.light | 是 | 亮色主题优势列表 |
| benefit.light[].icon | 是 | 图标 |
| benefit.light[].title | 是 | 标题 |
| benefit.light[].link | 是 | 链接 |
| benefit.dark | 是 | 暗色主题优势列表 |
| benefit.dark[].icon | 是 | 图标 |
| benefit.dark[].title | 是 | 标题 |
| benefit.dark[].link | 是 | 链接 |

### download

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| left.img_light | 是 | 亮色主题工具图片 |
| left.img_dark | 是 | 暗色主题工具图片 |
| left.name | 是 | 工具名称 |
| left.version | 是 | 版本号 |
| btns | 是 | 按钮列表 |
| btns[].name | 是 | 按钮名称 |
| btns[].link | 否 | 按钮链接（与 soft_links 二选一） |
| btns[].soft_links | 否 | 下拉链接列表 |
| btns[].soft_links[].name | 是 | 链接名称 |
| btns[].soft_links[].link | 是 | 链接地址 |
| bg_url | 是 | 背景图片 |

### instruction

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| list | 是 | 步骤列表 |
| list[].title | 是 | 步骤标题 |
| list[].content | 是 | 步骤内容（多行用 \n 分隔） |
| list[].sogan | 是 | 步骤标语 |
| bg.url_1_light | 是 | PC 端亮色背景1 |
| bg.url_2_light | 是 | PC 端亮色背景2 |
| bg.url_mo_1_light | 是 | 移动端亮色背景1 |
| bg.url_mo_2_light | 是 | 移动端亮色背景2 |
| bg.url_mo_3_light | 是 | 移动端亮色背景3 |
| bg.url_1_dark | 是 | PC 端暗色背景1 |
| bg.url_2_dark | 是 | PC 端暗色背景2 |
| bg.url_mo_1_dark | 是 | 移动端暗色背景1 |
| bg.url_mo_2_dark | 是 | 移动端暗色背景2 |
| bg.url_mo_3_dark | 是 | 移动端暗色背景3 |

### path

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| img_light | 是 | 亮色主题路径图 |
| img_dark | 是 | 暗色主题路径图 |
| img_mo.top.title | 是 | 移动端上半部分标题 |
| img_mo.top.description | 是 | 移动端上半部分描述 |
| img_mo.top.img | 是 | 移动端上半部分图片 |
| img_mo.bottom.title | 是 | 移动端下半部分标题 |
| img_mo.bottom.description | 是 | 移动端下半部分描述 |
| img_mo.bottom.img | 是 | 移动端下半部分图片 |

### case

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| list | 是 | 案例列表 |
| list[].name | 是 | 案例名称 |
| list[].description | 是 | 案例描述 |
| list[].link | 是 | 案例链接 |
| btn.text | 是 | 按钮文案 |
| btn.link | 是 | 按钮链接 |

### guide

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| list | 是 | 指南列表 |
| list[].label | 是 | 指南标题 |
| list[].link | 是 | 指南链接 |
| btn.text | 是 | 按钮文案 |
| btn.link | 是 | 按钮链接 |

### help

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |
| tips | 是 | 提示文案列表 |
| tips[].text_left | 是 | 左侧文案 |
| tips[].link_text | 是 | 链接文案 |
| tips[].text_right | 是 | 右侧文案 |
| tips[].link | 是 | 链接 |
| offical_qr.img | 是 | 官方公众号二维码图片 |
| offical_qr.text | 是 | 公众号名称 |
| assistant_qr.img | 是 | 小助手二维码图片 |
| assistant_qr.text | 是 | 小助手名称 |
