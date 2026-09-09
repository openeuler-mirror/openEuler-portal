# SIG 角色说明数据

SIG 角色说明（`/zh/sig/role-description/`、`/en/sig/role-description/`）的静态数据，由 `OPlusYamlContentVitePlugin` 合成为 `#content/sig/role-description`。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文角色说明 |
| `en.yaml` | English role descriptions |
| `images/` | 角色说明图片和 SVG 图标 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `community_member` | 对象 | 社区成员角色概览 |
| `contributor` | 对象 | Contributor 角色说明 |
| `committer` | 对象 | Committer 角色说明 |
| `maintainer` | 对象 | Maintainer 角色说明 |

## 设计原则

- 中英文按文件拆分，字段结构保持一致。
- 字段统一使用 snake_case，主题变体使用 `_dark` 后缀。
- 富文本说明保留 HTML 片段，由页面的 `v-dompurify-html` 消费。
- SVG 图标通过 `createSvgIcon` 转换为组件；普通图片作为 URL 使用。

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `community_member.title` | 是 | 社区成员板块标题 |
| `community_member.subtitle` | 是 | 板块说明 |
| `community_member.view_detail` | 是 | 详情链接文案 |
| `community_member.types` | 是 | 角色类型卡片 |
| `community_member.cards` | 是 | 成员提示卡片 |
| `contributor/committer/maintainer.id` | 是 | 角色锚点 ID |
| `contributor/committer/maintainer.title` | 是 | 角色标题 |
| `contributor/committer/maintainer.subtitle` | 是 | 角色说明段落 |
| `contributor/committer/maintainer.card_point_bg` | 是 | 要点图标背景 |
| `contributor/committer/maintainer.cards` | 是 | 角色要求、责任与权益卡片 |
