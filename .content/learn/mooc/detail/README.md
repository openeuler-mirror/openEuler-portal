# MOOC 课程详情页

openEuler MOOC 课程详情页（`/zh/learn/mooc/detail/`）的静态配置数据源。按页面路径组织在 `.content/learn/mooc/detail/` 下。**仅中文版**——en 页面不存在，故只创建 `zh.yaml`。

> **注意**：`COURSE_LIST` 课程数据（章节树、教师、视频/PPT 链接）已从 i18n 文件 `mooc-data-zh.ts` 提取到 yaml。UI 文案（`MOOC`/`COURSE_DOWNLOAD`/`TEACHER_TEAM`/`PREV_TEXT`/`NEXT_TEXT`/`MOOC_COURSE`/`MOOC_CATALOG`）仍保留在 `i18n/learn/` 中。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版课程详情（1 门课程，9 章导航树） |
| `images/` | 2 张教师头像（yanglei.png、zhongyunan.png） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `course_list` | 数组 | 课程详情列表 | `TheMoocDetail.vue` |

## 设计原则

- **仅中文版**：en 页面不存在，禁止编造 en 数据，禁止创建 `en.yaml`
- **字段用 snake_case**：`course_h1`/`welcome`/`nav_data`/`video_link`/`ppt_link`
- **保留原 lowercase 字段名**：`label`/`key`/`introduction`/`teacher`/`desc`/`children`
- **nav_data 是递归树**：节点可通过 `children` 嵌套子节点，结构自洽
- **img 是 PNG**：`<img>` 消费，不带 `?raw`
- **UI 文案保留在 i18n**：`MOOC`/`COURSE_DOWNLOAD`/`TEACHER_TEAM` 等是 vue-i18n 翻译 key
- **teacher 字段仅出现在课程导读节点**（`key: introduction0`）

## 消费方式

```ts
import moocDetailContent from '#content/learn/mooc/detail';

const moocDetailData = computed(() => moocDetailContent.zh.course_list);
```

`TheMoocDetail.vue` 同时使用两个数据源：
- `moocDetailContent`（来自 `#content/learn/mooc/detail`）：课程数据（章节树、教师、视频/PPT）
- `i18n.mooc`（来自 vue-i18n）：UI 文案（按钮文案、面包屑、目录标题等）

## Schema

### course_list

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 课程 ID |
| `course_h1` | 是 | 课程主标题（H1） |
| `welcome` | 是 | 欢迎语 |
| `nav_data` | 是 | 导航目录树（递归嵌套） |

### nav_data[]（递归节点）

| 字段 | 必填 | 说明 |
|------|------|------|
| `label` | 是 | 节点显示名 |
| `key` | 否 | 节点唯一标识（章节导读节点必填，如 `introduction0`） |
| `introduction` | 否 | 章节导读文本数组（仅章节导读节点有） |
| `teacher` | 否 | 教师信息数组（仅课程导读节点 `introduction0` 有） |
| `desc` | 否 | 单元描述 |
| `video_link` | 否 | 视频地址 |
| `ppt_link` | 否 | PPT 下载地址 |
| `children` | 否 | 子节点数组（递归同结构） |

### teacher[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `img` | 是 | 教师头像（PNG，`<img>` 消费，`./images/xxx.png`） |
| `position` | 是 | 教师职位 |
| `name` | 是 | 教师姓名 |
