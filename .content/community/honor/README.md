# 社区荣誉页数据

`/zh/community/honor/` 页面的数据源。当前只有中文版本（`zh.yaml`），图片存放在 `images/` 子目录。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 页面 UI 文案 + 组件图片 + 5 年荣誉数据 |
| `images/` | 页面所有图片（banner/卡片背景/企业 logo/人物头像/证书/项目背景，共 173 张） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `ui` | 对象 | 页面 UI 文案（标题、按钮文案） |
| `images` | 对象 | 组件图片资源（banner、新闻卡片背景、个人卡片背景） |
| `years` | 对象 | 年度荣誉数据（2021-2025，各年结构不同） |

## 设计原则

- 按 locale 拆分数据文件（当前只有 `zh.yaml`，无英文版本）
- 主题变体用 `_light`/`_dark` 后缀（卡片背景图）
- 图片就近存放到 `images/`，文件名保留原名；同名跨年加年份前缀（如 `2023_default.png`）
- 不存布局参数，只存内容数据
- 各年度数据结构不同（2021 只有 news，2025 有 company/contribution/project/nomination），按年实际内容存储

## 消费方式

```ts
import honorContent from '#content/community/honor';

const honorData = computed(() =>
  Object.entries(honorContent.zh.years).map(([year, data]) => ({
    label: year,
    data,
  }))
);
const ui = computed(() => honorContent.zh.ui);
const images = computed(() => honorContent.zh.images);
// images.banner / images.new_card_bg_light / images.personal_card_bg_dark ...
```

## Schema

### ui

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 页面标题「社区荣誉」 |
| view_news | 是 | 「查看新闻」按钮文案 |
| view_certificate | 是 | 「查看证书」按钮文案 |
| project_address | 是 | 「项目地址」链接文案 |
| project_address_1 | 是 | 「项目地址1」链接文案 |
| project_address_2 | 是 | 「项目地址2」链接文案 |

### images

| 字段 | 必填 | 说明 |
|------|------|------|
| banner | 是 | 顶部 banner 背景图 |
| new_card_bg_light | 是 | 新闻卡片亮色背景 |
| new_card_bg_dark | 是 | 新闻卡片暗色背景 |
| personal_card_bg_light | 是 | 个人卡片亮色背景 |
| personal_card_bg_dark | 是 | 个人卡片暗色背景 |

### years

按年份键索引的对象（`'2021'` ~ `'2025'`），各年结构不同：

| 板块 | 2021 | 2022 | 2023 | 2024 | 2025 | 说明 |
|------|------|------|------|------|------|------|
| news | 5条 | 3条 | 2条 | — | — | 新闻列表（name/link/certificate?） |
| company | — | — | — | — | 27家 | 突出贡献单位（title/list/tips） |
| contribution | — | 10人+3队 | 34人 | 28人 | 20人 | 贡献奖（title/personal/team?） |
| project | — | — | 6类29项 | 6类20项 | 7类20项 | 年度优秀项目（title/list） |
| nomination | — | — | — | 71人 | 49人 | 提名者（title/list） |
| notice | — | 有 | 有 | 有 | 有 | 公告文字 |

### years.\<year\>.news[]

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 新闻标题 |
| link | 是 | 新闻链接 |
| certificate | 否 | 证书图片 `./images/xxx.png` |

### years.\<year\>.company

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题数组 |
| list | 是 | 企业 logo 列表（{ light, dark }） |
| tips | 否 | 排名说明 |

### years.\<year\>.contribution

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题数组 |
| personal | 是 | 个人奖分类列表（{ title?, list[] }） |
| team | 否 | 团队奖（{ title, list[] }） |
| notice | 否 | 内部公告 |

### years.\<year\>.project

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题数组 |
| list | 是 | 项目分类列表（{ title, bg, bgDark, list[] }） |

### years.\<year\>.nomination

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| list | 是 | 提名者列表（{ name }） |
