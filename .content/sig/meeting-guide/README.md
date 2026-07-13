# sig/meeting-guide

会议指南页（`/zh/sig/meeting-guide/`）数据源。按 skill 文档标准模式组织。**该页面仅中文版，无对应 en 页面**，故只有 `zh.yaml`。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文数据（含所有板块） |
| `images/` | SVG 图标资源（走 `?raw` inline 管线） |

## 数据板块

`zh.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `meeting_type` | 数组 | 会议类型卡片（单 SIG 组工作会议 / Working Group 工作会议） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` 一个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：如 `title`、`intro`、`icon`
- **图片就近存放**：`images/` 下，文件名保留原名
- **资源管线由 `?raw` 后缀显式控制**：SVG 图标路径带 `?raw`（如 `./images/x.svg?raw`），由 Vite 返回 SVG 字符串，组件用 `createIcon` 包裹为组件后传给 `OCard` `:icon` prop
- **无 en 页面**：不创建 `en.yaml`，不编造英文数据

## 消费方式

```ts
import meetingGuideContent from '#content/sig/meeting-guide';
import { createIcon } from '~@/components/createIcon';
import { computed } from 'vue';

// 仅 zh，固定取值（无 en 页面）
const typeOfMeeting = computed(() => meetingGuideContent.zh.meeting_type);
// 模板：<OCard :title="item.title" :detail="item.intro" :icon="createIcon(item.icon)" />
```

## Schema

### meeting_type

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 卡片标题 |
| `icon` | ✅ | SVG 路径（带 `?raw`），可选：`one-sig` / `more-sig`（对应 `./images/<key>.svg?raw`） |
| `intro` | ✅ | 卡片简介 |
