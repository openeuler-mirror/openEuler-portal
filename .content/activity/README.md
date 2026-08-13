# activity

活动事件数据源。每条记录是一个完整实体。

## 文件说明

| 文件 | 说明 |
|------|------|
| `events.yaml` | 活动事件实体（Meetup 等），slug 为唯一键（由 title_en slugify 派生，仅 zh 路由化） |
| `summit.yaml` | 峰会实体（Summit / Developer Day），id 为唯一键 |
| `plan.yaml` | 年度活动计划，按类别组织 |
| `global_events.yaml` | 全球活动回顾（英文专属），仅在英文页面展示 |

## 设计原则

- **数据即 API 响应**：每条记录是完整实体，不做 zh/en 顶层分离
- **slug 派生而非存储**：zh 详情页 URL 形如 `/zh/interaction/event-list/${slug}`，由 `slugifyEvent(ev)` 在构建时（`[event].paths.ts`）与运行时（`EventDetail.vue`）一致派生
- **仅 zh 路由化**：en 版活动列表项跳外站，不读 yaml 详情，故 en 不创建动态路由
- **旧 URL 兼容**：旧链接 `/interaction/event-list/detail/?id=X` 由重定向组件（`EventDetailRedirect.vue`）统一跳转到 latest 列表页（不精确定位）
- **无 UI 配置**：筛选选项等页面配置不在此处
- **snake_case**：所有字段名下划线连接
- **多语言**：`_zh` / `_en` 后缀，通过 `foldI18n()` 折叠

## 新增活动

1. 在 `events.yaml` 末尾添加一条记录（title_en 必填，用于派生 slug）
2. 把议程图片放到 `images/` 目录下（命名：`detail-<YYMMDD>.jpg`）
3. 提 PR

注意：title_en 经 slugify 后必须全局唯一，否则会生成重复 slug（构建时 `[event].paths.ts` 自动去重，但会导致后插入的活动详情页 404）。

## 活动结束后的回顾

1. 找到 `events.yaml` 中对应条目
2. 将 `status` 改为 `ended`
3. 删除 `signup_url` / `signup_url_mb`
4. 添加 `review_url`
5. 提 PR

## Schema

### events.yaml

顶层 YAML 数组，每项字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `title_zh` / `title_en` | ✅ | 中英文标题，title_en 经 slugify 后作为详情页路由 slug |
| `start_date` | ✅ | 开始时间 `YYYY-MM-DD HH:mm` |
| `end_date` | ✅ | 结束时间 |
| `address_zh` / `address_en` | 可选 | 地址（线上活动不填） |
| `city_zh` / `city_en` | 可选 | 城市（用于筛选，线上活动不填） |
| `synopsis_zh` / `synopsis_en` | 可选 | 简介 |
| `status` | ✅ | `ended` / `ongoing` |
| `format` | ✅ | `offline` / `online` / `hybrid` |
| `series` | ✅ | 系列标识（如 `meetup`） |
| `group_name` | 可选 | 关联 SIG（如 `sig-Arm`） |
| `poster_image` | 可选 | PC 端海报 |
| `poster_image_mb` | 可选 | 移动端海报 |
| `agenda_image` | 可选 | 议程图 `./images/detail-<YYMMDD>.jpg` |
| `signup_url` / `signup_url_mb` | 可选 | 报名链接（`ongoing` 时填写） |
| `review_url` | 可选 | 回顾链接（`ended` 后填写） |

### slug 派生规则

zh 详情页路由：`/zh/interaction/event-list/${slug}`

- slug 由 `title_en` 经 slugify 派生：小写 + 移除撇号/&,/括号 + 空格转连字符 + 仅保留 `[a-z0-9-]` + 合并多余连字符，末步将 `openeuler` 还原为品牌大小写 `openEuler`（故先清洗非 `[a-z0-9-]` 再注入大写 E，避免被剥离）
  - `openEuler Embedded Meetup Shanghai` → `openEuler-embedded-meetup-shanghai`
  - `openEuler Cloud Native Middleware Meetup - Xi'an` → `openEuler-cloud-native-middleware-meetup-xian`
  - `openEuler AI & OS Innovation Meetup Beijing` → `openEuler-ai-os-innovation-meetup-beijing`
- title_en 缺失时 fallback 到 title_zh（不推荐，路径可能含非 ASCII 字符被移除后失真）

派生函数：`app/.vitepress/src-new/shared/event-slug.ts` 的 `slugifyEvent(ev)`。

### summit.yaml

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 唯一键（如 `summit2025`） |
| `title_zh` / `title_en` | ✅ | 中英文标题 |
| `start_date` / `end_date` | 可选 | `YYYY-MM-DD` |
| `address_zh` / `address_en` | 可选 | 地址 |
| `format` | 可选 | `offline` / `online` / `hybrid` |

### plan.yaml

顶层数组，每项是一个类别：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 类别标识 |
| `title_zh` / `title_en` | ✅ | 中英文标题 |
| `icon` | ✅ | 图标名 |
| `desc_zh` / `desc_en` | 可选 | 描述 |
| `email` | 可选 | 联系邮箱 |
| `events` | ✅ | 活动数组 |

events 子项：

| 字段 | 说明 |
|------|------|
| `name_zh` / `name_en` | 活动名称 |
| `location_zh` / `location_en` | 地点 |
| `month` | 月份 1-12（非 college 类） |
| `start_month` + `duration` | 起止月份（college 类） |
| `link` | 可选链接 |
| `deadline` | 截止日期（release 类） |

### global_events.yaml

英文专属数据，仅 `_en` 后缀字段。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title_en` | ✅ | 英文标题 |
| `date` | ✅ | 活动日期 `YYYY-MM-DD` |
| `location_en` | ✅ | 英文地点 |
| `cover` | ✅ | 封面图 `./images/<文件名>` |
| `videos` | ✅ | 视频链接数组 |
| `videos[].platform` | ✅ | 平台名称（YouTube / Bilibili） |
| `videos[].url` | ✅ | 视频链接 |

### images/ 命名约定

| 类型 | 命名 | 示例 |
|------|------|------|
| 议程图 | `detail-<YYMMDD>.jpg` | `detail-260530.jpg` |
