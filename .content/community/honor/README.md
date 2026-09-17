# 社区荣誉页 / Community Honor

社区荣誉页（`/zh/community/honor/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/community/honor` 虚拟模块。en 页面不存在，仅创建 `zh.yaml` 系列。按年份分文件（2021-2025），组件按 slug（文件名）索引取对应年份数据。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `2021.yaml` | 2021 年荣誉数据（仅 news 板块） |
| `2022.yaml` | 2022 年荣誉数据（news + contribution + notice） |
| `2023.yaml` | 2023 年荣誉数据（news + project + contribution + notice） |
| `2024.yaml` | 2024 年荣誉数据（project + contribution + nomination + notice） |
| `2025.yaml` | 2025 年荣誉数据（company + contribution + project + nomination + notice） |
| `images/` | 164 张图片（公司 logo、个人头像、项目卡片背景、证书等） |

> 组件 UI 资源（banner、卡片背景图 `new-card-bg.jpg` 等、UI 图标 `icon-chevron-right.svg` 等）保留在组件 import 中，不在数据范围。

## 数据板块

每个年份的 yaml 可能包含以下板块（不是每年都有全部板块）：

| 板块 | 类型 | 用途 |
|------|------|------|
| `news` | array | 新闻/荣誉列表（含 `name` / `link` / 可选 `certificate`） |
| `company` | object | 突出贡献单位（含 `title` / `list`[logo] / `tips`） |
| `contribution` | object | 贡献奖（含 `title` / `personal`[分组] / `team`） |
| `project` | object | 年度优秀项目（含 `title` / `list`[分组卡片]） |
| `nomination` | object | 提名者（含 `title` / `list`[name]） |
| `notice` | string | 公告文案 |

## 设计原则

- **按年份分文件**：每个 yaml 文件是一个年份的数据，slug 即文件名（`2021` ~ `2025`）
- **仅 zh**：en 页面不存在，不创建 en.yaml
- **图片路径转换**：原 `~@/assets/category/honor/xxx.png` → `./images/xxx.png`（保留子目录 `avatar/2025/`、`company/2025/`）
- **主题变体**：logo 含 `light` / `dark` 两个字段；项目卡片背景含 `bg` / `bg_dark` 两个字段（原 `bgDark` 已转 `bg_dark`）
- **板块可选**：不是每年都有全部板块，类型声明用可选字段
- **PNG/JPG 不带 `?raw`**：`<img>` / CSS 背景图消费

## 消费方式

```ts
import honorContent from '#content/community/honor';

// 按年份 slug 索引取数据
const honorData = [
  { label: '2021', data: honorContent['2021'] },
  { label: '2022', data: honorContent['2022'] },
  // ...
];
// 模板：v-for="tab in honorData" / tab.data?.news / tab.data?.company / ...
```

## Schema

### 顶层（按年份）

| 字段 | 必填 | 说明 |
|------|------|------|
| `news` | 否 | 新闻列表 |
| `company` | 否 | 突出贡献单位 |
| `contribution` | 否 | 贡献奖 |
| `project` | 否 | 年度优秀项目 |
| `nomination` | 否 | 提名者 |
| `notice` | 否 | 公告文案 |

### news[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 新闻名称 |
| `link` | 是 | 新闻链接 |
| `certificate` | 否 | 证书图片路径 |

### company

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题（字符串数组） |
| `list` | 是 | logo 列表（每项含 `light`/`dark`） |
| `tips` | 是 | 排序说明文案 |

### contribution

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题（字符串数组） |
| `personal` | 否 | 个人奖分组列表 |
| `team` | 否 | 团队奖 |

### contribution.personal[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 分组标题 |
| `list` | 是 | 个人卡片列表（含 `name`/`post`/`img`/`detail`） |

### contribution.team

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 团队奖标题 |
| `list` | 是 | 团队卡片列表（含 `name`/`detail`/`link`） |

### project

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题（字符串数组） |
| `list` | 是 | 项目分组列表（含 `title`/`bg`/`bg_dark`/`list`） |

### project.list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 分组标题 |
| `bg` | 是 | 亮色卡片背景图 |
| `bg_dark` | 是 | 暗色卡片背景图 |
| `list` | 是 | 项目卡片列表（含 `name`/`detail`/`link`/可选 `link1`） |

### nomination

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 提名标题 |
| `list` | 是 | 提名者列表（每项含 `name`） |
