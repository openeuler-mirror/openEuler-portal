# 首页（Home）

openEuler 首页（`/zh/`、`/en/`）的静态配置数据源。数据目录 `.content/home/` 下共存两种组织模式：

- **`banner.yaml`** — 首页轮播图，单文件 + `_zh`/`_en` 后缀，组件用 `foldI18n()` 按当前语言折叠字段
- **`zh.yaml` / `en.yaml`** — 其余 7 个板块，按文件拆分 locale，字段用基线名（无 `_zh`/`_en` 后缀）

图片就近存放在共用 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线输出带 hash 的真实 URL。`#content/home` 虚拟模块的默认导出为 `{ banner, zh, en }`。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `banner.yaml` | 首页轮播图实体（单文件，`_zh`/`_en` 后缀 + foldI18n） |
| `zh.yaml` | 中文版首页数据（7 个板块，按文件拆分 locale） |
| `en.yaml` | 英文版首页数据（7 个板块，结构与 zh 一致） |
| `images/` | 共用图片资源；banner 图按活动名分子目录（如 `images/release/`），其余板块图片扁平存放 |

## 数据板块

### banner.yaml（foldI18n 模式）

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | 是 | PC 端背景图（中英文共用） |
| `bg_pad` | 是 | 平板端背景图（中英文共用） |
| `bg_mb` | 可选 | 移动端背景图（中英文共用时不加后缀） |
| `bg_mb_zh` / `bg_mb_en` | 可选 | 移动端背景图（中英文不同时加后缀） |
| `bg_theme` | 是 | `light` / `dark`，控制指示器颜色 |
| `text_theme` | 可选 | `dark` 表示白色文字 |
| `title_zh` / `title_en` | 是 | 标题（字符串或数组表示多行） |
| `subtitle_zh` / `subtitle_en` | 可选 | 副标题 |
| `btn_zh` / `btn_en` | 可选 | 按钮文案（不填则无按钮） |
| `href_zh` / `href_en` | 是 | 跳转链接 |
| `is_blank` | 可选 | 是否新窗口打开 |
| `attach` | 可选 | 附加装饰图 |
| `locale` | 可选 | 可见语言 `zh` / `en` / `zh,en`（默认 `zh,en`） |
| `light` / `dark` | 可选 | 主题变体覆盖字段 |

### zh.yaml / en.yaml（文件拆分模式）

板块按页面从上到下的视觉顺序排列（banner 下方开始）：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `display_zone` | 数组 | 首页快捷入口四宫格 | `HomeDisplayZone.vue` |
| `intro` | 数组 | openEuler 介绍三步曲（左列表 + 右大图） | `HomeIntro.vue` |
| `play_community` | 数组 | 玩转社区卡片（贡献者 + 捐赠人） | `HomePlayCommunity.vue` |
| `vitality` | 数组 | 社区活力数据配置（数值由 API 填充） | `HomePlayCommunity.vue` |
| `case` | 数组 | 案例展示行业分类（tab + 插图） | `HomeShowCase.vue`、`DetailCase.vue` |
| `friendly_community` | 数组 | 友情社区 logo 墙 | `HomeFriendlyCommunity.vue` |
| `publisher` | 数组 | 合作伙伴 logo 轮播墙 | `HomePartner.vue` → `HomeSwiper.vue` |

## 设计原则

- **banner.yaml**：多语言用 `_zh` / `_en` 后缀，不做顶层 zh/en 分离；PC/Pad 背景图中英文共用，仅移动端不同时加后缀；不存放前端布局参数
- **zh.yaml / en.yaml**：按文件拆分 locale，字段用基线名（无 `_zh`/`_en` 后缀）；主题变体用 `_light`/`_dark` 后缀；zh/en 共用图不加后缀，差异化图保留 `_zh_`/`_en_` 后缀
- **图片就近存放**：所有图片在 `images/` 下，yaml 中以 `./images/xxx.ext` 书写（必须带 `./` 前缀）；banner 图按活动名分子目录
- **SVG 消费方式**：inline 图标（继承 currentColor）路径带 `?raw`，普通 `<img>`/背景图的 SVG 不带 `?raw`
- **不存布局参数**：间距、断点等样式参数保留在组件 SCSS 中

## 消费方式

### banner（foldI18n 模式）

```ts
import homeContent from '#content/home';
import { foldI18n } from '~@/shared/content';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
// foldI18n 将 _zh/_en 后缀字段提升为无后缀基线名
const bannerInfo = computed(() => foldI18n(homeContent.banner, locale.value));
```

### zh.yaml / en.yaml（文件拆分模式）

```ts
import { computed } from 'vue';
import homeContent from '#content/home';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();

// 取当前语言的某个板块
const displayZoneData = computed(() => homeContent[locale.value].display_zone);

// 主题字段按 theme 取值（locale 已按文件拆分，无需再取 [locale]）
// 模板：:src="theme === 'light' ? item.icon_light : item.icon_dark"

// SVG inline 图标消费（路径带 ?raw 时）
import { createSvgIcon } from '~@/composables/createSvgIcon';
// 模板：<component :is="createSvgIcon(item.icon)" />
```

## 新增轮播图

1. 在 `banner.yaml` 列表**顶部**插入新记录（最新排前面）
2. 把背景图放到 `images/<活动名>/` 目录下
3. 提 PR

## Schema（zh.yaml / en.yaml）

### display_zone

首页快捷入口四宫格。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 入口标题 |
| `icon_light` | 是 | 亮色主题图标（SVG，`<img>` 消费，无 `?raw`） |
| `icon_dark` | 是 | 暗色主题图标（SVG，`<img>` 消费，无 `?raw`） |
| `description` | 是 | 入口描述 |
| `link` | 是 | 入口链接 |

### intro

openEuler 介绍三步曲。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 介绍标题 |
| `img_pc` | 是 | PC 端展示图（双语差异化，文件名含 `_zh_`/`_en_` 后缀） |
| `img_mo` | 是 | 移动端展示图（双语差异化） |
| `icon_light` | 是 | 列表图标亮色（zh/en 共用） |
| `icon_dark` | 是 | 列表图标暗色（zh/en 共用） |
| `description` | 是 | 介绍描述（zh/en 相同） |

### play_community

玩转社区卡片。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 卡片标题 |
| `bg` | 是 | 卡片背景图（PNG，`background-image` 消费，zh/en 共用） |
| `intro` | 是 | 卡片简介 |
| `btn.label` | 是 | 主按钮文案 |
| `btn.link` | 是 | 主按钮链接 |
| `textBtn.label` | 否 | 次按钮文案（en 第二项无 `textBtn`） |
| `textBtn.link` | 否 | 次按钮链接 |

### vitality

社区活力数据配置（实际数值由 API 动态填充）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `vitalityValue` | 是 | 占位数值（API 返回后覆盖，默认 0） |
| `vitalityKey` | 是 | 与 API 返回字段对应的键名（如 `contributors`） |
| `vitalityLabel` | 是 | 数据项标签 |

### case

案例展示行业分类（en 只有 5 项，缺 `education` 和 `cloud-computing`）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `label` | 是 | 行业名称 |
| `icon` | 是 | 行业图标（SVG，inline 消费，路径带 `?raw`，用 `createSvgIcon` 转换） |
| `img` | 是 | 行业插图（PNG，`<OFigure>` 消费，无 `?raw`） |

### friendly_community

友情社区 logo 墙。

| 字段 | 必填 | 说明 |
|------|------|------|
| `logo_light` | 是 | 亮色主题 logo（PNG，`<OFigure>` 消费） |
| `logo_dark` | 是 | 暗色主题 logo（PNG） |
| `url` | 是 | 社区官网链接 |
| `desc` | 否 | 补充说明（仅部分社区有，可为空字符串） |

### publisher

合作伙伴 logo 轮播墙（en 版 `href` 优先取原 `href_en`，无则回退 `href`）。

| 字段 | 必填 | 说明 |
|------|------|------|
| `logo_light` | 是 | 亮色主题 logo（PNG，`<OFigure>` 消费） |
| `logo_dark` | 是 | 暗色主题 logo（PNG） |
| `href` | 是 | 合作伙伴官网链接 |
