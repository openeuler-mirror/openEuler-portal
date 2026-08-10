# 线上会议（Online Meeting）

openEuler 线上会议页（`/zh/meeting/`）的静态配置数据源。按页面路径组织在 `.content/meeting/` 下。en 页面不存在，仅创建 `zh.yaml`。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版参与方式数据（4 项） |
| `images/` | 4 个 SVG 图标（会议指南/SIG 例会/技术直播/邮件列表） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `participate` | 数组 | 参与方式卡片 | `TheOnlineMeeting.vue` |

## 设计原则

- **仅 zh**：en 页面不存在，仅创建 `zh.yaml`，类型声明和组件消费只取 `zh`
- **SVG inline 图标**：路径带 `?raw`，组件用 `createSvgIcon` 转换为 Vue 组件消费
- **字段用基线名**：`we_chat`（原 `WeChat`）
- **可选字段**：`btn`/`text`/`we_chat` 按需出现

## 消费方式

```ts
import meetingContent from '#content/meeting';
import { createSvgIcon } from '~@/composables/createSvgIcon';

const participate = computed(() => meetingContent.zh.participate);
// 模板：<component :is="createSvgIcon(item.icon)" />
```

## Schema

### participate

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | 是 | 步骤图标（SVG，`?raw`，`createSvgIcon` 消费） |
| `title` | 是 | 标题 |
| `desc` | 是 | 描述 |
| `btn` | 否 | 按钮列表 |
| `btn[].text` | 否 | 按钮文案 |
| `btn[].url` | 否 | 按钮链接 |
| `text` | 否 | 微信群文案（配合 `we_chat`） |
| `we_chat` | 否 | 是否显示微信群入口 |
