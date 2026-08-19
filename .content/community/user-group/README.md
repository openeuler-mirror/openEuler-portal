# 用户组页 / User Group

用户组主页（`/zh/community/user-group/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/community/user-group` 虚拟模块。en 页面不存在，仅创建 `zh.yaml`。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（banner + guide + intro + question + cities） |
| `images/` | 77 张图片（banner/wechat/角色背景/角色 logo/城市图片/大使头像） |

> detail 子页面（`/zh/community/user-group/detail/`）仍从 `~@/data/user-group/index.ts` 读取 `guideData`/`questionData`/`detailData`/`linkData`，不在本数据范围。

## 数据板块

| 板块 | 类型 | 用途 | 消费组件 |
|------|------|------|---------|
| `banner` | object | 顶部 banner（标题/描述/按钮/背景图） | `UserGroupBanner.vue` |
| `guide` | object | 用户组介绍与加入指南 | `UserGroupGuide.vue` |
| `intro` | object | 成员角色、权益与义务 | `UserGroupIntro.vue` |
| `question` | object | 如何成为 Organizer/Ambassador | `UserGroupQuestion.vue` |
| `cities` | array | 城市用户组列表（10 个城市） | `UserGroupList.vue` |

## 设计原则

- **仅 zh**：en 页面不存在
- **字段用基线名**：camelCase 转 snake_case（`avatarDark` → `avatar_dark`、`homePage` → `home_page`）
- **主题变体**：大使头像含 `avatar`（亮）/ `avatar_dark`（暗）
- **混合类型数组**：`intro.introList[].rights` / `obligation` 的项可以是字符串或 `{ text, operation, url }` 对象
- **城市数据嵌套**：`cities[]` 每项含 `name`（城市名）/ `img`（城市图片）/ `data`（城市数据，含 ambassador/showcase 等）
- **PNG/JPG 不带 `?raw`**：`<img>` 消费

## 消费方式

```ts
import { computed } from 'vue';
import userGroupContent from '#content/community/user-group';

const bannerData = computed(() => userGroupContent.zh.banner);
// 模板：{{ bannerData.title }} / :href="bannerData.href" / ...
```

## Schema

### 顶层

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner` | 是 | 顶部 banner 配置 |
| `guide` | 是 | 用户组介绍与加入指南 |
| `intro` | 是 | 成员角色、权益与义务 |
| `question` | 是 | 如何成为 Organizer/Ambassador |
| `cities` | 是 | 城市用户组列表 |

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | 是 | banner 背景图 |
| `title` | 是 | 标题 |
| `desc` | 是 | 描述 |
| `btn` | 是 | 按钮文案 |
| `href` | 是 | 按钮链接 |

### guide

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `subtitle1` | 是 | "什么是用户组？" |
| `subtitle2` | 是 | "加入用户组" |
| `desc1` | 是 | 用户组介绍 |
| `desc2` | 是 | "关注邮件列表" |
| `desc3` | 是 | "加入微信群" |
| `tip1` | 是 | 小助手提示 |
| `tip2` | 是 | 备注提示 |
| `link1` | 是 | 邮箱地址 |
| `link2` | 是 | 邮件列表链接 |
| `mail` | 是 | 邮件按钮文案 |
| `wechat` | 是 | 微信二维码图片 |

### intro

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `desc` | 是 | 板块描述 |
| `introList` | 是 | 角色列表（3 项：Member/Ambassador/Organizer） |

### intro.introList[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 角色标题数组（每项含 `name`/`desc`） |
| `background` | 是 | 角色背景图 |
| `logo` | 是 | 角色 logo |
| `rights` | 是 | 权益列表（字符串或 `{ text, operation, url }`） |
| `obligation` | 是 | 义务列表（字符串或 `{ text, operation, url }`） |

### question

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `desc1` | 是 | 申请说明 |
| `desc2` | 是 | 评审说明 |
| `mail` | 是 | 申请邮箱 |
| `subtitle1` | 是 | Organizer 标题 |
| `intro1` | 是 | Organizer 介绍 |
| `subtitle2` | 是 | Ambassador 标题 |
| `intro2` | 是 | Ambassador 介绍 |
| `tip` | 是 | 贡献条件列表 |

### cities[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 城市名 |
| `img` | 是 | 城市图片 |
| `data` | 是 | 城市数据（含 `title`/`organizational`/`organizer`/`ambassador`/`salon`/`showcase`） |

### cities[].data.ambassador[] / organizer[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 姓名 |
| `position` | 是 | 单位 |
| `technology` | 是 | 技术领域数组 |
| `home_page` | 否 | 个人主页链接 |
| `avatar` | 是 | 亮色头像 |
| `avatar_dark` | 是 | 暗色头像 |
| `contribution` | 是 | 贡献描述 |
| `forum` | 否 | 论坛链接（部分城市） |
| `email` | 否 | 邮箱（部分城市） |
