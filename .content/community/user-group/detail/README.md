# 用户组详情数据

旧版用户组页面（`/zh/community/user-group/` 及详情页）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/community/user-group/detail`。英文详情页面不存在，因此仅维护 `zh.yaml`。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 城市用户组、成员汇总和用户组活动数据 |
| `images/legacy/` | 从 `src/assets/category/user-group/` 复制的原始图片资源 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `cities` | 数组 | 城市列表及各城市详情 |
| `members` | 数组 | 用户组成员汇总 |
| `user_activity` | 数组 | 用户组活动文章数据 |

## 设计原则

- zh/en 按文件拆分；因英文页面不存在，不创建 `en.yaml`。
- YAML 字段统一使用 snake_case，例如 `home_page`、`avatar_dark`、`img_dark`。
- 图片就近放在 `images/legacy/`，保留源目录和文件名；主题图片使用 `_dark` 后缀。
- 数据文件只保存内容和资源引用，不保存布局参数。

## 消费方式

```ts
import legacyUserGroupContent from '#content/community/user-group/detail';

const cities = legacyUserGroupContent.zh.cities;
```

## Schema

### `cities[]`

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 城市名称 |
| `img` | 是 | 亮色城市图片 |
| `img_dark` | 是 | 暗色城市图片 |
| `data` | 是 | 城市详情 |

### `cities[].data`

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 城市用户组标题 |
| `organizational` | 是 | 组织单位 |
| `organizer` | 是 | Organizer 列表 |
| `ambassador` | 是 | Ambassador 列表 |
| `member` | 是 | Member 列表 |
| `salon` | 否 | 沙龙活动列表 |
| `news` | 否 | 用户组新闻列表 |
| `showcase` | 否 | 用户案例列表 |

### 成员字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 姓名 |
| `position` | 否 | 所属单位 |
| `technology` | 否 | 技术领域 |
| `home_page` | 否 | 个人主页 |
| `forum` | 否 | 论坛链接 |
| `email` | 否 | 邮箱 |
| `avatar` | 是 | 亮色头像 |
| `avatar_dark` | 否 | 暗色头像 |
| `contribution` | 否 | 贡献说明 |
