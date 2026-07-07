# home

首页数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，共用同一个 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 首页中文数据（含所有板块） |
| `en.yaml` | 首页英文数据（含所有板块） |
| `images/` | 图片资源（zh/en 共用） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `banner` | 数组 | 首页顶部轮播图 |
| `display_zone` | 数组 | 快捷入口（白皮书 / 安全 / 迁移 / 活动） |
| `intro` | 数组 | 介绍卡片（多样性设备 / 全场景 / 工具链） |
| `play_community` | 数组 | 玩转社区卡片 |
| `publisher` | 数组 | 合作伙伴 logo 列表 |
| `friendly_community` | 数组 | 友好社区 logo 列表 |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：如 `title`、`description`、`link`、`href`，禁止 `title_zh` / `title_en` 后缀
- **主题变体用 `_light` / `_dark` 后缀**：扁平字段，如 `icon_light` / `icon_dark` / `logo_light` / `logo_dark`
- **图片就近存放**：`images/<板块名>/` 下，文件名保留原名
- **zh/en 共用图**：不加后缀，两个 yaml 指向同一文件
- **zh/en 不共用图**：加 `_zh` / `_en` 后缀分别存放
- **不存放前端布局参数**（如 text_width）

## 消费方式

```ts
import homeContent from '#content/home';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';

const { isZh } = useLocale();
const homeData = computed(() => (isZh.value ? homeContent.zh : homeContent.en));

// 直接取板块数据
const bannerInfo = computed(() => homeData.value.banner);

// 主题字段在 .map() 中合并为 { light, dark } 对象（兼容组件模板 item.icon[theme] 写法）
const displayZoneData = computed(() =>
  homeData.value.display_zone.map((item) => ({
    ...item,
    icon: { light: item.icon_light, dark: item.icon_dark },
  }))
);
```

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | ✅ | PC 端背景图 |
| `bg_pad` | ✅ | 平板端背景图 |
| `bg_mb` | 可选 | 移动端背景图 |
| `bg_theme` | ✅ | `light` / `dark` |
| `text_theme` | 可选 | `dark` 表示白色文字 |
| `title` | ✅ | 标题（字符串或数组表示多行） |
| `subtitle` | 可选 | 副标题 |
| `btn` | 可选 | 按钮文案 |
| `href` | ✅ | 跳转链接 |
| `is_blank` | 可选 | 是否新窗口打开 |
| `attach` | 可选 | 附加装饰图 |
| `locale` | 可选 | 可见语言 `zh` / `en` / `zh,en`（默认 `zh,en`） |

### display_zone

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 入口标题 |
| `icon_light` / `icon_dark` | ✅ | 亮/暗主题图标 |
| `description` | ✅ | 入口描述 |
| `link` | ✅ | 入口链接 |

### intro

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 卡片标题 |
| `img_pc` / `img_mo` | ✅ | PC / 移动端图片 |
| `icon_light` / `icon_dark` | ✅ | 亮/暗主题图标 |
| `description` | 可选 | 描述（仅中文版展示，en.yaml 保留以维持结构对称） |

### play_community

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 卡片标题 |
| `bg` | ✅ | 卡片背景图 |
| `intro` | ✅ | 卡片简介 |
| `btn` | ✅ | 主按钮 `{ label, link }` |
| `textBtn` | 可选 | 文字按钮 `{ label, link }` |

### publisher

| 字段 | 必填 | 说明 |
|------|------|------|
| `logo_light` / `logo_dark` | ✅ | 亮/暗主题 logo |
| `href` | ✅ | 链接（en.yaml 中已是英文变体值） |

### friendly_community

| 字段 | 必填 | 说明 |
|------|------|------|
| `logo_light` / `logo_dark` | ✅ | 亮/暗主题 logo |
| `url` | ✅ | 社区链接 |
| `desc` | 可选 | 描述 |
