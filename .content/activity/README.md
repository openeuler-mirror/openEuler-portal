# activity

活动事件数据源。每条记录是一个完整实体。

## 文件说明

| 文件 | 说明 |
|------|------|
| `events.yaml` | 活动事件实体（Meetup 等），id 为唯一键 |
| `summit.yaml` | 峰会实体（Summit / Developer Day），id 为唯一键 |
| `plan.yaml` | 年度活动计划，按类别组织 |
| `global_events.yaml` | 全球活动回顾（英文专属），仅在英文页面展示 |

## 设计原则

- **数据即 API 响应**：每条记录是完整实体，不做 zh/en 顶层分离
- **无派生字段**：URL 由前端用 id 拼接，不存储
- **无 UI 配置**：筛选选项等页面配置不在此处
- **snake_case**：所有字段名下划线连接
- **多语言**：`_zh` / `_en` 后缀，通过 `foldI18n()` 折叠

## 新增活动

1. 在 `events.yaml` 末尾添加一条记录（id 递增）
2. 把议程图片放到 `images/` 目录下（命名：`detail-<YYMMDD>.jpg`）
3. 提 PR

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
| `id` | ✅ | 数字 ID，唯一键 |
| `title_zh` / `title_en` | ✅ | 中英文标题 |
| `start_date` | ✅ | 开始时间 `YYYY-MM-DD HH:mm` |
| `end_date` | ✅ | 结束时间 |
| `address_zh` / `address_en` | 可选 | 地址（线上活动不填） |
| `city_zh` / `city_en` | 可选 | 城市（线上活动不填） |
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
