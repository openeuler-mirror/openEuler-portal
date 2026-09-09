# SIG 会议指南数据

SIG 会议指南（`/zh/sig/meeting-guide/`）的静态数据，由 `OPlusYamlContentVitePlugin` 合成为 `#content/sig/meeting-guide`。英文页面不存在，因此仅维护 `zh.yaml`。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文会议类型数据 |
| `images/` | 会议指南使用的图片和 SVG 图标 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `type_of_meeting` | 数组 | SIG 会议类型卡片 |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 会议类型名称 |
| `icon` | 是 | SVG 图标资源 |
| `intro` | 是 | 会议类型说明 |
